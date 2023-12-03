import { createContext } from 'react';
import { ExclamationCircleOutlined, CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';

interface ToastContextInterface {
  error: (title: string) => void;
  success: (title: string) => void;
  info: (title: string) => void;
}

const defaultValues = {
  error: () => {},
  success: () => {},
  info: () => {},
};

export const ToastContext = createContext<ToastContextInterface>(defaultValues);

interface ToastProviderInterface {
  children: JSX.Element;
}

export const ToastProvider = ({ children }: ToastProviderInterface): JSX.Element => {
  const [api, contextHolder] = notification.useNotification();
  const info = (title: string): void => {
    api.open({
      message: 'Error',
      description: title,
      icon: <InfoCircleOutlined style={{ color: '#108ee9' }} />,
      placement: 'bottomLeft',
    });
  };

  const error = (title: string): void => {
    api.open({
      message: 'Error',
      description: title,
      icon: <ExclamationCircleOutlined style={{ color: '#fc3d39' }} />,
      placement: 'bottomLeft',
    });
  };

  const success = (title: string): void => {
    api.open({
      message: 'Success',
      description: title,
      icon: <CheckCircleOutlined style={{ color: '#53d769' }} />,
      placement: 'bottomLeft',
    });
  };

  return (
    <>
      {contextHolder}
      <ToastContext.Provider value={{ error, success, info }}>{children}</ToastContext.Provider>
    </>
  );
};
