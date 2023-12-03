/* eslint-disable react/display-name */
import './index.css';
import type { RemirrorJSON } from 'remirror';
import { useRemirrorContext, OnChangeJSON } from '@remirror/react';
import { WysiwygEditor } from '@remirror/react-editors/wysiwyg';
import React, { forwardRef, type Ref, useImperativeHandle, type MutableRefObject, useEffect } from 'react';
import type { EditorRef } from '@src/types/interfaces/editor-ref';

const ImperativeHandle = forwardRef((_: unknown, ref: Ref<EditorRef>) => {
  const { setContent } = useRemirrorContext();

  // Expose content handling to outside
  useImperativeHandle(ref, () => ({ setContent }));

  return <></>;
});

interface Props {
  onChange: (content: RemirrorJSON) => void;
  editorRef: null | MutableRefObject<null | EditorRef>;
  editable: boolean;
}

const RichTextEditor: React.FC<Props> = ({ onChange, editorRef, editable }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      return null;
    });
  }, []);

  return (
    <WysiwygEditor placeholder="Enter text..." autoFocus editable={editable}>
      <OnChangeJSON onChange={onChange} />
      <ImperativeHandle ref={editorRef} />
    </WysiwygEditor>
  );
};

export default RichTextEditor;
