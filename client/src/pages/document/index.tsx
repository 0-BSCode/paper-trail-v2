import { useContext, useEffect } from 'react';
import useWindowSize from '@src/hooks/useWindowSize';
import { useParams } from 'react-router-dom';
import useDocument from '@src/hooks/useDocument';
import { DocumentContext } from '@src/context/DocumentContext';
import DocumentEditor from './components/DocumentEditor';
import FileDropZone from '@src/components/FileDropZone';
import { AuthContext } from '@src/context/AuthContext';
import Spinner from '@src/components/Spinner';
import DocumentFiles from './components/DocumentFiles';
import { Space, Typography } from 'antd';
import DocumentComments from './components/DocumentComments';
import DocumentAssignee from './components/DocumentAssignee';
import DocumentStatus from './components/DocumentStatus';
import PermissionEnum from '@src/types/enums/permission-enum';
import StatusEnum from '@src/types/enums/status-enum';
import DocumentMenuBar from './components/DocumentMenuBar';

const DocumentPage = (): JSX.Element => {
  const { id: documentId } = useParams();
  const { userId, loading: authLoading } = useContext(AuthContext);
  const { widthStr } = useWindowSize();
  const { document: docInfo, setDocument } = useContext(DocumentContext);
  const { document, loading: documentLoading } = useDocument(parseInt(documentId as string));
  const documentUser = document?.users.find((user) => user.userId === userId);

  const hasEditPermission =
    (userId === docInfo?.userId || documentUser?.permission === PermissionEnum.EDIT) &&
    docInfo?.status !== StatusEnum.RESOLVED &&
    docInfo?.status !== StatusEnum.RAISED;

  // Sets document context based on fetched document
  useEffect(() => {
    if (document !== null) setDocument(document);
  }, [document]);

  if (documentLoading || authLoading) {
    return <Spinner size="lg" />;
  }

  if (!documentId) {
    return <Typography.Text>Document not found</Typography.Text>;
  }

  return (
    <div className="w-full h-full bg-gray-100 flex flex-col">
      <DocumentMenuBar />
      <div className="w-full flex flex-col justify-start items-center overflow-hidden">
        <div
          style={{ width: widthStr }}
          className="h-full w-full overflow-auto flex items-start justify-center gap-x-8 py-8"
        >
          <div className="flex flex-col gap-y-8">
            <DocumentEditor />
            {userId && (
              <Space.Compact className="bg-white px-10 py-5 w-[850px] h-fit shadow-md">
                <FileDropZone userId={userId} documentId={documentId} canUpload={hasEditPermission} />
                <DocumentFiles documentId={documentId} canDelete={hasEditPermission} />
              </Space.Compact>
            )}
          </div>
          <div className="flex flex-col">
            <Space direction="vertical" className="h-fit gap-6 w-[410px]">
              <DocumentStatus documentId={documentId} />
              <DocumentAssignee documentId={documentId} />
              <DocumentComments />
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPage;
