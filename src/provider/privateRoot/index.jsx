import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getProfile } from "../../services";

function PrivateRoute({ children }) {
  // const [isAuthenticated, setIsAuthenticated] = useState(null);
  return children;
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getProfile();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
