import { useContext, useRef, useState, type FocusEvent, type Dispatch, type SetStateAction } from 'react';
import useAuth from '../../../hooks/useAuth';
import { CSSTransition } from 'react-transition-group';
import { ToastContext } from '../../../context/ToastContext';
import DocumentService from '../../../services/document-service';
import type DocumentInterface from '../../../types/interfaces/document';

interface DocumentMenuButtonProps {
  documentId: number;
  setDocuments: Dispatch<SetStateAction<DocumentInterface[]>>;
}

const DocumentMenuButton = ({ documentId, setDocuments }: DocumentMenuButtonProps): JSX.Element => {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { error } = useContext(ToastContext);

  const handleMenuBtnBlur = (event: FocusEvent<HTMLButtonElement>): void => {
    const classList = (event.target as HTMLButtonElement).classList;

    if (!classList.contains('document-menu')) {
      setShowDropdown(false);
    }
  };

  const handleDeleteBtnClick = async (): Promise<void> => {
    if (accessToken === null) return;

    setLoading(true);

    try {
      await DocumentService.delete(accessToken, documentId);
      setDocuments((allDocuments: DocumentInterface[]) =>
        allDocuments.filter((document) => document.id !== documentId),
      );
    } catch (err) {
      error('Unable to delete document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative flex justify-center document-menu-btn-${documentId}`}>
      <button
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
        onBlur={handleMenuBtnBlur}
        className={`hover:bg-gray-100 relative left-2 w-8 h-8 rounded-full flex items-center justify-center document-menu-btn-${documentId}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`w-5 h-5 document-menu-btn-${documentId}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className={`document-menu-btn-${documentId}`}
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          ></path>
        </svg>
      </button>
      <CSSTransition nodeRef={dropdownRef} in={showDropdown} timeout={200} classNames="fade-in" unmountOnExit>
        <div
          ref={dropdownRef}
          className="absolute top-full mt-1 z-10 w-52 bg-white py-2 rounded-sm shadow-lg border document-menu"
        >
          <button
            disabled={loading}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async () => {
              await handleDeleteBtnClick();
            }}
            className="w-full text-black hover:bg-gray-100 text-sm px-6 py-1 text-left document-menu"
          >
            Delete
          </button>
        </div>
      </CSSTransition>
    </div>
  );
};

export default DocumentMenuButton;
