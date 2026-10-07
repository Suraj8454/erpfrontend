import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Edit, Trash2, Printer, Building2, User, Mail,
    Phone, MapPin, Globe, FileText, CreditCard, Loader2, Hash,
    DollarSign, Calendar, CheckCircle, ShoppingCart, TrendingUp,
    Receipt, Wallet, BarChart3, Store, Users,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { useForm } from 'react-hook-form';
import { customersAPI } from '../../services/api';
import toast from 'react-hot-toast';

const statusColors = {
    Active: 'success',
    Inactive: 'danger',
    Pending: 'warning',
};

export default function CustomerDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [actionLoading, setActionLoading] = useState('');

    // ✅ Load customer
    const loadCustomer = async () => {
        try {
            setLoading(true);
            const response = await customersAPI.getById(id);
            console.log('📦 Customer details:', response.data.data);
            setCustomer(response.data.data);
        } catch (error) {
            console.error('❌ Load customer error:', error);
            toast.error(error.response?.data?.message || 'Failed to load customer');
            navigate('/customers');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) loadCustomer();
    }, [id]);

    // ✅ Delete
    const handleDelete = async () => {
        if (!window.confirm('Delete this customer permanently?')) return;
        try {
            setActionLoading('delete');
            await customersAPI.delete(id);
            toast.success('Customer deleted');
            navigate('/customers');
        } catch (error) {
            toast.error('Failed to delete');
            setActionLoading('');
        }
    };

    const handleSendEmail = () => {
        if (customer?.email) window.location.href = `mailto:${customer.email}`;
    };

    const handleCall = () => {
        if (customer?.mobile) window.location.href = `tel:${customer.mobile}`;
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
        setTimeout(loadCustomer, 300);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
                    <p className="mt-4 text-gray-500">Loading customer...</p>
                </div>
            </div>
        );
    }

    if (!customer) return null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/customers')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Back to customers"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                            <Building2 className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {customer.company_name}
                            </h1>
                            <div className="flex items-center gap-3 mt-1">
                                <Badge variant={statusColors[customer.status] || 'default'}>
                                    {customer.status}
                                </Badge>
                                <span className="text-sm text-gray-500 font-mono">
                                    {customer.customer_code}
                                </span>
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
                    {/* Company Info */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <Building2 className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Company Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Company Name</p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Building2 className="w-3.5 h-3.5 text-gray-400" />
                                    {customer.company_name}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Customer Code</p>
                                <p className="text-sm font-medium font-mono flex items-center gap-2">
                                    <Hash className="w-3.5 h-3.5 text-gray-400" />
                                    {customer.customer_code}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">GST Number</p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <FileText className="w-3.5 h-3.5 text-gray-400" />
                                    {customer.gstin || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">PAN Number</p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <FileText className="w-3.5 h-3.5 text-gray-400" />
                                    {customer.pan || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Type</p>
                                <Badge variant="info">{customer.customer_type || '-'}</Badge>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Group</p>
                                <p className="text-sm font-medium">
                                    {customer.customer_group || '-'}
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Contact Info */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Contact Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Contact Person</p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <User className="w-3.5 h-3.5 text-gray-400" />
                                    {customer.contact_person || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Mobile</p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                                    {customer.mobile ? (
                                        <a href={`tel:${customer.mobile}`} className="text-blue-600 hover:underline">
                                            {customer.mobile}
                                        </a>
                                    ) : ('-')}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">WhatsApp</p>
                                <p className="text-sm font-medium">{customer.whatsapp || '-'}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-xs text-gray-500 uppercase mb-1">Email</p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                                    {customer.email ? (
                                        <a href={`mailto:${customer.email}`} className="text-blue-600 hover:underline">
                                            {customer.email}
                                        </a>
                                    ) : ('-')}
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Address */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <MapPin className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Address</h3>
                        </div>

                        <p className="text-sm text-gray-700 flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span>
                                {customer.billing_address || '-'}
                                {customer.city && `, ${customer.city}`}
                                {customer.state && `, ${customer.state}`}
                                {customer.pin_code && ` - ${customer.pin_code}`}
                                {customer.country && `, ${customer.country}`}
                            </span>
                        </p>
                    </Card>
                </div>

                {/* RIGHT */}
                <div className="space-y-6">
                    {/* Credit Info */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <CreditCard className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Credit Info</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Credit Limit</p>
                                <p className="text-lg font-bold text-blue-600 flex items-center gap-1">
                                    <DollarSign className="w-4 h-4" />
                                    ₹{Number(customer.credit_limit || 0).toLocaleString('en-IN')}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Credit Days</p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                    {customer.credit_days || 0} days
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Payment Terms</p>
                                <p className="text-sm font-medium">
                                    {customer.payment_terms || '-'}
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Status */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Status</h3>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Current</span>
                                <Badge variant={statusColors[customer.status]}>
                                    {customer.status}
                                </Badge>
                            </div>
                            {customer.created_at && (
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Added</span>
                                    <span className="text-sm font-medium">
                                        {new Date(customer.created_at).toLocaleDateString('en-IN')}
                                    </span>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <ShoppingCart className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Quick Actions</h3>
                        </div>

                        <div className="space-y-2">
                            <Button
                                variant="outline"
                                onClick={() => navigate(`/quotations?customer=${customer.id}`)}
                                className="w-full justify-center flex items-center gap-2"
                            >
                                <FileText className="w-4 h-4" />
                                New Quotation
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate(`/sales-orders?customer=${customer.id}`)}
                                className="w-full justify-center flex items-center gap-2"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                View Orders
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate(`/invoices?customer=${customer.id}`)}
                                className="w-full justify-center flex items-center gap-2"
                            >
                                <Receipt className="w-4 h-4" />
                                View Invoices
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate(`/payments?customer=${customer.id}`)}
                                className="w-full justify-center flex items-center gap-2"
                            >
                                <Wallet className="w-4 h-4" />
                                View Payments
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
                            <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-lg font-semibold text-gray-800">
                            Edit Customer
                        </span>
                    </div>
                }
                size="lg"
            >
                <CustomerForm onClose={handleEditClose} editData={customer} />
            </Modal>
        </div>
    );
}

