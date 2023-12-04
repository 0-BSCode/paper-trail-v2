/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  type SetStateAction,
  useState,
  type Dispatch,
  type MutableRefObject,
  useEffect,
  useContext,
  useRef,
  createRef,
} from 'react';
import useAuth from '../../hooks/useAuth';
import DocumentService from '../../services/document-service';
import type DocumentInterface from '../../types/interfaces/document';
import { ToastContext } from '../ToastContext';
import type CurrentUserInterface from '@src/types/interfaces/current-user';

interface DocumentContextInterface {
  document: DocumentInterface | null;
  setDocument: Dispatch<SetStateAction<DocumentInterface | null>>;
  errors: string[];
  setErrors: Dispatch<SetStateAction<string[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  saving: boolean;
  setSaving: Dispatch<SetStateAction<boolean>>;
  currentUsers: Set<CurrentUserInterface>;
  setCurrentUsers: Dispatch<SetStateAction<Set<CurrentUserInterface>>>;
  setDocumentTitle: (title: string) => void;
  saveDocument: (updatedDocument: DocumentInterface) => Promise<void>;
  socket: MutableRefObject<any>;
}

const defaultValues = {
  document: null,
  setDocument: () => {},
  errors: [],
  setErrors: () => {},
  loading: false,
  setLoading: () => {},
  saving: false,
  setSaving: () => {},
  currentUsers: new Set<CurrentUserInterface>(),
  setCurrentUsers: () => {},
  setDocumentTitle: () => {},
  saveDocument: async () => {},
  socket: createRef<any>(),
};

export const DocumentContext = createContext<DocumentContextInterface>(defaultValues);

interface DocumentProviderInterface {
  children: JSX.Element;
}

export const DocumentProvider = ({ children }: DocumentProviderInterface): JSX.Element => {
  const { error } = useContext(ToastContext);
  const { accessToken } = useAuth();
  const [document, setDocument] = useState<null | DocumentInterface>(defaultValues.document);
  const [errors, setErrors] = useState<string[]>(defaultValues.errors);
  const [loading, setLoading] = useState(defaultValues.loading);
  const [saving, setSaving] = useState(defaultValues.saving);
  const [currentUsers, setCurrentUsers] = useState(defaultValues.currentUsers);
  const socket = useRef<any>(null);

  const setDocumentTitle = (title: string): void => {
    if (document) {
      const newDocument: DocumentInterface = { ...document, title };
      setDocument(newDocument);
    }
  };

  const saveDocument = async (updatedDocument: DocumentInterface): Promise<void> => {
    if (accessToken === null) return;

    setSaving(true);

    try {
      await DocumentService.update(accessToken, updatedDocument);
      setDocument(updatedDocument);
    } catch (error) {
      setErrors(['There was an error saving the document. Please try again.']);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (errors.length) {
      errors.forEach((err) => {
        error(err);
      });
    }
  }, [errors]);

  return (
    <DocumentContext.Provider
      value={{
        document,
        errors,
        loading,
        saving,
        currentUsers,
        setDocument,
        setErrors,
        setLoading,
        setSaving,
        setCurrentUsers,
        setDocumentTitle,
        saveDocument,
        socket,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};
