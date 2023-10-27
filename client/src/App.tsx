import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import { AuthProvider } from './context/AuthContext';
import Index from './pages/index';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastProvider } from './context/ToastContext';
import { DocumentProvider } from './context/DocumentContext';
import DocumentPage from './pages/document';
import { EditorProviderV2 } from './context/EditorContextV2';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <DocumentProvider>
            <Routes>
              <Route path="/home" element={<Index />} />
              <Route path="/document/create" element={<ProtectedRoute element={<DashboardPage />} />} />
              <Route
                path="/document/:id"
                element={
                  <ProtectedRoute
                    element={
                      <DocumentProvider>
                        {/* <EditorProvider> */}
                        <EditorProviderV2>
                          <DocumentPage />
                        </EditorProviderV2>
                        {/* </EditorProvider> */}
                      </DocumentProvider>
                    }
                  />
                }
              />
              <Route path="/" element={<Navigate replace to="/document/create" />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </DocumentProvider>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
