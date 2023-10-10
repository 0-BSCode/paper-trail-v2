import { type Dispatch, type SetStateAction, useContext, useEffect, useState } from 'react';
import { ToastContext } from '../../context/ToastContext';
import DocumentService from '../../services/document-service';
import type DocumentInterface from '../../types/interfaces/document';
import useAuth from '../useAuth';

interface DocumentHookType {
  documents: DocumentInterface[];
  loading: boolean;
  setDocuments: Dispatch<SetStateAction<DocumentInterface[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const useDocuments = (): DocumentHookType => {
  const { accessToken } = useAuth();
  const [documents, setDocuments] = useState<DocumentInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const { error } = useContext(ToastContext);

  const loadDocuments = async (accessToken: string): Promise<void> => {
    setLoading(true);

    try {
      const response = await DocumentService.list(accessToken);
      setDocuments(response.data as DocumentInterface[]);
    } catch (err) {
      error('Unable to load documents. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken === null) return;

    void loadDocuments(accessToken);
  }, [accessToken]);

  return {
    documents,
    loading,
    setDocuments,
    setLoading,
  };
};

export default useDocuments;
