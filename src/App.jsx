import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import AuthPage from './Pages/Auth/AuthPage';
import Hompage from './Pages/Home/Hompage';
import SubscriptionsPage from './Pages/Subscriptions/SubscriptionsPage';
import AnalyticsPage from './Pages/Analytics/AnalyticsPage';
import BillingPage from './Pages/Billing/BillingPage';
import NotificationsPage from './Pages/Notifications/NotificationsPage';
import SettingsPage from './Pages/Settings/SettingsPage';
import ProfilePage from './Pages/Profile/ProfilePage';
import { applyAppearance, getStoredAccent, getStoredTheme } from './utils/appearance';

function ProtectedRoute({ children }) {
  const userDataStr = localStorage.getItem('hrm_user_data');
  let hasUser = false;
  if (userDataStr) {
    try {
      const userData = JSON.parse(userDataStr);
      if (userData && (userData.success !== false) && (userData.data || userData.user || userData.token || userData.id || userData.user_email)) {
        hasUser = true;
      }
    } catch (e) {
      console.error("Error parsing auth user data:", e);
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
      if (userData && (userData.success !== false) && (userData.data || userData.user || userData.token || userData.id || userData.user_email)) {
        hasUser = true;
      }
    } catch (e) {
      console.error("Error parsing auth user data:", e);
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
        <Route path="/" element={<Navigate to="/home" replace />} />
        
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

        <Route path="/home/subscriptions" element={<ProtectedRoute><SubscriptionsPage /></ProtectedRoute>} />
        <Route path="/home/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
        <Route path="/home/billing" element={<ProtectedRoute><BillingPage /></ProtectedRoute>} />
        <Route path="/home/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
        <Route path="/home/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/home/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

        <Route
          path="*"
          element={<Navigate to="/home" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
