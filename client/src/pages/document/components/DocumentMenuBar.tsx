// TODO: Remove unneeded buttons
import { type ChangeEvent, type FocusEvent, useContext, useState } from 'react';
import UserDropdown from '@src/components/UserDropdown';
import ShareDocumentModal from './ShareDocumentModal';
import useRandomBackground from '@src/hooks/useRandomBackground';
import useAuth from '@src/hooks/useAuth';
import { DocumentContext } from '@src/context/DocumentContext';
import DocumentService from '@src/services/document-service';
import type DocumentInterface from '@src/types/interfaces/document';
import { Anchor, Button, Input, Space } from 'antd';
import StatusEnum from '@src/types/enums/status-enum';
import { ToastContext } from '@src/context/ToastContext';

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
  const { success } = useContext(ToastContext);
  const { document, saving, setDocumentTitle, setDocument, setSaving, setErrors } = useContext(DocumentContext);
  const [isStatusSaving, setIsStatusSaving] = useState(false);

  const canSubmit =
    !isStatusSaving &&
    document?.userId === userId &&
    (document?.status === StatusEnum.DRAFT || document?.status === StatusEnum.CHANGES_REQUESTED);

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

  const saveStatus = (status: StatusEnum | undefined): void => {
    // TODO: Consolidate API calls that require accessToken under one check
    // so we don't need to keep checking this
    if (accessToken === null || document === null || status === undefined) return;

    let newStatus = status;

    switch (status) {
      case StatusEnum.DRAFT:
      case StatusEnum.CHANGES_REQUESTED:
        newStatus = StatusEnum.REVIEW_REQUESTED;
        break;
      default:
        newStatus = status;
        break;
    }

    if (newStatus === status) return;

    setIsStatusSaving(true);
    void DocumentService.setStatus(accessToken, document.id, newStatus)
      .then(() => {
        success('Successfully saved status!');
        setDocument({ ...document, status: newStatus });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsStatusSaving(false);
      });
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
        <Space>
          <CurrentUsers />
          <UserDropdown />
        </Space>
        <Space>
          {document !== null && document.userId === userId && <ShareDocumentModal />}
          <Button
            disabled={!canSubmit}
            type="primary"
            onClick={() => {
              saveStatus(document?.status);
            }}
          >
            {document?.status === StatusEnum.CHANGES_REQUESTED ? 'Resubmit' : 'Submit'}
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default DocumentMenuBar;
