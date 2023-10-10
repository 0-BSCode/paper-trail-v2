import { useContext, useEffect, useRef } from 'react';
import useWindowSize from '@src/hooks/useWindowSize';
import { useParams } from 'react-router-dom';
import useDocument from '@src/hooks/useDocument';
import DocumentEditor from './components/DocumentEditor';
import DocumentHeader from './components/DocumentHeader';
import { DocumentContext } from '@src/context/DocumentContext';

const DocumentPage = (): JSX.Element => {
  const { id: documentId } = useParams();
  const { heightStr, widthStr } = useWindowSize();
  const documentHeaderRef = useRef<null | HTMLDivElement>(null);
  const documentViewerHeight = `calc(${heightStr} - ${documentHeaderRef.current?.clientHeight}px)`;
  const { setDocument } = useContext(DocumentContext);
  const { document, loading } = useDocument(parseInt(documentId as string));

  useEffect(() => {
    if (document !== null) setDocument(document);
  }, [document]);

  return (
    <div style={{ height: heightStr }} className="w-full h-full bg-gray-100 flex flex-col">
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          <DocumentHeader documentHeaderRef={documentHeaderRef} />
          <div
            style={{
              height: documentViewerHeight,
            }}
            className="w-full flex flex-col justify-start items-center overflow-hidden"
          >
            <div
              style={{ width: widthStr }}
              className="h-full w-full overflow-auto space-y-4 flex flex-col items-center p-4"
            >
              <DocumentEditor />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DocumentPage;
