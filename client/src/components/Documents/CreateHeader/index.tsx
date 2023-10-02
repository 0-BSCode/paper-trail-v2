import DocumentSearchbar from '../SearchBar';
import Logo from '../../Logo';
import UserDropdown from '../../UserDropdown';

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
