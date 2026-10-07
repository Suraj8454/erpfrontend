import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Package, TrendingUp, TrendingDown, Clock,
    Search, Filter, Download, RefreshCw, Loader2,
    ArrowUpRight, ArrowDownRight, Calendar, FileText, User,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import { stockAPI } from '../../services/api';
import toast from 'react-hot-toast';

const transactionColors = {
    GRN: 'success',
    Sales: 'info',
    Adjustment: 'warning',
    Transfer: 'purple',
};

export default function StockMovements() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [movements, setMovements] = useState([]);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    // ✅ Load stock movements
    const loadMovements = async () => {
        try {
            setLoading(true);
            console.log('🔄 Loading movements for product:', productId);

            const response = await stockAPI.getMovements(productId);
            console.log('📦 Movements:', response.data.data);

            setMovements(response.data.data || []);

            // Get product info from first movement or fetch separately
            if (response.data.data && response.data.data.length > 0) {
                setProduct({
                    name: response.data.data[0].product_name || 'Unknown Product',
                    code: response.data.data[0].product_code || '',
                });
            }
        } catch (error) {
            console.error('❌ Load movements error:', error);
            toast.error(error.response?.data?.message || 'Failed to load movements');
            setMovements([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (productId) loadMovements();
    }, [productId]);

    // Filter movements
    const filteredMovements = movements.filter((m) => {
        const matchesSearch =
            !searchTerm ||
            (m.reference_number || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (m.batch_number || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (m.created_by_name || '').toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = filterType === 'all' || m.transaction_type === filterType;
        return matchesSearch && matchesType;
    });

    // Stats
    const totalIn = movements.reduce((sum, m) => sum + Number(m.quantity_in || 0), 0);
    const totalOut = movements.reduce((sum, m) => sum + Number(m.quantity_out || 0), 0);
    const currentBalance = movements.length > 0 ? Number(movements[0].balance || 0) : 0;

    const columns = [
        {
            header: 'Date',
            accessor: 'transaction_date',
            sortable: true,
            render: (value) =>
                value
                    ? new Date(value).toLocaleString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                      })
                    : '-',
        },
        {
            header: 'Type',
            accessor: 'transaction_type',
            render: (value) => (
                <Badge variant={transactionColors[value] || 'default'}>{value}</Badge>
            ),
        },
        {
            header: 'Reference',
            accessor: 'reference_number',
            render: (value) => (
                <span className="font-mono text-sm text-gray-700">{value || '-'}</span>
            ),
        },
        {
            header: 'Batch',
            accessor: 'batch_number',
            render: (value) => (
                <span className="font-mono text-xs text-gray-600">{value || '-'}</span>
            ),
        },
        {
            header: 'In',
            accessor: 'quantity_in',
            render: (value) => {
                const qty = Number(value || 0);
                return qty > 0 ? (
                    <span className="font-semibold text-green-600 flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" />+{qty.toLocaleString('en-IN')}
                    </span>
                ) : (
                    <span className="text-gray-400">-</span>
                );
            },
        },
        {
            header: 'Out',
            accessor: 'quantity_out',
            render: (value) => {
                const qty = Number(value || 0);
                return qty > 0 ? (
                    <span className="font-semibold text-red-600 flex items-center gap-1">
                        <ArrowDownRight className="w-3 h-3" />-{qty.toLocaleString('en-IN')}
                    </span>
                ) : (
                    <span className="text-gray-400">-</span>
                );
            },
        },
        {
            header: 'Balance',
            accessor: 'balance',
            render: (value) => (
                <span className="font-semibold text-blue-600">
                    {Number(value || 0).toLocaleString('en-IN')}
                </span>
            ),
        },
        {
            header: 'By',
            accessor: 'created_by_name',
            render: (value) => (
                <span className="text-sm text-gray-600 flex items-center gap-1">
                    <User className="w-3 h-3 text-gray-400" />
                    {value || 'System'}
                </span>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/stock')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Back to stock"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm">
                            <Package className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
                                Stock Movements
                            </h1>
                            <p className="text-sm text-gray-500 mt-0.5">
                                {product?.name || 'Product'} — transaction history
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                    <Button
                        variant="outline"
                        onClick={loadMovements}
                        className="flex items-center gap-2 text-sm"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 text-sm">
                        <Download className="w-4 h-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Stats */}
            {!loading && movements.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="p-5 border-l-4 border-green-500">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Total In
                                </p>
                                <p className="text-2xl font-bold text-green-600 mt-1.5">
                                    +{totalIn.toLocaleString('en-IN')}
                                </p>
                                <span className="text-xs text-gray-500">units received</span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-green-50">
                                <TrendingUp className="w-5 h-5 text-green-600" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 border-l-4 border-red-500">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Total Out
                                </p>
                                <p className="text-2xl font-bold text-red-600 mt-1.5">
                                    -{totalOut.toLocaleString('en-IN')}
                                </p>
                                <span className="text-xs text-gray-500">units dispatched</span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-red-50">
                                <TrendingDown className="w-5 h-5 text-red-600" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 border-l-4 border-blue-500">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Current Balance
                                </p>
                                <p className="text-2xl font-bold text-blue-600 mt-1.5">
                                    {currentBalance.toLocaleString('en-IN')}
                                </p>
                                <span className="text-xs text-gray-500">units available</span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-blue-50">
                                <Package className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* Filters */}
            <Card className="p-5">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by reference, batch, or user..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200/80 rounded-lg text-sm"
                            />
                        </div>
                    </div>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-4 py-2.5 border border-gray-200/80 rounded-lg text-sm"
                    >
                        <option value="all">All Types</option>
                        <option value="GRN">GRN</option>
                        <option value="Sales">Sales</option>
                        <option value="Adjustment">Adjustment</option>
                        <option value="Transfer">Transfer</option>
                    </select>
                    <span className="text-sm text-gray-400 ml-auto font-medium">
                        {filteredMovements.length} transaction{filteredMovements.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </Card>

            {/* Movements Table */}
            <Card className="p-0 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
                        <p className="text-sm text-gray-500 mt-3">Loading movements...</p>
                    </div>
                ) : movements.length === 0 ? (
                    <div className="p-12 text-center">
                        <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No movements found</p>
                        <p className="text-sm text-gray-400 mt-1">
                            Movements appear when stock is added or removed
                        </p>
                        <Button
                            onClick={() => navigate('/stock')}
                            className="mt-4 inline-flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Stock
                        </Button>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        data={filteredMovements}
                        totalItems={filteredMovements.length}
                    />
                )}
            </Card>

            {/* Summary Card */}
            {!loading && movements.length > 0 && (
                <Card className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50/50 border-blue-100">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-blue-800">
                                Transaction Summary
                            </p>
                            <p className="text-sm text-blue-700 mt-1">
                                Showing {movements.length} transactions for this product.
                                Current balance: <strong>{currentBalance.toLocaleString('en-IN')} units</strong>.
                            </p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}