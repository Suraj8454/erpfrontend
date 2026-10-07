import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Edit,
    Trash2,
    CheckCircle,
    Send,
    Printer,
    FileText,
    Building2,
    User,
    Calendar,
    Package,
    Clock,
    Receipt,
    BadgeCheck,
    Ship,
    Truck,
    Copy,
    Download,
    Loader2,
    AlertCircle,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
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

export default function QuotationDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quotation, setQuotation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [actionLoading, setActionLoading] = useState('');

    // ✅ Load quotation details
    const loadQuotation = async () => {
        try {
            setLoading(true);
            const response = await quotationsAPI.getById(id);
            console.log('📦 Quotation details:', response.data.data);
            setQuotation(response.data.data);
        } catch (error) {
            console.error('❌ Load quotation error:', error);
            toast.error(error.response?.data?.message || 'Failed to load quotation');
            navigate('/quotations');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) loadQuotation();
    }, [id]);

    // ✅ Approve
    const handleApprove = async () => {
        if (!window.confirm('Approve this quotation?')) return;
        try {
            setActionLoading('approve');
            await quotationsAPI.approve(id);
            toast.success('Quotation approved!');
            await loadQuotation();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to approve');
        } finally {
            setActionLoading('');
        }
    };

    // ✅ Send
    const handleSend = async () => {
        if (!window.confirm('Mark this quotation as Sent?')) return;
        try {
            setActionLoading('send');
            await quotationsAPI.updateStatus(id, 'Sent');
            toast.success('Quotation marked as sent!');
            await loadQuotation();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update');
        } finally {
            setActionLoading('');
        }
    };

    // ✅ Convert to Order
    const handleConvert = async () => {
        if (!window.confirm('Convert this quotation to Sales Order?')) return;
        try {
            setActionLoading('convert');
            const response = await quotationsAPI.convert(id, {
                delivery_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split('T')[0],
            });
            toast.success('Converted to Sales Order!');
            navigate(`/sales-orders/${response.data.data.id}`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Conversion failed');
            setActionLoading('');
        }
    };

    // ✅ Edit — open modal
    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    // ✅ Close edit modal + reload
    const handleEditClose = () => {
        setIsEditModalOpen(false);
        setTimeout(loadQuotation, 300);
    };

    // ✅ Delete
    const handleDelete = async () => {
        if (!window.confirm('Delete this quotation permanently?')) return;
        try {
            setActionLoading('delete');
            await quotationsAPI.delete(id);
            toast.success('Quotation deleted');
            navigate('/quotations');
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

    // ✅ Duplicate
    const handleDuplicate = async () => {
        try {
            const newQuotation = {
                ...quotation,
                id: undefined,
                quotation_number: undefined,
                status: 'Draft',
            };
            navigate('/quotations', { state: { duplicate: newQuotation } });
        } catch (error) {
            toast.error('Failed to duplicate');
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
                    <p className="mt-4 text-gray-500">Loading quotation...</p>
                </div>
            </div>
        );
    }

    if (!quotation) return null;

    // Determine which buttons to show
    const canApprove = ['Draft', 'Pending Approval'].includes(quotation.status);
    const canConvert = ['Approved', 'Sent'].includes(quotation.status);
    const canSend = ['Draft', 'Pending Approval', 'Approved'].includes(quotation.status);
    const canEdit = !['Accepted', 'Rejected', 'Cancelled'].includes(quotation.status);
    const canDelete = quotation.status !== 'Accepted';

    return (
        <div className="space-y-6">
            {/* ============ HEADER ============ */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/quotations')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Back to quotations"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {quotation.quotation_number}
                        </h1>
                        <div className="flex items-center gap-3 mt-1">
                            <Badge variant={statusColors[quotation.status] || 'default'}>
                                {quotation.status}
                            </Badge>
                            <span className="text-sm text-gray-500">
                                {new Date(quotation.date).toLocaleDateString('en-IN', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                    {canApprove && (
                        <Button
                            onClick={handleApprove}
                            loading={actionLoading === 'approve'}
                            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800"
                        >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                        </Button>
                    )}

                    {canConvert && (
                        <Button
                            onClick={handleConvert}
                            loading={actionLoading === 'convert'}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                        >
                            <FileText className="w-4 h-4" />
                            Convert to Order
                        </Button>
                    )}

                    {canSend && (
                        <Button
                            variant="outline"
                            onClick={handleSend}
                            loading={actionLoading === 'send'}
                            className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                        >
                            <Send className="w-4 h-4" />
                            Send
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
                        onClick={handleDuplicate}
                        className="flex items-center gap-2"
                    >
                        <Copy className="w-4 h-4" />
                        Duplicate
                    </Button>

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

            {/* ============ STATUS ALERT ============ */}
            {quotation.status === 'Rejected' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-red-800">
                            Quotation Rejected
                        </p>
                        <p className="text-sm text-red-700 mt-0.5">
                            This quotation has been rejected. You can duplicate it to create a new one.
                        </p>
                    </div>
                </div>
            )}

            {quotation.status === 'Accepted' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-emerald-800">
                            Quotation Accepted
                        </p>
                        <p className="text-sm text-emerald-700 mt-0.5">
                            This quotation has been converted to a Sales Order.
                        </p>
                    </div>
                </div>
            )}

            {/* ============ MAIN CONTENT ============ */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LEFT — Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Quotation Information Card */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <FileText className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">
                                Quotation Information
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                    Customer
                                </p>
                                <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                    <Building2 className="w-3.5 h-3.5 text-gray-400" />
                                    {quotation.customer_name || 'N/A'}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                    Salesperson
                                </p>
                                <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                    <User className="w-3.5 h-3.5 text-gray-400" />
                                    {quotation.salesperson_name || 'N/A'}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                    Quotation Date
                                </p>
                                <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                    {new Date(quotation.date).toLocaleDateString('en-IN', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                    Valid Until
                                </p>
                                <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                                    {quotation.valid_until
                                        ? new Date(quotation.valid_until).toLocaleDateString('en-IN', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        })
                                        : '-'}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                    Payment Terms
                                </p>
                                <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                    <Receipt className="w-3.5 h-3.5 text-gray-400" />
                                    {quotation.payment_terms || '-'}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                    Delivery Terms
                                </p>
                                <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                    <Truck className="w-3.5 h-3.5 text-gray-400" />
                                    {quotation.delivery_terms || '-'}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                    Freight Terms
                                </p>
                                <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                    <Ship className="w-3.5 h-3.5 text-gray-400" />
                                    {quotation.freight_terms || '-'}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                    Currency
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                    {quotation.currency || 'INR'}
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Items Card */}
                    <Card className="p-0 overflow-hidden">
                        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <Package className="w-4 h-4 text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900">Items</h3>
                            </div>
                            <span className="text-xs text-gray-500 font-medium px-3 py-1 bg-gray-50 rounded-full">
                                {quotation.items?.length || 0} item
                                {(quotation.items?.length || 0) !== 1 ? 's' : ''}
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                            Product
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                            Grade
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                            Qty
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                            Unit
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                            Rate
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                            Disc %
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                            GST %
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                            Amount
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {!quotation.items || quotation.items.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="px-4 py-12 text-center text-gray-400 text-sm"
                                            >
                                                No items in this quotation
                                            </td>
                                        </tr>
                                    ) : (
                                        quotation.items.map((item, idx) => (
                                            <tr
                                                key={idx}
                                                className="hover:bg-gray-50/50 transition-colors"
                                            >
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
                                                <td className="px-4 py-3 text-sm text-right text-gray-600">
                                                    {item.discount_percent || 0}%
                                                </td>
                                                <td className="px-4 py-3 text-sm text-right text-gray-600">
                                                    {item.gst_rate || 0}%
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

                    {/* Additional Info */}
                    {(quotation.remarks || quotation.quality_spec) && (
                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <BadgeCheck className="w-4 h-4 text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900">
                                    Additional Information
                                </h3>
                            </div>

                            <div className="space-y-4">
                                {quotation.quality_spec && (
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                                            Quality Specification
                                        </p>
                                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg leading-relaxed">
                                            {quotation.quality_spec}
                                        </p>
                                    </div>
                                )}

                                {quotation.remarks && (
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                                            Remarks
                                        </p>
                                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg leading-relaxed">
                                            {quotation.remarks}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </Card>
                    )}
                </div>

                {/* RIGHT — Summary Sidebar */}
                <div className="space-y-6">
                    {/* Financial Summary */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <BadgeCheck className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Summary</h3>
                        </div>

                        <dl className="space-y-3">
                            <div className="flex justify-between items-center">
                                <dt className="text-sm text-gray-500">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">
                                    ₹{Number(quotation.subtotal || 0).toLocaleString('en-IN')}
                                </dd>
                            </div>
                            <div className="flex justify-between items-center">
                                <dt className="text-sm text-gray-500">Discount</dt>
                                <dd className="text-sm font-medium text-red-600">
                                    -₹{Number(quotation.discount || 0).toLocaleString('en-IN')}
                                </dd>
                            </div>
                            <div className="flex justify-between items-center">
                                <dt className="text-sm text-gray-500">Tax (GST)</dt>
                                <dd className="text-sm font-medium text-gray-900">
                                    ₹{Number(quotation.tax || 0).toLocaleString('en-IN')}
                                </dd>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                <dt className="text-base font-semibold text-gray-900">
                                    Total
                                </dt>
                                <dd className="text-lg font-bold text-blue-600">
                                    ₹{Number(quotation.total || 0).toLocaleString('en-IN')}
                                </dd>
                            </div>
                        </dl>
                    </Card>

                    {/* Status Info */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <Clock className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Status</h3>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Current Status</span>
                                <Badge variant={statusColors[quotation.status] || 'default'}>
                                    {quotation.status}
                                </Badge>
                            </div>
                            {quotation.created_at && (
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Created</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {new Date(quotation.created_at).toLocaleDateString(
                                            'en-IN'
                                        )}
                                    </span>
                                </div>
                            )}
                            {quotation.updated_at && (
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Updated</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {new Date(quotation.updated_at).toLocaleDateString(
                                            'en-IN'
                                        )}
                                    </span>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <Send className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Quick Actions</h3>
                        </div>

                        <div className="space-y-2">
                            <Button
                                variant="outline"
                                onClick={handlePrint}
                                className="w-full justify-center flex items-center gap-2"
                            >
                                <Printer className="w-4 h-4" />
                                Print Quotation
                            </Button>

                            <Button
                                variant="outline"
                                onClick={handleDuplicate}
                                className="w-full justify-center flex items-center gap-2"
                            >
                                <Copy className="w-4 h-4" />
                                Duplicate
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() =>
                                    navigate(`/sales-orders?quotation=${quotation.id}`)
                                }
                                className="w-full justify-center flex items-center gap-2"
                            >
                                <FileText className="w-4 h-4" />
                                View Related Orders
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>

            {/* ============ EDIT MODAL ============ */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={handleEditClose}
                title={
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-lg font-semibold text-gray-800">
                            Edit Quotation
                        </span>
                    </div>
                }
                size="lg"
            >
                <QuotationForm
                    onClose={handleEditClose}
                    quotationData={quotation}
                />
            </Modal>
        </div>
    );
}