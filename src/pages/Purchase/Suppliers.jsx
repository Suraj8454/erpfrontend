

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import {
    Plus, Filter, Download, Search, Eye, Edit, Trash2,
    Star, Mail, Phone, RefreshCw, Users, Building2, User,
    Hash, Globe, Package, MessageSquare, CheckCircle, Building,
    FileText, CreditCard, UserCheck, Award, MapPin,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { suppliersAPI } from '../../services/api';

const statusColors = {
    Active: 'success',
    Inactive: 'danger',
    Pending: 'warning',
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

export default function Suppliers() {
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSupplier, setEditingSupplier] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // ✅ Load suppliers
    const loadSuppliers = async () => {
        try {
            setLoading(true);
            const response = await suppliersAPI.getAll({
                search: searchTerm,
                status: filterStatus,
            });
            setSuppliers(response.data.data || []);
        } catch (error) {
            console.error('Load suppliers error:', error);
            toast.error(error.response?.data?.message || 'Failed to load suppliers');
            setSuppliers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(loadSuppliers, 300);
        return () => clearTimeout(delay);
    }, [searchTerm, filterStatus]);

    const handleViewSupplier = (id) => {
        navigate(`/suppliers/${id}`);
    };

    const handleEditSupplier = (supplier) => {
        setEditingSupplier(supplier);
        setIsModalOpen(true);
    };

    const handleDeleteSupplier = async (id) => {
        if (!window.confirm('Delete this supplier?')) return;

        try {
            await suppliersAPI.delete(id);
            toast.success('Supplier deleted');
            loadSuppliers();
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const handleSendEmail = (email) => {
        if (email) window.location.href = `mailto:${email}`;
    };

    const handleNewSupplier = () => {
        setEditingSupplier(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingSupplier(null);
    };

    const columns = [
        { header: 'Supplier Code', accessor: 'supplier_code', sortable: true },
        {
            header: 'Supplier Name',
            accessor: 'company_name',
            sortable: true,
            render: (value) => (
                <span className="font-medium text-gray-800">{value || 'N/A'}</span>
            ),
        },
        { header: 'Contact', accessor: 'contact_person' },
        {
            header: 'Mobile',
            accessor: 'mobile',
            render: (value) =>
                value ? (
                    <a
                        href={`tel:${value}`}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        {value}
                    </a>
                ) : (
                    '-'
                ),
        },
        { header: 'City', accessor: 'city' },
        { header: 'Products', accessor: 'products_supplied' },
        {
            header: 'Rating',
            accessor: 'rating',
            render: (value) => (
                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">
                        {Number(value || 0).toFixed(1)}
                    </span>
                </div>
            ),
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (value) => (
                <Badge variant={statusColors[value] || 'default'}>{value}</Badge>
            ),
        },
        { header: 'Payment Terms', accessor: 'payment_terms' },
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
                            handleViewSupplier(row.id);
                        }}
                    >
                        <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-gray-100 rounded-lg"
                        title="Edit"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditSupplier(row);
                        }}
                    >
                        <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-blue-50 rounded-lg"
                        title="Send Email"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSendEmail(row.email);
                        }}
                    >
                        <Mail className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-red-50 rounded-lg"
                        title="Delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteSupplier(row.id);
                        }}
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                </div>
            ),
        },
    ];

    // Calculate stats
    const totalSuppliers = suppliers.length;
    const activeSuppliers = suppliers.filter((s) => s.status === 'Active').length;
    const avgRating =
        totalSuppliers > 0
            ? (
                suppliers.reduce((sum, s) => sum + Number(s.rating || 0), 0) /
                totalSuppliers
            ).toFixed(1)
            : '0.0';

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
                            Suppliers
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Manage vendor relationships and purchase history
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <Button
                        variant="outline"
                        onClick={loadSuppliers}
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
                        onClick={handleNewSupplier}
                        className="flex items-center gap-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700"
                    >
                        <Plus className="w-4 h-4" />
                        New Supplier
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <StatCard
                    icon={Users}
                    label="Total Suppliers"
                    value={totalSuppliers}
                    color="text-blue-600"
                    borderColor="border-blue-500"
                />
                <StatCard
                    icon={CheckCircle}
                    label="Active"
                    value={activeSuppliers}
                    subtext={
                        totalSuppliers > 0
                            ? `${Math.round((activeSuppliers / totalSuppliers) * 100)}% of total`
                            : '0%'
                    }
                    color="text-green-600"
                    borderColor="border-green-500"
                />
                <StatCard
                    icon={Award}
                    label="Average Rating"
                    value={
                        <span className="flex items-center gap-1">
                            {avgRating}
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        </span>
                    }
                    color="text-yellow-600"
                    borderColor="border-yellow-500"
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
                                placeholder="Search suppliers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200/80 rounded-lg text-sm"
                            />
                        </div>
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2.5 border border-gray-200/80 rounded-lg text-sm"
                    >
                        <option value="all">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                    </select>
                    <span className="text-sm text-gray-400 ml-auto font-medium">
                        {suppliers.length} suppliers found
                    </span>
                </div>
            </Card>

            {/* Table */}
            <Card className="p-0 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
                        <p className="text-sm text-gray-500 mt-3">Loading suppliers...</p>
                    </div>
                ) : suppliers.length === 0 ? (
                    <div className="p-12 text-center">
                        <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No suppliers found</p>
                        <Button
                            onClick={handleNewSupplier}
                            className="mt-4 inline-flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Create First Supplier
                        </Button>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        data={suppliers}
                        totalItems={suppliers.length}
                        onRowClick={(row) => handleViewSupplier(row.id)}
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
                            {editingSupplier ? 'Edit Supplier' : 'New Supplier'}
                        </span>
                    </div>
                }
                size="lg"
            >
                <SupplierForm
                    onClose={() => {
                        handleCloseModal();
                        setTimeout(loadSuppliers, 300);
                    }}
                    editData={editingSupplier}
                />
            </Modal>
        </div>
    );
}

