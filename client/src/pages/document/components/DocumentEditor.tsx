import { useContext } from 'react';
import { EditorContext } from '@src/context/EditorContext';
import RichTextEditor from '@src/components/RichTextEditor';

const DocumentEditor = (): JSX.Element => {
  const { handleEditorChange, editorRef } = useContext(EditorContext);

  return (
    <div className="w-[850px] h-[650px] bg-white shadow-md flex-shrink-0 cursor-text p-10 overflow-y-scroll">
      <RichTextEditor onChange={handleEditorChange} editorRef={editorRef} />
    </div>
  );
};

export default DocumentEditor;
