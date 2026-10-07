import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Edit, Trash2, Printer, User, Mail, Phone,
    Shield, CheckCircle, XCircle, Clock, Calendar, Key,
    Loader2, Hash, Briefcase, Award, Activity, Lock,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { useForm } from 'react-hook-form';
import { usersAPI } from '../../services/api';
import toast from 'react-hot-toast';

const roleColors = {
    admin: 'purple',
    manager: 'info',
    sales_manager: 'info',
    salesperson: 'info',
    purchase_manager: 'info',
    warehouse_manager: 'info',
    user: 'gray',
};

export default function UserDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [actionLoading, setActionLoading] = useState('');

    // ✅ Load user
    const loadUser = async () => {
        try {
            setLoading(true);
            const response = await usersAPI.getById(id);
            console.log('📦 User details:', response.data.data);
            setUser(response.data.data);
        } catch (error) {
            console.error('❌ Load user error:', error);
            toast.error(error.response?.data?.message || 'Failed to load user');
            navigate('/users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) loadUser();
    }, [id]);

    // ✅ Toggle Status
    const handleToggleStatus = async () => {
        try {
            setActionLoading('toggle');
            await usersAPI.toggleStatus(id);
            toast.success('Status updated');
            await loadUser();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update status');
        } finally {
            setActionLoading('');
        }
    };

    // ✅ Delete
    const handleDelete = async () => {
        if (!window.confirm('Delete this user permanently?')) return;
        try {
            setActionLoading('delete');
            await usersAPI.delete(id);
            toast.success('User deleted');
            navigate('/users');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete');
            setActionLoading('');
        }
    };

    const handleSendEmail = () => {
        if (user?.email) window.location.href = `mailto:${user.email}`;
    };

    const handleCall = () => {
        if (user?.phone) window.location.href = `tel:${user.phone}`;
    };

    const handlePrint = () => {
        toast.info('Opening print dialog...');
        setTimeout(() => window.print(), 200);
    };

    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    const handleEditClose = () => {
        setIsEditModalOpen(false);
        setTimeout(loadUser, 300);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
                    <p className="mt-4 text-gray-500">Loading user...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/users')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Back to users"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                            <User className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {user.first_name} {user.last_name}
                            </h1>
                            <div className="flex items-center gap-3 mt-1">
                                <Badge variant={user.is_active ? 'success' : 'danger'}>
                                    {user.is_active ? 'Active' : 'Inactive'}
                                </Badge>
                                <Badge variant={roleColors[user.role] || 'default'}>
                                    <Shield className="w-3 h-3 mr-1" />
                                    {user.role}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <Button
                        variant="outline"
                        onClick={handleSendEmail}
                        className="flex items-center gap-2"
                    >
                        <Mail className="w-4 h-4" />
                        Email
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleCall}
                        className="flex items-center gap-2"
                    >
                        <Phone className="w-4 h-4" />
                        Call
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handlePrint}
                        className="flex items-center gap-2"
                    >
                        <Printer className="w-4 h-4" />
                        Print
                    </Button>
                    <Button
                        onClick={handleEdit}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700"
                    >
                        <Edit className="w-4 h-4" />
                        Edit
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleToggleStatus}
                        loading={actionLoading === 'toggle'}
                        className="flex items-center gap-2"
                    >
                        {user.is_active ? (
                            <>
                                <XCircle className="w-4 h-4" />
                                Deactivate
                            </>
                        ) : (
                            <>
                                <CheckCircle className="w-4 h-4" />
                                Activate
                            </>
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleDelete}
                        loading={actionLoading === 'delete'}
                        className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LEFT */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Personal Info */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Personal Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">User ID</p>
                                <p className="text-sm font-medium font-mono flex items-center gap-2">
                                    <Hash className="w-3.5 h-3.5 text-gray-400" />
                                    {user.id?.slice(0, 16)}...
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Username</p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <User className="w-3.5 h-3.5 text-gray-400" />
                                    {user.username}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">First Name</p>
                                <p className="text-sm font-medium">{user.first_name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Last Name</p>
                                <p className="text-sm font-medium">{user.last_name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Email</p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                                    {user.email ? (
                                        <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">
                                            {user.email}
                                        </a>
                                    ) : ('-')}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Phone</p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                                    {user.phone ? (
                                        <a href={`tel:${user.phone}`} className="text-blue-600 hover:underline">
                                            {user.phone}
                                        </a>
                                    ) : ('-')}
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Role & Permissions */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <Shield className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Role & Access</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-purple-50 rounded-lg">
                                <p className="text-xs text-purple-600 uppercase mb-1">Role</p>
                                <p className="text-base font-bold text-purple-700 flex items-center gap-2">
                                    <Award className="w-4 h-4" />
                                    {user.role}
                                </p>
                            </div>
                            <div className={`p-4 rounded-lg ${
                                user.is_active ? 'bg-emerald-50' : 'bg-red-50'
                            }`}>
                                <p className={`text-xs uppercase mb-1 ${
                                    user.is_active ? 'text-emerald-600' : 'text-red-600'
                                }`}>Status</p>
                                <p className={`text-base font-bold flex items-center gap-2 ${
                                    user.is_active ? 'text-emerald-700' : 'text-red-700'
                                }`}>
                                    {user.is_active ? (
                                        <><CheckCircle className="w-4 h-4" /> Active</>
                                    ) : (
                                        <><XCircle className="w-4 h-4" /> Inactive</>
                                    )}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* RIGHT */}
                <div className="space-y-6">
                    {/* Activity */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <Activity className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Activity</h3>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500 flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                    Created
                                </span>
                                <span className="text-sm font-medium">
                                    {user.created_at
                                        ? new Date(user.created_at).toLocaleDateString('en-IN')
                                        : '-'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500 flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                                    Last Login
                                </span>
                                <span className="text-sm font-medium">
                                    {user.last_login
                                        ? new Date(user.last_login).toLocaleDateString('en-IN')
                                        : 'Never'}
                                </span>
                            </div>
                        </div>
                    </Card>

                    {/* Security */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <Lock className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Security</h3>
                        </div>

                        <div className="space-y-2">
                            <Button
                                variant="outline"
                                onClick={() => navigate('/users')}
                                className="w-full justify-center flex items-center gap-2"
                            >
                                <Key className="w-4 h-4" />
                                Change Password
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Edit Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={handleEditClose}
                title={
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-lg font-semibold text-gray-800">
                            Edit User
                        </span>
                    </div>
                }
                size="lg"
            >
                <EditUserForm onClose={handleEditClose} editData={user} />
            </Modal>
        </div>
    );
}

// Simple Edit Form
function EditUserForm({ onClose, editData }) {
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

            await usersAPI.update(editData.id, payload);
            toast.success('User updated successfully!');
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update user');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <Input
                    label="Username"
                    required
                    icon={User}
                    {...register('username', { required: 'Username required' })}
                    error={errors.username?.message}
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
                />
                <Input
                    label="First Name"
                    required
                    icon={User}
                    {...register('first_name', { required: 'First name required' })}
                    error={errors.first_name?.message}
                />
                <Input
                    label="Last Name"
                    required
                    icon={User}
                    {...register('last_name', { required: 'Last name required' })}
                    error={errors.last_name?.message}
                />
                <Input label="Phone" icon={Phone} {...register('phone')} />
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
                <div className="md:col-span-2">
                    <Input
                        label="New Password (leave blank to keep current)"
                        icon={Key}
                        type="password"
                        {...register('password')}
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
                    Update User
                </Button>
            </div>
        </form>
    );
}