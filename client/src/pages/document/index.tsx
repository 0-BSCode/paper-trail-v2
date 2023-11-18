import { useContext, useEffect, useRef } from 'react';
import useWindowSize from '@src/hooks/useWindowSize';
import { useParams } from 'react-router-dom';
import useDocument from '@src/hooks/useDocument';
import DocumentHeader from './components/DocumentHeader';
import { DocumentContext } from '@src/context/DocumentContext';
import DocumentEditor from './components/DocumentEditor';
import { AuthContext } from '@src/context/AuthContext';
import DocumentFiles from './components/DocumentFiles';
import Spinner from '@src/components/Spinner';
import FileDropZone from '@src/components/FileDropZone';

const DocumentPage = (): JSX.Element => {
  const { id: documentId } = useParams();
  const { userId, loading: authLoading } = useContext(AuthContext);
  const { heightStr, widthStr } = useWindowSize();
  const documentHeaderRef = useRef<null | HTMLDivElement>(null);
  const documentViewerHeight = `calc(${heightStr} - ${documentHeaderRef.current?.clientHeight}px)`;
  const { setDocument } = useContext(DocumentContext);
  const { document, loading: documentLoading } = useDocument(parseInt(documentId as string));

  useEffect(() => {
    if (document !== null) setDocument(document);
  }, [document]);

  if (documentLoading || authLoading) {
    return <Spinner size="lg" />;
  }

  return (
    <div style={{ height: heightStr }} className="flex flex-col w-full h-full bg-gray-100">
      <DocumentHeader documentHeaderRef={documentHeaderRef} />
      <div
        style={{
          height: documentViewerHeight,
        }}
        className="flex flex-col items-center justify-start w-full overflow-hidden"
      >
        <div style={{ width: widthStr }} className="flex items-start w-full h-full p-4 space-y-4 overflow-auto">
          <DocumentEditor />
          <div className="flex flex-col">
            {userId && documentId && (
              <div className="ml-5">
                <FileDropZone userId={userId} documentId={documentId} />
                <DocumentFiles documentId={documentId} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPage;
