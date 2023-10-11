import type PermissionEnum from '../types/enums/permission-enum';
import API from './api';

const DocumentUserService = {
  create: async (accessToken: string, payload: { documentId: number; email: string; permission: PermissionEnum }) => {
    return await API.post(`document/${payload.documentId}/share`, payload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  delete: async (accessToken: string, payload: { documentId: number; userId: number }) => {
    return await API.delete(`document/${payload.documentId}/share/${payload.userId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};

export default DocumentUserService;
