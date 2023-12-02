import Modal from '@src/components/Modal';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useContext, useRef, useState, type KeyboardEvent } from 'react';
import type DocumentInterface from '@src/types/interfaces/document';
import validator from 'validator';
import PermissionEnum from '@src/types/enums/permission-enum';
import { DocumentContext } from '@src/context/DocumentContext';
import useAuth from '@src/hooks/useAuth';
import { ToastContext } from '@src/context/ToastContext';
import DocumentUserService from '@src/services/document-user-service';
import type DocumentUser from '@src/types/interfaces/document-user';
import { Button, Space } from 'antd';

const DeleteDocumentModal = (): JSX.Element => {
  const { document, saving, saveDocument, setDocument } = useContext(DocumentContext);
  const copyLinkInputRef = useRef<null | HTMLInputElement>(null);
  const [email, setEmail] = useState<null | string>(null);
  const { accessToken } = useAuth();
  const { success, error } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);

  const shareDocument = async (): Promise<void> => {
    if (email === null || !validator.isEmail(email) || accessToken === null || document === null) return;

    const payload = {
      documentId: document.id,
      email,
      permission: PermissionEnum.VIEW,
    };

    setLoading(true);

    try {
      const response = await DocumentUserService.create(accessToken, payload);
      const documentUser = response.data as DocumentUser;
      documentUser.user = { email };

      success(`Successfully shared document with ${email}!`);
      setDocument({
        ...document,
        users: [...document.users, documentUser],
      } satisfies DocumentInterface);
      setEmail('');
    } catch (err) {
      error(`Unable to share this document with ${email}. Please try again`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLinkBtnClick = (): void => {
    if (copyLinkInputRef?.current === null) return;

    const url = window.location.href;
    copyLinkInputRef.current.value = url;
    copyLinkInputRef.current.focus();
    copyLinkInputRef.current.select();
    window.document.execCommand('copy');
  };

  const handleOnKeyPress = async (event: KeyboardEvent): Promise<void> => {
    if (event.key === 'Enter') await shareDocument();
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
          <div
            onKeyPress={(event) => {
              void handleOnKeyPress(event);
            }}
            className="space-y-4 text-sm"
          >
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
                  <Button type="primary" danger onClick={handleCopyLinkBtnClick}>
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
