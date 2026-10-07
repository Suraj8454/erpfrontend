import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Truck, Receipt, XCircle, CheckCircle,
    Building, User, Calendar, FileText, Package,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { salesOrdersAPI } from '../../services/api';
import toast from 'react-hot-toast';

const statusColors = {
    Pending: 'warning',
    Confirmed: 'info',
    'In Progress': 'info',
    Dispatched: 'purple',
    Delivered: 'success',
    Cancelled: 'danger',
};

export default function SalesOrderDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrder = async () => {
            try {
                setLoading(true);
                const response = await salesOrdersAPI.getById(id);
                setOrder(response.data.data);
            } catch (error) {
                toast.error('Failed to load order details');
                navigate('/sales-orders');
            } finally {
                setLoading(false);
            }
        };
        if (id) loadOrder();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
        );
    }

    if (!order) return null;

    const handleGenerateInvoice = async () => {
        if (!window.confirm('Generate invoice?')) return;

        try {
            const res = await salesOrdersAPI.generateInvoice(order.id);
            toast.success('Invoice generated!');
            navigate(`/invoices/${res.data.data.id}`);
        } catch (error) {
            toast.error('Invoice generation failed');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/sales-orders')}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {order.order_number}
                        </h1>
                        <div className="flex items-center gap-3 mt-1">
                            <Badge variant={statusColors[order.status]}>
                                {order.status}
                            </Badge>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {order.status === 'Dispatched' && (
                        <Button onClick={handleGenerateInvoice} className="flex items-center gap-2">
                            <Receipt className="w-4 h-4" />
                            Generate Invoice
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Info */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Order Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-500">Order Date</label>
                                <p className="text-sm">
                                    {new Date(order.order_date).toLocaleDateString('en-IN')}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Delivery Date</label>
                                <p className="text-sm">
                                    {order.delivery_date
                                        ? new Date(order.delivery_date).toLocaleDateString('en-IN')
                                        : '-'}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Customer</label>
                                <p className="text-sm font-medium">{order.customer_name}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Quotation</label>
                                <p className="text-sm">{order.quotation_number || '-'}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Total Amount</label>
                                <p className="text-lg font-bold text-blue-600">
                                    ₹{Number(order.total || 0).toLocaleString('en-IN')}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Payment Terms</label>
                                <p className="text-sm">{order.payment_terms || '-'}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Items */}
                    {order.items && order.items.length > 0 && (
                        <Card className="p-0 overflow-hidden">
                            <div className="p-5 border-b">
                                <h3 className="font-semibold">Order Items</h3>
                            </div>
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                            Product
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                            Qty
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                            Rate
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {order.items.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="px-6 py-3 text-sm">
                                                {item.product_name}
                                            </td>
                                            <td className="px-6 py-3 text-sm">
                                                {item.quantity} {item.unit}
                                            </td>
                                            <td className="px-6 py-3 text-sm">
                                                ₹{item.rate}
                                            </td>
                                            <td className="px-6 py-3 text-sm text-right font-medium">
                                                ₹{Number(item.total).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">Summary</h3>
                        <dl className="space-y-3">
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Subtotal</dt>
                                <dd className="text-sm font-medium">
                                    ₹{Number(order.subtotal || 0).toLocaleString()}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Tax</dt>
                                <dd className="text-sm font-medium">
                                    ₹{Number(order.tax || 0).toLocaleString()}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Discount</dt>
                                <dd className="text-sm font-medium">
                                    ₹{Number(order.discount || 0).toLocaleString()}
                                </dd>
                            </div>
                            <div className="flex justify-between pt-3 border-t">
                                <dt className="text-sm font-semibold">Total</dt>
                                <dd className="text-base font-bold text-blue-600">
                                    ₹{Number(order.total || 0).toLocaleString()}
                                </dd>
                            </div>
                        </dl>
                    </Card>
                </div>
            </div>
        </div>
    );
}