import { type MutableRefObject } from 'react';
import DocumentMenuBar from './DocumentMenuBar';

interface DocumentHeaderProps {
  documentHeaderRef: MutableRefObject<null | HTMLDivElement>;
}

// TODO (Bryan): Clean up since it only uses one component
const DocumentHeader = ({ documentHeaderRef }: DocumentHeaderProps): JSX.Element => {
  return (
    <div ref={documentHeaderRef} className="border-b w-full bg-white flex flex-col px-5 py-3">
      <DocumentMenuBar />
    </div>
  );
};

export default DocumentHeader;
