import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Eye, Printer, FileText, Building2, Calendar,
    Package, Clock, Truck, CheckCircle, XCircle, ClipboardCheck,
    Warehouse, Loader2, User, Hash, AlertCircle,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
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

export default function GRNDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [grn, setGrn] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isQCModalOpen, setIsQCModalOpen] = useState(false);

    // ✅ Load GRN details
    const loadGRN = async () => {
        try {
            setLoading(true);
            const response = await grnAPI.getById(id);
            console.log('📦 GRN details:', response.data.data);
            setGrn(response.data.data);
        } catch (error) {
            console.error('❌ Load GRN error:', error);
            toast.error(error.response?.data?.message || 'Failed to load GRN');
            navigate('/grn');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) loadGRN();
    }, [id]);

    const handleStartQC = () => {
        setIsQCModalOpen(true);
    };

    const handleQCClose = () => {
        setIsQCModalOpen(false);
        setTimeout(loadGRN, 500);
    };

    const handlePrint = () => {
        toast.info('Opening print dialog...');
        setTimeout(() => window.print(), 200);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
                    <p className="mt-4 text-gray-500">Loading GRN...</p>
                </div>
            </div>
        );
    }

    if (!grn) return null;

    const canStartQC = grn.status === 'QC Pending';

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/grn')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {grn.grn_number}
                        </h1>
                        <div className="flex items-center gap-3 mt-1">
                            <Badge variant={statusColors[grn.status] || 'default'}>
                                {grn.status}
                            </Badge>
                            <span className="text-sm text-gray-500">
                                {new Date(grn.grn_date).toLocaleDateString('en-IN', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    {canStartQC && (
                        <Button
                            onClick={handleStartQC}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700"
                        >
                            <ClipboardCheck className="w-4 h-4" />
                            Start QC Inspection
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        onClick={handlePrint}
                        className="flex items-center gap-2"
                    >
                        <Printer className="w-4 h-4" />
                        Print
                    </Button>
                </div>
            </div>

            {/* Status Alert */}
            {grn.status === 'QC Pending' && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-blue-800">
                            QC Inspection Pending
                        </p>
                        <p className="text-sm text-blue-700 mt-0.5">
                            This GRN has not been inspected yet. Stock will be added only
                            after QC is marked as "Accepted".
                        </p>
                    </div>
                </div>
            )}

            {grn.status === 'Accepted' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-emerald-800">
                            Stock Added
                        </p>
                        <p className="text-sm text-emerald-700 mt-0.5">
                            QC Accepted — {Number(grn.total_quantity || 0).toLocaleString('en-IN')} KG
                            has been added to stock.
                        </p>
                    </div>
                </div>
            )}

            {grn.status === 'Rejected' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-red-800">
                            GRN Rejected
                        </p>
                        <p className="text-sm text-red-700 mt-0.5">
                            This GRN was rejected during QC. No stock has been added.
                        </p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LEFT — Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* GRN Info */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <FileText className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">
                                GRN Information
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">
                                    Supplier
                                </p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Building2 className="w-3.5 h-3.5 text-gray-400" />
                                    {grn.supplier_name || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">PO Number</p>
                                <p className="text-sm font-medium text-blue-600">
                                    {grn.po_number || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">GRN Date</p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                    {new Date(grn.grn_date).toLocaleDateString('en-IN')}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Warehouse</p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Warehouse className="w-3.5 h-3.5 text-gray-400" />
                                    {grn.warehouse_name || 'Default'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">
                                    Vehicle Number
                                </p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Truck className="w-3.5 h-3.5 text-gray-400" />
                                    {grn.vehicle_number || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Driver Name</p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <User className="w-3.5 h-3.5 text-gray-400" />
                                    {grn.driver_name || '-'}
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Items */}
                    <Card className="p-0 overflow-hidden">
                        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <Package className="w-4 h-4 text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900">Items</h3>
                            </div>
                            <span className="text-xs text-gray-500 font-medium px-3 py-1 bg-gray-50 rounded-full">
                                {grn.items?.length || 0} item
                                {(grn.items?.length || 0) !== 1 ? 's' : ''}
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Product
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Batch
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                                            Ordered
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                                            Received
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                                            Accepted
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                                            Rejected
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Unit
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {!grn.items || grn.items.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="px-4 py-12 text-center text-gray-400 text-sm"
                                            >
                                                No items in this GRN
                                            </td>
                                        </tr>
                                    ) : (
                                        grn.items.map((item, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50/50">
                                                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                    {item.product_name}
                                                    {item.grade && (
                                                        <span className="text-xs text-gray-500 block">
                                                            {item.grade}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-sm font-mono text-gray-600">
                                                    {item.batch_number || '-'}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-right text-gray-600">
                                                    {Number(item.ordered_quantity || 0).toLocaleString()}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-right text-gray-700 font-medium">
                                                    {Number(item.received_quantity || 0).toLocaleString()}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-right text-green-600 font-medium">
                                                    {Number(item.accepted_quantity || 0).toLocaleString()}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-right text-red-600 font-medium">
                                                    {Number(item.rejected_quantity || 0).toLocaleString()}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600">
                                                    {item.unit || 'KG'}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    {/* Remarks */}
                    {grn.remarks && (
                        <Card className="p-6">
                            <h3 className="font-semibold text-gray-900 mb-3">Remarks</h3>
                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                                {grn.remarks}
                            </p>
                        </Card>
                    )}
                </div>

                {/* RIGHT — Sidebar */}
                <div className="space-y-6">
                    {/* Quantity Summary */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <Package className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Quantity</h3>
                        </div>

                        <dl className="space-y-3">
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Total Received</dt>
                                <dd className="text-sm font-medium">
                                    {Number(grn.total_quantity || 0).toLocaleString('en-IN')} KG
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Accepted</dt>
                                <dd className="text-sm font-semibold text-green-600">
                                    {Number(grn.accepted_quantity || 0).toLocaleString('en-IN')} KG
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Rejected</dt>
                                <dd className="text-sm font-semibold text-red-600">
                                    {Number(grn.rejected_quantity || 0).toLocaleString('en-IN')} KG
                                </dd>
                            </div>
                        </dl>
                    </Card>

                    {/* Status */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <Clock className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Status</h3>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Current</span>
                                <Badge variant={statusColors[grn.status]}>
                                    {grn.status}
                                </Badge>
                            </div>
                            {grn.created_at && (
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Created</span>
                                    <span className="text-sm font-medium">
                                        {new Date(grn.created_at).toLocaleDateString('en-IN')}
                                    </span>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <ClipboardCheck className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Actions</h3>
                        </div>

                        <div className="space-y-2">
                            {canStartQC && (
                                <Button
                                    onClick={handleStartQC}
                                    className="w-full justify-center flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700"
                                >
                                    <ClipboardCheck className="w-4 h-4" />
                                    Start QC Inspection
                                </Button>
                            )}

                            <Button
                                variant="outline"
                                onClick={handlePrint}
                                className="w-full justify-center flex items-center gap-2"
                            >
                                <Printer className="w-4 h-4" />
                                Print GRN
                            </Button>

                            {grn.purchase_order_id && (
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        navigate(`/purchase-orders/${grn.purchase_order_id}`)
                                    }
                                    className="w-full justify-center flex items-center gap-2"
                                >
                                    <FileText className="w-4 h-4" />
                                    View Purchase Order
                                </Button>
                            )}
                        </div>
                    </Card>
                </div>
            </div>

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
                {grn && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="text-xs text-gray-500">GRN No</p>
                                <p className="text-sm font-semibold">{grn.grn_number}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Supplier</p>
                                <p className="text-sm font-medium">{grn.supplier_name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">PO No</p>
                                <p className="text-sm">{grn.po_number || '-'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Total Quantity</p>
                                <p className="text-sm font-semibold text-blue-600">
                                    {grn.total_quantity} KG
                                </p>
                            </div>
                        </div>
                        <QCForm onClose={handleQCClose} grnData={grn} />
                    </div>
                )}
            </Modal>
        </div>
    );
}