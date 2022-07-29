import { useNavigate } from "react-router-dom";
import Header from "../Header";
import ProtectedRoute from "../ProtectedRoute";
import "./index.sass";

const Layout = (props: any) => {
  const navigate = useNavigate();
  if (props.hideMenu) {
    return (
      <div className="market">
        <div className="market-body">
          <props.component navigate={navigate} />
        </div>
      </div>
    );
  }
  return (
    <div className="market">
      <Header navigate={navigate} />
      <div className="market-body">
        <ProtectedRoute>
          <props.component />
        </ProtectedRoute>
      </div>
    </div>
  );
};

export default Layout;
