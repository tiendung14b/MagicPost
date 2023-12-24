import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Director from "./pages/Director/Director";
import role from "./util/role";
import TransactionManager from "./pages/Transaction/Manager/Manager";
import WarehouseManager from "./pages/Warehouse/Manager/Manager";

import TransactionEmployee from "./pages/Transaction/Employee/Employee";
import WarehouseEmployee from "./pages/Warehouse/Employee/Employee";

const RedirectHandler = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user.workplace?.role == role.DIRECTOR) {
    return <Navigate to="/director" />;
  } else if (user.workplace?.role == role.TRANSACTION_MANAGER) {
    return <Navigate to="/transaction/manager" />;
  } else if (user.workplace?.role == role.WAREHOUSE_MANAGER) {
    return <Navigate to="/warehouse/manager" />;
  } else if (user.workplace?.role == role.TRANSACTION_EMPLOYEE) {
    return <Navigate to="/transaction/employee" />;
  } else if (user.workplace?.role == role.WAREHOUSE_EMPLOYEE) {
    return <Navigate to="/warehouse/employee" />;
  }
  return <Navigate to="/login" />;
};

const ProtectRoute = ({ children, role, workplace_name }) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log(user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user.workplace?.role == role.DIRECTOR && role == role.DIRECTOR) {
    return children;
  }
  if (
    user.workplace?.role == role &&
    user.workplace?.workplace_name == workplace_name
  ) {
    return children;
  }
  return <Navigate to="/login" />;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/login"} />} />
      <Route
        path="/login"
        element={
          sessionStorage.getItem("user") ? <RedirectHandler /> : <Login />
        }
      />
      <Route
        path="/director"
        element={
          <ProtectRoute role={role.DIRECTOR}>
            <Director />
          </ProtectRoute>
        }
      />
      <Route
        path="/transaction/manager"
        element={
          <ProtectRoute
            role={role.TRANSACTION_MANAGER}
            workplace_name="TRANSACTION"
          >
            <TransactionManager />
          </ProtectRoute>
        }
      />
      <Route
        path="/warehouse/manager"
        element={
          <ProtectRoute
            role={role.WAREHOUSE_MANAGER}
            workplace_name="WAREHOUSE"
          >
            <WarehouseManager />
          </ProtectRoute>
        }
      />
      <Route
        path="/transaction/employee"
        element={
          <ProtectRoute
            role={role.TRANSACTION_EMPLOYEE}
            workplace_name="TRANSACTION"
          >
            <TransactionEmployee />
          </ProtectRoute>
        }
      />

      <Route
        path="/warehouse/employee"
        element={
          <ProtectRoute
            role={role.WAREHOUSE_EMPLOYEE}
            workplace_name="WAREHOUSE"
          >
            <WarehouseEmployee />
          </ProtectRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
