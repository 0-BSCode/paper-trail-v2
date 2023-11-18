import { type FormEvent, useRef, useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@src/_convex/_generated/api';
import useFileHandler from '@src/hooks/useFileHandler';
import { InboxOutlined } from '@ant-design/icons';
import { type UploadProps, message, Upload, Button, Space } from 'antd';
import type { RcFile } from 'antd/es/upload';

const { Dragger } = Upload;

interface Props {
  userId: number;
  documentId: string;
}

const FileDropZone = ({ userId, documentId }: Props): JSX.Element => {
  const saveDocumentFile = useMutation(api.files.saveDocumentFile);
  const { uploadFile } = useFileHandler();

  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<RcFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleSendFiles = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (!selectedFiles.length) return;

    setIsUploading(true);
    for (const file of selectedFiles) {
      const storageId = await uploadFile(file);
      await saveDocumentFile({
        storageId,
        userId: userId.toString(),
        documentId,
        format: file.type,
        name: file.name,
      });
    }

    setSelectedFiles([]);

    if (imageInput.current) {
      imageInput.current.value = '';
    }

    setIsUploading(false);
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    accept: 'image/*,.pdf',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      const rcFileList: RcFile[] = [];

      for (const file of e.dataTransfer.files) {
        rcFileList.push(file as RcFile);
      }

      setSelectedFiles([...selectedFiles, ...rcFileList]);
    },
    beforeUpload(file) {
      setSelectedFiles([...selectedFiles, file]);
      return false;
    },
    onRemove(file) {
      const filteredFiles = selectedFiles.filter((sFile) => sFile.uid !== file.uid);
      setSelectedFiles(filteredFiles);
    },
    disabled: isUploading,
    fileList: selectedFiles,
  };

  return (
    <Space direction="vertical">
      <Button
        type="primary"
        className="w-full"
        onClick={(e) => {
          void handleSendFiles(e);
        }}
        disabled={!selectedFiles.length}
        loading={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Upload'}
      </Button>
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint px-2">
          Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
        </p>
      </Dragger>
    </Space>
  );
};

export default FileDropZone;
