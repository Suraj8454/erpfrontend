// // Payments.jsx - Premium, Modern, Classic UI
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Filter, 
//   Download, 
//   Search, 
//   Eye, 
//   CheckCircle,
//   XCircle,
//   Clock,
//   CreditCard,
//   Banknote,
//   FileText,
//   RefreshCw,
//   ChevronRight,
//   Users,
//   DollarSign,
//   Calendar,
//   Wallet,
//   TrendingUp,
//   Award,
//   Zap,
//   Target,
//   Activity,
//   Receipt,
//   PiggyBank,
//   Landmark,
//   Building2,
//   FileCheck,
//   Send,
//   Printer
// } from 'lucide-react';
// import Card from '../../components/common/Card';
// import Button from '../../components/common/Button';
// import Badge from '../../components/common/Badge';
// import Table from '../../components/common/Table';
// import Modal from '../../components/common/Modal';

// const paymentsData = [
//   {
//     id: 'PMT-001',
//     date: '2026-08-25',
//     customer: 'XYZ Enterprises',
//     invoiceNo: 'INV-002',
//     amount: '₹2,50,000',
//     method: 'Bank Transfer',
//     status: 'Completed',
//     reference: 'TRF-20260825'
//   },
//   {
//     id: 'PMT-002',
//     date: '2026-08-24',
//     customer: 'ABC Traders',
//     invoiceNo: 'INV-001',
//     amount: '₹2,00,000',
//     method: 'Cheque',
//     status: 'Pending',
//     reference: 'CHQ-12345'
//   },
//   {
//     id: 'PMT-003',
//     date: '2026-08-23',
//     customer: 'Makhana House',
//     invoiceNo: 'INV-003',
//     amount: '₹50,000',
//     method: 'Cash',
//     status: 'Completed',
//     reference: 'CASH-001'
//   },
// ];

// const statusColors = {
//   'Completed': 'success',
//   'Pending': 'warning',
//   'Failed': 'danger',
//   'Refunded': 'info',
// };

// const methodIcons = {
//   'Bank Transfer': Landmark,
//   'Cheque': Banknote,
//   'Cash': Wallet,
//   'UPI': CreditCard,
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

// export default function Payments() {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [selectedPayment, setSelectedPayment] = useState(null);

//   const handleViewPayment = (id) => {
//     navigate(`/payments/${id}`);
//   };

//   const handlePrintReceipt = (id) => {
//     console.log('Print receipt:', id);
//   };

//   const handleViewInvoice = (invoiceNo) => {
//     navigate(`/invoices/${invoiceNo}`);
//   };

//   const handleReceivePayment = () => {
//     navigate('/invoices');
//   };

//   const columns = [
//     {
//       header: 'Payment ID',
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
//       header: 'Invoice',
//       accessor: 'invoiceNo',
//       render: (value) => (
//         <button 
//           className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
//           onClick={(e) => {
//             e.stopPropagation();
//             handleViewInvoice(value);
//           }}
//         >
//           {value}
//         </button>
//       )
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
//       header: 'Method',
//       accessor: 'method',
//       render: (value) => {
//         const Icon = methodIcons[value] || CreditCard;
//         return (
//           <span className="flex items-center gap-2 text-gray-700">
//             <Icon className="w-4 h-4 text-gray-500" />
//             {value}
//           </span>
//         );
//       }
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
//       header: 'Reference',
//       accessor: 'reference'
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
//               handleViewPayment(row.id);
//             }}
//           >
//             <Eye className="w-4 h-4 text-gray-500" />
//           </button>
//           <button 
//             className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" 
//             title="Print Receipt"
//             onClick={(e) => {
//               e.stopPropagation();
//               handlePrintReceipt(row.id);
//             }}
//           >
//             <Printer className="w-4 h-4 text-gray-500" />
//           </button>
//         </div>
//       )
//     }
//   ];

//   const filteredPayments = paymentsData.filter(payment => {
//     const matchesSearch = payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          payment.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   // Calculate totals
//   const totalReceived = paymentsData
//     .filter(p => p.status === 'Completed')
//     .reduce((sum, p) => sum + parseFloat(p.amount.replace(/[₹,]/g, '')), 0);

//   const totalPending = paymentsData
//     .filter(p => p.status === 'Pending')
//     .reduce((sum, p) => sum + parseFloat(p.amount.replace(/[₹,]/g, '')), 0);

//   return (
//     <div className="space-y-6">
//       {/* Premium Page Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div className="flex items-start gap-4">
//           <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm">
//             <CreditCard className="w-6 h-6 text-blue-600" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">Payments</h1>
//             <p className="text-sm text-gray-500 mt-0.5">Track customer payments and manage receipts</p>
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
//             onClick={handleReceivePayment}
//           >
//             <FileText className="w-4 h-4" />
//             Receive from Invoice
//           </Button>
//         </div>
//       </div>

