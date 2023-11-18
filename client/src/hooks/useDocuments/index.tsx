import { type Dispatch, type SetStateAction, useContext, useEffect, useState } from 'react';
import { ToastContext } from '../../context/ToastContext';
import DocumentService from '../../services/document-service';
import type DocumentInterface from '../../types/interfaces/document';
import useAuth from '../useAuth';
import type TicketInterface from '@src/types/interfaces/ticket';

interface DocumentHookType {
  allTickets: TicketInterface[];
  userDocuments: DocumentInterface[];
  loading: boolean;
  setAllTickets: Dispatch<SetStateAction<TicketInterface[]>>;
  setUserDocuments: Dispatch<SetStateAction<DocumentInterface[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const useDocuments = (): DocumentHookType => {
  const { accessToken, userId } = useAuth();
  const [allTickets, setAllTickets] = useState<TicketInterface[]>([]);
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
    void loadUserDocuments(accessToken);
  }, [accessToken]);

  return {
    allTickets,
    userDocuments,
    loading,
    setAllTickets,
    setUserDocuments,
    setLoading,
  };
};

export default useDocuments;
