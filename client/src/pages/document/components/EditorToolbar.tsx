// TODO: Remove this or try to find a way to implement with Remirror
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import IconButton from '@src/components/IconButton';

const EditorToolbar = (): JSX.Element => {
  const handleUndoBtnClick = (): void => {};

  const handleRedoBtnClick = (): void => {};

  return (
    <div className="w-full h-9 px-3 py-1 flex-shrink-0 flex items-center">
      <IconButton onClick={handleUndoBtnClick} icon={<ArrowLeftIcon className="h-4 w-4" />} tooltip="Undo" />
      <IconButton onClick={handleRedoBtnClick} icon={<ArrowRightIcon className="h-4 w-4" />} tooltip="Redo" />
      <div className="h-5 border-l border-l-gray-300 mx-2"></div>
    </div>
  );
};

export default EditorToolbar;
