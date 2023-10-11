import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { EditorState } from 'draft-js';
import { useContext } from 'react';
import { EditorContext } from '../../../context/EditorContext';
import IconButton from '../../../components/IconButton';
import FontSelect from '../../../components/FontSelect';

const EditorToolbar = (): JSX.Element => {
  const { editorState, setEditorState } = useContext(EditorContext);

  const handleUndoBtnClick = (): void => {
    setEditorState(EditorState.undo(editorState));
  };

  const handleRedoBtnClick = (): void => {
    setEditorState(EditorState.redo(editorState));
  };

  return (
    <div className="w-full h-9 px-3 py-1 flex-shrink-0 flex items-center">
      <IconButton onClick={handleUndoBtnClick} icon={<ArrowLeftIcon className="h-4 w-4" />} tooltip="Undo" />
      <IconButton onClick={handleRedoBtnClick} icon={<ArrowRightIcon className="h-4 w-4" />} tooltip="Redo" />
      <div className="h-5 border-l border-l-gray-300 mx-2"></div>
      <FontSelect />
    </div>
  );
};

export default EditorToolbar;
