/* eslint-disable react/display-name */
import React, { forwardRef, type Ref, useImperativeHandle, type MutableRefObject } from 'react';
import { Remirror, useRemirror, useRemirrorContext } from '@remirror/react';
import { type RemirrorJSON } from 'remirror';
import { type EditorRef } from '@src/types/interfaces/editor-ref';

const DOC: RemirrorJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'New content',
        },
      ],
    },
  ],
};

const ImperativeHandle = forwardRef((_: unknown, ref: Ref<EditorRef>) => {
  const { setContent, chain } = useRemirrorContext({
    autoUpdate: true,
  });

  // useEffect(() => {
  //   chain.focus().run()

  // }, [])

  // Expose content handling to outside
  useImperativeHandle(ref, () => ({ setContent }));

  return <></>;
});

interface Props {
  editorRef: null | MutableRefObject<null | EditorRef>;
  handleEditorChange: (content: RemirrorJSON) => void;
}

const ControlledRichTextEditor = ({ editorRef, handleEditorChange }: Props): JSX.Element => {
  const { manager, state } = useRemirror({
    extensions: () => [],
    content: '<p>[Replace] button is placed outside the editor (see code)</p>',
    stringHandler: 'html',
  });

  return (
    <>
      {/* <ThemeProvider> */}
      <Remirror
        manager={manager}
        initialContent={state}
        autoRender="end"
        onChange={(params) => {
          const newContent: RemirrorJSON = params.state.doc.toJSON();
          handleEditorChange(newContent);
        }}
      >
        <ImperativeHandle ref={editorRef} />
      </Remirror>
      {/* </ThemeProvider> */}
    </>
  );
};

export default ControlledRichTextEditor;
