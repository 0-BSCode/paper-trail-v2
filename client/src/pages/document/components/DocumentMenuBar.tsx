// TODO: Remove unneeded buttons
import { type ChangeEvent, type FocusEvent, useContext } from 'react';
import UserDropdown from '@src/components/UserDropdown';
import ShareDocumentModal from './ShareDocumentModal';
import useRandomBackground from '@src/hooks/useRandomBackground';
import useAuth from '@src/hooks/useAuth';
import { DocumentContext } from '@src/context/DocumentContext';
import DocumentService from '@src/services/document-service';
import type DocumentInterface from '@src/types/interfaces/document';
import { Anchor, Input, Space } from 'antd';

const { Link } = Anchor;

const CurrentUsers = (): JSX.Element => {
  const { backgroundColor } = useRandomBackground();
  const { email } = useAuth();
  const { currentUsers } = useContext(DocumentContext);

  return (
    <>
      {Array.from(currentUsers)
        .filter((currentUser) => currentUser !== email)
        .map((currentUser) => {
          return (
            <div
              key={currentUser}
              className={`${backgroundColor} w-8 h-8 text-white font-semibold flex justify-center items-center rounded-full flex-shrink-0 uppercase ring-2`}
            >
              {currentUser[0]}
            </div>
          );
        })}
    </>
  );
};

const DocumentMenuBar = (): JSX.Element => {
  const { accessToken, userId } = useAuth();
  const { document, saving, setDocumentTitle, setDocument, setSaving, setErrors } = useContext(DocumentContext);

  const handleTitleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const title = event.target.value;
    setDocumentTitle(title);
  };

  const handleTitleInputBlur = async (event: FocusEvent<HTMLInputElement>): Promise<void> => {
    if (accessToken === null || document === null) return;

    setSaving(true);

    const title = (event.target as HTMLInputElement).value;
    const updatedDocument: DocumentInterface = {
      ...document,
      title,
    };

    try {
      await DocumentService.update(accessToken, updatedDocument);
    } catch (error) {
      setErrors(['There was an error saving the document. Please try again.']);
    } finally {
      setDocument(updatedDocument);
      setSaving(false);
    }
  };

  return (
    <div className="w-full flex justify-between items-center border-b">
      <div className="w-full flex flex-col justify-start items-start overflow-x-hidden md:overflow-visible gap-y-1">
        <Link href="/home" title="Go Back" />
        <Space>
          <Input
            maxLength={25}
            type="text"
            onBlur={(event) => {
              void handleTitleInputBlur(event);
            }}
            onChange={(event) => {
              handleTitleInputChange(event);
            }}
            value={document?.title ? document?.title : ''}
            name=""
            id=""
            placeholder="Untitled Document"
          />
          <p className={`text-sm text-gray-500 px-2 ${saving ? 'visible' : 'invisible'}`}>Saving...</p>
        </Space>
      </div>
      <div className="flex items-center flex-shrink-0 pl-3 gap-x-4">
        <div className="flex items-center gap-x-2">
          <CurrentUsers />
          <UserDropdown />
        </div>
        {document !== null && document.userId === userId && <ShareDocumentModal />}
      </div>
    </div>
  );
};

export default DocumentMenuBar;
