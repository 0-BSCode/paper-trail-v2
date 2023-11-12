import { type FormEvent, useRef, useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@src/_convex/_generated/api';
import useFileHandler from '@src/hooks/useFileHandler';

interface Props {
  userId: number;
  documentId: string;
}

const FileDropZone = ({ userId, documentId }: Props): JSX.Element => {
  const saveDocumentFile = useMutation(api.files.saveDocumentFile);
  const { uploadFile } = useFileHandler();

  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSendImage = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (!selectedFile) return;

    const storageId = await uploadFile(selectedFile);
    await saveDocumentFile({
      storageId,
      userId: userId.toString(),
      documentId,
      format: selectedFile.type,
      name: selectedFile.name,
    });

    setSelectedFile(null);

    if (imageInput.current) {
      imageInput.current.value = '';
    }
  };
  return (
    <form
      onSubmit={(e) => {
        void handleSendImage(e);
      }}
    >
      <input
        type="file"
        accept="image/*,.pdf"
        ref={imageInput}
        onChange={(event) => {
          setSelectedFile(event.target.files ? event.target.files[0] : null);
        }}
        disabled={selectedFile !== null}
      />
      <input type="submit" value="Upload File" disabled={selectedFile === null} />
    </form>
  );
};

export default FileDropZone;
