import { createContext } from 'react';
import { ExclamationCircleOutlined, CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';

interface ToastContextInterface {
  error: (description: string) => void;
  success: (description: string) => void;
  info: (description: string) => void;
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
  const info = (description: string): void => {
    api.open({
      message: 'Error',
      description,
      icon: <InfoCircleOutlined style={{ color: '#108ee9' }} />,
      placement: 'bottomLeft',
    });
  };

  const error = (description: string): void => {
    api.open({
      message: 'Error',
      description,
      icon: <ExclamationCircleOutlined style={{ color: '#fc3d39' }} />,
      placement: 'bottomLeft',
    });
  };

  const success = (description: string): void => {
    api.open({
      message: 'Success',
      description,
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
