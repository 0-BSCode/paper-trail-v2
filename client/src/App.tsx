import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import { AuthProvider } from './context/AuthContext';
import Index from './pages/index';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import DocumentCreatePage from './pages/document/create';
import ProtectedRoute from './components/ProtectedRoute';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/document/create" element={<ProtectedRoute element={<DocumentCreatePage />} />} />
          <Route path="/" element={<Navigate replace to="/document/create" />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Index />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