//       {/* Premium Summary Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         <StatCard 
//           icon={CheckCircle}
//           label="Total Received"
//           value={`₹${totalReceived.toLocaleString()}`}
//           subtext="All completed payments"
//           color="text-green-600"
//           borderColor="border-green-500"
//         />
//         <StatCard 
//           icon={TrendingUp}
//           label="This Month"
//           value="₹4,50,000"
//           color="text-blue-600"
//           borderColor="border-blue-500"
//         />
//         <StatCard 
//           icon={Clock}
//           label="Pending"
//           value={`₹${totalPending.toLocaleString()}`}
//           subtext="Awaiting confirmation"
//           color="text-yellow-600"
//           borderColor="border-yellow-500"
//         />
//       </div>

//       {/* Payment Method Distribution */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//         <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/30 border-blue-200 rounded-xl">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <Landmark className="w-4 h-4 text-blue-600" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Bank Transfer</p>
//               <p className="text-lg font-bold text-blue-600">₹2,50,000</p>
//             </div>
//           </div>
//         </Card>
//         <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/30 border-purple-200 rounded-xl">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-purple-100 rounded-lg">
//               <Banknote className="w-4 h-4 text-purple-600" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Cheque</p>
//               <p className="text-lg font-bold text-purple-600">₹2,00,000</p>
//             </div>
//           </div>
//         </Card>
//         <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100/30 border-green-200 rounded-xl">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-green-100 rounded-lg">
//               <Wallet className="w-4 h-4 text-green-600" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Cash</p>
//               <p className="text-lg font-bold text-green-600">₹50,000</p>
//             </div>
//           </div>
//         </Card>
//         <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100/30 border-orange-200 rounded-xl">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-orange-100 rounded-lg">
//               <CreditCard className="w-4 h-4 text-orange-600" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">UPI</p>
//               <p className="text-lg font-bold text-orange-600">₹0</p>
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Premium Filters */}
//       <Card className="p-5 bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-sm rounded-xl">
//         <div className="flex flex-wrap items-center gap-4">
//           <div className="flex-1 min-w-[200px]">
//             <div className="relative">
//               <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search payments..."
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
//             <option value="Completed">Completed</option>
//             <option value="Pending">Pending</option>
//             <option value="Failed">Failed</option>
//             <option value="Refunded">Refunded</option>
//           </select>

//           <Button variant="outline" className="flex items-center gap-2 text-sm border-gray-200/80 hover:bg-gray-50/80">
//             <Filter className="w-4 h-4" />
//             More Filters
//           </Button>

//           <span className="text-sm text-gray-400 ml-auto font-medium">
//             {filteredPayments.length} payments found
//           </span>
//         </div>
//       </Card>

