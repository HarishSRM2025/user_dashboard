import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import AuthPage from './Pages/Auth/AuthPage';
import Hompage from './Pages/Home/Hompage';
import DashboardPage from './Pages/Dashboard/DashboardPage';
import { applyAppearance, getStoredAccent, getStoredTheme } from './utils/appearance';

function ProtectedRoute({ children }) {
  const userDataStr = localStorage.getItem('hrm_user_data');
  let hasUser = false;
  if (userDataStr) {
    try {
      const userData = JSON.parse(userDataStr);
      const token = userData?.data?.token || userData?.data?.data?.token || userData?.token;
      if (token) {
        hasUser = true;
      }
    } catch (e) {
      console.error("Error parsing auth user data:", e);
      localStorage.removeItem('hrm_user_data');
    }
  }

  return hasUser ? children : <Navigate to="/signin" replace />;
}

function PublicRoute({ children }) {
  const userDataStr = localStorage.getItem('hrm_user_data');
  let hasUser = false;
  if (userDataStr) {
    try {
      const userData = JSON.parse(userDataStr);
      const token = userData?.data?.token || userData?.data?.data?.token || userData?.token;
      if (token) {
        hasUser = true;
      }
    } catch (e) {
      console.error("Error parsing auth user data:", e);
      localStorage.removeItem('hrm_user_data');
    }
  }

  return hasUser ? <Navigate to="/home" replace /> : children;
}

function App() {
  useEffect(() => {
    applyAppearance(getStoredTheme(), getStoredAccent());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Hompage />
            </ProtectedRoute>
          }
        />

        <Route path="/home/subscriptions" element={<ProtectedRoute><DashboardPage pageKey="subscriptions" /></ProtectedRoute>} />
        <Route path="/home/analytics" element={<ProtectedRoute><DashboardPage pageKey="analytics" /></ProtectedRoute>} />
        <Route path="/home/billing" element={<ProtectedRoute><DashboardPage pageKey="billing" /></ProtectedRoute>} />
        <Route path="/home/notifications" element={<ProtectedRoute><DashboardPage pageKey="notifications" /></ProtectedRoute>} />
        <Route path="/home/settings" element={<ProtectedRoute><DashboardPage pageKey="settings" /></ProtectedRoute>} />
        <Route path="/home/profile" element={<ProtectedRoute><DashboardPage pageKey="profile" /></ProtectedRoute>} />

        <Route
          path="*"
          element={<Navigate to="/signin" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// After successful signin/signup redirect using:
// window.location.href = '/home';
