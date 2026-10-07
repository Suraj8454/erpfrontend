import React, { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem('user');
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // Verify token on mount
    useEffect(() => {
        const verifyToken = async () => {
            const storedToken = localStorage.getItem('token');

            if (storedToken) {
                try {
                    const response = await authAPI.getProfile();
                    const userData = response.data.data;
                    setUser(userData);
                    setToken(storedToken);
                    localStorage.setItem('user', JSON.stringify(userData));
                } catch (error) {
                    // Token invalid - clear everything
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setUser(null);
                    setToken(null);
                }
            }
            setLoading(false);
        };

        verifyToken();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authAPI.login({ email, password });
            const { user: userData, token: authToken } = response.data.data;

            setUser(userData);
            setToken(authToken);
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', authToken);

            toast.success('Login successful!');
            return { success: true, user: userData };
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            toast.error(message);
            return { success: false, error: message };
        }
    };

    // ✅ FIXED LOGOUT - Clears everything
    const logout = () => {
        console.log('🔓 Logging out...');

        // Clear state
        setUser(null);
        setToken(null);

        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Clear axios default header
        delete window.axios?.defaults?.headers?.common?.Authorization;

        console.log('✅ Logged out - localStorage cleared');

        toast.success('Logged out successfully');
    };

    const value = {
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!user && !!token,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};