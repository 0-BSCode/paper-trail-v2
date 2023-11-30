/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useRef, useContext, useEffect, type MutableRefObject } from 'react';
import { DocumentContext } from '../DocumentContext';
import useAuth from '@src/hooks/useAuth';
import { io } from 'socket.io-client';
import { BASE_URL } from '@src/services/api';

interface SocketContextInterface {
  socket: null | MutableRefObject<any>;
}

const defaultValues = {
  socket: null,
};

export const SocketContext = createContext<SocketContextInterface>(defaultValues);

interface SocketProviderInterface {
  children: JSX.Element;
}

export const SocketProvider = ({ children }: SocketProviderInterface): JSX.Element => {
  const socket = useRef<any>(defaultValues.socket);
  const { document } = useContext(DocumentContext);
  const { accessToken } = useAuth();

  // Connect socket
  useEffect(() => {
    // Don't connect if:
    // 1. No document
    // 2. No access token
    // 3. socket is already connected
    if (
      document === null ||
      accessToken === null ||
      socket === null ||
      (socket.current !== null && socket.current.connected)
    ) {
      return;
    }

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

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
