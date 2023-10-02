import { PlusIcon } from '@heroicons/react/24/outline';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from '../../../context/ToastContext';
import useAuth from '../../../hooks/useAuth';
import DocumentService from '../../../services/document-service';
import type DocumentInterface from '../../../types/interfaces/document';
import Spinner from '../../Spinner';

const CreateDocumentButton = (): JSX.Element => {
  const { error } = useContext(ToastContext);
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDocumentCreateBtnClick = async (): Promise<void> => {
    if (accessToken === null) return;

    setLoading(true);

    try {
      const response = await DocumentService.create(accessToken);
      const { id } = response.data as DocumentInterface;

      navigate(`/document/${id}`);
    } catch (err) {
      error('Unable to create a new document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-80 bg-gray-100 flex justify-center items-center font-medium text-gray-700 px-4 overflow-hidden">
      <div className="w-full h-full max-w-4xl py-4 space-y-4 overflow-auto">
        <h1>Start a new document</h1>
        <div className="flex items-center">
          <div className="space-y-2">
            <button
              disabled={loading}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => {
                await handleDocumentCreateBtnClick();
              }}
              className="h-52 w-40 bg-white border hover:border-blue-500 flex items-center justify-center"
            >
              <span className={`${loading && 'opacity-0'}`}>
                <PlusIcon className="w-16 h-16 text-red-500" />
              </span>
              {loading && <Spinner size="md" />}
            </button>
            <h3 className="text-sm">Blank</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDocumentButton;
