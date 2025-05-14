import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import AdminRoutes from "./components/routes/AdminRoutes";

function App() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/*"
          element={
            isLoggedIn ? (
              <ProtectedRoutes>
                <AdminRoutes />
              </ProtectedRoutes>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
