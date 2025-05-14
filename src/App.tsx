import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import AdminRoutes from "./components/routes/AdminRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoutes>
              <AdminRoutes />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
