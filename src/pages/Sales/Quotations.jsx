

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus, Filter, Download, Search, Eye, Edit, Trash2,
    CheckCircle, Clock, FileText, Send, Printer, Copy,
    RefreshCw, AlertTriangle, Zap, Award,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import QuotationForm from '../../components/forms/QuotationForm';
import { quotationsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const statusColors = {
    Draft: 'gray',
    'Pending Approval': 'warning',
    Approved: 'success',
    Sent: 'info',
    Negotiation: 'warning',
    Accepted: 'success',
    Rejected: 'danger',
    Expired: 'danger',
    Cancelled: 'danger',
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

export default function Quotations() {
    const navigate = useNavigate();
    const [quotations, setQuotations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingQuotation, setEditingQuotation] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // ✅ Load quotations
    const loadQuotations = async () => {
        try {
            setLoading(true);
            const response = await quotationsAPI.getAll({
                search: searchTerm,
                status: filterStatus,
            });
            setQuotations(response.data.data || []);
        } catch (error) {
            console.error('Load quotations error:', error);
            toast.error(error.response?.data?.message || 'Failed to load quotations');
            setQuotations([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(loadQuotations, 300);
        return () => clearTimeout(delay);
    }, [searchTerm, filterStatus]);

    // ✅ View
    const handleViewQuotation = (id) => {
        navigate(`/quotations/${id}`);
    };

    // ✅ Edit
    const handleEditQuotation = (quotation) => {
        setEditingQuotation(quotation);
        setIsModalOpen(true);
    };

    // ✅ Approve
    const handleApproveQuotation = async (id) => {
        if (!window.confirm('Approve this quotation?')) return;

        try {
            await quotationsAPI.approve(id);
            toast.success('Quotation approved successfully!');
            loadQuotations();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to approve');
        }
    };

    // ✅ Send
    const handleSendQuotation = async (id) => {
        if (!window.confirm('Mark this quotation as Sent?')) return;

        try {
            await quotationsAPI.updateStatus(id, 'Sent');
            toast.success('Quotation marked as sent!');
            loadQuotations();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    // ✅ Convert to order
    const handleConvertToOrder = async (id) => {
        if (!window.confirm('Convert this quotation to a Sales Order?')) return;

        try {
            const response = await quotationsAPI.convert(id, {
                delivery_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split('T')[0],
            });
            toast.success('Converted to Sales Order successfully!');
            loadQuotations();
            navigate(`/sales-orders/${response.data.data.id}`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Conversion failed');
        }
    };

    // ✅ Delete
    const handleDeleteQuotation = async (id) => {
        if (!window.confirm('Are you sure you want to delete this quotation?')) return;

        try {
            await quotationsAPI.delete(id);
            toast.success('Quotation deleted successfully');
            loadQuotations();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete');
        }
    };

    // ✅ Print
    const handlePrint = (id) => {
        window.print();
        toast.info(`Printing quotation ${id}`);
    };

    // ✅ Copy/Duplicate
    const handleCopy = async (quotation) => {
        try {
            const response = await quotationsAPI.getById(quotation.id);
            const fullQuotation = response.data.data;

            // Reset ID and status
            const newQuotation = {
                ...fullQuotation,
                id: undefined,
                quotation_number: undefined,
                status: 'Draft',
                items: fullQuotation.items?.map((item) => ({
                    product_id: item.product_id,
                    product_name: item.product_name,
                    grade: item.grade,
                    quantity: item.quantity,
                    unit: item.unit,
                    rate: item.rate,
                    discount_percent: item.discount_percent,
                    gst_rate: item.gst_rate,
                })),
            };

            setEditingQuotation(null);
            setIsModalOpen(true);
            toast.info('Duplicating quotation...');
            // Note: Modal will be empty; you can prefill via form props
        } catch (error) {
            toast.error('Failed to copy');
        }
    };

    // ✅ Open create modal
    const handleNewQuotation = () => {
        setEditingQuotation(null);
        setIsModalOpen(true);
    };

    // ✅ Close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingQuotation(null);
    };

    const columns = [
        { header: 'Quotation No', accessor: 'quotation_number', sortable: true },
        {
            header: 'Date',
            accessor: 'date',
            render: (value) => (value ? new Date(value).toLocaleDateString('en-IN') : '-'),
        },
        {
            header: 'Customer',
            accessor: 'customer_name',
            sortable: true,
            render: (value) => (
                <span className="font-medium text-gray-800">{value || 'N/A'}</span>
            ),
        },
        { header: 'Salesperson', accessor: 'salesperson_name' },
        {
            header: 'Amount',
            accessor: 'total',
            sortable: true,
            render: (value) => (
                <span className="font-semibold text-blue-600">
                    ₹{Number(value || 0).toLocaleString('en-IN')}
                </span>
            ),
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (value) => (
                <Badge variant={statusColors[value] || 'default'}>{value}</Badge>
            ),
        },
        {
            header: 'Valid Until',
            accessor: 'valid_until',
            render: (value) => (value ? new Date(value).toLocaleDateString('en-IN') : '-'),
        },
        {
            header: 'Items',
            accessor: 'items_count',
            render: (value) => (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                    {value || 0}
                </span>
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
                            handleViewQuotation(row.id);
                        }}
                    >
                        <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-gray-100 rounded-lg"
                        title="Edit"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditQuotation(row);
                        }}
                    >
                        <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    {row.status === 'Pending Approval' && (
                        <button
                            className="p-1.5 hover:bg-green-50 rounded-lg"
                            title="Approve"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleApproveQuotation(row.id);
                            }}
                        >
                            <CheckCircle className="w-4 h-4 text-green-600" />
                        </button>
                    )}
                    {row.status === 'Approved' && (
                        <button
                            className="p-1.5 hover:bg-blue-50 rounded-lg"
                            title="Convert to Order"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleConvertToOrder(row.id);
                            }}
                        >
                            <FileText className="w-4 h-4 text-blue-600" />
                        </button>
                    )}
                    {(row.status === 'Draft' || row.status === 'Pending Approval') && (
    <button
        className="p-1.5 hover:bg-green-50 rounded-lg"
        title="Approve"
        onClick={(e) => {
            e.stopPropagation();
            handleApproveQuotation(row.id);
        }}
    >
        <CheckCircle className="w-4 h-4 text-green-600" />
    </button>
)}
                    <button
                        className="p-1.5 hover:bg-gray-100 rounded-lg"
                        title="Print"
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePrint(row.id);
                        }}
                    >
                        <Printer className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-gray-100 rounded-lg"
                        title="Copy"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(row);
                        }}
                    >
                        <Copy className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-red-50 rounded-lg"
                        title="Delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteQuotation(row.id);
                        }}
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                </div>
            ),
        },
    ];

    // Calculate stats
    const totalQuotations = quotations.length;
    const pendingApproval = quotations.filter((q) => q.status === 'Pending Approval').length;
    const approved = quotations.filter((q) => q.status === 'Approved').length;
    const sent = quotations.filter((q) => q.status === 'Sent').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm">
                        <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
                            Quotations
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Create and manage quotations for customers
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <Button
                        variant="outline"
                        onClick={loadQuotations}
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
                        onClick={handleNewQuotation}
                        className="flex items-center gap-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700"
                    >
                        <Plus className="w-4 h-4" />
                        New Quotation
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    icon={FileText}
                    label="Total Quotations"
                    value={totalQuotations}
                    color="text-blue-600"
                    borderColor="border-blue-500"
                />
                <StatCard
                    icon={Clock}
                    label="Pending Approval"
                    value={pendingApproval}
                    color="text-yellow-600"
                    borderColor="border-yellow-500"
                />
                <StatCard
                    icon={CheckCircle}
                    label="Approved"
                    value={approved}
                    color="text-green-600"
                    borderColor="border-green-500"
                />
                <StatCard
                    icon={Send}
                    label="Sent"
                    value={sent}
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
                                placeholder="Search quotations..."
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
                        <option value="Draft">Draft</option>
                        <option value="Pending Approval">Pending Approval</option>
                        <option value="Approved">Approved</option>
                        <option value="Sent">Sent</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Expired">Expired</option>
                    </select>
                    <span className="text-sm text-gray-400 ml-auto font-medium">
                        {quotations.length} quotations found
                    </span>
                </div>
            </Card>

            {/* Table */}
            <Card className="p-0 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
                        <p className="text-sm text-gray-500 mt-3">Loading quotations...</p>
                    </div>
                ) : quotations.length === 0 ? (
                    <div className="p-12 text-center">
                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No quotations found</p>
                        <Button
                            onClick={handleNewQuotation}
                            className="mt-4 inline-flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Create First Quotation
                        </Button>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        data={quotations}
                        totalItems={quotations.length}
                        onRowClick={(row) => handleViewQuotation(row.id)}
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
                            <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-lg font-semibold text-gray-800">
                            {editingQuotation ? 'Edit Quotation' : 'New Quotation'}
                        </span>
                    </div>
                }
                size="lg"
            >
                <QuotationForm
                    onClose={handleCloseModal}
                    quotationData={editingQuotation}
                />
            </Modal>
        </div>
    );
}