/* eslint-disable @typescript-eslint/no-explicit-any */
import useWindowSize from '@src/hooks/useWindowSize';
import { type KeyboardEvent, useContext, useState } from 'react';
import { ToastContext } from '@src/context/ToastContext';
import validator from 'validator';
import Spinner from '@src/components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import axios, { type AxiosError } from 'axios';
import AuthService from '@src/services/auth-service';
import { Input, Button } from 'antd';
import isValidHelper from '@src/utils/isValid.helper';
import useAuth from '@src/hooks/useAuth';

const RegisterPage = (): JSX.Element => {
  const { widthStr, heightStr } = useWindowSize();
  const [studentIdNumber, setStudentIdNumber] = useState('');
  const [studentIdNumberErrors, setStudentIdNumberErrors] = useState<string[]>([]);
  const [fullName, setFullName] = useState('');
  const [fullNameErrors, setFullNameErrors] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [password1, setPassword1] = useState('');
  const [password1Errors, setPassword1Errors] = useState<string[]>([]);
  const [password2, setPassword2] = useState('');
  const [password2Errors, setPassword2Errors] = useState<string[]>([]);
  const { success, error } = useContext(ToastContext);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = (): boolean => {
    setStudentIdNumberErrors([]);
    setFullNameErrors([]);
    setEmailErrors([]);
    setPassword1Errors([]);
    setPassword2Errors([]);
    let isValid = true;

    if (!studentIdNumber.length || !isValidHelper.studentNumber(studentIdNumber)) {
      setStudentIdNumberErrors(['Please enter your 8-digit USC ID number.']);
      isValid = false;
    }
    if (!fullName.length || !isValidHelper.fullName(fullName)) {
      setFullNameErrors(['Must enter a valid full name.']);
      isValid = false;
    }
    if (!validator.isEmail(email)) {
      setEmailErrors(['Must enter a valid email.']);
      isValid = false;
    }
    if (!(password1.length >= 8 && password1.length <= 25)) {
      setPassword1Errors((prev) => [...prev, '• Password must be between 8 and 25 characters.']);
      isValid = false;
    }
    if (!/\d/.test(password1)) {
      setPassword1Errors((prev) => [...prev, '• Password must contain at least 1 number.']);
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

    setLoading(true);
    try {
      await AuthService.register({
        email,
        password1,
        password2,
        studentIdNumber,
        fullName,
      });
      const response = await AuthService.login({ email, password: password1 });
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
      login(newAccessToken, newRefreshToken);
      success('Successfully registered!');
      navigate('/home');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { response } = err as AxiosError;
        const errors = (response as any).data.errors;
        const emailFieldErrors = errors.filter((error: any) => error.path === 'email').map((error: any) => error.msg);
        const password1FieldErrors = errors
          .filter((error: any) => error.path === 'password1')
          .map((error: any) => error.msg);
        const passsword2FieldErrors = errors
          .filter((error: any) => error.path === 'password2')
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
    if (event.key === 'Enter') {
      void register();
    }
  };

  const handleOnInputStudentIdNumber = (value: string): void => {
    setStudentIdNumberErrors([]);
    setStudentIdNumber(value);
  };

  const handleOnInputFullName = (value: string): void => {
    setFullNameErrors([]);
    setFullName(value);
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
          <div>
            <Input
              id="id"
              style={{ fontFamily: 'roboto' }}
              className="p-2"
              placeholder="USC ID Number"
              color="secondary"
              value={studentIdNumber}
              onChange={(e) => {
                handleOnInputStudentIdNumber(e.target.value);
              }}
            />
            {!!studentIdNumberErrors.length && (
              <div className="text-sm text-[#ff4d4f]">{studentIdNumberErrors.join(', ')}</div>
            )}
          </div>
          <div>
            <Input
              id="name"
              style={{ fontFamily: 'roboto' }}
              className="p-2"
              placeholder="Full Name"
              color="secondary"
              value={fullName}
              onChange={(e) => {
                handleOnInputFullName(e.target.value);
              }}
            />
            {!!fullNameErrors.length && <div className="text-sm text-[#ff4d4f]">{fullNameErrors.join(', ')}</div>}
          </div>
          <div>
            <Input
              id="email"
              style={{ fontFamily: 'roboto' }}
              className="p-2"
              placeholder="Email"
              color="secondary"
              value={email}
              onChange={(e) => {
                handleOnInputEmail(e.target.value);
              }}
            />
            {!!emailErrors.length && <div className="text-sm text-[#ff4d4f]">{emailErrors.join(', ')}</div>}
          </div>
          <div>
            <Input.Password
              id="password"
              className="p-2"
              placeholder="Password (8 characters at least, case sensitive)"
              type="password"
              color="secondary"
              style={{ fontFamily: 'roboto' }}
              value={password1}
              onChange={(e) => {
                handleOnInputPassword1(e.target.value);
              }}
            />
            {!!password1Errors.length && (
              <div className="text-sm text-[#ff4d4f]" style={{ whiteSpace: 'pre-line' }}>
                {password1Errors.join('\n')}
              </div>
            )}
          </div>
          <div>
            <Input.Password
              id="confirm-password"
              style={{ fontFamily: 'roboto' }}
              className="p-2"
              placeholder="Confirm Password"
              type="password"
              color="secondary"
              value={password2}
              onChange={(e) => {
                handleOnInputPassword2(e.target.value);
              }}
            />
            {!!password2Errors.length && <div className="text-sm text-[#ff4d4f]">{password2Errors.join(', ')}</div>}
          </div>
          <Button
            style={{ borderRadius: '6px', fontFamily: 'roboto' }}
            size="large"
            type="primary"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={register}
            disabled={loading}
          >
            <span className={`${loading && 'opacity-0'}`}>Register</span>
            {loading && <Spinner size="sm" />}
          </Button>
          <div className="items-center text-center">
            <span>or </span>
            <Link to="/login" className="text-[#1677FF] no-underline hover:underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
