import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './Pages/Auth/AuthPage';
import Hompage from './Pages/Home/Hompage';
// import Sidebar from './Components/Sidebar/Sidebar';
// import Topbar from './Components/Topbar/Topbar';

function ProtectedRoute({ children }) {
  const userData = localStorage.getItem('hrm_user_data');

  return userData ? children : <Navigate to="/signin" replace />;
}

function PublicRoute({ children }) {
  const userData = localStorage.getItem('hrm_user_data');

  return userData ? <Navigate to="/home" replace /> : children;
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