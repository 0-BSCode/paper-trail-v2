import DocumentCreateHeader from './components/DocumentCreateHeader';
import useWindowSize from '@src/hooks/useWindowSize';
import Spinner from '@src/components/Spinner';
import useDocuments from '@src/hooks/useDocuments';
import useAuth from '@src/hooks/useAuth';
import DocumentsList from './components/DocumentsList';
import CreateDocumentButton from './components/DocumentCreateButton';

const DashboardPage = (): JSX.Element => {
  const { heightStr } = useWindowSize();
  const { userId } = useAuth();
  const { documents, loading, setDocuments } = useDocuments();

  const recentDocuments = documents === null ? [] : documents.filter((document) => document.userId === userId);
  const sharedDocuments = documents === null ? [] : documents.filter((document) => document.userId !== userId);

  return (
    <div style={{ height: heightStr }}>
      <DocumentCreateHeader />
      <CreateDocumentButton />
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <>
          <DocumentsList title="Recent Documents" documents={recentDocuments} setDocuments={setDocuments} />
          <DocumentsList title="Shared Documents" documents={sharedDocuments} setDocuments={setDocuments} />
        </>
      )}
    </div>
  );
};

export default DashboardPage;
