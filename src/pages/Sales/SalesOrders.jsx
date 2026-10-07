// // SalesOrders.jsx - Premium, Modern, Classic UI
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Filter, 
//   Download, 
//   Search, 
//   Eye, 
//   Edit, 
//   CheckCircle,
//   XCircle,
//   Truck,
//   FileText,
//   RefreshCw,
//   AlertCircle,
//   ChevronRight,
//   Plus,
//   Users,
//   DollarSign,
//   Calendar,
//   Package,
//   Clock,
//   Award,
//   Zap,
//   Target,
//   Activity,
//   TrendingUp,
//   Check,
//   Send,
//   ClipboardList
// } from 'lucide-react';
// import Card from '../../components/common/Card';
// import Button from '../../components/common/Button';
// import Badge from '../../components/common/Badge';
// import Table from '../../components/common/Table';

// const salesOrdersData = [
//   {
//     id: 'SO-001',
//     date: '2026-08-25',
//     customer: 'ABC Traders',
//     quotationNo: 'Q-001',
//     salesperson: 'Anita Sharma',
//     amount: '₹3,75,000',
//     status: 'Confirmed',
//     deliveryDate: '2026-09-05',
//     items: 3
//   },
//   {
//     id: 'SO-002',
//     date: '2026-08-24',
//     customer: 'XYZ Enterprises',
//     quotationNo: 'Q-002',
//     salesperson: 'Rahul Verma',
//     amount: '₹2,50,000',
//     status: 'In Progress',
//     deliveryDate: '2026-09-02',
//     items: 2
//   },
//   {
//     id: 'SO-003',
//     date: '2026-08-23',
//     customer: 'Makhana House',
//     quotationNo: 'Q-003',
//     salesperson: 'Anita Sharma',
//     amount: '₹1,80,000',
//     status: 'Pending',
//     deliveryDate: '2026-09-01',
//     items: 4
//   },
// ];

// const statusColors = {
//   'Pending': 'warning',
//   'Confirmed': 'info',
//   'In Progress': 'info',
//   'Dispatched': 'purple',
//   'Delivered': 'success',
//   'Cancelled': 'danger',
// };

// // Premium Stat Card Component
// const StatCard = ({ icon: Icon, label, value, subtext, color, borderColor }) => (
//   <Card className={`p-5 border-l-4 ${borderColor} bg-gradient-to-br from-white to-gray-50/50 hover:shadow-md transition-all duration-300`}>
//     <div className="flex items-start justify-between">
//       <div>
//         <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</p>
//         <p className="text-2xl font-bold text-gray-800 mt-1.5">{value}</p>
//         {subtext && <span className={`text-xs font-medium ${color}`}>{subtext}</span>}
//       </div>
//       <div className={`p-2.5 rounded-xl ${color.replace('text', 'bg').replace('600', '50')}`}>
//         <Icon className={`w-5 h-5 ${color}`} />
//       </div>
//     </div>
//   </Card>
// );

// export default function SalesOrders() {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');

//   const handleViewOrder = (id) => {
//     navigate(`/sales-orders/${id}`);
//   };

//   const handleDispatch = (id) => {
//     console.log('Dispatch order:', id);
//   };

//   const handleConfirm = (id) => {
//     console.log('Confirm order:', id);
//   };

//   const handleCancel = (id) => {
//     if (window.confirm('Are you sure you want to cancel this order?')) {
//       console.log('Cancel order:', id);
//     }
//   };

//   const handleCreateFromQuotation = () => {
//     navigate('/quotations');
//   };

