import useWindowSize from '@src/hooks/useWindowSize';
import TextField from '@src/components/TextField';
import { type KeyboardEvent, useContext, useState } from 'react';
import { ToastContext } from '@src/context/ToastContext';
import validator from 'validator';
import Spinner from '@src/components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '@src/hooks/useAuth';
import AuthService from '@src/services/auth-service';
import axios, { type AxiosError } from 'axios';

const LoginPage = (): JSX.Element => {
  const { widthStr, heightStr } = useWindowSize();
  const [email, setEmail] = useState('');
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { success, error } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    setEmailErrors([]);
    setPasswordErrors([]);
    let isValid = true;

    if (!validator.isEmail(email)) {
      setEmailErrors(['Must enter a valid email.']);
      isValid = false;
    }
    if (!password.length) {
      setPasswordErrors(['Must enter a password.']);
      isValid = false;
    }

    return isValid;
  };

  const loginUser = async (): Promise<void> => {
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await AuthService.login({ email, password });
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
      login(newAccessToken, newRefreshToken);
      success('Successfully logged in!');
      navigate('/home');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { response } = err as AxiosError;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errors = (response as any).data.errors;
        if (errors.length > 0) {
          error(errors[0].msg);
        } else {
          error('Incorrect username or password.');
        }
      } else {
        error('An unknown error has occured. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOnKeyPress = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') void loginUser();
  };

  const handleOnInputEmail = (value: string): void => {
    setEmailErrors([]);
    setEmail(value);
  };

  const handleOnInputPassword = (value: string): void => {
    setPasswordErrors([]);
    setPassword(value);
  };

  return (
    <div
      onKeyPress={handleOnKeyPress}
      className="w-full flex flex-col sm:justify-center items-center p-6 sm:pb-96 bg-gray-100 dark:bg-slate-900 text-primary"
      style={{ width: widthStr, height: heightStr }}
    >
      <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded border-primary shadow-md border dark:border-0 dark:shadow-xl p-6">
        <div className="flex flex-col space-y-4">
          <div className="w-full text-center flex flex-col justify-center items-center">
            <svg width="61" height="85" viewBox="0 0 249 282" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M139.172 204.927V281.043H248.199L196.833 0H139.172V70.2607H109.897V0H52.084L0.354492 281.043H109.897V204.927H139.172ZM109.897 99.536H139.172V181.507H109.897V99.536Z"
                fill="black"
              />
            </svg>
            <h1>Paper Trail</h1>
            <h3 className="font-medium">Login</h3>
          </div>
          <TextField
            value={email}
            placeholder="Email"
            onInput={handleOnInputEmail}
            color="secondary"
            errors={emailErrors}
          />
          <Link tabIndex={-1} to="/register" className="text-sm hover:underline font-semibold text-blue-500 text-left">
            Need an account?
          </Link>
          <TextField
            placeholder="Password"
            value={password}
            onInput={handleOnInputPassword}
            type="password"
            color="secondary"
            errors={passwordErrors}
          />
          <button tabIndex={-1} className="text-sm hover:underline font-semibold text-blue-500 text-left">
            Forgot Password?
          </button>
          <button
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={loginUser}
            disabled={loading}
            className="bg-blue-600 text-white text-sm font-semibold px-3 py-2 rounded hover:bg-blue-500 flex justify-center items-center space-x-1 active:ring-1"
          >
            <span className={`${loading && 'opacity-0'}`}>Login</span>
            {loading && <Spinner size="sm" />}
          </button>
        </div>
      </div>
      <div className="flex justify-center space-x-4 text-sm p-4">
        <button className="hover:underline font-semibold text-blue-500">Terms</button>
        <button className="hover:underline font-semibold text-blue-500">Privacy Policy</button>
      </div>
    </div>
  );
};

export default LoginPage;
