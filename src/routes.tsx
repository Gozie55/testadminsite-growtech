// routes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Registrations from "./pages/Registrations";
import RegistrationDetail from "./pages/RegistrationDetail";
import Export from "./pages/Export";
import DashboardLayout from "./components/DashboardLayout"; // ✅ use this

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const token = sessionStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  // ✅ Use DashboardLayout for sidebar/navbar management
  return <DashboardLayout>{children}</DashboardLayout>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login key={Date.now()} />} />

      <Route
        path="/dashboard"
        element={
          <PrivateLayout>
            <Dashboard />
          </PrivateLayout>
        }
      />
      <Route
        path="/registrations"
        element={
          <PrivateLayout>
            <Registrations />
          </PrivateLayout>
        }
      />
      <Route
        path="/registrations/:id"
        element={
          <PrivateLayout>
            <RegistrationDetail />
          </PrivateLayout>
        }
      />
      <Route
        path="/export"
        element={
          <PrivateLayout>
            <Export />
          </PrivateLayout>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
