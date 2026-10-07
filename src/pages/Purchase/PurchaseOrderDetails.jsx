import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Edit, Trash2, CheckCircle, Printer,
    FileText, Building2, User, Calendar, Package,
    Clock, Receipt, Truck, Copy, Loader2,
    Ship, Warehouse, DollarSign,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import PurchaseOrderForm from '../../components/forms/PurchaseOrderForm';
import { purchaseOrdersAPI } from '../../services/api';
import toast from 'react-hot-toast';

const statusColors = {
    Pending: 'warning',
    Approved: 'info',
    Sent: 'info',
    Received: 'success',
    Partial: 'warning',
    Cancelled: 'danger',
};

export default function PurchaseOrderDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [actionLoading, setActionLoading] = useState('');

    // ✅ Load PO details
    const loadOrder = async () => {
        try {
            setLoading(true);
            const response = await purchaseOrdersAPI.getById(id);
            console.log('📦 PO details:', response.data.data);
            setOrder(response.data.data);
        } catch (error) {
            console.error('❌ Load PO error:', error);
            toast.error(error.response?.data?.message || 'Failed to load purchase order');
            navigate('/purchase-orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) loadOrder();
    }, [id]);

    // ✅ Approve
    const handleApprove = async () => {
        if (!window.confirm('Approve this purchase order?')) return;
        try {
            setActionLoading('approve');
            await purchaseOrdersAPI.updateStatus(id, 'Approved');
            toast.success('PO approved!');
            await loadOrder();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to approve');
        } finally {
            setActionLoading('');
        }
    };

    // ✅ Receive (navigate to GRN with prefill)
    const handleReceive = () => {
        navigate(`/grn?po=${id}`);
    };

    // ✅ Edit
    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    const handleEditClose = () => {
        setIsEditModalOpen(false);
        setTimeout(loadOrder, 300);
    };

    // ✅ Delete
    const handleDelete = async () => {
        if (!window.confirm('Delete this purchase order permanently?')) return;
        try {
            setActionLoading('delete');
            await purchaseOrdersAPI.delete(id);
            toast.success('PO deleted');
            navigate('/purchase-orders');
        } catch (error) {
            toast.error('Failed to delete');
            setActionLoading('');
        }
    };

    // ✅ Print
    const handlePrint = () => {
        toast.info('Opening print dialog...');
        setTimeout(() => window.print(), 200);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
                    <p className="mt-4 text-gray-500">Loading purchase order...</p>
                </div>
            </div>
        );
    }

    if (!order) return null;

    // Button visibility
    const canApprove = order.status === 'Pending';
    const canReceive = ['Approved', 'Sent'].includes(order.status);
    const canEdit = !['Received', 'Cancelled'].includes(order.status);
    const canDelete = order.status !== 'Received';

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/purchase-orders')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Back to purchase orders"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {order.po_number}
                        </h1>
                        <div className="flex items-center gap-3 mt-1">
                            <Badge variant={statusColors[order.status] || 'default'}>
                                {order.status}
                            </Badge>
                            <span className="text-sm text-gray-500">
                                {new Date(order.po_date).toLocaleDateString('en-IN', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-wrap">
                    {canApprove && (
                        <Button
                            onClick={handleApprove}
                            loading={actionLoading === 'approve'}
                            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-700"
                        >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                        </Button>
                    )}

                    {canReceive && (
                        <Button
                            onClick={handleReceive}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700"
                        >
                            <Truck className="w-4 h-4" />
                            Receive Goods
                        </Button>
                    )}

                    {canEdit && (
                        <Button
                            variant="outline"
                            onClick={handleEdit}
                            className="flex items-center gap-2"
                        >
                            <Edit className="w-4 h-4" />
                            Edit
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

                    {canDelete && (
                        <Button
                            variant="outline"
                            onClick={handleDelete}
                            loading={actionLoading === 'delete'}
                            className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LEFT */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Info */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <FileText className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">
                                Purchase Order Information
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Supplier</p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Building2 className="w-3.5 h-3.5 text-gray-400" />
                                    {order.supplier_name || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">
                                    Quotation Reference
                                </p>
                                <p className="text-sm font-medium">
                                    {order.quote_reference || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">PO Date</p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                    {new Date(order.po_date).toLocaleDateString('en-IN')}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">
                                    Expected Delivery
                                </p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                                    {order.expected_delivery
                                        ? new Date(order.expected_delivery).toLocaleDateString(
                                              'en-IN'
                                          )
                                        : '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">
                                    Payment Terms
                                </p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Receipt className="w-3.5 h-3.5 text-gray-400" />
                                    {order.payment_terms || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">
                                    Delivery Terms
                                </p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Truck className="w-3.5 h-3.5 text-gray-400" />
                                    {order.delivery_terms || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Freight</p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Ship className="w-3.5 h-3.5 text-gray-400" />
                                    ₹{Number(order.freight || 0).toLocaleString('en-IN')}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Warehouse</p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Warehouse className="w-3.5 h-3.5 text-gray-400" />
                                    {order.warehouse_name || 'Default'}
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
                                {order.items?.length || 0} item
                                {(order.items?.length || 0) !== 1 ? 's' : ''}
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
                                            Grade
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                                            Qty
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Unit
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                                            Rate
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {!order.items || order.items.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="px-4 py-12 text-center text-gray-400 text-sm"
                                            >
                                                No items in this purchase order
                                            </td>
                                        </tr>
                                    ) : (
                                        order.items.map((item, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50/50">
                                                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                    {item.product_name}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600">
                                                    {item.grade || '-'}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-right text-gray-700 font-medium">
                                                    {Number(item.quantity).toLocaleString('en-IN')}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600">
                                                    {item.unit || 'KG'}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-right text-gray-700">
                                                    ₹{Number(item.rate).toLocaleString('en-IN')}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-right font-semibold text-blue-600">
                                                    ₹{Number(item.total || 0).toLocaleString('en-IN')}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    {/* Remarks */}
                    {order.remarks && (
                        <Card className="p-6">
                            <h3 className="font-semibold text-gray-900 mb-3">Remarks</h3>
                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                                {order.remarks}
                            </p>
                        </Card>
                    )}
                </div>

                {/* RIGHT — Sidebar */}
                <div className="space-y-6">
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <DollarSign className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Summary</h3>
                        </div>

                        <dl className="space-y-3">
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Subtotal</dt>
                                <dd className="text-sm font-medium">
                                    ₹{Number(order.subtotal || 0).toLocaleString('en-IN')}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Discount</dt>
                                <dd className="text-sm font-medium text-red-600">
                                    -₹{Number(order.discount || 0).toLocaleString('en-IN')}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Freight</dt>
                                <dd className="text-sm font-medium">
                                    ₹{Number(order.freight || 0).toLocaleString('en-IN')}
                                </dd>
                            </div>
                            <div className="flex justify-between pt-3 border-t border-gray-200">
                                <dt className="text-base font-semibold text-gray-900">Total</dt>
                                <dd className="text-lg font-bold text-blue-600">
                                    ₹{Number(order.total || 0).toLocaleString('en-IN')}
                                </dd>
                            </div>
                        </dl>
                    </Card>

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
                                <Badge variant={statusColors[order.status]}>
                                    {order.status}
                                </Badge>
                            </div>
                            {order.created_at && (
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Created</span>
                                    <span className="text-sm font-medium">
                                        {new Date(order.created_at).toLocaleDateString('en-IN')}
                                    </span>
                                </div>
                            )}
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
                            <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-lg font-semibold text-gray-800">
                            Edit Purchase Order
                        </span>
                    </div>
                }
                size="lg"
            >
                <PurchaseOrderForm
                    onClose={handleEditClose}
                    editData={order}
                />
            </Modal>
        </div>
    );
}