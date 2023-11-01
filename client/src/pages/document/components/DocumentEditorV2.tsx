// TODO: Migrate to Lexical (or recent RTE)
import { useContext } from 'react';
import { EditorContextV2 } from '@src/context/EditorContextV2';
import RichTextEditor from '@src/components/RichTextEditor';
import ControlledRichTextEditor from '@src/components/ControlledRichTextEditor';

const DocumentEditorV2 = (): JSX.Element => {
  const { handleEditorChange, editorState, editorRef } = useContext(EditorContextV2);

  return (
    <div
      style={{ height: '1100px', width: '850px' }}
      className="bg-white shadow-md flex-shrink-0 cursor-text p-12"
      // onClick={focusEditor}
    >
      <ControlledRichTextEditor editorRef={editorRef} handleEditorChange={handleEditorChange} />
      <RichTextEditor onChange={handleEditorChange} initialContent={editorState} />
      {/* <Editor ref={editorRef} editorState={editorState} onChange={handleEditorChange} /> */}
    </div>
  );
};

export default DocumentEditorV2;
