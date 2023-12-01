import CommentService from '@src/services/comment-service';
import type CommentInterface from '@src/types/interfaces/comment';
import { useContext, useEffect, useState } from 'react';
import axios, { type AxiosError } from 'axios';
import { AuthContext } from '@src/context/AuthContext';
import { ToastContext } from '@src/context/ToastContext';
import { DocumentContext } from '@src/context/DocumentContext';
import SocketEvent from '@src/types/enums/socket-events';

interface CommentHookType {
  comments: CommentInterface[];
  loading: boolean;
  errors: string[];
  createComment: (documentId: number, content: string) => Promise<void>;
}

// TODO (Bryan): Make comment creation a socket event for automatic propagation
const useComments = (documentId: number): CommentHookType => {
  const { accessToken } = useContext(AuthContext);
  const { error } = useContext(ToastContext);
  const { socket } = useContext(DocumentContext);
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const loadComments = async (accessToken: string, documentId: number): Promise<void> => {
    setLoading(true);

    try {
      const response = await CommentService.list(accessToken, documentId);
      setComments(response.data as CommentInterface[]);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const { response } = error as AxiosError;
        if (response?.status === 404) {
          setErrors((prev) => [...prev, 'Document does not exist.']);
        } else {
          setErrors((prev) => [...prev, 'An unknown error has occured. Please try again.']);
        }
      } else {
        setErrors((prev) => [...prev, 'An unknown error has occured. Please try again.']);
      }
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (documentId: number, content: string): Promise<void> => {
    if (accessToken === null) {
      setErrors((prev) => [...prev, 'No access token provided.']);
      return;
    }

    setLoading(true);

    try {
      const response = await CommentService.create(accessToken, documentId, content);
      const newComment = response.data as CommentInterface;

      if (socket === null || socket.current === null) return;

      const newComments = [...comments, newComment];
      socket.current.emit(SocketEvent.SEND_COMMENT, newComments);
      setComments(newComments);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const { response } = error as AxiosError;
        if (response?.status === 404) {
          setErrors((prev) => [...prev, 'Document does not exist.']);
        } else {
          setErrors((prev) => [...prev, 'An unknown error has occured. Please try again.']);
        }
      } else {
        setErrors((prev) => [...prev, 'An unknown error has occured. Please try again.']);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (socket.current === null) return;

    const handler = (newComments: CommentInterface[]): void => {
      setComments(newComments);
    };

    socket.current.on(SocketEvent.RECEIVE_COMMENT, handler);

    return () => {
      socket.current.off(SocketEvent.RECEIVE_COMMENT, handler);
    };
  }, [socket.current]);

  useEffect(() => {
    if (accessToken === null) return;

    void loadComments(accessToken, documentId);
  }, [accessToken, documentId]);

  useEffect(() => {
    if (errors.length) {
      errors.forEach((err) => {
        error(err);
      });
    }
  }, [errors]);

  return {
    comments,
    loading,
    errors,
    createComment,
  };
};

export default useComments;
