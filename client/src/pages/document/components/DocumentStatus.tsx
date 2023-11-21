import { AuthContext } from '@src/context/AuthContext';
import { ToastContext } from '@src/context/ToastContext';
import DocumentService from '@src/services/document-service';
import StatusEnum from '@src/types/enums/status-enum';
import { Typography, Button, Select } from 'antd';
import React, { useContext, useEffect, useState } from 'react';

// Filter `option.label` match the user type `input`
const filterOption = (input: string, option?: { label: string; value: string }): boolean =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const statusToOptionMapping = {
  [StatusEnum.CHANGES_REQUESTED]: 'Changes Requested',
  [StatusEnum.DRAFT]: 'Draft',
  [StatusEnum.RAISED]: 'Raised',
  [StatusEnum.RESOLVED]: 'Resolved',
  [StatusEnum.REVIEW]: 'Review',
  [StatusEnum.REVIEW_REQUESTED]: 'Review Requested',
};

const DocumentStatus = ({ documentId }: { documentId: string }): JSX.Element => {
  const { accessToken } = useContext(AuthContext);
  const { success } = useContext(ToastContext);
  const [status, setStatus] = useState<StatusEnum>(StatusEnum.DRAFT);
  const [isSaving, setIsSaving] = useState(false);

  const onChange = (newStatus: StatusEnum): void => {
    setStatus(newStatus);
  };

  const saveStatus = (): void => {
    // TODO: Consolidate API calls that require accessToken under one check
    // so we don't need to keep checking this
    if (accessToken === null) return;

    setIsSaving(true);
    void DocumentService.setStatus(accessToken, parseInt(documentId), status)
      .then(() => {
        success('Successfully saved status!');
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

    void DocumentService.getStatus(accessToken, parseInt(documentId)).then((res) => {
      const statusData = res.data as StatusEnum;
      setStatus(statusData);
    });
  }, []);

  return (
    <div className="flex flex-col border-r-4 gap-y-3 bg-white shadow-md p-3">
      <Typography.Title
        level={5}
        style={{
          margin: 0,
        }}
      >
        Status
      </Typography.Title>
      <Select
        showSearch
        placeholder="Select a status"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={filterOption}
        value={status}
        options={Object.keys(StatusEnum).map((s) => {
          return { value: s, label: statusToOptionMapping[s as keyof typeof StatusEnum] };
        })}
      />
      <Button disabled={isSaving} onClick={saveStatus}>
        Save Status
      </Button>
    </div>
  );
};

export default DocumentStatus;