//   const columns = [
//     {
//       header: 'Order No',
//       accessor: 'id',
//       sortable: true
//     },
//     {
//       header: 'Date',
//       accessor: 'date'
//     },
//     {
//       header: 'Customer',
//       accessor: 'customer',
//       sortable: true,
//       render: (value) => (
//         <span className="font-medium text-gray-800">{value}</span>
//       )
//     },
//     {
//       header: 'Quotation',
//       accessor: 'quotationNo'
//     },
//     {
//       header: 'Salesperson',
//       accessor: 'salesperson'
//     },
//     {
//       header: 'Amount',
//       accessor: 'amount',
//       sortable: true,
//       render: (value) => (
//         <span className="font-semibold text-blue-600">{value}</span>
//       )
//     },
//     {
//       header: 'Status',
//       accessor: 'status',
//       render: (value) => (
//         <Badge variant={statusColors[value] || 'default'}>
//           {value}
//         </Badge>
//       )
//     },
//     {
//       header: 'Delivery Date',
//       accessor: 'deliveryDate'
//     },
//     {
//       header: 'Actions',
//       accessor: 'id',
//       render: (_, row) => (
//         <div className="flex items-center gap-1">
//           <button 
//             className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" 
//             title="View"
//             onClick={(e) => {
//               e.stopPropagation();
//               handleViewOrder(row.id);
//             }}
//           >
//             <Eye className="w-4 h-4 text-gray-500" />
//           </button>
//           <button 
//             className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" 
//             title="Edit"
//             onClick={(e) => {
//               e.stopPropagation();
//               console.log('Edit:', row.id);
//             }}
//           >
//             <Edit className="w-4 h-4 text-gray-500" />
//           </button>
//           <button 
//             className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors" 
//             title="Dispatch"
//             onClick={(e) => {
//               e.stopPropagation();
//               handleDispatch(row.id);
//             }}
//           >
//             <Truck className="w-4 h-4 text-blue-600" />
//           </button>
//           <button 
//             className="p-1.5 hover:bg-green-50 rounded-lg transition-colors" 
//             title="Confirm"
//             onClick={(e) => {
//               e.stopPropagation();
//               handleConfirm(row.id);
//             }}
//           >
//             <CheckCircle className="w-4 h-4 text-green-600" />
//           </button>
//           <button 
//             className="p-1.5 hover:bg-red-50 rounded-lg transition-colors" 
//             title="Cancel"
//             onClick={(e) => {
//               e.stopPropagation();
//               handleCancel(row.id);
//             }}
//           >
//             <XCircle className="w-4 h-4 text-red-600" />
//           </button>
//         </div>
//       )
//     }
//   ];

//   const filteredOrders = salesOrdersData.filter(order => {
//     const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          order.customer.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   // Calculate stats
//   const totalOrders = salesOrdersData.length;
//   const pendingOrders = salesOrdersData.filter(o => o.status === 'Pending').length;
//   const confirmedOrders = salesOrdersData.filter(o => o.status === 'Confirmed').length;
//   const deliveredOrders = salesOrdersData.filter(o => o.status === 'Delivered').length;

//   return (
//     <div className="space-y-6">
//       {/* Premium Page Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div className="flex items-start gap-4">
//           <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm">
//             <ClipboardList className="w-6 h-6 text-blue-600" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">Sales Orders</h1>
//             <p className="text-sm text-gray-500 mt-0.5">Manage customer orders and track delivery status</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-3 flex-wrap">
//           <Button variant="outline" className="flex items-center gap-2 text-sm border-gray-200 hover:bg-gray-50/80">
//             <RefreshCw className="w-4 h-4" />
//             Refresh
//           </Button>
//           <Button variant="outline" className="flex items-center gap-2 text-sm border-gray-200 hover:bg-gray-50/80">
//             <Download className="w-4 h-4" />
//             Export
//           </Button>
//           <Button 
//             variant="outline" 
//             className="flex items-center gap-2 text-sm border-blue-200 text-blue-600 hover:bg-blue-50/80"
//             onClick={handleCreateFromQuotation}
//           >
//             <FileText className="w-4 h-4" />
//             Create from Quotation
//           </Button>
//         </div>
//       </div>

