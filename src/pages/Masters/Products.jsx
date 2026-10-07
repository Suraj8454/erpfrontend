

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus, Filter, Download, Search, Eye, Edit, Trash2,
    RefreshCw, Package, Layers, AlertCircle,
    CheckCircle, XCircle,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import ProductForm from '../../components/forms/ProductForm';
import { productsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const statusColors = {
    Active: 'success',
    Inactive: 'danger',
    Discontinued: 'warning',
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

export default function Products() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    // ✅ Load products
    const loadProducts = async () => {
        try {
            setLoading(true);
            const response = await productsAPI.getAll({
                search: searchTerm,
                category: filterCategory,
                status: filterStatus,
            });
            setProducts(response.data.data || []);
        } catch (error) {
            console.error('Load products error:', error);
            toast.error(error.response?.data?.message || 'Failed to load products');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(loadProducts, 300);
        return () => clearTimeout(delay);
    }, [searchTerm, filterCategory, filterStatus]);

    // ✅ View
    const handleViewProduct = (id) => {
        navigate(`/products/${id}`);
    };

    // ✅ Edit
    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    // ✅ Delete
    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            await productsAPI.delete(id);
            toast.success('Product deleted successfully');
            loadProducts();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete product');
        }
    };

    // ✅ New product
    const handleNewProduct = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    // ✅ Close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    // Calculate stats
    const totalProducts = products.length;
    const activeProducts = products.filter((p) => p.is_active).length;
    const lowStockProducts = products.filter((p) => {
        if (!p.reorder_level) return false;
        return false; // We don't have stock info here; skip
    }).length;
    const categories = new Set(products.map((p) => p.category).filter(Boolean)).size;

    const columns = [
        {
            header: 'Code',
            accessor: 'code',
            sortable: true,
            render: (value) => (
                <span className="font-mono font-medium text-gray-800 text-sm">{value}</span>
            ),
        },
        {
            header: 'Product Name',
            accessor: 'name',
            sortable: true,
            render: (value) => (
                <span className="font-medium text-gray-800">{value}</span>
            ),
        },
        {
            header: 'Category',
            accessor: 'category',
            render: (value) => <Badge variant="info">{value || 'N/A'}</Badge>,
        },
        { header: 'Grade', accessor: 'grade' },
        { header: 'Size', accessor: 'size' },
        { header: 'Quality', accessor: 'quality' },
        { header: 'Unit', accessor: 'unit' },
        {
            header: 'Purchase Rate',
            accessor: 'purchase_rate',
            render: (value) => (
                <span className="font-medium text-gray-700">
                    ₹{Number(value || 0).toLocaleString('en-IN')}
                </span>
            ),
        },
        {
            header: 'Sales Rate',
            accessor: 'sales_rate',
            render: (value) => (
                <span className="font-semibold text-blue-600">
                    ₹{Number(value || 0).toLocaleString('en-IN')}
                </span>
            ),
        },
        {
            header: 'Status',
            accessor: 'is_active',
            render: (value) => (
                <Badge variant={value ? 'success' : 'danger'}>
                    {value ? 'Active' : 'Inactive'}
                </Badge>
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
                            handleViewProduct(row.id);
                        }}
                    >
                        <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-gray-100 rounded-lg"
                        title="Edit"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditProduct(row);
                        }}
                    >
                        <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-red-50 rounded-lg"
                        title="Delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProduct(row.id);
                        }}
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                </div>
            ),
        },
    ];

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
                            Products
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Manage Makhana products and grades
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <Button
                        variant="outline"
                        onClick={loadProducts}
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
                        onClick={handleNewProduct}
                        className="flex items-center gap-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700"
                    >
                        <Plus className="w-4 h-4" />
                        New Product
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    icon={Package}
                    label="Total Products"
                    value={totalProducts}
                    color="text-blue-600"
                    borderColor="border-blue-500"
                />
                <StatCard
                    icon={CheckCircle}
                    label="Active"
                    value={activeProducts}
                    color="text-green-600"
                    borderColor="border-green-500"
                />
                <StatCard
                    icon={Layers}
                    label="Categories"
                    value={categories}
                    color="text-yellow-600"
                    borderColor="border-yellow-500"
                />
                <StatCard
                    icon={AlertCircle}
                    label="Low Stock"
                    value={lowStockProducts}
                    color="text-red-600"
                    borderColor="border-red-500"
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
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200/80 rounded-lg text-sm"
                            />
                        </div>
                    </div>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2.5 border border-gray-200/80 rounded-lg text-sm"
                    >
                        <option value="all">All Categories</option>
                        <option value="Raw">Raw</option>
                        <option value="Popped">Popped</option>
                        <option value="Flavoured">Flavoured</option>
                        <option value="Roasted">Roasted</option>
                        <option value="Organic">Organic</option>
                    </select>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2.5 border border-gray-200/80 rounded-lg text-sm"
                    >
                        <option value="all">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <span className="text-sm text-gray-400 ml-auto font-medium">
                        {products.length} products found
                    </span>
                </div>
            </Card>

            {/* Table */}
            <Card className="p-0 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
                        <p className="text-sm text-gray-500 mt-3">Loading products...</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="p-12 text-center">
                        <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No products found</p>
                        <Button
                            onClick={handleNewProduct}
                            className="mt-4 inline-flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Create First Product
                        </Button>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        data={products}
                        totalItems={products.length}
                        onRowClick={(row) => handleViewProduct(row.id)}
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
                            <Package className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-lg font-semibold text-gray-800">
                            {editingProduct ? 'Edit Product' : 'New Product'}
                        </span>
                    </div>
                }
                size="lg"
            >
                <ProductForm
                    onClose={handleCloseModal}
                    editData={editingProduct}
                />
            </Modal>
        </div>
    );
}