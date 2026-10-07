


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus, Filter, Download, Search, Eye, Edit, Trash2,
    CheckCircle, Clock, Truck, FileText, RefreshCw,
    ShoppingCart, X, Package, Calendar,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
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

export default function PurchaseOrders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    
    // ✅ Receive Modal state
    const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
    const [receivingOrder, setReceivingOrder] = useState(null);
    const [receiveItems, setReceiveItems] = useState([]);
    const [receiveMeta, setReceiveMeta] = useState({
        grn_date: new Date().toISOString().split('T')[0],
        vehicle_number: '',
        driver_name: '',
        remarks: '',
    });
    const [submitting, setSubmitting] = useState(false);

    // ✅ Load POs
    const loadOrders = async () => {
        try {
            setLoading(true);
            const response = await purchaseOrdersAPI.getAll({
                search: searchTerm,
                status: filterStatus,
            });
            setOrders(response.data.data || []);
        } catch (error) {
            console.error('Load POs error:', error);
            toast.error(error.response?.data?.message || 'Failed to load purchase orders');
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(loadOrders, 300);
        return () => clearTimeout(delay);
    }, [searchTerm, filterStatus]);

    const handleViewOrder = (id) => navigate(`/purchase-orders/${id}`);

    const handleEditOrder = (order) => {
        setEditingOrder(order);
        setIsModalOpen(true);
    };

    // ✅ Open receive modal — load full PO with items
    const handleReceiveOrder = async (order) => {
        try {
            console.log('🔄 Opening receive modal for PO:', order.id);
            
            const res = await purchaseOrdersAPI.getById(order.id);
            const fullOrder = res.data.data;
            
            console.log('📦 PO items:', fullOrder.items);
            
            // Prefill receive items from PO items
            const items = (fullOrder.items || []).map((item) => ({
                product_id: item.product_id,
                product_name: item.product_name || 'Product',
                grade: item.grade || '',
                ordered_quantity: item.quantity || 0,
                received_quantity: item.quantity || 0, // default to ordered
                unit: item.unit || 'KG',
                batch_number: '',
                manufacturing_date: '',
                expiry_date: '',
            }));
            
            setReceiveItems(items);
            setReceivingOrder(fullOrder);
            setReceiveMeta({
                grn_date: new Date().toISOString().split('T')[0],
                vehicle_number: '',
                driver_name: '',
                remarks: '',
            });
            setIsReceiveModalOpen(true);
        } catch (error) {
            console.error('Load PO details error:', error);
            toast.error('Failed to load PO details');
        }
    };

    // ✅ Update receive item
    const updateReceiveItem = (index, field, value) => {
        const newItems = [...receiveItems];
        newItems[index] = { ...newItems[index], [field]: value };
        setReceiveItems(newItems);
    };

    // ✅ Submit receive → creates GRN
    const handleReceiveSubmit = async (e) => {
        e.preventDefault();
        
        if (!receivingOrder) return;
        
        // Validate
        const hasReceived = receiveItems.some(
            (it) => Number(it.received_quantity) > 0
        );
        if (!hasReceived) {
            toast.error('Please enter received quantity for at least one item');
            return;
        }

        try {
            setSubmitting(true);
            
            const payload = {
                grn_date: receiveMeta.grn_date,
                vehicle_number: receiveMeta.vehicle_number,
                driver_name: receiveMeta.driver_name,
                warehouse_id: receivingOrder.warehouse_id,
                remarks: receiveMeta.remarks,
                items: receiveItems
                    .filter((it) => Number(it.received_quantity) > 0)
                    .map((it) => ({
                        product_id: it.product_id,
                        product_name: it.product_name,
                        grade: it.grade,
                        ordered_quantity: Number(it.ordered_quantity) || 0,
                        received_quantity: Number(it.received_quantity) || 0,
                        unit: it.unit,
                        batch_number: it.batch_number || null,
                        manufacturing_date: it.manufacturing_date || null,
                        expiry_date: it.expiry_date || null,
                    })),
            };

            console.log('🚀 Receiving PO:', receivingOrder.id);
            console.log('📦 Payload:', payload);

            const response = await purchaseOrdersAPI.receive(receivingOrder.id, payload);
            
            console.log('✅ GRN created:', response.data);

            toast.success(`GRN created: ${response.data?.data?.grn_number || 'Successfully'}`);
            setIsReceiveModalOpen(false);
            setReceivingOrder(null);
            setReceiveItems([]);
            loadOrders();
        } catch (error) {
            console.error('❌ Receive error:', error);
            toast.error(error.response?.data?.message || 'Failed to receive PO');
        } finally {
            setSubmitting(false);
        }
    };

    const handleApproveOrder = async (id) => {
        if (!window.confirm('Approve this PO?')) return;
        try {
            await purchaseOrdersAPI.updateStatus(id, 'Approved');
            toast.success('PO approved!');
            loadOrders();
        } catch (error) {
            toast.error('Failed to approve');
        }
    };

    const handleDeleteOrder = async (id) => {
        if (!window.confirm('Delete this PO permanently?')) return;
        try {
            await purchaseOrdersAPI.delete(id);
            toast.success('PO deleted');
            loadOrders();
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const handleNewOrder = () => {
        setEditingOrder(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingOrder(null);
    };

    const columns = [
        { header: 'PO No', accessor: 'po_number', sortable: true },
        {
            header: 'Date',
            accessor: 'po_date',
            render: (value) => (value ? new Date(value).toLocaleDateString('en-IN') : '-'),
        },
        {
            header: 'Supplier',
            accessor: 'supplier_name',
            sortable: true,
            render: (value) => (
                <span className="font-medium text-gray-800">{value || 'N/A'}</span>
            ),
        },
        {
            header: 'Amount',
            accessor: 'total',
            sortable: true,
            render: (value) => (
                <span className="font-semibold text-blue-600">
                    ₹{Number(value || 0).toLocaleString('en-IN')}
                </span>
            ),
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (value) => (
                <Badge variant={statusColors[value] || 'default'}>{value}</Badge>
            ),
        },
        {
            header: 'Expected Delivery',
            accessor: 'expected_delivery',
            render: (value) => (value ? new Date(value).toLocaleDateString('en-IN') : '-'),
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
                            handleViewOrder(row.id);
                        }}
                    >
                        <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-gray-100 rounded-lg"
                        title="Edit"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditOrder(row);
                        }}
                    >
                        <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    {row.status === 'Pending' && (
                        <button
                            className="p-1.5 hover:bg-green-50 rounded-lg"
                            title="Approve"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleApproveOrder(row.id);
                            }}
                        >
                            <CheckCircle className="w-4 h-4 text-green-600" />
                        </button>
                    )}
                    {(row.status === 'Approved' || row.status === 'Sent') && (
                        <button
                            className="p-1.5 hover:bg-blue-50 rounded-lg"
                            title="Receive"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleReceiveOrder(row);
                            }}
                        >
                            <Truck className="w-4 h-4 text-blue-600" />
                        </button>
                    )}
                    <button
                        className="p-1.5 hover:bg-red-50 rounded-lg"
                        title="Delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteOrder(row.id);
                        }}
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                </div>
            ),
        },
    ];

    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
    const approvedOrders = orders.filter((o) => o.status === 'Approved').length;
    const receivedOrders = orders.filter((o) => o.status === 'Received').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm">
                        <ShoppingCart className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
                            Purchase Orders
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Manage supplier orders and track deliveries
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <Button variant="outline" onClick={loadOrders} className="flex items-center gap-2 text-sm">
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 text-sm">
                        <Download className="w-4 h-4" />
                        Export
                    </Button>
                    <Button onClick={handleNewOrder} className="flex items-center gap-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700">
                        <Plus className="w-4 h-4" />
                        New PO
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={ShoppingCart} label="Total Orders" value={totalOrders} color="text-blue-600" borderColor="border-blue-500" />
                <StatCard icon={Clock} label="Pending" value={pendingOrders} color="text-yellow-600" borderColor="border-yellow-500" />
                <StatCard icon={CheckCircle} label="Approved" value={approvedOrders} color="text-blue-600" borderColor="border-blue-500" />
                <StatCard icon={Truck} label="Received" value={receivedOrders} color="text-green-600" borderColor="border-green-500" />
            </div>

            {/* Filters */}
            <Card className="p-5">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search purchase orders..."
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
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Sent">Sent</option>
                        <option value="Received">Received</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <span className="text-sm text-gray-400 ml-auto font-medium">
                        {orders.length} orders found
                    </span>
                </div>
            </Card>

            {/* Table */}
            <Card className="p-0 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
                        <p className="text-sm text-gray-500 mt-3">Loading purchase orders...</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="p-12 text-center">
                        <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No purchase orders found</p>
                        <Button onClick={handleNewOrder} className="mt-4 inline-flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Create First PO
                        </Button>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        data={orders}
                        totalItems={orders.length}
                        onRowClick={(row) => handleViewOrder(row.id)}
                    />
                )}
            </Card>

            {/* New/Edit PO Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingOrder ? 'Edit Purchase Order' : 'New Purchase Order'}
                size="lg"
            >
                <PurchaseOrderForm
                    onClose={() => {
                        handleCloseModal();
                        setTimeout(loadOrders, 300);
                    }}
                    editData={editingOrder}
                />
            </Modal>

            {/* ✅ RECEIVE MODAL */}
            <Modal
                isOpen={isReceiveModalOpen}
                onClose={() => {
                    setIsReceiveModalOpen(false);
                    setReceivingOrder(null);
                    setReceiveItems([]);
                }}
                title="Receive Goods - Create GRN"
                size="lg"
            >
                {receivingOrder && (
                    <form onSubmit={handleReceiveSubmit} className="space-y-5">
                        {/* PO Info */}
                        <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg text-sm">
                            <div>
                                <span className="text-gray-500 text-xs">PO Number</span>
                                <p className="font-medium">{receivingOrder.po_number}</p>
                            </div>
                            <div>
                                <span className="text-gray-500 text-xs">Supplier</span>
                                <p className="font-medium">{receivingOrder.supplier_name}</p>
                            </div>
                        </div>

                        {/* Receive Meta */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    GRN Date *
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={receiveMeta.grn_date}
                                    onChange={(e) =>
                                        setReceiveMeta({
                                            ...receiveMeta,
                                            grn_date: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Vehicle Number
                                </label>
                                <input
                                    type="text"
                                    value={receiveMeta.vehicle_number}
                                    onChange={(e) =>
                                        setReceiveMeta({
                                            ...receiveMeta,
                                            vehicle_number: e.target.value,
                                        })
                                    }
                                    placeholder="MH-01-AB-1234"
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Driver Name
                                </label>
                                <input
                                    type="text"
                                    value={receiveMeta.driver_name}
                                    onChange={(e) =>
                                        setReceiveMeta({
                                            ...receiveMeta,
                                            driver_name: e.target.value,
                                        })
                                    }
                                    placeholder="Driver name"
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Remarks
                                </label>
                                <input
                                    type="text"
                                    value={receiveMeta.remarks}
                                    onChange={(e) =>
                                        setReceiveMeta({
                                            ...receiveMeta,
                                            remarks: e.target.value,
                                        })
                                    }
                                    placeholder="Any notes..."
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                />
                            </div>
                        </div>

                        {/* Items to Receive */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-sm font-semibold text-gray-700">
                                    Items to Receive
                                </h4>
                                <span className="text-xs text-gray-500">
                                    {receiveItems.length} item{receiveItems.length !== 1 ? 's' : ''}
                                </span>
                            </div>

                            <div className="border rounded-lg overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b text-xs">
                                        <tr>
                                            <th className="px-3 py-2 text-left font-medium text-gray-600">
                                                Product
                                            </th>
                                            <th className="px-3 py-2 text-right font-medium text-gray-600">
                                                Ordered
                                            </th>
                                            <th className="px-3 py-2 text-right font-medium text-gray-600">
                                                Received *
                                            </th>
                                            <th className="px-3 py-2 text-left font-medium text-gray-600">
                                                Batch No
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {receiveItems.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-3 py-2 text-sm">
                                                    <p className="font-medium">{item.product_name}</p>
                                                    {item.grade && (
                                                        <p className="text-xs text-gray-500">
                                                            {item.grade}
                                                        </p>
                                                    )}
                                                </td>
                                                <td className="px-3 py-2 text-sm text-right text-gray-600">
                                                    {item.ordered_quantity} {item.unit}
                                                </td>
                                                <td className="px-3 py-2 text-right">
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        required
                                                        value={item.received_quantity}
                                                        onChange={(e) =>
                                                            updateReceiveItem(
                                                                index,
                                                                'received_quantity',
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-24 px-2 py-1 border rounded text-sm text-right"
                                                    />
                                                </td>
                                                <td className="px-3 py-2">
                                                    <input
                                                        type="text"
                                                        value={item.batch_number}
                                                        onChange={(e) =>
                                                            updateReceiveItem(
                                                                index,
                                                                'batch_number',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="MKH-..."
                                                        className="w-full px-2 py-1 border rounded text-sm"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => {
                                    setIsReceiveModalOpen(false);
                                    setReceivingOrder(null);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                loading={submitting}
                                className="flex items-center gap-2"
                            >
                                <Truck className="w-4 h-4" />
                                Create GRN
                            </Button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
}