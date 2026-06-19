import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    
    const [isAuthenticated, setIsAutheticated] = useState(false);
    const backendUrl = "http://localhost:4000";

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

    return isAuthenticated ? children : <Navigate to="/" />
}

export default ProtectedRoute;