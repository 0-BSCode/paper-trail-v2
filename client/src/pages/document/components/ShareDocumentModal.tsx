import Modal from '@src/components/Modal';
import { UserPlusIcon, LinkIcon } from '@heroicons/react/24/outline';
import { useContext, useRef, useState, type KeyboardEvent } from 'react';
import type DocumentInterface from '@src/types/interfaces/document';
import Spinner from '@src/components/Spinner';
import validator from 'validator';
import PermissionEnum from '@src/types/enums/permission-enum';
import SharedUsers from './SharedUsers';
import { DocumentContext } from '@src/context/DocumentContext';
import useAuth from '@src/hooks/useAuth';
import { ToastContext } from '@src/context/ToastContext';
import DocumentUserService from '@src/services/document-user-service';
import type DocumentUser from '@src/types/interfaces/document-user';
import { Button, Select, Space } from 'antd';
import useUsers from '@src/hooks/useUsers';

// Filter `option.label` match the user type `input`
const filterOption = (input: string, option?: { label: string; value: string }): boolean =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const ShareDocumentModal = (): JSX.Element => {
  const { success, error } = useContext(ToastContext);
  const { document, saving, saveDocument, setDocument } = useContext(DocumentContext);
  const copyLinkInputRef = useRef<null | HTMLInputElement>(null);
  const { accessToken } = useAuth();
  // TODO: Create new endpoint to retrieve only email and ID
  // so we don't get unnecessary info
  const { allUsers } = useUsers();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<null | string>(null);

  const docUserIds = document?.users.map((u) => u.userId) ?? [];
  const userIds = [document?.userId, ...docUserIds];
  const userOptions = allUsers.filter((u) => userIds.every((id) => id !== u.id));

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
      setEmail(null);
    } catch (err) {
      error(`Unable to share this document with ${email}. Please try again`);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (newEmail: string | undefined): void => {
    setEmail(newEmail ?? null);
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

  const handleShareBtnClick = (): void => {
    void shareDocument();
  };

  const updateIsPublic = (isPublic: boolean): void => {
    if (document) {
      const updatedDocument = {
        ...document,
        isPublic,
      } satisfies DocumentInterface;

      void saveDocument(updatedDocument);
    }
  };

  const alreadyShared =
    document === null ||
    (document !== null && document.users.filter((documentUser) => documentUser.user.email === email).length > 0);
  const disableButton = loading || email === null || !validator.isEmail(email) || alreadyShared;

  const restrictedAccessBtn = (
    <div className="space-y-1">
      <button
        disabled={saving}
        onClick={() => {
          updateIsPublic(true);
        }}
        className="font-semibold text-blue-600 p-2 hover:bg-blue-50 rounded-md"
      >
        {saving && <Spinner size="sm" />}
        <span className={`${saving && 'opacity-0'}`}>Change to anyone with the link</span>
      </button>
      <p className="mx-2">
        <b className="font-semibold">Restricted</b>&nbsp;
        <span className="text-gray-600">Only people added can open with this link</span>
      </p>
    </div>
  );

  const publicAccessBtn = (
    <div className="space-y-1">
      <button
        disabled={saving}
        onClick={() => {
          updateIsPublic(false);
        }}
        className="font-semibold text-blue-600 p-2 hover:bg-blue-50 rounded-md"
      >
        {saving && <Spinner size="sm" />}
        <span className={`${saving && 'opacity-0'}`}>Change to only shared users</span>
      </button>
      <p className="mx-2">
        <b className="font-semibold">Public</b>&nbsp;
        <span className="text-gray-600">Anyone with this link can view</span>
      </p>
    </div>
  );

  return (
    <Modal
      button={
        <Space>
          <Button>Share</Button>
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
            <div className="rounded-md bg-white shadow-xl p-4 space-y-4">
              <div className="flex items-center space-x-2 m-2">
                <div className="w-8 h-8 bg-blue-500 flex justify-center items-center rounded-full text-white">
                  <UserPlusIcon className="w-5 h-5 relative" />
                </div>
                <h1 className="text-xl font-medium">Share with people</h1>
              </div>
              <Select
                showSearch
                allowClear
                placeholder="Select a user"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={filterOption}
                value={email}
                options={userOptions.map((user) => {
                  return { value: user.email, label: user.email };
                })}
                style={{
                  width: '100%',
                }}
              />
              <SharedUsers documentUsers={document.users} setDocument={setDocument} />
              <div className="w-full flex justify-end space-x-2">
                <Button onClick={handleShareBtnClick} type="primary" disabled={disableButton}>
                  {loading && <Spinner size="sm" />}
                  <span className={`${loading && 'opacity-0'}`}>Share</span>
                </Button>
              </div>
            </div>
            <div className="rounded-md bg-white shadow-xl p-4 space-y-4 flex flex-col">
              <div className="m-2 flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-400 flex justify-center items-center rounded-full text-white">
                  <LinkIcon className="w-5 h-5 relative" />
                </div>
                <h1 className="text-xl font-medium">Get Link</h1>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">{document.isPublic ? publicAccessBtn : restrictedAccessBtn}</div>
                  <input ref={copyLinkInputRef} type="text" className="d-none opacity-0 cursor-default" />
                  <button
                    onClick={handleCopyLinkBtnClick}
                    className="font-semibold text-blue-600 p-2 hover:bg-blue-50 rounded-md"
                  >
                    Copy link
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    />
  );
};

export default ShareDocumentModal;
