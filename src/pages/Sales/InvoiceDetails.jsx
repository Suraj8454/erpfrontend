import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Printer, Send, DollarSign, Building,
    Calendar, FileText,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { invoicesAPI } from '../../services/api';
import toast from 'react-hot-toast';

const statusColors = {
    Paid: 'success',
    Partial: 'warning',
    Unpaid: 'danger',
    Overdue: 'danger',
};

export default function InvoiceDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInvoice = async () => {
            try {
                setLoading(true);
                const response = await invoicesAPI.getById(id);
                setInvoice(response.data.data);
            } catch (error) {
                toast.error('Failed to load invoice');
                navigate('/invoices');
            } finally {
                setLoading(false);
            }
        };
        if (id) loadInvoice();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
        );
    }

    if (!invoice) return null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/invoices')}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {invoice.invoice_number}
                        </h1>
                        <div className="flex items-center gap-3 mt-1">
                            <Badge variant={statusColors[invoice.status]}>
                                {invoice.status}
                            </Badge>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => window.print()} className="flex items-center gap-2">
                        <Printer className="w-4 h-4" />
                        Print
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">
                            Invoice Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-500">Invoice Date</label>
                                <p className="text-sm">
                                    {new Date(invoice.invoice_date).toLocaleDateString('en-IN')}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Due Date</label>
                                <p className="text-sm">
                                    {invoice.due_date
                                        ? new Date(invoice.due_date).toLocaleDateString('en-IN')
                                        : '-'}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Customer</label>
                                <p className="text-sm font-medium">
                                    {invoice.customer_name}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Order</label>
                                <p className="text-sm">{invoice.order_number || '-'}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Items */}
                    {invoice.items && invoice.items.length > 0 && (
                        <Card className="p-0 overflow-hidden">
                            <div className="p-5 border-b">
                                <h3 className="font-semibold">Invoice Items</h3>
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
                                    {invoice.items.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="px-6 py-3 text-sm">
                                                {item.product_name}
                                            </td>
                                            <td className="px-6 py-3 text-sm">
                                                {item.quantity} {item.unit}
                                            </td>
                                            <td className="px-6 py-3 text-sm">₹{item.rate}</td>
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
                                    ₹{Number(invoice.subtotal || 0).toLocaleString()}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Tax</dt>
                                <dd className="text-sm font-medium">
                                    ₹{Number(invoice.tax || 0).toLocaleString()}
                                </dd>
                            </div>
                            <div className="flex justify-between pt-3 border-t">
                                <dt className="text-sm font-semibold">Total</dt>
                                <dd className="text-base font-bold text-blue-600">
                                    ₹{Number(invoice.total || 0).toLocaleString()}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Paid</dt>
                                <dd className="text-sm font-medium text-green-600">
                                    ₹{Number(invoice.paid_amount || 0).toLocaleString()}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Balance</dt>
                                <dd className="text-sm font-medium text-red-600">
                                    ₹{Number(invoice.balance || 0).toLocaleString()}
                                </dd>
                            </div>
                        </dl>
                    </Card>
                </div>
            </div>
        </div>
    );
}