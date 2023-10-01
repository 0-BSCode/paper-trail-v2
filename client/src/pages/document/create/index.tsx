import useWindowSize from '../../../hooks/useWindowSize';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const DocumentCreatePage = (): JSX.Element => {
  const { heightStr } = useWindowSize();
  const { userId, email, logout } = useAuth();
  const navigate = useNavigate();
  const logoutUser = async (): Promise<void> => {
    await logout();
    // success('Successfully logged out!');
    navigate('/login');
  };

  return (
    <div style={{ height: heightStr }}>
      Hello, {email}
      <button
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={logoutUser}
        className="w-full text-black hover:bg-gray-100 text-sm px-6 py-1 text-left"
      >
        Logout
      </button>
    </div>
  );
};

export default DocumentCreatePage;
