import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import DocumentCreatePage from './pages/document/create';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastProvider } from './context/ToastContext';
import { DocumentProvider } from './context/DocumentContext';
import { EditorProvider } from './context/EditorContext';
import DocumentPage from './pages/document';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <DocumentProvider>
            <Routes>
              <Route path="/document/create" element={<ProtectedRoute element={<DocumentCreatePage />} />} />
              <Route
                path="/document/:id"
                element={
                  <ProtectedRoute
                    element={
                      <DocumentProvider>
                        <EditorProvider>
                          <DocumentPage />
                        </EditorProvider>
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
