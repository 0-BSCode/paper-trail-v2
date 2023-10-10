import axios, { type AxiosError } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ToastContext } from '@src/context/ToastContext';
import DocumentService from '@src/services/document-service';
import type DocumentInterface from '@src/types/interfaces/document';
import useAuth from '@src/hooks/useAuth';

interface DocumentHookType {
  document: DocumentInterface | null;
  loading: boolean;
  errors: string[];
}

const useDocument = (documentId: number): DocumentHookType => {
  const { accessToken } = useAuth();
  const { error } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [document, setDocument] = useState<null | DocumentInterface>(null);

  const loadDocument = async (accessToken: string, documentId: number): Promise<void> => {
    setLoading(true);

    try {
      const response = await DocumentService.get(accessToken, documentId);
      setDocument(response.data as DocumentInterface);
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
    if (accessToken === null) return;

    void loadDocument(accessToken, documentId);
  }, [accessToken, documentId]);

  useEffect(() => {
    if (errors.length) {
      errors.forEach((err) => {
        error(err);
      });
    }
  }, [errors]);

  return {
    document,
    errors,
    loading,
  };
};

export default useDocument;
