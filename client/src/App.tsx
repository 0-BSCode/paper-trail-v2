import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Landing from './pages/landing';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastProvider } from './context/ToastContext';
import { DocumentProvider } from './context/DocumentContext';
import DocumentPage from './pages/document';
import { EditorProvider } from './context/EditorContext';
import YourTicketsPage from './pages/your-tickets';
import AllTicketsPage from './pages/all-tickets';
import UserManagementPage from './pages/user-management';
import HomePage from './pages/home';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <DocumentProvider>
            <Routes>
              <Route path="/landing" element={<Landing />} />
              <Route path="/" element={<Navigate replace to="/document/create" />} />
              <Route path="/document/create" element={<ProtectedRoute element={<DashboardPage />} />} />
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
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
              <Route path="/your-tickets" element={<ProtectedRoute element={<YourTicketsPage />} />} />
              <Route path="/all-tickets" element={<ProtectedRoute element={<AllTicketsPage />} />} />
              <Route path="/user-management" element={<ProtectedRoute element={<UserManagementPage />} />} />
            </Routes>
          </DocumentProvider>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
