import { useQuery } from 'convex/react';
import { api } from '@src/_convex/_generated/api';
import useFileHandler from '@src/hooks/useFileHandler';

const DocumentFiles = ({ documentId }: { documentId: string }): JSX.Element => {
  const files = useQuery(api.files.getFilesByDocumentId, { documentId });
  const { redirectToFile } = useFileHandler();

  if (!files?.length) {
    return <p>No files...</p>;
  }

  return (
    <>
      {files.map((file, idx) => (
        <div key={`file__${idx}`}>
          <button
            onClick={() => {
              redirectToFile(file.url ?? '');
            }}
          >
            Download
          </button>
          <p>{file.name}</p>
        </div>
      ))}
    </>
  );
};

export default DocumentFiles;
