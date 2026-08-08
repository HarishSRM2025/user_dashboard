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

const DEFAULT_USER = {
  success: true,
  data: {
    user: {
      id: "demo-user-1",
      user_name: "Demo Admin",
      user_email: "admin@peopleos.com",
      user_role: "Super Admin"
    },
    token: "demo-jwt-token"
  }
};

function ensureUserSession() {
  const userDataStr = localStorage.getItem('hrm_user_data');
  if (!userDataStr) {
    localStorage.setItem('hrm_user_data', JSON.stringify(DEFAULT_USER));
    return DEFAULT_USER;
  }
  try {
    const userData = JSON.parse(userDataStr);
    if (!userData || userData.success === false) {
      localStorage.setItem('hrm_user_data', JSON.stringify(DEFAULT_USER));
      return DEFAULT_USER;
    }
    return userData;
  } catch (e) {
    localStorage.setItem('hrm_user_data', JSON.stringify(DEFAULT_USER));
    return DEFAULT_USER;
  }
}

function ProtectedRoute({ children }) {
  ensureUserSession();
  return children;
}

function PublicRoute({ children }) {
  const userDataStr = localStorage.getItem('hrm_user_data');
  let hasExplicitUser = false;
  if (userDataStr) {
    try {
      const userData = JSON.parse(userDataStr);
      if (userData && userData.data) hasExplicitUser = true;
    } catch (e) {
      hasExplicitUser = false;
    }
  }
  return hasExplicitUser ? children : children;
}

function App() {
  useEffect(() => {
    ensureUserSession();
    applyAppearance(getStoredTheme(), getStoredAccent());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        <Route
          path="/signin"
          element={<AuthPage />}
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
