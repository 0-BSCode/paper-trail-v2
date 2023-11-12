import { useQuery } from 'convex/react';
import { api } from '@src/_convex/_generated/api';
import useFileHandler from '@src/hooks/useFileHandler';

const DocumentFiles = ({ documentId }: { documentId: string }): JSX.Element => {
  const files = useQuery(api.files.getFilesByDocumentId, { documentId });
  const { redirectToFile, deleteFile } = useFileHandler();

  if (!files?.length) {
    return <p>No files...</p>;
  }

  return (
    <>
      {files.map((file, idx) => (
        <div key={`file__${idx}`} className="flex gap-2">
          <button
            onClick={() => {
              redirectToFile(file.url ?? '');
            }}
          >
            Download
          </button>
          <p>{file.name}</p>
          <button
            onClick={() => {
              deleteFile(file._id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default DocumentFiles;
