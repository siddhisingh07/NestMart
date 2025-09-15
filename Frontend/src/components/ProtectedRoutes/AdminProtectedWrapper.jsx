import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { authContext } from "../../Context/AuthContext";

const AdminProtectedWrapper = ({ children }) => {
  const { user, loading } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!loading && user && user.userType !== "admin") {
      toast.error("Access Denied: Admins only");
      setShouldRedirect(true);
    }
  }, [loading, user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user || shouldRedirect) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminProtectedWrapper;
