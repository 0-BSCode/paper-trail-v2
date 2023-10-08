/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditorState, type Editor, convertFromRaw, type RawDraftContentState, convertToRaw } from 'draft-js';
import {
  createContext,
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { io } from 'socket.io-client';
import { FONTS } from '@src/components/FontSelect';
import useAuth from '@src/hooks/useAuth';
import { BASE_URL } from '@src/services/api';
import SocketEvent from '@src/types/enums/socket-events';
import type DocumentInterface from '@src/types/interfaces/document';
import { DocumentContext } from '@src/context/DocumentContext';
import { ToastContext } from '@src/context/ToastContext';

interface EditorContextInterface {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
  socket: null | MutableRefObject<any>;
  documentRendered: boolean;
  setDocumentRendered: Dispatch<SetStateAction<boolean>>;
  editorRef: null | MutableRefObject<null | Editor>;
  handleEditorChange: (editorState: EditorState) => void;
  focusEditor: () => void;
  currentFont: string;
  setCurrentFont: Dispatch<SetStateAction<string>>;
}

const defaultValues = {
  editorState: EditorState.createEmpty(),
  setEditorState: () => {},
  socket: null,
  documentRendered: false,
  setDocumentRendered: () => {},
  editorRef: null,
  handleEditorChange: () => {},
  focusEditor: () => {},
  currentFont: FONTS[0],
  setCurrentFont: () => {},
};

export const EditorContext = createContext<EditorContextInterface>(defaultValues);

interface EditorProviderInterface {
  children: JSX.Element;
}

const DEFAULT_SAVE_TIME = 1500;
let saveInterval: null | NodeJS.Timeout = null;

export const EditorProvider = ({ children }: EditorProviderInterface): JSX.Element => {
  const [editorState, setEditorState] = useState(defaultValues.editorState);
  const socket = useRef<any>(defaultValues.socket);
  const [documentRendered, setDocumentRendered] = useState(defaultValues.documentRendered);
  const editorRef = useRef<null | Editor>(defaultValues.editorRef);
  const [currentFont, setCurrentFont] = useState(defaultValues.currentFont);

  const { document, setCurrentUsers, setSaving, setDocument, saveDocument } = useContext(DocumentContext);
  const { error } = useContext(ToastContext);
  const { accessToken } = useAuth();

  const focusEditor = (): void => {
    if (editorRef?.current === null) return;

    editorRef.current.focus();
  };

  // Send changes
  const handleEditorChange = (editorState: EditorState): void => {
    setEditorState(editorState);

    if (socket === null) return;

    const content = convertToRaw(editorState.getCurrentContent());

    socket.current.emit(SocketEvent.SEND_CHANGES, content);

    let updatedDocument: DocumentInterface | null = null;
    if (document) {
      updatedDocument = {
        ...document,
        content: JSON.stringify(content),
      };
      setDocument(updatedDocument);
    }

    if (document === null || JSON.stringify(content) === document.content) return;

    setSaving(true);

    if (saveInterval) {
      clearInterval(saveInterval);
    }
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    saveInterval = setInterval(async (): Promise<void> => {
      if (updatedDocument) {
        await saveDocument(updatedDocument);
      }
      if (saveInterval) clearInterval(saveInterval);
    }, DEFAULT_SAVE_TIME);
  };

  // Load document content
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (documentRendered || document === null || document.content === null) return;

    try {
      const contentState = convertFromRaw(JSON.parse(document.content) as RawDraftContentState);
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    } catch {
      error('Error when loading document.');
    } finally {
      setDocumentRendered(true);
    }
  }, [document]);

  // Connect socket
  useEffect(() => {
    if (
      document === null ||
      accessToken === null ||
      socket === null ||
      (socket.current !== null && socket.current.connected)
    )
      return;

    socket.current = io(BASE_URL, {
      query: { documentId: document.id, accessToken },
    }).connect();
  }, [document, accessToken, socket]);

  // Disconnect socket
  useEffect(() => {
    return () => {
      socket?.current?.disconnect();
    };
  }, []);

  // Receive changes
  useEffect(() => {
    if (socket.current === null) return;

    const handler = (rawDraftContentState: RawDraftContentState): void => {
      const contentState = convertFromRaw(rawDraftContentState);
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    };

    socket.current.on(SocketEvent.RECEIVE_CHANGES, handler);

    return () => {
      socket.current.off(SocketEvent.RECEIVE_CHANGES, handler);
    };
  }, [socket.current]);

  // Current users updated
  useEffect(() => {
    if (socket.current === null) return;

    const handler = (currentUsers: string[]): void => {
      setCurrentUsers(new Set<string>(currentUsers));
    };

    socket.current.on(SocketEvent.CURRENT_USERS_UPDATE, handler);

    return () => {
      socket.current.off(SocketEvent.CURRENT_USERS_UPDATE, handler);
    };
  }, [socket.current]);

  return (
    <EditorContext.Provider
      value={{
        editorState,
        socket,
        documentRendered,
        editorRef,
        currentFont,
        setEditorState,
        setDocumentRendered,
        handleEditorChange,
        focusEditor,
        setCurrentFont,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
