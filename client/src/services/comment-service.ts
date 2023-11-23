import API from './api';

const CommentService = {
  create: async (accessToken: string, documentId: number, content: string) => {
    return await API.post(
      `document/${documentId}/comment`,
      {
        content,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
  },
  list: async (accessToken: string, documentId: number) => {
    return await API.get(`document/${documentId}/comment`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};

export default CommentService;
