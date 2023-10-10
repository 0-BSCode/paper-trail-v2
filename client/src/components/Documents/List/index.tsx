import { type Dispatch, type SetStateAction } from 'react';
import type DocumentInterface from '../../../types/interfaces/document';
import DocumentCard from '../Card';

interface DocumentsListProps {
  title: string;
  documents: DocumentInterface[];
  setDocuments: Dispatch<SetStateAction<DocumentInterface[]>>;
}

const DocumentsList = ({ title, documents, setDocuments }: DocumentsListProps): JSX.Element => {
  return (
    <div className="w-full flex justify-center items-center font-medium text-gray-700 p-4">
      <div className="w-full max-w-4xl space-y-4">
        <h2>{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4">
          {documents
            .sort((a, b) => {
              return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            })
            .map((document) => {
              return <DocumentCard key={document.id} document={document} setDocuments={setDocuments} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default DocumentsList;
