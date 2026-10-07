import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import {
    Plus, Filter, Download, Search, Eye, Edit, Trash2,
    RefreshCw, Shield, Clock, Users, User, Mail,
    CheckCircle, Phone, Briefcase, Award, Key, Lock,
    XCircle,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { usersAPI } from '../../services/api';

const roleColors = {
    admin: 'purple',
    manager: 'info',
    sales_manager: 'info',
    salesperson: 'info',
    purchase_manager: 'info',
    warehouse_manager: 'info',
    user: 'gray',
};

const StatCard = ({ icon: Icon, label, value, subtext, color, borderColor }) => (
    <Card
        className={`p-5 border-l-4 ${borderColor} bg-gradient-to-br from-white to-gray-50/50 hover:shadow-md transition-all duration-300`}
    >
        <div className="flex items-start justify-between">
            <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {label}
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1.5">{value}</p>
                {subtext && <span className={`text-xs font-medium ${color}`}>{subtext}</span>}
            </div>
            <div className={`p-2.5 rounded-xl ${color.replace('text', 'bg').replace('600', '50')}`}>
                <Icon className={`w-5 h-5 ${color}`} />
            </div>
        </div>
    </Card>
);

const SectionHeader = ({ icon: Icon, title }) => (
    <div className="md:col-span-2">
        <div className="flex items-center gap-3 pb-2 border-b border-blue-200">
            <Icon className="w-4 h-4 text-blue-500" strokeWidth={2} />
            <h3 className="text-sm font-semibold text-blue-600 tracking-wide">{title}</h3>
        </div>
    </div>
);

export default function UsersManagement() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [refreshKey, setRefreshKey] = useState(0);

    // ✅ Load users from API
    const loadUsers = async () => {
        try {
            setLoading(true);
            console.log('🔄 Loading users with filters:', {
                search: searchTerm,
                role: filterRole,
                status: filterStatus,
            });

            const response = await usersAPI.getAll({
                search: searchTerm,
                role: filterRole,
                status: filterStatus,
                _t: Date.now(),
            });

            console.log('📦 Users fetched:', response.data.data?.length);
            setUsers(response.data.data || []);
        } catch (error) {
            console.error('❌ Load users error:', error);
            toast.error(error.response?.data?.message || 'Failed to load users');
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    // Load on mount + whenever filters change
    useEffect(() => {
        const delay = setTimeout(loadUsers, 300);
        return () => clearTimeout(delay);
    }, [searchTerm, filterRole, filterStatus]);

    // ✅ Force reload when refreshKey changes (after create/edit)
    useEffect(() => {
        if (refreshKey > 0) {
            console.log('🔄 Refreshing users due to key change:', refreshKey);
            loadUsers();
        }
    }, [refreshKey]);

    const handleViewUser = (id) => navigate(`/users/${id}`);

    const handleEditUser = (user) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleToggleStatus = async (id) => {
        try {
            await usersAPI.toggleStatus(id);
            toast.success('Status updated');
            setRefreshKey((k) => k + 1);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update status');
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Delete this user permanently?')) return;

        try {
            await usersAPI.delete(id);
            toast.success('User deleted');
            setRefreshKey((k) => k + 1);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete');
        }
    };

    const handleNewUser = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    // ✅ Handles successful save (create OR edit)
    const handleSaveSuccess = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        setRefreshKey((k) => k + 1);  // Force reload
        setTimeout(loadUsers, 300);   // Also direct reload
    };

    const columns = [
        {
            header: 'User ID',
            accessor: 'id',
            render: (value) => (
                <span className="font-mono font-medium text-gray-800 text-xs">
                    {value ? value.slice(0, 8) + '...' : '-'}
                </span>
            ),
        },
        {
            header: 'Name',
            accessor: 'first_name',
            sortable: true,
            render: (_, row) => (
                <span className="font-medium text-gray-800">
                    {row.first_name} {row.last_name}
                </span>
            ),
        },
        { header: 'Email', accessor: 'email' },
        {
            header: 'Role',
            accessor: 'role',
            render: (value) => (
                <Badge variant={roleColors[value] || 'default'}>
                    <Shield className="w-3 h-3 mr-1" />
                    {value}
                </Badge>
            ),
        },
        {
            header: 'Phone',
            accessor: 'phone',
            render: (value) => value || '-',
        },
        {
            header: 'Status',
            accessor: 'is_active',
            render: (value) => (
                <Badge variant={value ? 'success' : 'danger'}>
                    {value ? 'Active' : 'Inactive'}
                </Badge>
            ),
        },
        {
            header: 'Last Login',
            accessor: 'last_login',
            render: (value) => (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>
                        {value ? new Date(value).toLocaleDateString('en-IN') : 'Never'}
                    </span>
                </div>
            ),
        },
        {
            header: 'Actions',
            accessor: 'id',
            render: (_, row) => (
                <div className="flex items-center gap-1">
                    <button
                        className="p-1.5 hover:bg-gray-100 rounded-lg"
                        title="View"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleViewUser(row.id);
                        }}
                    >
                        <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-gray-100 rounded-lg"
                        title="Edit"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditUser(row);
                        }}
                    >
                        <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-yellow-50 rounded-lg"
                        title="Toggle Status"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStatus(row.id);
                        }}
                    >
                        {row.is_active ? (
                            <XCircle className="w-4 h-4 text-yellow-600" />
                        ) : (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                    </button>
                    <button
                        className="p-1.5 hover:bg-red-50 rounded-lg"
                        title="Delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteUser(row.id);
                        }}
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                </div>
            ),
        },
    ];

    // Stats
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.is_active).length;
    const adminCount = users.filter((u) => u.role === 'admin').length;
    const salesCount = users.filter((u) =>
        ['salesperson', 'sales_manager'].includes(u.role)
    ).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm">
                        <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
                            Users
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Manage system users and permissions
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <Button
                        variant="outline"
                        onClick={loadUsers}
                        className="flex items-center gap-2 text-sm"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 text-sm">
                        <Download className="w-4 h-4" />
                        Export
                    </Button>
                    <Button
                        onClick={handleNewUser}
                        className="flex items-center gap-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700"
                    >
                        <Plus className="w-4 h-4" />
                        New User
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    icon={Users}
                    label="Total Users"
                    value={totalUsers}
                    color="text-blue-600"
                    borderColor="border-blue-500"
                />
                <StatCard
                    icon={CheckCircle}
                    label="Active"
                    value={activeUsers}
                    subtext={
                        totalUsers > 0
                            ? `${Math.round((activeUsers / totalUsers) * 100)}% of total`
                            : '0%'
                    }
                    color="text-green-600"
                    borderColor="border-green-500"
                />
                <StatCard
                    icon={Shield}
                    label="Admins"
                    value={adminCount}
                    color="text-purple-600"
                    borderColor="border-purple-500"
                />
                <StatCard
                    icon={Briefcase}
                    label="Sales Team"
                    value={salesCount}
                    color="text-blue-600"
                    borderColor="border-blue-500"
                />
            </div>

            {/* Filters */}
            <Card className="p-5">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200/80 rounded-lg text-sm"
                            />
                        </div>
                    </div>
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="px-4 py-2.5 border border-gray-200/80 rounded-lg text-sm"
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="sales_manager">Sales Manager</option>
                        <option value="salesperson">Salesperson</option>
                        <option value="purchase_manager">Purchase Manager</option>
                        <option value="warehouse_manager">Warehouse Manager</option>
                        <option value="user">User</option>
                    </select>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2.5 border border-gray-200/80 rounded-lg text-sm"
                    >
                        <option value="all">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <span className="text-sm text-gray-400 ml-auto font-medium">
                        {users.length} users found
                    </span>
                </div>
            </Card>

            {/* Table */}
            <Card className="p-0 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
                        <p className="text-sm text-gray-500 mt-3">Loading users...</p>
                    </div>
                ) : users.length === 0 ? (
                    <div className="p-12 text-center">
                        <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No users found</p>
                        <Button
                            onClick={handleNewUser}
                            className="mt-4 inline-flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Create First User
                        </Button>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        data={users}
                        totalItems={users.length}
                        onRowClick={(row) => handleViewUser(row.id)}
                    />
                )}
            </Card>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-lg font-semibold text-gray-800">
                            {editingUser ? 'Edit User' : 'New User'}
                        </span>
                    </div>
                }
                size="lg"
            >
                <UserForm
                    onClose={handleCloseModal}
                    onSuccess={handleSaveSuccess}
                    editData={editingUser}
                />
            </Modal>
        </div>
    );
}

