import { type Dispatch, type SetStateAction, useContext, useState } from 'react';
import { DocumentContext } from '@src/context/DocumentContext';
import { ToastContext } from '@src/context/ToastContext';
import useAuth from '@src/hooks/useAuth';
import useRandomBackground from '@src/hooks/useRandomBackground';
import DocumentUserService from '@src/services/document-user-service';
import type DocumentInterface from '@src/types/interfaces/document';
import type DocumentUser from '@src/types/interfaces/document-user';

interface SharedUsersProps {
  documentUsers: DocumentUser[];
  setDocument: Dispatch<SetStateAction<DocumentInterface | null>>;
}

const SharedUsers = ({ documentUsers, setDocument }: SharedUsersProps): JSX.Element => {
  const { backgroundColor } = useRandomBackground();
  const { backgroundColor: sharedUserBackgroundColor } = useRandomBackground();
  const { accessToken, email } = useAuth();
  const [loading, setLoading] = useState(false);
  const { addToast } = useContext(ToastContext);
  const { document } = useContext(DocumentContext);

  const removeDocumentUser = async (payload: { documentId: number; userId: number }): Promise<void> => {
    if (!accessToken) return;

    setLoading(true);

    try {
      await DocumentUserService.delete(accessToken, payload);

      //   TODO: Find a way to assert document existence
      if (document) {
        setDocument({
          ...document,
          users: document.users.filter((documentUser) => documentUser.userId !== payload.userId),
        } satisfies DocumentInterface);
      }
    } catch {
      addToast({
        color: 'danger',
        title: 'Unable to remove user',
        body: 'Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="px-2 py-4 w-full flex items-center justify-between hover:bg-gray-100 rounded-md">
        <div className="flex items-center space-x-2">
          <div
            className={`${backgroundColor} w-8 h-8 flex justify-center items-center text-white uppercase rounded-full text-xl font-medium`}
          >
            {email?.[0]}
          </div>
          <p className="font-medium">{email !== null && email} (you)</p>
        </div>
        <p className="text-gray-500 italic">Owner</p>
      </div>
      {documentUsers.map((documentUser) => {
        return (
          <div
            key={documentUser.user.email}
            className="px-2 py-4 w-full flex items-center justify-between hover:bg-gray-100 rounded-md"
          >
            <div className="flex items-center space-x-2">
              <div
                className={`${sharedUserBackgroundColor} w-8 h-8 flex justify-center items-center text-white uppercase rounded-full text-xl font-medium`}
              >
                {documentUser.user.email[0]}
              </div>
              <p className="font-medium">{documentUser.user.email}</p>
            </div>
            <button
              onClick={() => {
                void removeDocumentUser({
                  documentId: documentUser.documentId,
                  userId: documentUser.userId,
                });
              }}
              disabled={loading}
              className="font-semibold text-blue-600 p-2 hover:bg-blue-50 rounded-md"
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SharedUsers;
