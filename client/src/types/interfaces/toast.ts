import type ActionInterface from './action';

interface ToastInterface {
  id: string;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  title?: string | JSX.Element;
  body?: string | JSX.Element;
  actions?: ActionInterface[];
}

export default ToastInterface;