// ✅ User Form with onSuccess callback
function UserForm({ onClose, onSuccess, editData }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            username: editData?.username || '',
            email: editData?.email || '',
            first_name: editData?.first_name || '',
            last_name: editData?.last_name || '',
            phone: editData?.phone || '',
            role: editData?.role || 'user',
            is_active: editData?.is_active ?? true,
        },
    });

    const onSubmit = async (data) => {
        try {
            console.log('📤 Submitting user:', data);

            const payload = {
                username: data.username,
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone || null,
                role: data.role,
                is_active: data.is_active,
            };

            if (data.password && data.password.trim()) {
                payload.password = data.password;
            }

            if (editData) {
                console.log('🔄 Updating user:', editData.id);
                await usersAPI.update(editData.id, payload);
                toast.success('User updated successfully!');
            } else {
                if (!data.password || !data.password.trim()) {
                    toast.error('Password is required for new user');
                    return;
                }
                console.log('➕ Creating new user');
                await usersAPI.create(payload);
                toast.success('User created successfully!');
            }

            // ✅ Trigger parent refresh
            if (onSuccess) {
                onSuccess();
            } else {
                onClose();
            }
        } catch (error) {
            console.error('❌ Submit error:', error);
            const msg = error.response?.data?.message || 'Failed to save user';
            toast.error(msg);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <SectionHeader icon={User} title="Personal Information" />

                <Input
                    label="Username"
                    required
                    icon={User}
                    {...register('username', { required: 'Username required' })}
                    error={errors.username?.message}
                    placeholder="john.doe"
                />

                <Input
                    label="Email"
                    required
                    icon={Mail}
                    {...register('email', {
                        required: 'Email required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                    })}
                    error={errors.email?.message}
                    placeholder="john@company.com"
                />

                <Input
                    label="First Name"
                    required
                    icon={User}
                    {...register('first_name', { required: 'First name required' })}
                    error={errors.first_name?.message}
                    placeholder="John"
                />

                <Input
                    label="Last Name"
                    required
                    icon={User}
                    {...register('last_name', { required: 'Last name required' })}
                    error={errors.last_name?.message}
                    placeholder="Doe"
                />

                <Input
                    label="Phone"
                    icon={Phone}
                    {...register('phone')}
                    placeholder="+91 9876543210"
                />

                <Select
                    label="Role"
                    required
                    icon={Award}
                    {...register('role', { required: 'Role required' })}
                    error={errors.role?.message}
                    options={[
                        { value: 'admin', label: 'Admin' },
                        { value: 'manager', label: 'Manager' },
                        { value: 'sales_manager', label: 'Sales Manager' },
                        { value: 'salesperson', label: 'Salesperson' },
                        { value: 'purchase_manager', label: 'Purchase Manager' },
                        { value: 'warehouse_manager', label: 'Warehouse Manager' },
                        { value: 'user', label: 'User' },
                    ]}
                />

                <Select
                    label="Status"
                    icon={CheckCircle}
                    {...register('is_active')}
                    options={[
                        { value: true, label: 'Active' },
                        { value: false, label: 'Inactive' },
                    ]}
                />

                <SectionHeader icon={Lock} title="Account Security" />

                <div className="md:col-span-2">
                    <Input
                        label={
                            editData
                                ? 'New Password (leave blank to keep current)'
                                : 'Password'
                        }
                        required={!editData}
                        icon={Key}
                        type="password"
                        {...register('password', {
                            required: editData ? false : 'Password required',
                        })}
                        error={errors.password?.message}
                        placeholder="••••••••"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={onClose} type="button">
                    Cancel
                </Button>
                <Button type="submit" loading={isSubmitting}>
                    {editData ? 'Update User' : 'Create User'}
                </Button>
            </div>
        </form>
    );
}