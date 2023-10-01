import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