// Customer Form (reused)
function CustomerForm({ onClose, editData }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            company_name: editData?.company_name || '',
            contact_person: editData?.contact_person || '',
            mobile: editData?.mobile || '',
            email: editData?.email || '',
            address: editData?.billing_address || '',
            city: editData?.city || '',
            state: editData?.state || '',
            pin_code: editData?.pin_code || '',
            country: editData?.country || 'India',
            gstin: editData?.gstin || '',
            pan: editData?.pan || '',
            customer_type: editData?.customer_type || 'Retailer',
            credit_limit: editData?.credit_limit || '',
            credit_days: editData?.credit_days || 30,
            status: editData?.status || 'Active',
        },
    });

    const onSubmit = async (data) => {
        try {
            const payload = {
                company_name: data.company_name,
                contact_person: data.contact_person,
                mobile: data.mobile,
                email: data.email,
                billing_address: data.address,
                city: data.city,
                state: data.state,
                pin_code: data.pin_code,
                country: data.country,
                gstin: data.gstin,
                pan: data.pan,
                customer_type: data.customer_type,
                credit_limit: Number(data.credit_limit) || 0,
                credit_days: Number(data.credit_days) || 30,
                status: data.status,
            };

            await customersAPI.update(editData.id, payload);
            toast.success('Customer updated successfully!');
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save customer');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <Input
                    label="Company Name"
                    required
                    icon={Building2}
                    {...register('company_name', { required: 'Required' })}
                    error={errors.company_name?.message}
                />
                <Input
                    label="Contact Person"
                    required
                    icon={User}
                    {...register('contact_person', { required: 'Required' })}
                    error={errors.contact_person?.message}
                />
                <Input label="Mobile" required icon={Phone} {...register('mobile', { required: 'Required' })} error={errors.mobile?.message} />
                <Input
                    label="Email"
                    required
                    icon={Mail}
                    {...register('email', {
                        required: 'Required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                    })}
                    error={errors.email?.message}
                />
                <Input label="GST No" icon={FileText} {...register('gstin')} />
                <Input label="PAN No" icon={FileText} {...register('pan')} />
                <div className="md:col-span-2">
                    <Input label="Address" icon={MapPin} {...register('address')} />
                </div>
                <Input label="City" icon={Building2} {...register('city')} />
                <Input label="State" icon={MapPin} {...register('state')} />
                <Input label="Pincode" icon={MapPin} {...register('pin_code')} />
                <Select
                    label="Country"
                    icon={Globe}
                    {...register('country')}
                    options={[
                        { value: 'India', label: 'India' },
                        { value: 'USA', label: 'USA' },
                        { value: 'UK', label: 'UK' },
                    ]}
                />
                <Select
                    label="Customer Type"
                    required
                    icon={Users}
                    {...register('customer_type', { required: 'Required' })}
                    error={errors.customer_type?.message}
                    options={[
                        { value: 'Retailer', label: 'Retailer' },
                        { value: 'Distributor', label: 'Distributor' },
                        { value: 'Wholesaler', label: 'Wholesaler' },
                        { value: 'Exporter', label: 'Exporter' },
                        { value: 'E-commerce', label: 'E-commerce' },
                        { value: 'Corporate', label: 'Corporate' },
                    ]}
                />
                <Input label="Credit Limit (₹)" icon={CreditCard} {...register('credit_limit')} type="number" />
                <Input label="Credit Days" icon={Calendar} {...register('credit_days')} type="number" />
                <Select
                    label="Status"
                    icon={CheckCircle}
                    {...register('status')}
                    options={[
                        { value: 'Active', label: 'Active' },
                        { value: 'Inactive', label: 'Inactive' },
                        { value: 'Pending', label: 'Pending' },
                    ]}
                />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={onClose} type="button">
                    Cancel
                </Button>
                <Button type="submit" loading={isSubmitting}>
                    Update Customer
                </Button>
            </div>
        </form>
    );
}