//       {/* Premium Summary Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <StatCard 
//           icon={ClipboardList}
//           label="Total Orders"
//           value={totalOrders}
//           color="text-blue-600"
//           borderColor="border-blue-500"
//         />
//         <StatCard 
//           icon={Clock}
//           label="Pending"
//           value={pendingOrders}
//           color="text-yellow-600"
//           borderColor="border-yellow-500"
//         />
//         <StatCard 
//           icon={CheckCircle}
//           label="Confirmed"
//           value={confirmedOrders}
//           color="text-blue-600"
//           borderColor="border-blue-500"
//         />
//         <StatCard 
//           icon={Truck}
//           label="Delivered"
//           value={deliveredOrders}
//           color="text-green-600"
//           borderColor="border-green-500"
//         />
//       </div>

//       {/* Premium Stock Alert */}
//       <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
//         <div className="p-2 bg-yellow-100 rounded-lg">
//           <AlertCircle className="w-5 h-5 text-yellow-600" />
//         </div>
//         <div className="flex-1">
//           <p className="text-sm font-semibold text-yellow-800">Stock Alert</p>
//           <p className="text-sm text-yellow-700 mt-0.5">Order SO-003 requires 300 KG of 4 Suta. Available stock: 200 KG. Short: 100 KG.</p>
//           <Button variant="outline" size="sm" className="mt-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50">
//             Create Purchase Requirement
//           </Button>
//         </div>
//       </div>

//       {/* Premium Filters */}
//       <Card className="p-5 bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-sm rounded-xl">
//         <div className="flex flex-wrap items-center gap-4">
//           <div className="flex-1 min-w-[200px]">
//             <div className="relative">
//               <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search orders..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2.5 border border-gray-200/80 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 bg-white/50 transition-all placeholder:text-gray-400"
//               />
//             </div>
//           </div>
          
//           <select
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//             className="px-4 py-2.5 border border-gray-200/80 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 bg-white/50 transition-all"
//           >
//             <option value="all">All Status</option>
//             <option value="Pending">Pending</option>
//             <option value="Confirmed">Confirmed</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Dispatched">Dispatched</option>
//             <option value="Delivered">Delivered</option>
//             <option value="Cancelled">Cancelled</option>
//           </select>

//           <Button variant="outline" className="flex items-center gap-2 text-sm border-gray-200/80 hover:bg-gray-50/80">
//             <Filter className="w-4 h-4" />
//             More Filters
//           </Button>

//           <span className="text-sm text-gray-400 ml-auto font-medium">
//             {filteredOrders.length} orders found
//           </span>
//         </div>
//       </Card>

//       {/* Premium Sales Orders Table */}
//       <Card className="p-0 overflow-hidden border border-gray-200/60 shadow-sm bg-white/80 backdrop-blur-sm rounded-xl">
//         <Table 
//           columns={columns} 
//           data={filteredOrders}
//           totalItems={filteredOrders.length}
//           onRowClick={(row) => handleViewOrder(row.id)}
//         />
//       </Card>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Filter, Download, Search, Eye, Edit, CheckCircle,
    XCircle, Truck, FileText, RefreshCw, AlertCircle,
    Clock, ClipboardList, Package, Receipt,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
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

