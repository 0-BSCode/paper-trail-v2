import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <ConvexProvider client={convex}> */}
    <App />
    {/* </ConvexProvider> */}
  </React.StrictMode>,
);