//       {/* Premium Payments Table */}
//       <Card className="p-0 overflow-hidden border border-gray-200/60 shadow-sm bg-white/80 backdrop-blur-sm rounded-xl">
//         <Table 
//           columns={columns} 
//           data={filteredPayments}
//           totalItems={filteredPayments.length}
//           onRowClick={(row) => handleViewPayment(row.id)}
//         />
//       </Card>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Filter, Download, Search, Eye, CheckCircle, XCircle,
    Clock, CreditCard, Banknote, FileText, RefreshCw,
    Wallet, Landmark, Printer, TrendingUp,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import { paymentsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const statusColors = {
    Completed: 'success',
    Pending: 'warning',
    Failed: 'danger',
    Refunded: 'info',
};

const methodIcons = {
    'Bank Transfer': Landmark,
    'Cheque': Banknote,
    'Cash': Wallet,
    UPI: CreditCard,
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

export default function Payments() {
    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // ✅ Load payments
    const loadPayments = async () => {
        try {
            setLoading(true);
            const [paymentsRes, summaryRes] = await Promise.all([
                paymentsAPI.getAll({
                    search: searchTerm,
                    status: filterStatus,
                }),
                paymentsAPI.getSummary(),
            ]);
            setPayments(paymentsRes.data.data || []);
            setSummary(summaryRes.data.data || null);
        } catch (error) {
            console.error('Load payments error:', error);
            toast.error(error.response?.data?.message || 'Failed to load payments');
            setPayments([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(loadPayments, 300);
        return () => clearTimeout(delay);
    }, [searchTerm, filterStatus]);

    const handleViewPayment = (id) => {
        navigate(`/payments/${id}`);
    };

    const handlePrintReceipt = (id) => {
        toast.success(`Printing receipt ${id}...`);
        window.print();
    };

    const handleViewInvoice = (invoiceId) => {
        if (invoiceId) {
            navigate(`/invoices/${invoiceId}`);
        }
    };

    const handleReceivePayment = () => {
        navigate('/invoices');
    };

    const columns = [
        { header: 'Payment ID', accessor: 'payment_number', sortable: true },
        {
            header: 'Date',
            accessor: 'payment_date',
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
            header: 'Invoice',
            accessor: 'invoice_number',
            render: (value, row) => (
                <button
                    className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleViewInvoice(row.invoice_id);
                    }}
                >
                    {value || '-'}
                </button>
            ),
        },
        {
            header: 'Amount',
            accessor: 'amount',
            sortable: true,
            render: (value) => (
                <span className="font-semibold text-blue-600">
                    ₹{Number(value || 0).toLocaleString('en-IN')}
                </span>
            ),
        },
        {
            header: 'Method',
            accessor: 'method',
            render: (value) => {
                const Icon = methodIcons[value] || CreditCard;
                return (
                    <span className="flex items-center gap-2 text-gray-700">
                        <Icon className="w-4 h-4 text-gray-500" />
                        {value || 'N/A'}
                    </span>
                );
            },
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (value) => (
                <Badge variant={statusColors[value] || 'default'}>{value}</Badge>
            ),
        },
        {
            header: 'Reference',
            accessor: 'reference_number',
            render: (value) => value || '-',
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
                            handleViewPayment(row.id);
                        }}
                    >
                        <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-gray-100 rounded-lg"
                        title="Print Receipt"
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePrintReceipt(row.payment_number);
                        }}
                    >
                        <Printer className="w-4 h-4 text-gray-500" />
                    </button>
                </div>
            ),
        },
    ];

    // Calculate totals from DB
    const totalReceived = payments
        .filter((p) => p.status === 'Completed')
        .reduce((sum, p) => sum + Number(p.amount || 0), 0);

    const totalPending = payments
        .filter((p) => p.status === 'Pending')
        .reduce((sum, p) => sum + Number(p.amount || 0), 0);

    // Group by method
    const methodTotals = {
        'Bank Transfer': 0,
        Cheque: 0,
        Cash: 0,
        UPI: 0,
    };
    payments
        .filter((p) => p.status === 'Completed')
        .forEach((p) => {
            if (methodTotals[p.method] !== undefined) {
                methodTotals[p.method] += Number(p.amount || 0);
            }
        });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm">
                        <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
                            Payments
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Track customer payments and manage receipts
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <Button
                        variant="outline"
                        onClick={loadPayments}
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
                        variant="outline"
                        className="flex items-center gap-2 text-sm border-blue-200 text-blue-600"
                        onClick={handleReceivePayment}
                    >
                        <FileText className="w-4 h-4" />
                        Receive from Invoice
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <StatCard
                    icon={CheckCircle}
                    label="Total Received"
                    value={`₹${totalReceived.toLocaleString('en-IN')}`}
                    subtext={`${payments.filter((p) => p.status === 'Completed').length} completed`}
                    color="text-green-600"
                    borderColor="border-green-500"
                />
                <StatCard
                    icon={TrendingUp}
                    label="This Month"
                    value={`₹${Number(summary?.this_month_amount || 0).toLocaleString('en-IN')}`}
                    subtext={`${summary?.this_month_count || 0} payments`}
                    color="text-blue-600"
                    borderColor="border-blue-500"
                />
                <StatCard
                    icon={Clock}
                    label="Pending"
                    value={`₹${totalPending.toLocaleString('en-IN')}`}
                    subtext="Awaiting confirmation"
                    color="text-yellow-600"
                    borderColor="border-yellow-500"
                />
            </div>

            {/* Payment Method Distribution */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/30 border-blue-200 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Landmark className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Bank Transfer</p>
                            <p className="text-lg font-bold text-blue-600">
                                ₹{methodTotals['Bank Transfer'].toLocaleString('en-IN')}
                            </p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/30 border-purple-200 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Banknote className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Cheque</p>
                            <p className="text-lg font-bold text-purple-600">
                                ₹{methodTotals['Cheque'].toLocaleString('en-IN')}
                            </p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100/30 border-green-200 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <Wallet className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Cash</p>
                            <p className="text-lg font-bold text-green-600">
                                ₹{methodTotals['Cash'].toLocaleString('en-IN')}
                            </p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100/30 border-orange-200 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <CreditCard className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">UPI</p>
                            <p className="text-lg font-bold text-orange-600">
                                ₹{methodTotals['UPI'].toLocaleString('en-IN')}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filters */}
            <Card className="p-5">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search payments..."
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
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                        <option value="Refunded">Refunded</option>
                    </select>
                    <span className="text-sm text-gray-400 ml-auto font-medium">
                        {payments.length} payments found
                    </span>
                </div>
            </Card>

            {/* Table */}
            <Card className="p-0 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
                        <p className="text-sm text-gray-500 mt-3">Loading payments...</p>
                    </div>
                ) : payments.length === 0 ? (
                    <div className="p-12 text-center">
                        <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No payments found</p>
                        <p className="text-sm text-gray-400 mt-1">
                            Payments are recorded against invoices
                        </p>
                        <Button
                            onClick={handleReceivePayment}
                            className="mt-4 inline-flex items-center gap-2"
                        >
                            <FileText className="w-4 h-4" />
                            Go to Invoices
                        </Button>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        data={payments}
                        totalItems={payments.length}
                        onRowClick={(row) => handleViewPayment(row.id)}
                    />
                )}
            </Card>
        </div>
    );
}