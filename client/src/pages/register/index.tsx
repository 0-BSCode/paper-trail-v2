/* eslint-disable @typescript-eslint/no-explicit-any */
import useWindowSize from '@src/hooks/useWindowSize';
import TextField from '@src/components/TextField';
import { type KeyboardEvent, useContext, useState } from 'react';
import { ToastContext } from '@src/context/ToastContext';
import validator from 'validator';
import Spinner from '@src/components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import axios, { type AxiosError } from 'axios';
import AuthService from '@src/services/auth-service';

const RegisterPage = (): JSX.Element => {
  const { widthStr, heightStr } = useWindowSize();
  const [email, setEmail] = useState('');
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [password1, setPassword1] = useState('');
  const [password1Errors, setPassword1Errors] = useState<string[]>([]);
  const [password2, setPassword2] = useState('');
  const [password2Errors, setPassword2Errors] = useState<string[]>([]);
  const navigate = useNavigate();
  const { addToast, error } = useContext(ToastContext);

  const validate = (): boolean => {
    setEmailErrors([]);
    setPassword1Errors([]);
    setPassword2Errors([]);
    let isValid = true;

    if (!validator.isEmail(email)) {
      setEmailErrors(['Must enter a valid email.']);
      isValid = false;
    }
    if (!(password1.length >= 8 && password1.length <= 25)) {
      setPassword1Errors((prev) => [...prev, 'Password must be between 1 and 25 characters.']);
      isValid = false;
    }
    if (!/\d/.test(password1)) {
      setPassword1Errors((prev) => [...prev, 'Password must contain at least 1 number.']);
      isValid = false;
    }
    if (password1 !== password2) {
      setPassword2Errors(['Passwords do not match.']);
      isValid = false;
    }

    return isValid;
  };

  const register = async (): Promise<void> => {
    if (!validate()) return;

    try {
      await AuthService.register({
        email,
        password1,
        password2,
      });

      addToast({
        title: `Successfully registered ${email}!`,
        body: 'Please check your inbox to verify your email address',
        color: 'success',
      });
      navigate('/login');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { response } = err as AxiosError;
        const errors = (response as any).data.errors;
        const emailFieldErrors = errors.filter((error: any) => error.param === 'email').map((error: any) => error.msg);
        const password1FieldErrors = errors
          .filter((error: any) => error.param === 'password1')
          .map((error: any) => error.msg);
        const passsword2FieldErrors = errors
          .filter((error: any) => error.param === 'password2')
          .map((error: any) => error.msg);

        if (emailFieldErrors) setEmailErrors(emailFieldErrors);
        if (password1FieldErrors) setPassword1Errors(password1FieldErrors);
        if (passsword2FieldErrors) setPassword2Errors(passsword2FieldErrors);

        if (!emailErrors && !password1FieldErrors && !passsword2FieldErrors) {
          error('An unknown error has occurred. Please try again');
        }
      } else {
        error('An unknown error has occurred. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOnKeyPress = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') void register();
  };

  const handleOnInputEmail = (value: string): void => {
    setEmailErrors([]);
    setEmail(value);
  };

  const handleOnInputPassword1 = (value: string): void => {
    setPassword1Errors([]);
    setPassword1(value);
  };

  const handleOnInputPassword2 = (value: string): void => {
    setPassword2Errors([]);
    setPassword2(value);
  };

  return (
    <div
      onKeyPress={handleOnKeyPress}
      className="w-full flex flex-col sm:justify-center items-center p-6 sm:pb-96 bg-gray-100 dark:bg-slate-900 text-primary font-sans"
      style={{
        width: widthStr,
        height: heightStr,
        backgroundImage: `url('src/assets/login-background.png')`,
        backgroundSize: 'cover',
      }}
    >
      <div className="w-full max-w-sm dark:bg-slate-800 border-primary border dark:border-0 dark:shadow-xl p-6">
        <div className="flex flex-col space-y-4">
          <div className="w-full text-center flex flex-col justify-center items-center">
            <svg width="61" height="85" viewBox="0 0 249 282" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M139.172 204.927V281.043H248.199L196.833 0H139.172V70.2607H109.897V0H52.084L0.354492 281.043H109.897V204.927H139.172ZM109.897 99.536H139.172V181.507H109.897V99.536Z"
                fill="black"
              />
            </svg>
            <h1 className="text-6xl">Paper Trail</h1>
          </div>
          <TextField
            value={email}
            onInput={handleOnInputEmail}
            color="secondary"
            errors={emailErrors}
            placeholder="Email"
          />
          <TextField
            placeholder="Password (8 digits at least, case sensitive)"
            value={password1}
            onInput={handleOnInputPassword1}
            type="password"
            color="secondary"
            errors={password1Errors}
          />
          <TextField
            placeholder="Confirm Password"
            value={password2}
            onInput={handleOnInputPassword2}
            type="password"
            color="secondary"
            errors={password2Errors}
          />
          <button
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={register}
            disabled={loading}
            className="bg-blue-600 text-white text-sm font-semibold px-3 py-2 rounded hover:bg-blue-500 flex justify-center items-center space-x-1 active:ring-1"
          >
            <span className={`${loading && 'opacity-0'}`}>Register</span>
            {loading && <Spinner size="sm" />}
          </button>
          <button className="bg-white text-sm px-3 py-2 rounded hover:cursor-pointer hover:bg-slate-100 flex justify-center items-center space-x-1 active:ring-1 gap-2">
            <img className="h-4 w-4" src="/src/assets/icons/google-logo.png" alt="" />
            Continue with Google
          </button>
          <div className="text-center items-center">
            <span>or </span>
            <Link to="/login" className="text-sm hover:underline font-semibold text-blue-500">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
