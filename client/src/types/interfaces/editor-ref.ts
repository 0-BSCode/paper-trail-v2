import type { RemirrorContentType } from 'remirror';

export interface EditorRef {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setContent: (content: RemirrorContentType) => void;
}
