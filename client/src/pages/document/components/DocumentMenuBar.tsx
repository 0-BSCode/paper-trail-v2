import { type ChangeEvent, type FocusEvent, useContext, useState } from 'react';
import ShareDocumentModal from './ShareDocumentModal';
import useAuth from '@src/hooks/useAuth';
import { DocumentContext } from '@src/context/DocumentContext';
import DocumentService from '@src/services/document-service';
import type DocumentInterface from '@src/types/interfaces/document';
import { Avatar, Button, Input, Space, Tooltip, Typography } from 'antd';
import StatusEnum from '@src/types/enums/status-enum';
import { ToastContext } from '@src/context/ToastContext';
import SocketEvent from '@src/types/enums/socket-events';
import DeleteDocumentModal from './DeleteDocumentModal';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import statusToOptionMapping from '@src/constants/statusToOptionMapping';
import getAvatarImageUrlByEmail from '@src/utils/getAvatarImageUrlByEmail';

const CurrentUsers = (): JSX.Element => {
  const { email } = useAuth();
  const { currentUsers } = useContext(DocumentContext);

  return (
    <>
      {Array.from(currentUsers)
        .filter((currentUser) => currentUser.email !== email)
        .map((currentUser) => {
          return (
            <Tooltip title={currentUser.fullName} key={currentUser.email}>
              <Avatar
                size={32}
                src={getAvatarImageUrlByEmail(currentUser.email)}
                className={
                  'w-8 h-8 text-white font-semibold flex justify-center items-center rounded-full flex-shrink-0 uppercase ring-2'
                }
              />
            </Tooltip>
          );
        })}
    </>
  );
};

const DocumentMenuBar = (): JSX.Element => {
  const { accessToken, userId, email, fullName } = useAuth();
  const { success } = useContext(ToastContext);
  const { document, saving, socket, setDocumentTitle, setDocument, setSaving, setErrors } = useContext(DocumentContext);
  const navigate = useNavigate();
  const [isStatusSaving, setIsStatusSaving] = useState(false);
  const hasDeletePermissions: boolean =
    document !== null && document.userId === userId && document.status === StatusEnum.DRAFT;

  const canSubmit =
    !isStatusSaving &&
    document?.userId === userId &&
    (document?.status === StatusEnum.DRAFT || document?.status === StatusEnum.CHANGES_REQUESTED);

  const canEditTitle =
    document?.userId === userId && document?.status !== StatusEnum.RESOLVED && document?.status !== StatusEnum.RAISED;

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
    socket.current.emit(SocketEvent.SEND_STATUS, newStatus);
    void DocumentService.setStatus(accessToken, document.id, newStatus)
      .then(() => {
        success(
          `Successfully changed status to ${statusToOptionMapping[newStatus as keyof typeof statusToOptionMapping]}`,
        );
        setDocument({ ...document, status: newStatus });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsStatusSaving(false);
      });
  };

  const handleTitleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const title = event.target.value;
    setDocumentTitle(title);
  };

  const handleTitleInputBlur = async (event: FocusEvent<HTMLInputElement>): Promise<void> => {
    if (accessToken === null || document === null || !canEditTitle) return;

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

  const handleBackNavigation = (): void => {
    navigate('/home');
  };

  return (
    <div className="border-b w-full bg-white flex flex-col px-5 py-3 shadow-md z-[999]">
      <div className="w-full flex justify-between items-center border-b">
        <div className="w-full flex justify-start items-center overflow-x-hidden md:overflow-visible gap-x-4">
          <Tooltip title="Go back">
            <Button onClick={handleBackNavigation} shape="circle" icon={<ArrowLeftOutlined />} />
          </Tooltip>
          <Space.Compact direction="vertical">
            <Space>
              <Input
                readOnly={!canEditTitle}
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
            <Space>
              <Typography.Text strong>Owner:</Typography.Text>
              <Tooltip title={document?.owner.email} placement="bottom">
                <Typography.Text
                  style={{
                    color: 'grey',
                  }}
                >
                  {document?.owner.fullName}
                </Typography.Text>
              </Tooltip>
            </Space>
          </Space.Compact>
        </div>
        <div className="flex items-center flex-shrink-0 pl-3 gap-x-4">
          <div className="flex gap-x-2">
            <CurrentUsers />
            <Tooltip title={fullName}>
              <Avatar
                size={32}
                src={getAvatarImageUrlByEmail(email ?? '')}
                className={
                  'w-8 h-8 text-white font-semibold flex justify-center items-center rounded-full flex-shrink-0 uppercase ring-2'
                }
              />
            </Tooltip>
          </div>
          <Space>
            {hasDeletePermissions && <DeleteDocumentModal />}
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
    </div>
  );
};

export default DocumentMenuBar;
