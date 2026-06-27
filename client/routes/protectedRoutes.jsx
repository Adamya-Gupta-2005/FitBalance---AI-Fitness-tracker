import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    
    const [isAuthenticated, setIsAutheticated] = useState(null);
    const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";;

    useEffect(() => {
        const checkAuth = async () => {
            try {
                
                const {data} = await axios.get(`${backendUrl}/api/user/me`,
                {
                    withCredentials: true
                });

                if(data.success) {
                    setIsAutheticated(true);
                }

            } catch (error) {
                setIsAutheticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <h2>Loading...</h2>;
    }

    return isAuthenticated ? children : <Navigate to="/" />
}

export default ProtectedRoute;