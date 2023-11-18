import { type Dispatch, type SetStateAction, useContext, useEffect, useState } from 'react';
import { ToastContext } from '../../context/ToastContext';
import DocumentService from '../../services/document-service';
import type DocumentInterface from '../../types/interfaces/document';
import useAuth from '../useAuth';

interface DocumentHookType {
  allDocuments: DocumentInterface[];
  userDocuments: DocumentInterface[];
  loading: boolean;
  setAllDocuments: Dispatch<SetStateAction<DocumentInterface[]>>;
  setUserDocuments: Dispatch<SetStateAction<DocumentInterface[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const useDocuments = (): DocumentHookType => {
  const { accessToken, userId } = useAuth();
  const [allDocuments, setAllDocuments] = useState<DocumentInterface[]>([]);
  const [userDocuments, setUserDocuments] = useState<DocumentInterface[]>([]);

  const [loading, setLoading] = useState(false);
  const { error } = useContext(ToastContext);

  const loadUserDocuments = async (accessToken: string): Promise<void> => {
    setLoading(true);

    try {
      const response = await DocumentService.list(accessToken);
      setUserDocuments(response.data as DocumentInterface[]);
    } catch (err) {
      error('Unable to load documents. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadAllDocuments = async (accessToken: string): Promise<void> => {
    if (!userId) return;

    try {
      const response = await DocumentService.getAllDocuments(accessToken);
      setAllDocuments(response.data as DocumentInterface[]);
    } catch (err) {
      error('Unable to load documents. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken === null) return;

    void loadAllDocuments(accessToken);
    void loadUserDocuments(accessToken);
  }, [accessToken]);

  return {
    allDocuments,
    userDocuments,
    loading,
    setAllDocuments,
    setUserDocuments,
    setLoading,
  };
};

export default useDocuments;
