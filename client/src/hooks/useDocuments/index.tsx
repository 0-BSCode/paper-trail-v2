import { type Dispatch, type SetStateAction, useContext, useEffect, useState } from 'react';
import { ToastContext } from '../../context/ToastContext';
import DocumentService from '../../services/document-service';
import type DocumentInterface from '../../types/interfaces/document';
import useAuth from '../useAuth';
import type TicketInterface from '@src/types/interfaces/ticket';

interface DocumentHookType {
  allTickets: TicketInterface[];
  documents: DocumentInterface[];
  loading: boolean;
  setAllTickets: Dispatch<SetStateAction<TicketInterface[]>>;
  setDocuments: Dispatch<SetStateAction<DocumentInterface[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const useDocuments = (): DocumentHookType => {
  const { accessToken, userId } = useAuth();
  const [allTickets, setAllTickets] = useState<TicketInterface[]>([]);
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

  const loadAllDocuments = async (accessToken: string): Promise<void> => {
    if (!userId) return;

    try {
      const response = await DocumentService.getAllDocuments(accessToken);
      setAllTickets(response.data as TicketInterface[]);
    } catch (err) {
      error('Unable to load documents. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken === null) return;

    void loadAllDocuments(accessToken);
    void loadDocuments(accessToken);
  }, [accessToken]);

  return {
    allTickets,
    documents,
    loading,
    setAllTickets,
    setDocuments,
    setLoading,
  };
};

export default useDocuments;
