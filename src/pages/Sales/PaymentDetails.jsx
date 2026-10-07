import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Building, Calendar, FileText } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { paymentsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const statusColors = {
    Completed: 'success',
    Pending: 'warning',
    Failed: 'danger',
    Refunded: 'info',
};

export default function PaymentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [payment, setPayment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPayment = async () => {
            try {
                setLoading(true);
                const response = await paymentsAPI.getById(id);
                setPayment(response.data.data);
            } catch (error) {
                toast.error('Failed to load payment');
                navigate('/payments');
            } finally {
                setLoading(false);
            }
        };
        if (id) loadPayment();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
        );
    }

    if (!payment) return null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/payments')}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {payment.payment_number}
                        </h1>
                        <div className="flex items-center gap-3 mt-1">
                            <Badge variant={statusColors[payment.status]}>
                                {payment.status}
                            </Badge>
                        </div>
                    </div>
                </div>
                <Button
                    variant="outline"
                    onClick={() => window.print()}
                    className="flex items-center gap-2"
                >
                    <Printer className="w-4 h-4" />
                    Print Receipt
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main */}
                <div className="lg:col-span-2">
                    <Card className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">
                            Payment Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-500">Payment Date</label>
                                <p className="text-sm">
                                    {new Date(payment.payment_date).toLocaleDateString('en-IN')}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Customer</label>
                                <p className="text-sm font-medium">{payment.customer_name}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Invoice</label>
                                <p className="text-sm">{payment.invoice_number || '-'}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Method</label>
                                <p className="text-sm">{payment.method}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Reference</label>
                                <p className="text-sm">{payment.reference_number || '-'}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Amount</label>
                                <p className="text-lg font-bold text-green-600">
                                    ₹{Number(payment.amount || 0).toLocaleString('en-IN')}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">Quick Info</h3>
                        <dl className="space-y-3">
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Status</dt>
                                <dd>
                                    <Badge variant={statusColors[payment.status]}>
                                        {payment.status}
                                    </Badge>
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Received By</dt>
                                <dd className="text-sm font-medium">
                                    {payment.received_by_name || 'System'}
                                </dd>
                            </div>
                        </dl>
                    </Card>

                    {payment.remarks && (
                        <Card className="p-6">
                            <h3 className="font-semibold mb-3">Remarks</h3>
                            <p className="text-sm text-gray-600">{payment.remarks}</p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}