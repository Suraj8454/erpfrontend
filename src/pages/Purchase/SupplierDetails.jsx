import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Edit, Trash2, Printer, Building2, User, Mail,
    Phone, MapPin, Globe, FileText, CreditCard, Star, Package,
    Loader2, Hash, Award, Calendar, Truck, ShoppingCart, CheckCircle,Users
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { useForm } from 'react-hook-form';
import { suppliersAPI } from '../../services/api';
import toast from 'react-hot-toast';

const statusColors = {
    Active: 'success',
    Inactive: 'danger',
    Pending: 'warning',
};

export default function SupplierDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [actionLoading, setActionLoading] = useState('');

    // ✅ Load supplier
    const loadSupplier = async () => {
        try {
            setLoading(true);
            const response = await suppliersAPI.getById(id);
            console.log('📦 Supplier details:', response.data.data);
            setSupplier(response.data.data);
        } catch (error) {
            console.error('❌ Load supplier error:', error);
            toast.error(error.response?.data?.message || 'Failed to load supplier');
            navigate('/suppliers');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) loadSupplier();
    }, [id]);

    // ✅ Delete
    const handleDelete = async () => {
        if (!window.confirm('Delete this supplier permanently?')) return;
        try {
            setActionLoading('delete');
            await suppliersAPI.delete(id);
            toast.success('Supplier deleted');
            navigate('/suppliers');
        } catch (error) {
            toast.error('Failed to delete');
            setActionLoading('');
        }
    };

    // ✅ Email
    const handleSendEmail = () => {
        if (supplier?.email) {
            window.location.href = `mailto:${supplier.email}`;
        }
    };

    // ✅ Call
    const handleCall = () => {
        if (supplier?.mobile) {
            window.location.href = `tel:${supplier.mobile}`;
        }
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
        setTimeout(loadSupplier, 300);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
                    <p className="mt-4 text-gray-500">Loading supplier...</p>
                </div>
            </div>
        );
    }

    if (!supplier) return null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/suppliers')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {supplier.company_name}
                        </h1>
                        <div className="flex items-center gap-3 mt-1">
                            <Badge variant={statusColors[supplier.status] || 'default'}>
                                {supplier.status}
                            </Badge>
                            <span className="text-sm text-gray-500 font-mono">
                                {supplier.supplier_code}
                            </span>
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
                                    {supplier.company_name}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Supplier Code</p>
                                <p className="text-sm font-medium font-mono flex items-center gap-2">
                                    <Hash className="w-3.5 h-3.5 text-gray-400" />
                                    {supplier.supplier_code}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">GST Number</p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <FileText className="w-3.5 h-3.5 text-gray-400" />
                                    {supplier.gstin || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">PAN Number</p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <FileText className="w-3.5 h-3.5 text-gray-400" />
                                    {supplier.pan || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Category</p>
                                <p className="text-sm font-medium">
                                    {supplier.supplier_category || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Rating</p>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    <span className="text-sm font-medium">
                                        {Number(supplier.rating || 0).toFixed(1)}
                                    </span>
                                </div>
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
                                    {supplier.contact_person || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Designation</p>
                                <p className="text-sm font-medium">
                                    {supplier.designation || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Mobile</p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                                    {supplier.mobile ? (
                                        <a
                                            href={`tel:${supplier.mobile}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {supplier.mobile}
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">WhatsApp</p>
                                <p className="text-sm font-medium">
                                    {supplier.whatsapp || '-'}
                                </p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-xs text-gray-500 uppercase mb-1">Email</p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                                    {supplier.email ? (
                                        <a
                                            href={`mailto:${supplier.email}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {supplier.email}
                                        </a>
                                    ) : (
                                        '-'
                                    )}
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
                                {supplier.address || '-'}
                                {supplier.city && `, ${supplier.city}`}
                                {supplier.state && `, ${supplier.state}`}
                                {supplier.pin_code && ` - ${supplier.pin_code}`}
                                {supplier.country && `, ${supplier.country}`}
                            </span>
                        </p>
                    </Card>

                    {/* Remarks */}
                    {supplier.remarks && (
                        <Card className="p-6">
                            <h3 className="font-semibold text-gray-900 mb-3">Remarks</h3>
                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                                {supplier.remarks}
                            </p>
                        </Card>
                    )}
                </div>

                {/* RIGHT */}
                <div className="space-y-6">
                    {/* Business Details */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <Package className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Business</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">
                                    Products Supplied
                                </p>
                                <p className="text-sm font-medium">
                                    {supplier.products_supplied || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">
                                    Payment Terms
                                </p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <CreditCard className="w-3.5 h-3.5 text-gray-400" />
                                    {supplier.payment_terms || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">
                                    Credit Days
                                </p>
                                <p className="text-sm font-medium">
                                    {supplier.credit_days || 0} days
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
                                <Badge variant={statusColors[supplier.status]}>
                                    {supplier.status}
                                </Badge>
                            </div>
                            {supplier.created_at && (
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Added</span>
                                    <span className="text-sm font-medium">
                                        {new Date(supplier.created_at).toLocaleDateString('en-IN')}
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
                                onClick={() => navigate(`/purchase-orders?supplier=${supplier.id}`)}
                                className="w-full justify-center flex items-center gap-2"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                View Purchase Orders
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate(`/purchase-orders?new=true&supplier=${supplier.id}`)}
                                className="w-full justify-center flex items-center gap-2"
                            >
                                <Truck className="w-4 h-4" />
                                Create New PO
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleSendEmail}
                                className="w-full justify-center flex items-center gap-2"
                            >
                                <Mail className="w-4 h-4" />
                                Send Email
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
                            Edit Supplier
                        </span>
                    </div>
                }
                size="lg"
            >
                <SupplierForm onClose={handleEditClose} editData={supplier} />
            </Modal>
        </div>
    );
}

// ✅ Supplier Form (reuse from Suppliers.jsx)
function SupplierForm({ onClose, editData }) {
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
            address: editData?.address || '',
            city: editData?.city || '',
            state: editData?.state || '',
            pin_code: editData?.pin_code || '',
            country: editData?.country || 'India',
            gstin: editData?.gstin || '',
            pan: editData?.pan || '',
            products_supplied: editData?.products_supplied || '',
            payment_terms: editData?.payment_terms || '30 Days',
            status: editData?.status || 'Active',
            remarks: editData?.remarks || '',
        },
    });

    const onSubmit = async (data) => {
        try {
            const payload = {
                company_name: data.company_name,
                contact_person: data.contact_person,
                mobile: data.mobile,
                email: data.email,
                address: data.address,
                city: data.city,
                state: data.state,
                pin_code: data.pin_code,
                country: data.country,
                gstin: data.gstin,
                pan: data.pan,
                products_supplied: data.products_supplied,
                payment_terms: data.payment_terms,
                status: data.status,
                remarks: data.remarks,
            };

            await suppliersAPI.update(editData.id, payload);
            toast.success('Supplier updated successfully!');
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update supplier');
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
                <Input label="City" icon={Building} {...register('city')} />
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
                <Input label="Products" icon={Package} {...register('products_supplied')} />
                <Select
                    label="Payment Terms"
                    icon={CreditCard}
                    {...register('payment_terms')}
                    options={[
                        { value: 'Advance', label: 'Advance' },
                        { value: '15 Days', label: '15 Days' },
                        { value: '30 Days', label: '30 Days' },
                        { value: '45 Days', label: '45 Days' },
                        { value: '60 Days', label: '60 Days' },
                    ]}
                />
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
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                    <textarea
                        {...register('remarks')}
                        rows="2"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={onClose} type="button">
                    Cancel
                </Button>
                <Button type="submit" loading={isSubmitting}>
                    Update Supplier
                </Button>
            </div>
        </form>
    );
}