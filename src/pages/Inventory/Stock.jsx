

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search, Filter, Download, RefreshCw, AlertCircle,
    Clock, Package, TrendingUp, Eye, Truck, FileText,
    DollarSign, AlertTriangle,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import { stockAPI } from '../../services/api';
import toast from 'react-hot-toast';

const statusColors = {
    'In Stock': 'success',
    'Low Stock': 'warning',
    'Out of Stock': 'danger',
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
                {subtext && <div className={`text-xs font-medium ${color}`}>{subtext}</div>}
            </div>
            <div className={`p-2.5 rounded-xl ${color.replace('text', 'bg').replace('600', '50')}`}>
                <Icon className={`w-5 h-5 ${color}`} />
            </div>
        </div>
    </Card>
);

export default function Stock() {
    const navigate = useNavigate();
    const [stock, setStock] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    // ✅ Load stock from API
    const loadStock = async () => {
        try {
            setLoading(true);
            const response = await stockAPI.getCurrent();
            console.log('📦 Stock data:', response.data.data);
            setStock(response.data.data || []);
        } catch (error) {
            console.error('Load stock error:', error);
            toast.error(error.response?.data?.message || 'Failed to load stock');
            setStock([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStock();
    }, []);

    // Compute status based on quantity vs reorder level
    const getStockStatus = (item) => {
        const available = Number(item.quantity || 0);
        const reorder = Number(item.reorder_level || 0);
        if (available === 0) return 'Out of Stock';
        if (reorder > 0 && available < reorder) return 'Low Stock';
        return 'In Stock';
    };

    const handleViewProduct = (row) => {
        setSelectedProduct(row);
        setIsDetailModalOpen(true);
    };

    const handleCreatePO = () => {
        navigate('/purchase-orders');
    };

    const handleViewMovements = (productId) => {
        navigate(`/stock/movements/${productId}`);
    };

    const columns = [
        {
            header: 'Product',
            accessor: 'product_name',
            sortable: true,
            render: (value) => (
                <span className="font-medium text-gray-800">{value || 'N/A'}</span>
            ),
        },
        {
            header: 'Grade',
            accessor: 'grade',
            render: (value) => value || '-',
        },
        {
            header: 'Batch',
            accessor: 'batch_number',
            render: (value) => value || '-',
        },
        {
            header: 'Available',
            accessor: 'quantity',
            sortable: true,
            render: (value, row) => {
                const avail = Number(value || 0);
                const reorder = Number(row.reorder_level || 0);
                const isLow = reorder > 0 && avail < reorder;
                return (
                    <span className={isLow ? 'text-red-600 font-semibold' : 'text-gray-700'}>
                        {avail.toLocaleString('en-IN')} {row.unit || 'KG'}
                    </span>
                );
            },
        },
        {
            header: 'Reserved',
            accessor: 'reserved_quantity',
            render: (value) => (
                <span className="text-yellow-600">
                    {Number(value || 0).toLocaleString('en-IN')}
                </span>
            ),
        },
        {
            header: 'Hold',
            accessor: 'hold_quantity',
            render: (value) => (
                <span className="text-orange-600">
                    {Number(value || 0).toLocaleString('en-IN')}
                </span>
            ),
        },
        {
            header: 'Value',
            accessor: 'stock_value',
            sortable: true,
            render: (value, row) => {
                const val = Number(value) || (Number(row.quantity || 0) * Number(row.unit_cost || 0));
                return (
                    <span className="font-semibold text-blue-600">
                        ₹{val.toLocaleString('en-IN')}
                    </span>
                );
            },
        },
        {
            header: 'Status',
            accessor: 'quantity',
            render: (_, row) => {
                const status = getStockStatus(row);
                return (
                    <Badge variant={statusColors[status] || 'default'}>{status}</Badge>
                );
            },
        },
        {
            header: 'Actions',
            accessor: 'id',
            render: (_, row) => (
                <div className="flex items-center gap-1">
                    <button
                        className="p-1.5 hover:bg-gray-100 rounded-lg"
                        title="View Details"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleViewProduct(row);
                        }}
                    >
                        <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-blue-50 rounded-lg"
                        title="View Movements"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleViewMovements(row.product_id);
                        }}
                    >
                        <Clock className="w-4 h-4 text-blue-600" />
                    </button>
                </div>
            ),
        },
    ];

    const filteredStock = stock.filter((item) => {
        const matchesSearch =
            (item.product_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.grade || '').toLowerCase().includes(searchTerm.toLowerCase());
        const status = getStockStatus(item);
        const matchesStatus = filterStatus === 'all' || status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Stats
    const totalStock = stock.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    const totalValue = stock.reduce(
        (sum, item) =>
            sum +
            Number(item.stock_value) ||
        sum + (Number(item.quantity || 0) * Number(item.unit_cost || 0)),
        0
    );
    const totalReserved = stock.reduce(
        (sum, item) => sum + Number(item.reserved_quantity || 0),
        0
    );
    const lowStockItems = stock.filter((item) => getStockStatus(item) === 'Low Stock').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm">
                        <Package className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
                            Stock Management
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Monitor inventory levels and stock movements
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <Button
                        variant="outline"
                        onClick={loadStock}
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    icon={Package}
                    label="Total Stock"
                    value={`${totalStock.toLocaleString('en-IN')} KG`}
                    subtext={
                        <span className="flex items-center gap-1 text-green-600">
                            <TrendingUp className="w-3 h-3" /> Live
                        </span>
                    }
                    color="text-blue-600"
                    borderColor="border-blue-500"
                />
                <StatCard
                    icon={DollarSign}
                    label="Stock Value"
                    value={`₹${totalValue.toLocaleString('en-IN')}`}
                    color="text-blue-600"
                    borderColor="border-blue-500"
                />
                <StatCard
                    icon={Clock}
                    label="Reserved"
                    value={`${totalReserved.toLocaleString('en-IN')} KG`}
                    color="text-yellow-600"
                    borderColor="border-yellow-500"
                />
                <StatCard
                    icon={AlertTriangle}
                    label="Low Stock Items"
                    value={lowStockItems}
                    color="text-red-600"
                    borderColor="border-red-500"
                />
            </div>

            {/* Low Stock Alert */}
            {lowStockItems > 0 && (
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-xl p-5 flex items-start gap-4">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-yellow-800">Low Stock Alert</p>
                        <p className="text-sm text-yellow-700 mt-0.5">
                            {lowStockItems} product{lowStockItems > 1 ? 's are' : ' is'} below
                            reorder level. Please restock soon.
                        </p>
                        <Button
                            size="sm"
                            className="mt-2 bg-yellow-600 hover:bg-yellow-700"
                            onClick={handleCreatePO}
                        >
                            Create Purchase Order
                        </Button>
                    </div>
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
                                placeholder="Search stock..."
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
                        <option value="In Stock">In Stock</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>
                    <span className="text-sm text-gray-400 ml-auto font-medium">
                        {stock.length} items found
                    </span>
                </div>
            </Card>

            {/* Table */}
            <Card className="p-0 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
                        <p className="text-sm text-gray-500 mt-3">Loading stock...</p>
                    </div>
                ) : stock.length === 0 ? (
                    <div className="p-12 text-center">
                        <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No stock found</p>
                        <p className="text-sm text-gray-400 mt-1">
                            Stock is added when you receive POs and QC accepts them
                        </p>
                        <Button
                            onClick={handleCreatePO}
                            className="mt-4 inline-flex items-center gap-2"
                        >
                            <FileText className="w-4 h-4" />
                            Go to Purchase Orders
                        </Button>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        data={filteredStock}
                        totalItems={filteredStock.length}
                        onRowClick={(row) => handleViewProduct(row)}
                    />
                )}
            </Card>

            {/* Detail Modal */}
            <Modal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                title="Stock Details"
                size="md"
            >
                {selectedProduct && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="text-xs text-gray-500">Product</p>
                                <p className="text-sm font-semibold">
                                    {selectedProduct.product_name}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Grade</p>
                                <p className="text-sm">{selectedProduct.grade || '-'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Batch</p>
                                <p className="text-sm">{selectedProduct.batch_number || '-'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Unit</p>
                                <p className="text-sm">{selectedProduct.unit || 'KG'}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="p-3 bg-green-50 rounded-lg text-center">
                                <p className="text-xs text-green-600">Available</p>
                                <p className="text-lg font-bold text-green-700">
                                    {Number(selectedProduct.quantity || 0).toLocaleString()}
                                </p>
                            </div>
                            <div className="p-3 bg-yellow-50 rounded-lg text-center">
                                <p className="text-xs text-yellow-600">Reserved</p>
                                <p className="text-lg font-bold text-yellow-700">
                                    {Number(selectedProduct.reserved_quantity || 0).toLocaleString()}
                                </p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-lg text-center">
                                <p className="text-xs text-orange-600">Hold</p>
                                <p className="text-lg font-bold text-orange-700">
                                    {Number(selectedProduct.hold_quantity || 0).toLocaleString()}
                                </p>
                            </div>
                            <div className="p-3 bg-red-50 rounded-lg text-center">
                                <p className="text-xs text-red-600">Rejected</p>
                                <p className="text-lg font-bold text-red-700">
                                    {Number(selectedProduct.rejected_quantity || 0).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button
                                variant="outline"
                                onClick={() => setIsDetailModalOpen(false)}
                            >
                                Close
                            </Button>
                            <Button
                                className="flex items-center gap-2"
                                onClick={handleCreatePO}
                            >
                                <FileText className="w-4 h-4" />
                                Create PO
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}