import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import AdminRoutes from "./components/routes/AdminRoutes";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./components/pages/Home";

function App() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/admin/*"
              element={
                isLoggedIn ? (
                  <ProtectedRoutes>
                    <AdminRoutes />
                  </ProtectedRoutes>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
