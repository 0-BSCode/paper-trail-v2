import { useContext } from 'react';
import { EditorContext } from '@src/context/EditorContext';
import RichTextEditor from '@src/components/RichTextEditor';

const DocumentEditor = (): JSX.Element => {
  const { handleEditorChange, editorRef } = useContext(EditorContext);

  return (
    <div style={{ height: '1100px', width: '850px' }} className="bg-white shadow-md flex-shrink-0 cursor-text p-12">
      <RichTextEditor onChange={handleEditorChange} editorRef={editorRef} />
    </div>
  );
};

export default DocumentEditor;
