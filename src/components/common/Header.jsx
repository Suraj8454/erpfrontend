import { Search, Bell, User, Settings, LogOut, Menu, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function Header({ onMenuClick }) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // Get user initials
    const getInitials = () => {
        if (user?.first_name && user?.last_name) {
            return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
        }
        if (user?.name) {
            return user.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
        }
        if (user?.email) {
            return user.email[0].toUpperCase();
        }
        return 'U';
    };

    // Get full name
    const getFullName = () => {
        if (user?.first_name && user?.last_name) {
            return `${user.first_name} ${user.last_name}`;
        }
        return user?.name || user?.username || 'User';
    };

    // ✅ Handle logout
    const handleLogout = () => {
        setIsProfileOpen(false);
        logout();
        navigate('/login', { replace: true });
    };

    // ✅ Handle settings
    const handleSettings = () => {
        setIsProfileOpen(false);
        navigate('/profile');
    };

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 px-6 py-3.5 sticky top-0 z-40 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Menu className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Desktop Search */}
                    <div className="hidden md:block relative w-96">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search leads, orders, products..."
                            className="w-full pl-11 pr-4 py-2.5 bg-white/50 border border-gray-200/80 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-all"
                        />
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                            ⌘K
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Mobile Search Toggle */}
                    <button
                        onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Search className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Notifications */}
                    <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 p-1.5 pl-3 rounded-lg hover:bg-gray-100/70 transition-colors border border-transparent hover:border-gray-200/60"
                        >
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200/60 rounded-full flex items-center justify-center shadow-inner">
                                <span className="text-blue-600 font-semibold text-xs">
                                    {getInitials()}
                                </span>
                            </div>
                            <span className="text-sm font-medium text-gray-700 hidden sm:block">
                                {getFullName()}
                            </span>
                            <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
                        </button>

                        {isProfileOpen && (
                            <>
                                {/* Click outside to close */}
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsProfileOpen(false)}
                                />

                                <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/60 py-1.5 z-50">
                                    <div className="px-4 py-3 border-b border-gray-200/60">
                                        <p className="text-sm font-medium text-gray-700 truncate">
                                            {getFullName()}
                                        </p>
                                        <p className="text-xs text-gray-400 truncate">
                                            {user?.email || 'user@makhana.com'}
                                        </p>
                                    </div>

                                    <button
                                        onClick={handleSettings}
                                        className="w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50/80 flex items-center gap-2.5 transition-colors"
                                    >
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </button>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50/80 flex items-center gap-2.5 transition-colors border-t border-gray-200/60"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar */}
            {isMobileSearchOpen && (
                <div className="md:hidden mt-3">
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-11 pr-4 py-2.5 bg-white/50 border border-gray-200/80 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-all"
                            autoFocus
                        />
                    </div>
                </div>
            )}
        </header>
    );
}