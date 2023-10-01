import { createContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import ToastManager from '../../components/ToastManager';
import type ActionInterface from '../../types/interfaces/action';
import type ToastInterface from '../../types/interfaces/toast';
const TOAST_TIMEOUT = 5000; // 5s

interface ToastContextInterface {
  toasts: ToastInterface[];
  addToast: (
    {
      id,
      color,
      title,
      body,
      actions,
    }: {
      id?: string;
      color?: ToastInterface['color'];
      title?: string;
      body?: string;
      actions?: ActionInterface[];
    },
    duration?: number,
  ) => void;
  removeToast: (id: string) => void;
  error: (title: string) => void;
  success: (title: string) => void;
}

const defaultValues = {
  toasts: new Array<ToastInterface>(),
  addToast: () => {},
  removeToast: () => {},
  error: () => {},
  success: () => {},
};

export const ToastContext = createContext<ToastContextInterface>(defaultValues);

interface ToastProviderInterface {
  children: JSX.Element;
}

export const ToastProvider = ({ children }: ToastProviderInterface): JSX.Element => {
  const [toasts, setToasts] = useState<ToastInterface[]>(defaultValues.toasts);

  const addToast = (
    {
      id = uuid(),
      color = 'primary',
      title,
      body,
      actions,
    }: {
      id?: string;
      color?: ToastInterface['color'];
      title?: string;
      body?: string;
      actions?: ActionInterface[];
    },
    duration = TOAST_TIMEOUT,
  ): void => {
    setToasts((toasts) => [
      ...toasts,
      {
        id,
        color,
        title,
        body,
        actions,
      },
    ]);
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: string): void => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  };

  const error = (title: string): void => {
    addToast({ color: 'danger', title });
  };

  const success = (title: string): void => {
    addToast({ color: 'success', title });
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, error, success }}>
      {children}
      <ToastManager />
    </ToastContext.Provider>
  );
};
