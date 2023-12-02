import Modal from '@src/components/Modal';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentContext } from '@src/context/DocumentContext';
import useAuth from '@src/hooks/useAuth';
import { ToastContext } from '@src/context/ToastContext';
import { Button, Space } from 'antd';
import DocumentService from '@src/services/document-service';
import useFileHandler from '@src/hooks/useFileHandler';

const DeleteDocumentModal = (): JSX.Element => {
  const { document } = useContext(DocumentContext);
  const { accessToken } = useAuth();
  const { success, error } = useContext(ToastContext);
  const navigate = useNavigate();
  const { deleteAllFiles } = useFileHandler();

  const deleteDocument = async (): Promise<void> => {
    try {
      await DocumentService.delete(accessToken, document.id);
      deleteAllFiles(document?.id + '');

      success(`Successfully deleted document!`);
    } catch (err) {
      error(`Document could not be successfully deleted`);
    } finally {
      navigate('/home');
    }
  };

  const handleDeleteClick = (): void => {
    deleteDocument().catch((err) => {
      console.error(err);
    });
  };

  return (
    <Modal
      button={
        <Space>
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      }
      content={
        document === null ? (
          <></>
        ) : (
          <div className="space-y-4 text-sm">
            <div className="flex flex-col p-4 space-x-4 bg-white rounded-md shadow-xl">
              <div className="flex items-center mx-2 space-x-2">
                <div className="flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-full">
                  <ExclamationTriangleIcon className="relative w-5 h-5" />
                </div>
                <h1 className="text-xl font-medium">Are you sure you want to delete this document?</h1>
              </div>
              <div className="flex flex-col px-4">
                <p>This will delete this document permanently. This action cannot be undone.</p>
                <div className="flex items-center justify-end gap-3">
                  <Button type="primary" danger onClick={handleDeleteClick}>
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    />
  );
};

export default DeleteDocumentModal;
