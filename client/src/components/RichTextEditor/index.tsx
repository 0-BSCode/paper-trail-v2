import type { RemirrorJSON } from 'remirror';
import { OnChangeJSON } from '@remirror/react';
import { WysiwygEditor } from '@remirror/react-editors/wysiwyg';

interface Props {
  onChange: (content: RemirrorJSON) => void;
  initialContent: RemirrorJSON;
}

const RichTextEditor: React.FC<Props> = ({ onChange, initialContent }: Props) => {
  return (
    <div>
      <WysiwygEditor placeholder="Enter text..." initialContent={initialContent}>
        <OnChangeJSON onChange={onChange} />
      </WysiwygEditor>
    </div>
  );
};

export default RichTextEditor;
