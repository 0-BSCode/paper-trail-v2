import DocumentCreateHeader from '../../../components/Documents/CreateHeader';
import useWindowSize from '../../../hooks/useWindowSize';
import Spinner from '../../../components/Spinner';
import useDocuments from '../../../hooks/useDocuments';
import useAuth from '../../../hooks/useAuth';
import DocumentsList from '../../../components/Documents/List';
import CreateDocumentButton from '../../../components/Documents/CreateButton';

const DocumentCreatePage = (): JSX.Element => {
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

export default DocumentCreatePage;
