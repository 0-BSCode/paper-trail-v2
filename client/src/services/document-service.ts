import type StatusEnum from '@src/types/enums/status-enum';
import type DocumentInterface from '../types/interfaces/document';
import API from './api';

const DocumentService = {
  create: async (accessToken: string) => {
    return await API.post(
      'document',
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
  },
  get: async (accessToken: string, documentId: number) => {
    return await API.get(`document/${documentId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  getAllDocuments: async (accessToken: string) => {
    return await API.get(`document/all`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  list: async (accessToken: string) => {
    return await API.get('document', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  update: async (accessToken: string, payload: DocumentInterface) => {
    return await API.put(`document/${payload.id}`, payload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  delete: async (accessToken: string, documentId: number) => {
    return await API.delete(`document/${documentId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  getAssignee: async (accessToken: string, documentId: number) => {
    return await API.get(`document/${documentId}/assignee`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  setAssignee: async (accessToken: string, documentId: number, assigneeId: number | null) => {
    return await API.put(
      `document/${documentId}/assignee`,
      { userId: assigneeId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  },
  getStatus: async (accessToken: string, documentId: number) => {
    return await API.get(`document/${documentId}/status`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  setStatus: async (accessToken: string, documentId: number, status: StatusEnum) => {
    return await API.put(
      `document/${documentId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  },
};

export default DocumentService;
