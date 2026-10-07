import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Edit, Trash2, Printer, Package, Layers,
    Hash, Award, Palette, Maximize2, Ruler, DollarSign,
    IndianRupee, Percent, Calendar, ClipboardCheck, Box,
    Loader2, CheckCircle, TrendingUp, AlertCircle,
    BarChart3, Warehouse, ShoppingCart,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ProductForm from '../../components/forms/ProductForm';
import { productsAPI, stockAPI } from '../../services/api';
import toast from 'react-hot-toast';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [stock, setStock] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [actionLoading, setActionLoading] = useState('');

    // ✅ Load product + stock
    const loadProduct = async () => {
        try {
            setLoading(true);
            const [productRes, stockRes] = await Promise.all([
                productsAPI.getById(id),
                stockAPI.getCurrent({ product_id: id }).catch(() => ({ data: { data: [] } })),
            ]);

            console.log('📦 Product details:', productRes.data.data);
            setProduct(productRes.data.data);
            setStock(stockRes.data?.data || []);
        } catch (error) {
            console.error('❌ Load product error:', error);
            toast.error(error.response?.data?.message || 'Failed to load product');
            navigate('/products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) loadProduct();
    }, [id]);

    // ✅ Delete
    const handleDelete = async () => {
        if (!window.confirm('Delete this product permanently?')) return;
        try {
            setActionLoading('delete');
            await productsAPI.delete(id);
            toast.success('Product deleted');
            navigate('/products');
        } catch (error) {
            toast.error('Failed to delete');
            setActionLoading('');
        }
    };

    const handlePrint = () => {
        toast.info('Opening print dialog...');
        setTimeout(() => window.print(), 200);
    };

    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    const handleEditClose = () => {
        setIsEditModalOpen(false);
        setTimeout(loadProduct, 300);
    };

    const handleViewMovements = () => {
        navigate(`/stock/movements/${id}`);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
                    <p className="mt-4 text-gray-500">Loading product...</p>
                </div>
            </div>
        );
    }

    if (!product) return null;

    // Compute stock totals
    const totalStock = stock.reduce((sum, s) => sum + Number(s.quantity || 0), 0);
    const totalReserved = stock.reduce(
        (sum, s) => sum + Number(s.reserved_quantity || 0),
        0
    );
    const stockValue = stock.reduce(
        (sum, s) => sum + Number(s.quantity || 0) * Number(s.unit_cost || 0),
        0
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/products')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Back to products"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                            <Package className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-3 mt-1">
                                <Badge variant={product.is_active ? 'success' : 'danger'}>
                                    {product.is_active ? 'Active' : 'Inactive'}
                                </Badge>
                                <span className="text-sm text-gray-500 font-mono">
                                    {product.code}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <Button
                        variant="outline"
                        onClick={handleViewMovements}
                        className="flex items-center gap-2"
                    >
                        <BarChart3 className="w-4 h-4" />
                        Movements
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handlePrint}
                        className="flex items-center gap-2"
                    >
                        <Printer className="w-4 h-4" />
                        Print
                    </Button>
                    <Button
                        onClick={handleEdit}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700"
                    >
                        <Edit className="w-4 h-4" />
                        Edit
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleDelete}
                        loading={actionLoading === 'delete'}
                        className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LEFT — Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Information */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <Package className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">
                                Basic Information
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">
                                    Product Code
                                </p>
                                <p className="text-sm font-medium flex items-center gap-2 font-mono">
                                    <Hash className="w-3.5 h-3.5 text-gray-400" />
                                    {product.code}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">
                                    Product Name
                                </p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Package className="w-3.5 h-3.5 text-gray-400" />
                                    {product.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">
                                    Category
                                </p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Layers className="w-3.5 h-3.5 text-gray-400" />
                                    {product.category || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">
                                    Grade
                                </p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Award className="w-3.5 h-3.5 text-gray-400" />
                                    {product.grade || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">
                                    Size
                                </p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Maximize2 className="w-3.5 h-3.5 text-gray-400" />
                                    {product.size || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">
                                    Quality
                                </p>
                                <p className="text-sm font-medium">
                                    {product.quality || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">
                                    Suta
                                </p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Ruler className="w-3.5 h-3.5 text-gray-400" />
                                    {product.suta || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">
                                    Colour
                                </p>
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Palette className="w-3.5 h-3.5 text-gray-400" />
                                    {product.colour || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Unit</p>
                                <p className="text-sm font-medium">
                                    {product.unit || 'KG'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">
                                    HSN Code
                                </p>
                                <p className="text-sm font-medium">
                                    {product.hsn_code || '-'}
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Pricing */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <DollarSign className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Pricing</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <p className="text-xs text-blue-600 uppercase mb-1">
                                    Purchase Rate
                                </p>
                                <p className="text-lg font-bold text-blue-700 flex items-center gap-1">
                                    <IndianRupee className="w-4 h-4" />
                                    {Number(product.purchase_rate || 0).toLocaleString('en-IN')}
                                </p>
                            </div>
                            <div className="p-4 bg-emerald-50 rounded-lg">
                                <p className="text-xs text-emerald-600 uppercase mb-1">
                                    Sales Rate
                                </p>
                                <p className="text-lg font-bold text-emerald-700 flex items-center gap-1">
                                    <IndianRupee className="w-4 h-4" />
                                    {Number(product.sales_rate || 0).toLocaleString('en-IN')}
                                </p>
                            </div>
                            <div className="p-4 bg-purple-50 rounded-lg">
                                <p className="text-xs text-purple-600 uppercase mb-1">
                                    GST Rate
                                </p>
                                <p className="text-lg font-bold text-purple-700 flex items-center gap-1">
                                    <Percent className="w-4 h-4" />
                                    {product.gst_rate || 0}%
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                                Profit Margin
                            </span>
                            <span className="text-sm font-semibold text-emerald-600">
                                ₹
                                {(
                                    Number(product.sales_rate || 0) -
                                    Number(product.purchase_rate || 0)
                                ).toLocaleString('en-IN')}{' '}
                                ({product.purchase_rate > 0
                                    ? (
                                          ((Number(product.sales_rate || 0) -
                                              Number(product.purchase_rate || 0)) /
                                              Number(product.purchase_rate)) *
                                          100
                                      ).toFixed(1)
                                    : 0}
                                %)
                            </span>
                        </div>
                    </Card>

                    {/* Settings */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <ClipboardCheck className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">
                                Tracking Settings
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                        product.batch_required
                                            ? 'bg-emerald-100'
                                            : 'bg-gray-200'
                                    }`}
                                >
                                    <Box
                                        className={`w-5 h-5 ${
                                            product.batch_required
                                                ? 'text-emerald-600'
                                                : 'text-gray-400'
                                        }`}
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Batch Tracking</p>
                                    <p className="text-xs text-gray-500">
                                        {product.batch_required
                                            ? 'Required'
                                            : 'Not required'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                        product.expiry_required
                                            ? 'bg-emerald-100'
                                            : 'bg-gray-200'
                                    }`}
                                >
                                    <Calendar
                                        className={`w-5 h-5 ${
                                            product.expiry_required
                                                ? 'text-emerald-600'
                                                : 'text-gray-400'
                                        }`}
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Expiry Tracking</p>
                                    <p className="text-xs text-gray-500">
                                        {product.expiry_required
                                            ? 'Required'
                                            : 'Not required'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                        product.qc_required ? 'bg-emerald-100' : 'bg-gray-200'
                                    }`}
                                >
                                    <ClipboardCheck
                                        className={`w-5 h-5 ${
                                            product.qc_required
                                                ? 'text-emerald-600'
                                                : 'text-gray-400'
                                        }`}
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">QC Required</p>
                                    <p className="text-xs text-gray-500">
                                        {product.qc_required ? 'Yes' : 'No'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {product.reorder_level > 0 && (
                            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-3">
                                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                <div className="text-sm">
                                    <span className="text-amber-800">
                                        Reorder Level:{' '}
                                        <strong>
                                            {Number(product.reorder_level).toLocaleString(
                                                'en-IN'
                                            )}{' '}
                                            {product.unit || 'KG'}
                                        </strong>
                                    </span>
                                </div>
                            </div>
                        )}
                    </Card>

                    {/* Description */}
                    {product.description && (
                        <Card className="p-6">
                            <h3 className="font-semibold text-gray-900 mb-3">
                                Description
                            </h3>
                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                                {product.description}
                            </p>
                        </Card>
                    )}
                </div>

                {/* RIGHT — Sidebar */}
                <div className="space-y-6">
                    {/* Stock Summary */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <Warehouse className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">
                                Stock Summary
                            </h3>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">
                                    Available
                                </span>
                                <span className="text-sm font-semibold text-emerald-600">
                                    {totalStock.toLocaleString('en-IN')}{' '}
                                    {product.unit || 'KG'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">
                                    Reserved
                                </span>
                                <span className="text-sm font-medium text-amber-600">
                                    {totalReserved.toLocaleString('en-IN')}{' '}
                                    {product.unit || 'KG'}
                                </span>
                            </div>
                            <div className="flex justify-between pt-3 border-t border-gray-200">
                                <span className="text-sm font-semibold text-gray-900">
                                    Stock Value
                                </span>
                                <span className="text-base font-bold text-blue-600">
                                    ₹{stockValue.toLocaleString('en-IN')}
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2">
                            <Button
                                variant="outline"
                                onClick={handleViewMovements}
                                className="w-full justify-center flex items-center gap-2"
                            >
                                <BarChart3 className="w-4 h-4" />
                                View Movements
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate(`/purchase-orders?product=${id}`)}
                                className="w-full justify-center flex items-center gap-2"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                Create Purchase Order
                            </Button>
                        </div>
                    </Card>

                    {/* Batch Info */}
                    {stock.length > 0 && (
                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <Box className="w-4 h-4 text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900">
                                    Batches ({stock.length})
                                </h3>
                            </div>

                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {stock.map((s, idx) => (
                                    <div
                                        key={idx}
                                        className="p-3 bg-gray-50 rounded-lg flex items-center justify-between"
                                    >
                                        <div>
                                            <p className="text-xs font-mono font-medium text-gray-700">
                                                {s.batch_number || 'No Batch'}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                Qty: {Number(s.quantity || 0).toLocaleString()}
                                            </p>
                                        </div>
                                        <Badge
                                            variant={
                                                Number(s.quantity) > 0
                                                    ? 'success'
                                                    : 'danger'
                                            }
                                        >
                                            {Number(s.quantity) > 0
                                                ? 'Available'
                                                : 'Empty'}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}

                    {/* Activity */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Info</h3>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">
                                    Created
                                </span>
                                <span className="text-sm font-medium">
                                    {product.created_at
                                        ? new Date(product.created_at).toLocaleDateString(
                                              'en-IN'
                                          )
                                        : '-'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">
                                    Updated
                                </span>
                                <span className="text-sm font-medium">
                                    {product.updated_at
                                        ? new Date(product.updated_at).toLocaleDateString(
                                              'en-IN'
                                          )
                                        : '-'}
                                </span>
                            </div>
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
                            <Package className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-lg font-semibold text-gray-800">
                            Edit Product
                        </span>
                    </div>
                }
                size="lg"
            >
                <ProductForm onClose={handleEditClose} editData={product} />
            </Modal>
        </div>
    );
}