export default function SalesOrders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);

    // ✅ Load orders
    const loadOrders = async () => {
        try {
            setLoading(true);
            const response = await salesOrdersAPI.getAll({
                search: searchTerm,
                status: filterStatus,
            });
            setOrders(response.data.data || []);
        } catch (error) {
            console.error('Load orders error:', error);
            toast.error(error.response?.data?.message || 'Failed to load orders');
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(loadOrders, 300);
        return () => clearTimeout(delay);
    }, [searchTerm, filterStatus]);

    const handleViewOrder = (id) => {
        navigate(`/sales-orders/${id}`);
    };

    // ✅ Confirm order (Pending → Confirmed)
    const handleConfirm = async (id) => {
        if (!window.confirm('Confirm this order?')) return;

        try {
            await salesOrdersAPI.updateStatus(id, 'Confirmed');
            toast.success('Order confirmed successfully!');
            loadOrders();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to confirm');
        }
    };

    // ✅ Dispatch order
    const handleDispatchClick = (order) => {
        setSelectedOrder(order);
        setIsDispatchModalOpen(true);
    };

    const handleDispatchSubmit = async (dispatchData) => {
        try {
            await salesOrdersAPI.dispatch(selectedOrder.id, dispatchData);
            toast.success('Order dispatched successfully!');
            setIsDispatchModalOpen(false);
            setSelectedOrder(null);
            loadOrders();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Dispatch failed');
        }
    };

    // ✅ Cancel order
    const handleCancel = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this order?')) return;

        try {
            await salesOrdersAPI.updateStatus(id, 'Cancelled');
            toast.success('Order cancelled');
            loadOrders();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to cancel');
        }
    };

    // ✅ Generate invoice
    const handleGenerateInvoice = async (id) => {
        if (!window.confirm('Generate invoice for this order?')) return;

        try {
            const response = await salesOrdersAPI.generateInvoice(id);
            toast.success('Invoice generated successfully!');
            loadOrders();
            navigate(`/invoices/${response.data.data.id}`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invoice generation failed');
        }
    };

    // ✅ Delete order
    const handleDeleteOrder = async (id) => {
        if (!window.confirm('Delete this order permanently?')) return;

        try {
            await salesOrdersAPI.delete(id);
            toast.success('Order deleted');
            loadOrders();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Delete failed');
        }
    };

    const handleCreateFromQuotation = () => {
        navigate('/quotations');
    };

    const columns = [
        {
            header: 'Order No',
            accessor: 'order_number',
            sortable: true,
        },
        {
            header: 'Date',
            accessor: 'order_date',
            render: (value) => (value ? new Date(value).toLocaleDateString('en-IN') : '-'),
        },
        {
            header: 'Customer',
            accessor: 'customer_name',
            sortable: true,
            render: (value) => (
                <span className="font-medium text-gray-800">{value || 'N/A'}</span>
            ),
        },
        {
            header: 'Quotation',
            accessor: 'quotation_number',
            render: (value) => value || '-',
        },
        {
            header: 'Salesperson',
            accessor: 'salesperson_name',
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
            header: 'Delivery Date',
            accessor: 'delivery_date',
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
                    {row.status === 'Pending' && (
                        <button
                            className="p-1.5 hover:bg-green-50 rounded-lg"
                            title="Confirm"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleConfirm(row.id);
                            }}
                        >
                            <CheckCircle className="w-4 h-4 text-green-600" />
                        </button>
                    )}
                    {(row.status === 'Confirmed' || row.status === 'In Progress') && (
                        <button
                            className="p-1.5 hover:bg-blue-50 rounded-lg"
                            title="Dispatch"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDispatchClick(row);
                            }}
                        >
                            <Truck className="w-4 h-4 text-blue-600" />
                        </button>
                    )}
                    {row.status === 'Dispatched' && (
                        <button
                            className="p-1.5 hover:bg-purple-50 rounded-lg"
                            title="Generate Invoice"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleGenerateInvoice(row.id);
                            }}
                        >
                            <Receipt className="w-4 h-4 text-purple-600" />
                        </button>
                    )}
                    {row.status !== 'Delivered' && row.status !== 'Cancelled' && (
                        <button
                            className="p-1.5 hover:bg-red-50 rounded-lg"
                            title="Cancel"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCancel(row.id);
                            }}
                        >
                            <XCircle className="w-4 h-4 text-red-600" />
                        </button>
                    )}
                </div>
            ),
        },
    ];

    // Stats
    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
    const confirmedOrders = orders.filter(
        (o) => o.status === 'Confirmed' || o.status === 'In Progress'
    ).length;
    const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm">
                        <ClipboardList className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
                            Sales Orders
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Manage customer orders and track delivery status
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <Button
                        variant="outline"
                        onClick={loadOrders}
                        className="flex items-center gap-2 text-sm"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 text-sm">
                        <Download className="w-4 h-4" />
                        Export
                    </Button>
                    {/* ✅ Only way to create orders */}
                    <Button
                        onClick={handleCreateFromQuotation}
                        className="flex items-center gap-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700"
                    >
                        <FileText className="w-4 h-4" />
                        Create from Quotation
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    icon={ClipboardList}
                    label="Total Orders"
                    value={totalOrders}
                    color="text-blue-600"
                    borderColor="border-blue-500"
                />
                <StatCard
                    icon={Clock}
                    label="Pending"
                    value={pendingOrders}
                    color="text-yellow-600"
                    borderColor="border-yellow-500"
                />
                <StatCard
                    icon={CheckCircle}
                    label="Confirmed"
                    value={confirmedOrders}
                    color="text-blue-600"
                    borderColor="border-blue-500"
                />
                <StatCard
                    icon={Truck}
                    label="Delivered"
                    value={deliveredOrders}
                    color="text-green-600"
                    borderColor="border-green-500"
                />
            </div>

            {/* Stock Alert */}
            {orders.length > 0 && (
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-yellow-800">Stock Alert</p>
                        <p className="text-sm text-yellow-700 mt-0.5">
                            Check stock availability before dispatching pending orders.
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 border-yellow-300 text-yellow-700"
                            onClick={() => navigate('/stock')}
                        >
                            View Stock
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
                                placeholder="Search orders..."
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
                        <option value="Confirmed">Confirmed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
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
                        <p className="text-sm text-gray-500 mt-3">Loading orders...</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="p-12 text-center">
                        <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No sales orders found</p>
                        <p className="text-sm text-gray-400 mt-1">
                            Sales orders are created from approved quotations
                        </p>
                        <Button
                            onClick={handleCreateFromQuotation}
                            className="mt-4 inline-flex items-center gap-2"
                        >
                            <FileText className="w-4 h-4" />
                            Go to Quotations
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

            {/* Dispatch Modal */}
            <DispatchModal
                isOpen={isDispatchModalOpen}
                onClose={() => {
                    setIsDispatchModalOpen(false);
                    setSelectedOrder(null);
                }}
                order={selectedOrder}
                onSubmit={handleDispatchSubmit}
            />
        </div>
    );
}