// ✅ Supplier Form with API
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
            website: editData?.website || '',
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
                bank_details: data.website, // or separate
                remarks: data.remarks,
            };

            if (editData) {
                await suppliersAPI.update(editData.id, payload);
                toast.success('Supplier updated successfully!');
            } else {
                await suppliersAPI.create(payload);
                toast.success('Supplier created successfully!');
            }
            onClose();
        } catch (error) {
            console.error('Submit error:', error);
            toast.error(error.response?.data?.message || 'Failed to save supplier');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <SectionHeader icon={Building2} title="Company Information" />

                <Input
                    label="Supplier Code"
                    icon={Hash}
                    value={editData ? editData.supplier_code : 'Auto-generated'}
                    disabled
                    className="bg-gray-50"
                />

                <Input
                    label="Company Name"
                    required
                    icon={Building2}
                    {...register('company_name', { required: 'Company name is required' })}
                    error={errors.company_name?.message}
                    placeholder="Makhana Suppliers Pvt Ltd"
                />

                <Input
                    label="GST No"
                    icon={FileText}
                    {...register('gstin')}
                    placeholder="22AAAAA0000A1Z5"
                />

                <Input
                    label="PAN No"
                    icon={FileText}
                    {...register('pan')}
                    placeholder="AAAAA0000A"
                />

                <SectionHeader icon={User} title="Contact Information" />

                <Input
                    label="Contact Person"
                    required
                    icon={User}
                    {...register('contact_person', { required: 'Contact person is required' })}
                    error={errors.contact_person?.message}
                    placeholder="Rajesh Singh"
                />

                <Input
                    label="Designation"
                    icon={UserCheck}
                    placeholder="Manager"
                />

                <Input
                    label="Mobile Number"
                    required
                    icon={Phone}
                    {...register('mobile', { required: 'Mobile number is required' })}
                    error={errors.mobile?.message}
                    placeholder="+91 9876543210"
                />

                <Input
                    label="Email"
                    required
                    icon={Mail}
                    {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                    })}
                    error={errors.email?.message}
                    placeholder="info@company.com"
                />

                <SectionHeader icon={MapPin} title="Address Information" />

                <div className="md:col-span-2">
                    <Input
                        label="Address"
                        icon={MapPin}
                        {...register('address')}
                        placeholder="123, Business Park, Andheri East"
                    />
                </div>

                <Input label="City" icon={Building} {...register('city')} placeholder="Mumbai" />

                <Input
                    label="State"
                    icon={MapPin}
                    {...register('state')}
                    placeholder="Maharashtra"
                />

                <Input
                    label="Pincode"
                    icon={MapPin}
                    {...register('pin_code')}
                    placeholder="400093"
                />

                <Select
                    label="Country"
                    icon={Globe}
                    {...register('country')}
                    options={[
                        { value: 'India', label: 'India' },
                        { value: 'USA', label: 'USA' },
                        { value: 'UK', label: 'UK' },
                        { value: 'UAE', label: 'UAE' },
                    ]}
                />

                <SectionHeader icon={Package} title="Business Details" />

                <Input
                    label="Products/Services"
                    icon={Package}
                    {...register('products_supplied')}
                    placeholder="4 Suta, 5 Suta, Premium"
                />

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
                        { value: '90 Days', label: '90 Days' },
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
                    <Input
                        label="Website"
                        icon={Globe}
                        {...register('website')}
                        placeholder="www.company.com"
                    />
                </div>

                <SectionHeader icon={MessageSquare} title="Remarks" />

                <div className="md:col-span-2">
                    <textarea
                        {...register('remarks')}
                        rows="2"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                        placeholder="Any additional notes about this supplier..."
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={onClose} type="button">
                    Cancel
                </Button>
                <Button type="submit" loading={isSubmitting}>
                    {editData ? 'Update Supplier' : 'Create Supplier'}
                </Button>
            </div>
        </form>
    );
}