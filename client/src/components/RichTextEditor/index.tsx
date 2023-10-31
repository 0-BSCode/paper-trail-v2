import type { RemirrorJSON } from 'remirror';
import { OnChangeJSON } from '@remirror/react';
import { WysiwygEditor } from '@remirror/react-editors/wysiwyg';

const remirrorJsonFromStorage = {
  type: 'doc',
  content: [
    { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Hello world' }] },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'Hello ' },
        { type: 'text', marks: [{ type: 'italic' }], text: 'word' },
      ],
    },
  ],
};

interface Props {
  onChange: (content: RemirrorJSON) => void;
  initialContent: RemirrorJSON;
}

const RichTextEditor: React.FC<Props> = ({ onChange, initialContent }: Props) => {
  // const {state, setState} = useRemirror()

  return (
    <div>
      <WysiwygEditor placeholder="Enter text..." initialContent={initialContent}>
        <OnChangeJSON onChange={onChange} />
      </WysiwygEditor>
    </div>
  );
};

export default RichTextEditor;