// ✅ Dispatch Modal Component
function DispatchModal({ isOpen, onClose, order, onSubmit }) {
    const [formData, setFormData] = useState({
        dispatch_date: new Date().toISOString().split('T')[0],
        transporter: '',
        vehicle_number: '',
        remarks: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit(formData);
        setLoading(false);
    };

    if (!order) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Dispatch Order" size="md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Order</p>
                    <p className="text-sm font-medium">{order.order_number}</p>
                    <p className="text-xs text-gray-500 mt-1">Customer</p>
                    <p className="text-sm">{order.customer_name}</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dispatch Date *
                    </label>
                    <input
                        type="date"
                        required
                        value={formData.dispatch_date}
                        onChange={(e) =>
                            setFormData({ ...formData, dispatch_date: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Transporter
                    </label>
                    <input
                        type="text"
                        value={formData.transporter}
                        onChange={(e) =>
                            setFormData({ ...formData, transporter: e.target.value })
                        }
                        placeholder="Transport company name"
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Vehicle Number
                    </label>
                    <input
                        type="text"
                        value={formData.vehicle_number}
                        onChange={(e) =>
                            setFormData({ ...formData, vehicle_number: e.target.value })
                        }
                        placeholder="MH-01-AB-1234"
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Remarks
                    </label>
                    <textarea
                        rows="2"
                        value={formData.remarks}
                        onChange={(e) =>
                            setFormData({ ...formData, remarks: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder="Any notes..."
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" type="button" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" loading={loading} className="flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        Dispatch
                    </Button>
                </div>
            </form>
        </Modal>
    );
}