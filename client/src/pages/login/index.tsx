import useWindowSize from '@src/hooks/useWindowSize';
import { type KeyboardEvent, useContext, useState } from 'react';
import { ToastContext } from '@src/context/ToastContext';
import validator from 'validator';
import Spinner from '@src/components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '@src/hooks/useAuth';
import AuthService from '@src/services/auth-service';
import axios, { type AxiosError } from 'axios';
import { Input, Button } from 'antd';

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
    } else if (password.length < 8) {
      setPasswordErrors(['Password must be at least 8 characters.']);
      isValid = false;
    }

    return isValid;
  };

  const loginUser = async (): Promise<void> => {
    if (!validate()) return;

    setLoading(true);
    try {
      // TODO: JWT pair generated here are overriden automatically
      // due to redirecting to a protected route
      const response = await AuthService.login({ email, password });
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
      // Don't trigger silent refresh since it's done in protected route already
      login(newAccessToken, newRefreshToken, false);
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
        error('An unknown error has occurred. Please try again.');
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
      className="flex flex-col items-center w-full font-sans bg-gray-100 sm:justify-center dark:bg-slate-900 text-primary"
      style={{
        width: widthStr,
        height: heightStr,
        backgroundImage: `url('src/assets/login-background.png')`,
        backgroundSize: 'cover',
      }}
    >
      <div>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col items-center justify-center w-full text-center">
            <svg width="61" height="85" viewBox="0 0 249 282" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M139.172 204.927V281.043H248.199L196.833 0H139.172V70.2607H109.897V0H52.084L0.354492 281.043H109.897V204.927H139.172ZM109.897 99.536H139.172V181.507H109.897V99.536Z"
                fill="black"
              />
            </svg>
            <h1 className="text-6xl">Paper Trail</h1>
          </div>
          <div className="flex flex-col w-full gap-4">
            <div>
              <Input
                id="email"
                style={{ fontFamily: 'roboto' }}
                className="p-2"
                placeholder="Email"
                color="secondary"
                onChange={(e) => {
                  handleOnInputEmail(e.target.value);
                }}
              />
              {emailErrors.length > 0 && <div className="text-sm text-red-500">{emailErrors.join(', ')}</div>}
            </div>
            <div>
              <Input.Password
                id="password"
                className="p-2"
                placeholder="Password"
                type="password"
                color="secondary"
                style={{ fontFamily: 'roboto' }}
                onChange={(e) => {
                  handleOnInputPassword(e.target.value);
                }}
              />
              {passwordErrors.length > 0 && <div className="text-sm text-[#ff4d4f]">{passwordErrors.join(', ')}</div>}
            </div>
            <Button
              style={{ borderRadius: '6px', fontFamily: 'roboto' }}
              size="large"
              type="primary"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={loginUser}
              disabled={loading}
            >
              <span className={`${loading && 'opacity-0'}`}>Log In</span>
              {loading && <Spinner size="sm" />}
            </Button>
            <div className="items-center text-center">
              <span>or </span>
              <Link to="/register" className="text-blue-500 no-underline hover:underline">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
