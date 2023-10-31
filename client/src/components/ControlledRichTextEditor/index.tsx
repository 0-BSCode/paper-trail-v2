import 'remirror/styles/all.css';

import React from 'react';
import { Remirror } from '@remirror/react';
import type { EditorState, Extension, RemirrorEventListenerProps, RemirrorManager } from 'remirror';

const remirrorJsonFromStorage = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      attrs: { dir: null, ignoreBidiAutoUpdate: null },
      content: [{ type: 'text', text: 'test' }],
    },
  ],
};

interface Props {
  manager: RemirrorManager<Extension>;
  state: Readonly<EditorState>;
  setState: (state: Readonly<EditorState>) => void;
  handleEditorChange: (params: RemirrorEventListenerProps<Extension>) => void;
}

const ControlledRichTextEditor: React.FC<Props> = ({ manager, state, setState, handleEditorChange }: Props) => {
  return (
    <div className="remirror-theme">
      {/* the className is used to define css variables necessary for the editor */}
      <Remirror manager={manager} initialContent={state} state={state} onChange={handleEditorChange} />
    </div>
  );
};

export default ControlledRichTextEditor;
