import DocumentSearchbar from './DocumentSearchBar';
import Logo from '@src/components/Logo';
import UserDropdown from '@src/components/UserDropdown';

const DocumentCreateHeader = (): JSX.Element => {
  return (
    <div className="w-full px-3 py-1 flex justify-between items-center">
      <Logo />
      <DocumentSearchbar />
      <UserDropdown />
    </div>
  );
};

export default DocumentCreateHeader;
