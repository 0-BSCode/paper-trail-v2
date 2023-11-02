import { useContext } from 'react';
import { EditorContextV2 } from '@src/context/EditorContextV2';
import RichTextEditor from '@src/components/RichTextEditor';

const DocumentEditorV2 = (): JSX.Element => {
  const { handleEditorChange, editorRef } = useContext(EditorContextV2);

  return (
    <div style={{ height: '1100px', width: '850px' }} className="bg-white shadow-md flex-shrink-0 cursor-text p-12">
      <RichTextEditor onChange={handleEditorChange} editorRef={editorRef} />
    </div>
  );
};

export default DocumentEditorV2;
