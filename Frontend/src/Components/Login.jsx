import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validate(statusCode) {
        return statusCode >= 200 && statusCode < 500;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let response = null;
        try {
            response = await axios.put("https://coldmailer-aw4c.onrender.com/v1/login", { email, password }, { validateStatus: validate, withCredentials: true });
            navigate('/main');
            console.log("Response:", response.data);
        } catch (error) {
            navigate('/troubles');
            console.error("Error occured\n", error);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-lavender-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pastel-purple rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-slate-100 animate-slide-up">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-display font-bold text-slate-900">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Sign in to continue your campaigns
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 focus:z-10 sm:text-sm transition-all duration-300"
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="appearance-none relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 focus:z-10 sm:text-sm transition-all duration-300"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                className="h-4 w-4 text-lavender-600 focus:ring-lavender-500 border-slate-300 rounded"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-slate-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link to="/forgot-password" className="font-medium text-lavender-600 hover:text-lavender-500">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-lavender-600 hover:bg-lavender-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lavender-500 transition-all duration-300 shadow-lg shadow-lavender-500/30 hover:-translate-y-0.5"
                        >
                            Sign in
                        </button>
                    </div>
                    
                    <div className="text-center text-sm">
                        <span className="text-slate-600">Not registered? </span>
                        <Link to="/signup" className="font-medium text-lavender-600 hover:text-lavender-500">
                            Create an account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}