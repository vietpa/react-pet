import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirectPath = "/" }: any) => {
  const loginStatus = useSelector((state: any) => {
    return state.loginStatus;
  });
  if (loginStatus) {
    return children;
  }
  return <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
