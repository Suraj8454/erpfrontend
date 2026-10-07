

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Filter, Download, Search, Eye, CheckCircle, XCircle,
    Clock, ClipboardCheck, RefreshCw, FileText, AlertCircle,
    Package, Warehouse,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import QCForm from '../../components/forms/QCForm';
import { grnAPI } from '../../services/api';
import toast from 'react-hot-toast';

const statusColors = {
    'QC Pending': 'warning',
    Accepted: 'success',
    'Partially Accepted': 'warning',
    Rejected: 'danger',
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

export default function GRN() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [grns, setGrns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isQCModalOpen, setIsQCModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedGRN, setSelectedGRN] = useState(null);

    const poParam = searchParams.get('po');

    // ✅ Load GRNs
    const loadGRNs = async () => {
        try {
            setLoading(true);
            const response = await grnAPI.getAll({
                search: searchTerm,
                status: filterStatus,
            });
            setGrns(response.data.data || []);
        } catch (error) {
            console.error('Load GRNs error:', error);
            toast.error(error.response?.data?.message || 'Failed to load GRNs');
            setGrns([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(loadGRNs, 300);
        return () => clearTimeout(delay);
    }, [searchTerm, filterStatus]);

    const handleViewGRN = (id) => {
        navigate(`/grn/${id}`);
    };

    // ✅ Start QC
    const handleStartQC = (grn) => {
        setSelectedGRN(grn);
        setIsQCModalOpen(true);
    };

    // ✅ Close QC modal + reload
    const handleQCClose = () => {
        setIsQCModalOpen(false);
        setSelectedGRN(null);
        setTimeout(loadGRNs, 500);
    };

    const handleCreateFromPO = () => {
        navigate('/purchase-orders');
    };

    const columns = [
        { header: 'GRN No', accessor: 'grn_number', sortable: true },
        {
            header: 'Date',
            accessor: 'grn_date',
            render: (value) => (value ? new Date(value).toLocaleDateString('en-IN') : '-'),
        },
        {
            header: 'Supplier',
            accessor: 'supplier_name',
            sortable: true,
            render: (value) => (
                <span className="font-medium text-gray-800">{value || 'N/A'}</span>
            ),
        },
        { header: 'PO', accessor: 'po_number', render: (value) => value || '-' },
        {
            header: 'Total Qty',
            accessor: 'total_quantity',
            render: (value) => (
                <span className="font-medium">
                    {Number(value || 0).toLocaleString('en-IN')} KG
                </span>
            ),
        },
        {
            header: 'Accepted',
            accessor: 'accepted_quantity',
            render: (value) => (
                <span className="font-medium text-green-600">
                    {Number(value || 0).toLocaleString('en-IN')} KG
                </span>
            ),
        },
        {
            header: 'Rejected',
            accessor: 'rejected_quantity',
            render: (value) => (
                <span className="font-medium text-red-600">
                    {Number(value || 0).toLocaleString('en-IN')} KG
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
        { header: 'Vehicle', accessor: 'vehicle_number', render: (value) => value || '-' },
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
                            handleViewGRN(row.id);
                        }}
                    >
                        <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    {row.status === 'QC Pending' && (
                        <button
                            className="p-1.5 hover:bg-blue-50 rounded-lg"
                            title="Start QC"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleStartQC(row);
                            }}
                        >
                            <ClipboardCheck className="w-4 h-4 text-blue-600" />
                        </button>
                    )}
                </div>
            ),
        },
    ];

    // Calculate stats
    const totalReceived = grns.reduce(
        (sum, g) => sum + Number(g.total_quantity || 0),
        0
    );
    const totalAccepted = grns.reduce(
        (sum, g) => sum + Number(g.accepted_quantity || 0),
        0
    );
    const totalRejected = grns.reduce(
        (sum, g) => sum + Number(g.rejected_quantity || 0),
        0
    );
    const pendingQC = grns.filter((g) => g.status === 'QC Pending').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm">
                        <Warehouse className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
                            Goods Receipt Notes
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Manage incoming goods and quality control
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <Button
                        variant="outline"
                        onClick={loadGRNs}
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
                        variant="outline"
                        className="flex items-center gap-2 text-sm border-blue-200 text-blue-600"
                        onClick={handleCreateFromPO}
                    >
                        <FileText className="w-4 h-4" />
                        Receive from PO
                    </Button>
                </div>
            </div>

            {/* Alert if coming from PO */}
            {poParam && (
                <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl p-5 flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-blue-800">Receiving from PO</p>
                        <p className="text-sm text-blue-700 mt-0.5">
                            Creating GRN for Purchase Order:{' '}
                            <span className="font-medium">{poParam}</span>
                        </p>
                    </div>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    icon={Package}
                    label="Total Received"
                    value={`${totalReceived.toLocaleString()} KG`}
                    color="text-blue-600"
                    borderColor="border-blue-500"
                />
                <StatCard
                    icon={CheckCircle}
                    label="Accepted"
                    value={`${totalAccepted.toLocaleString()} KG`}
                    subtext={
                        totalReceived > 0
                            ? `${Math.round((totalAccepted / totalReceived) * 100)}% of total`
                            : '0%'
                    }
                    color="text-green-600"
                    borderColor="border-green-500"
                />
                <StatCard
                    icon={XCircle}
                    label="Rejected"
                    value={`${totalRejected.toLocaleString()} KG`}
                    subtext={
                        totalReceived > 0
                            ? `${Math.round((totalRejected / totalReceived) * 100)}% of total`
                            : '0%'
                    }
                    color="text-red-600"
                    borderColor="border-red-500"
                />
                <StatCard
                    icon={Clock}
                    label="Pending QC"
                    value={pendingQC}
                    subtext="Awaiting inspection"
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
                                placeholder="Search GRN..."
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
                        <option value="QC Pending">QC Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Partially Accepted">Partially Accepted</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    <span className="text-sm text-gray-400 ml-auto font-medium">
                        {grns.length} GRN found
                    </span>
                </div>
            </Card>

            {/* Table */}
            <Card className="p-0 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
                        <p className="text-sm text-gray-500 mt-3">Loading GRNs...</p>
                    </div>
                ) : grns.length === 0 ? (
                    <div className="p-12 text-center">
                        <Warehouse className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No GRNs found</p>
                        <p className="text-sm text-gray-400 mt-1">
                            GRNs are created when you receive purchase orders
                        </p>
                        <Button
                            onClick={handleCreateFromPO}
                            className="mt-4 inline-flex items-center gap-2"
                        >
                            <FileText className="w-4 h-4" />
                            Go to Purchase Orders
                        </Button>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        data={grns}
                        totalItems={grns.length}
                        onRowClick={(row) => handleViewGRN(row.id)}
                    />
                )}
            </Card>

            {/* QC Modal */}
            <Modal
                isOpen={isQCModalOpen}
                onClose={() => {
                    setIsQCModalOpen(false);
                    setSelectedGRN(null);
                }}
                title="Quality Control Inspection"
                size="lg"
            >
                {selectedGRN && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="text-xs text-gray-500">GRN No</p>
                                <p className="text-sm font-semibold">
                                    {selectedGRN.grn_number}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Supplier</p>
                                <p className="text-sm font-medium">
                                    {selectedGRN.supplier_name}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">PO No</p>
                                <p className="text-sm">{selectedGRN.po_number || '-'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Total Quantity</p>
                                <p className="text-sm font-semibold text-blue-600">
                                    {selectedGRN.total_quantity} KG
                                </p>
                            </div>
                        </div>
                        <QCForm
                            onClose={handleQCClose}
                            grnData={selectedGRN}
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
}