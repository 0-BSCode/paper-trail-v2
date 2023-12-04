import { AuthContext } from '@src/context/AuthContext';
import { DocumentContext } from '@src/context/DocumentContext';
import { ToastContext } from '@src/context/ToastContext';
import DocumentService from '@src/services/document-service';
import UserService from '@src/services/user-service';
import RoleEnum from '@src/types/enums/role-enum';
import SocketEvent from '@src/types/enums/socket-events';
import StatusEnum from '@src/types/enums/status-enum';
import type DocumentInterface from '@src/types/interfaces/document';
import type UserInterface from '@src/types/interfaces/user';
import { Typography, Select, Button } from 'antd';
import { useContext, useEffect, useState } from 'react';

// Filter `option.label` match the user type `input`
const filterOption = (input: string, option?: { label: string; value: string }): boolean =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const DocumentAssignee = ({ documentId }: { documentId: string }): JSX.Element => {
  const { accessToken, userId, roles } = useContext(AuthContext);
  const { document, setDocument, loading, socket } = useContext(DocumentContext);
  const { success } = useContext(ToastContext);
  const [assigneeId, setAssigneeId] = useState<number | null>(null);
  const [assigneeList, setAssigneeList] = useState<UserInterface[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const hasEditPermission =
    document?.userId !== userId &&
    roles?.some((r) => r === RoleEnum.CISCO_MEMBER || r === RoleEnum.CISCO_ADMIN) &&
    document?.status !== StatusEnum.DRAFT &&
    document?.status !== StatusEnum.RESOLVED;

  const disableButton = !hasEditPermission || isSaving || assigneeId === document?.assigneeId;
  const onChange = (id: string | undefined): void => {
    setAssigneeId(id ? parseInt(id) : null);
  };

  const saveAssignee = (): void => {
    // TODO: Consolidate API calls that require accessToken under one check
    // so we don't need to keep checking this
    if (document === null || accessToken === null) return;

    setIsSaving(true);
    socket.current.emit(SocketEvent.SEND_ASSIGNEE, assigneeId);
    const updatedDocument: DocumentInterface = { ...document, assigneeId };
    if (assigneeId) {
      updatedDocument.status = StatusEnum.REVIEW;
    } else {
      updatedDocument.status = StatusEnum.REVIEW_REQUESTED;
    }
    void DocumentService.setAssignee(accessToken, parseInt(documentId), assigneeId)
      .then(() => {
        const newAssignee = assigneeList.find((a) => a.id === assigneeId);
        success(`Successfully set assignee to ${newAssignee ? newAssignee.email : 'None'}`);
        setDocument(updatedDocument);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  useEffect(() => {
    if (socket.current === null || document === null) return;

    const handler = (newAssigneeId: number | null): void => {
      const status = newAssigneeId ? StatusEnum.REVIEW : StatusEnum.REVIEW_REQUESTED;
      setDocument({ ...document, assigneeId: newAssigneeId, status });
    };

    socket.current.on(SocketEvent.RECEIVE_ASSIGNEE, handler);

    return () => {
      socket.current.off(SocketEvent.RECEIVE_ASSIGNEE, handler);
    };
  });

  useEffect(() => {
    if (accessToken === null) return;

    if (!loading && document) {
      void UserService.fetchByRole(accessToken, [RoleEnum.CISCO_MEMBER, RoleEnum.CISCO_ADMIN]).then((res) => {
        const assigneeOptions = res.data as UserInterface[];
        setAssigneeList(assigneeOptions.filter((opt) => opt.id !== document.userId));
      });
    }
  }, [loading, document]);

  useEffect(() => {
    if (document) {
      setAssigneeId(document.assigneeId);
    }
  }, [document]);

  return (
    <div className="flex flex-col p-3 bg-white border-r-4 shadow-md gap-y-3">
      <Typography.Title
        level={5}
        style={{
          margin: 0,
        }}
      >
        Assignee
      </Typography.Title>
      <Select
        disabled={!hasEditPermission}
        showSearch
        allowClear
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={filterOption}
        value={assigneeList.find((assignee) => assignee.id === assigneeId)?.email ?? ''}
        options={assigneeList.map((assignee) => {
          return { value: assignee.id.toString(), label: assignee.email };
        })}
      />
      <Button disabled={disableButton} onClick={saveAssignee}>
        Save Assignee
      </Button>
    </div>
  );
};

export default DocumentAssignee;
