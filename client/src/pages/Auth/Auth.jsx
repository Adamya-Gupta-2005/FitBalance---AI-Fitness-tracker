import { useState } from "react";

import Header from "../../components/Header/Header";
import '../Auth/Auth.css'
import { toast } from 'react-toastify';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {

    const navigate = useNavigate()
    const backendUrl = "http://localhost:4000"

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
             if (!isLogin) {
            if (formData.password !== formData.confirmPassword) {
                toast.error("Password do not match");
                return;
            }
            
            const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
                username: formData.name,
                email: formData.email,
                password: formData.password
            },
            {
                withCredentials: true
            }
        );

        if (data.success) {
            toast.success("Account created");
            navigate('/goal-setup');
        }

        }else {
            
            const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
                username: formData.name,
                email: formData.email,
                password: formData.password
            },
            {
                withCredentials: true
            }

        );

        if(data.success){
            toast.success("Login Successful");

            navigate('/dashboard');
        }

        }

        } catch (error) {
            
            toast.error(error.message)

        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <Header />

            <div className="auth-container">
                <div className="auth-card">

                    <div className="auth-heading">
                        <h2>
                            {isLogin ? "Welcome Back" : "Create Account"}
                        </h2>

                        <p>
                            {isLogin
                                ? "Login to continue your fitness journey"
                                : "Start tracking your fitness today"}
                        </p>
                    </div>
                    <div className="seperator-login-form"></div>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
                            </div>
                        )}

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                required
                                name="email"
                                value={formData.email} onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                required
                                name="password"
                                value={formData.password} onChange={handleChange}
                            />
                        </div>

                        {!isLogin && <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Re-Enter your password"
                                required
                                name="confirmPassword"
                                value={formData.confirmPassword} onChange={handleChange}
                            />
                        </div>}

                        <button
                            type="submit"
                            className="primary-btn"
                        >
                            {isLogin ? "Login" : "Create Account"}
                        </button>

                    </form>

                    <div className="switch-auth">

                        {isLogin ? (
                            <>
                                Don't have an account? <span onClick={() => setIsLogin(false)}>Sign Up</span>
                            </>
                        ) : (
                            <>
                                Already have an account? <span onClick={() => setIsLogin(true)}>Login</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Auth;