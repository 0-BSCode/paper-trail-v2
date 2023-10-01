// import DocumentCreateHeader from '../../components/organisms/document-create-header';
import useWindowSize from '../../../hooks/useWindowSize';
// import useDocuments from '../../hooks/use-documents';
import useAuth from '../../../hooks/useAuth';
// import DocumentsList from '../../components/molecules/documents-list';
// import CreateDocumentButton from '../../components/atoms/create-document-button';

const DocumentCreatePage = (): JSX.Element => {
  const { heightStr } = useWindowSize();
  const { userId, email } = useAuth();
  //   const { documents, loading, setDocuments } = useDocuments();

  //   const recentDocuments =
  //     documents === null
  //       ? []
  //       : documents.filter((document) => document.userId === userId);
  //   const sharedDocuments =
  //     documents === null
  //       ? []
  //       : documents.filter((document) => document.userId !== userId);

  return (
    <div style={{ height: heightStr }}>
      Hello, {email}
      {/* <DocumentCreateHeader />
      <CreateDocumentButton />
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <>
          <DocumentsList
            title="Recent Documents"
            documents={recentDocuments}
            setDocuments={setDocuments}
          />
          <DocumentsList
            title="Shared Documents"
            documents={sharedDocuments}
            setDocuments={setDocuments}
          />
        </>
      )} */}
    </div>
  );
};

export default DocumentCreatePage;
