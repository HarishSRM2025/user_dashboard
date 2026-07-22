import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './Pages/Auth/AuthPage';
import Hompage from './Pages/Home/Hompage';
// import Sidebar from './Components/Sidebar/Sidebar';
// import Topbar from './Components/Topbar/Topbar';

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
              {/* <Topbar />
              <Sidebar /> */}
              <Hompage />
            </ProtectedRoute>
          }
        />

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