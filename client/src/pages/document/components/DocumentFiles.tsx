import { useQuery } from 'convex/react';
import { api } from '@src/_convex/_generated/api';
import useFileHandler from '@src/hooks/useFileHandler';
import { Button, Space, Typography } from 'antd';
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons';

const DocumentFiles = ({ documentId, canDelete }: { documentId: string; canDelete: boolean }): JSX.Element => {
  const files = useQuery(api.files.getFilesByDocumentId, { documentId });
  const { redirectToFile, deleteFile } = useFileHandler();

  return (
    <Space direction="vertical" className="px-5">
      <Typography.Title level={4} className="mt-0">
        Attached Files
      </Typography.Title>
      {files && (
        <>
          {!files.length ? (
            <Typography.Paragraph type="secondary" className="w-full">
              No files...
            </Typography.Paragraph>
          ) : (
            <>
              {files.map((file, idx) => (
                <Space key={`file__${idx}`} className="gap-2">
                  <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    size="small"
                    onClick={() => {
                      redirectToFile(file.url ?? '');
                    }}
                    style={{
                      borderRadius: '2px',
                    }}
                  >
                    {file.name}
                  </Button>
                  <Button
                    type="dashed"
                    danger
                    disabled={!canDelete}
                    icon={<DeleteOutlined />}
                    size="small"
                    onClick={() => {
                      deleteFile(file._id);
                    }}
                  />
                </Space>
              ))}
            </>
          )}
        </>
      )}
    </Space>
  );
};

export default DocumentFiles;
