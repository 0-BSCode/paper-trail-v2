import { AuthContext } from '@src/context/AuthContext';
import { DocumentContext } from '@src/context/DocumentContext';
import { ToastContext } from '@src/context/ToastContext';
import DocumentService from '@src/services/document-service';
import UserService from '@src/services/user-service';
import RoleEnum from '@src/types/enums/role-enum';
import StatusEnum from '@src/types/enums/status-enum';
import type UserInterface from '@src/types/interfaces/user';
import { Typography, Select, Button } from 'antd';
import React, { useContext, useEffect, useState } from 'react';

// Filter `option.label` match the user type `input`
const filterOption = (input: string, option?: { label: string; value: string }): boolean =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const DocumentAssignee = ({ documentId }: { documentId: string }): JSX.Element => {
  const { accessToken, userId, roles } = useContext(AuthContext);
  const { document, setDocument } = useContext(DocumentContext);
  const { success } = useContext(ToastContext);
  const [assigneeId, setAssigneeId] = useState<number | null>(null);
  const [assigneeList, setAssigneeList] = useState<UserInterface[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const hasEditPermissions =
    document?.userId !== userId && roles?.every((r) => r !== RoleEnum.STUDENT) && document?.status !== StatusEnum.DRAFT;

  const onChange = (id: string | undefined): void => {
    setAssigneeId(id ? parseInt(id) : null);
  };

  const saveAssignee = (): void => {
    // TODO: Consolidate API calls that require accessToken under one check
    // so we don't need to keep checking this
    if (document === null || accessToken === null) return;

    setIsSaving(true);
    void DocumentService.setAssignee(accessToken, parseInt(documentId), assigneeId)
      .then(() => {
        success('Successfully saved assignee!');
        setDocument({ ...document, assigneeId });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  useEffect(() => {
    if (accessToken === null) return;

    void UserService.fetchByRole(accessToken, [RoleEnum.CISCO_MEMBER, RoleEnum.CISCO_ADMIN]).then((res) => {
      const assigneeOptions = res.data as UserInterface[];
      setAssigneeList(assigneeOptions);
    });
  }, []);

  useEffect(() => {
    if (document) {
      setAssigneeId(document.assigneeId);
    }
  }, [document]);

  return (
    <div className="flex flex-col border-r-4 gap-y-3 bg-white shadow-md p-3">
      <Typography.Title
        level={5}
        style={{
          margin: 0,
        }}
      >
        Assignee
      </Typography.Title>
      <Select
        disabled={!hasEditPermissions}
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
      <Button disabled={!hasEditPermissions || isSaving} onClick={saveAssignee}>
        Save Assignee
      </Button>
    </div>
  );
};

export default DocumentAssignee;
