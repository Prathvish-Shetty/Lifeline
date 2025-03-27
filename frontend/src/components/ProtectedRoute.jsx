import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "../store/authAtom";

const ProtectedRoute = () => {
  const auth = useRecoilValue(authAtom);
  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
