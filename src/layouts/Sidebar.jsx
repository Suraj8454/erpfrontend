

import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    FileText,
    ShoppingCart,
    Package,
    Truck,
    UserPlus,
    DollarSign,
    Warehouse,
    ClipboardCheck,
    Layers,
    Store,
    UserCog,
    BarChart3,
    LogOut,
    ChevronDown,
    Settings,
    IndianRupee
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    {
        label: 'CRM',
        items: [
            { path: '/leads', icon: UserPlus, label: 'Leads' },
            // { path: '/enquiries', icon: FileText, label: 'Enquiries' },
        ],
    },
    {
        label: 'Sales',
        items: [
            { path: '/quotations', icon: FileText, label: 'Quotations' },
            { path: '/sales-orders', icon: ShoppingCart, label: 'Sales Orders' },
            { path: '/invoices', icon: IndianRupee, label: 'Invoices' },
            { path: '/payments', icon: IndianRupee, label: 'Payments' },
        ],
    },
    {
        label: 'Purchase',
        items: [
            { path: '/purchase-orders', icon: ShoppingCart, label: 'Purchase Orders' },
            { path: '/grn', icon: Truck, label: 'Goods Receipt' },
            { path: '/suppliers', icon: Users, label: 'Suppliers' },
        ],
    },
    {
        label: 'Inventory',
        items: [
            { path: '/stock', icon: Package, label: 'Stock' },
            { path: '/batches', icon: Warehouse, label: 'Batches' },
            { path: '/qc', icon: ClipboardCheck, label: 'Quality Control' },
        ],
    },
    {
        label: 'Masters',
        items: [
            { path: '/products', icon: Layers, label: 'Products' },
            { path: '/customers', icon: Store, label: 'Customers' },
            { path: '/users', icon: UserCog, label: 'Users' },
        ],
    },
    {
        label: 'Analytics',
        items: [
            { path: '/reports', icon: BarChart3, label: 'Reports' },
        ],
    },
];

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // ✅ FIXED LOGOUT HANDLER
    const handleLogout = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        console.log('🔓 Logout clicked');

        // Close menu
        setShowUserMenu(false);

        // Call logout from context
        logout();

        // Navigate to login
        navigate('/login', { replace: true });
    };

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

    const getFullName = () => {
        if (user?.first_name && user?.last_name) {
            return `${user.first_name} ${user.last_name}`;
        }
        return user?.name || user?.username || 'User';
    };

    return (
        <aside
            className={`${isCollapsed ? 'w-20' : 'w-64'
                } bg-white/80 backdrop-blur-md border-r border-gray-200/60 flex flex-col transition-all duration-500 ease-in-out shadow-sm`}
        >
            {/* Header */}
            <div
                className={`p-4 border-b border-gray-200/60 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'
                    }`}
            >
                {!isCollapsed && (
                    <h1 className="text-xl font-light tracking-wide text-gray-800 flex items-center gap-2">
                        <span className="text-2xl drop-shadow-sm">🌿</span>
                        <span className="font-medium">Makhana</span>
                    </h1>
                )}
                {isCollapsed && <span className="text-2xl drop-shadow-sm">🌿</span>}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1.5 hover:bg-gray-100/70 rounded-lg transition-colors duration-200"
                    aria-label="Toggle sidebar"
                >
                    <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d={
                                isCollapsed
                                    ? 'M13 5l7 7-7 7M5 5l7 7-7 7'
                                    : 'M11 5l-7 7 7 7M19 5l-7 7 7 7'
                            }
                        />
                    </svg>
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                {menuItems.map((item, index) => (
                    <div key={index}>
                        {item.items ? (
                            <>
                                {!isCollapsed && (
                                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2 ml-1">
                                        {item.label}
                                    </p>
                                )}
                                <div className="space-y-0.5">
                                    {item.items.map((subItem) => (
                                        <NavLink
                                            key={subItem.path}
                                            to={subItem.path}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${isActive
                                                    ? 'bg-gradient-to-r from-blue-50/80 to-blue-100/40 text-blue-700 font-medium shadow-sm border-l-2 border-blue-400'
                                                    : 'text-gray-500 hover:bg-gray-50/80 hover:text-gray-800'
                                                } ${isCollapsed ? 'justify-center' : ''}`
                                            }
                                            title={isCollapsed ? subItem.label : ''}
                                        >
                                            <subItem.icon
                                                className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'
                                                    } transition-transform duration-200`}
                                                strokeWidth={1.5}
                                            />
                                            {!isCollapsed && subItem.label}
                                        </NavLink>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${isActive
                                        ? 'bg-gradient-to-r from-blue-50/80 to-blue-100/40 text-blue-700 font-medium shadow-sm border-l-2 border-blue-400'
                                        : 'text-gray-500 hover:bg-gray-50/80 hover:text-gray-800'
                                    } ${isCollapsed ? 'justify-center' : ''}`
                                }
                                title={isCollapsed ? item.label : ''}
                            >
                                <item.icon
                                    className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'
                                        } transition-transform duration-200`}
                                    strokeWidth={1.5}
                                />
                                {!isCollapsed && item.label}
                            </NavLink>
                        )}
                    </div>
                ))}
            </nav>

            {/* Footer / User */}
            <div
                className={`p-4 border-t border-gray-200/60 ${isCollapsed ? 'text-center' : ''
                    }`}
            >
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors ${isCollapsed ? 'justify-center' : ''
                            }`}
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-100 to-blue-200/70 flex items-center justify-center flex-shrink-0 shadow-inner">
                            <span className="text-blue-700 font-medium text-sm">
                                {getInitials()}
                            </span>
                        </div>
                        {!isCollapsed && (
                            <>
                                <div className="flex-1 min-w-0 text-left">
                                    <p className="text-sm font-medium text-gray-700 truncate">
                                        {getFullName()}
                                    </p>
                                    <p className="text-xs text-gray-400 truncate">
                                        {user?.email || 'user@makhana.com'}
                                    </p>
                                </div>
                                <ChevronDown
                                    className={`w-4 h-4 text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''
                                        }`}
                                />
                            </>
                        )}
                    </button>

                    {/* User Menu Dropdown */}
                    {showUserMenu && !isCollapsed && (
                        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowUserMenu(false);
                                    navigate('/profile');
                                }}
                                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                            >
                                <Settings className="w-4 h-4" />
                                Profile Settings
                            </button>
                            <div className="border-t border-gray-100 my-1"></div>
                            {/* ✅ FIXED LOGOUT BUTTON */}
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* Collapsed logout button */}
                {isCollapsed && (
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-2 w-full flex items-center justify-center p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Logout"
                    >
                        <LogOut className="w-5 h-5 text-red-500" />
                    </button>
                )}
            </div>
        </aside>
    );
}