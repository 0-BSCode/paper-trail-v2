import { type MutableRefObject } from 'react';
import DocumentMenuBar from '../MenuBar';
import EditorToolbar from '../EditorToolbar';

interface DocumentHeaderProps {
  documentHeaderRef: MutableRefObject<null | HTMLDivElement>;
}

const DocumentHeader = ({ documentHeaderRef }: DocumentHeaderProps): JSX.Element => {
  return (
    <div ref={documentHeaderRef} className="border-b w-full bg-white flex flex-col">
      <DocumentMenuBar />
      <EditorToolbar />
    </div>
  );
};

export default DocumentHeader;
