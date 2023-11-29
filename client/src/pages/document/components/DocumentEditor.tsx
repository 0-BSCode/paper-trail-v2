import { useContext } from 'react';
import { EditorContext } from '@src/context/EditorContext';
import RichTextEditor from '@src/components/RichTextEditor';
import { DocumentContext } from '@src/context/DocumentContext';
import { AuthContext } from '@src/context/AuthContext';
import PermissionEnum from '@src/types/enums/permission-enum';
import StatusEnum from '@src/types/enums/status-enum';

const DocumentEditor = (): JSX.Element => {
  const { handleEditorChange, editorRef } = useContext(EditorContext);
  const { document } = useContext(DocumentContext);
  const { userId } = useContext(AuthContext);
  const documentUser = document?.users.find((user) => user.userId === userId);

  const hasEditPermission =
    (userId === document?.userId || documentUser?.permission === PermissionEnum.EDIT) &&
    document?.status !== StatusEnum.RESOLVED;

  return (
    <div className="w-[850px] h-[650px] bg-white shadow-md flex-shrink-0 cursor-text p-10 overflow-y-scroll">
      <RichTextEditor onChange={handleEditorChange} editorRef={editorRef} editable={hasEditPermission} />
    </div>
  );
};

export default DocumentEditor;
