// // Invoices.jsx - Premium, Modern, Classic UI
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Plus, 
//   Filter, 
//   Download, 
//   Search, 
//   Eye, 
//   Edit, 
//   Trash2,
//   Printer,
//   Send,
//   DollarSign,
//   CheckCircle,
//   XCircle,
//   Clock,
//   ChevronRight,
//   FileText,
//   Users,
//   Calendar,
//   TrendingUp,
//   Award,
//   Zap,
//   Target,
//   Activity,
//   AlertCircle,
//   Building2,
//   Receipt,
//   FileCheck,
//   CreditCard,
//   Wallet,
//   Banknote,
//   PiggyBank
// } from 'lucide-react';
// import Card from '../../components/common/Card';
// import Button from '../../components/common/Button';
// import Badge from '../../components/common/Badge';
// import Table from '../../components/common/Table';
// import Modal from '../../components/common/Modal';

// const invoicesData = [
//   {
//     id: 'INV-001',
//     date: '2026-08-25',
//     customer: 'ABC Traders',
//     orderNo: 'SO-001',
//     amount: '₹3,75,000',
//     paid: '₹2,00,000',
//     balance: '₹1,75,000',
//     status: 'Partial',
//     dueDate: '2026-09-24'
//   },
//   {
//     id: 'INV-002',
//     date: '2026-08-24',
//     customer: 'XYZ Enterprises',
//     orderNo: 'SO-002',
//     amount: '₹2,50,000',
//     paid: '₹2,50,000',
//     balance: '₹0',
//     status: 'Paid',
//     dueDate: '2026-09-23'
//   },
//   {
//     id: 'INV-003',
//     date: '2026-08-23',
//     customer: 'Makhana House',
//     orderNo: 'SO-003',
//     amount: '₹1,80,000',
//     paid: '₹0',
//     balance: '₹1,80,000',
//     status: 'Unpaid',
//     dueDate: '2026-09-22'
//   },
//   {
//     id: 'INV-004',
//     date: '2026-08-22',
//     customer: 'Green Valley Traders',
//     orderNo: 'SO-004',
//     amount: '₹4,20,000',
//     paid: '₹4,20,000',
//     balance: '₹0',
//     status: 'Paid',
//     dueDate: '2026-09-21'
//   },
//   {
//     id: 'INV-005',
//     date: '2026-08-21',
//     customer: 'Premium Exports',
//     orderNo: 'SO-005',
//     amount: '₹2,90,000',
//     paid: '₹1,00,000',
//     balance: '₹1,90,000',
//     status: 'Partial',
//     dueDate: '2026-09-20'
//   },
// ];

// const statusColors = {
//   'Paid': 'success',
//   'Partial': 'warning',
//   'Unpaid': 'danger',
//   'Overdue': 'danger',
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

// export default function Invoices() {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [selectedInvoice, setSelectedInvoice] = useState(null);
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

//   // Navigation handlers
//   const handleViewInvoice = (id) => {
//     navigate(`/invoices/${id}`);
//   };

//   const handlePrintInvoice = (id) => {
//     console.log('Print invoice:', id);
//   };

//   const handleSendInvoice = (id) => {
//     console.log('Send invoice:', id);
//   };

//   const handleReceivePayment = (invoice) => {
//     setSelectedInvoice(invoice);
//     setIsPaymentModalOpen(true);
//   };

//   const handleGenerateFromOrder = () => {
//     navigate('/sales-orders');
//   };

//   const filteredInvoices = invoicesData.filter(invoice => {
//     const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          invoice.orderNo.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   // Calculate totals
//   const totalReceivable = invoicesData.reduce((sum, inv) => {
//     const amount = parseFloat(inv.amount.replace(/[₹,]/g, ''));
//     return sum + amount;
//   }, 0);

//   const totalPaid = invoicesData.reduce((sum, inv) => {
//     const paid = parseFloat(inv.paid.replace(/[₹,]/g, ''));
//     return sum + paid;
//   }, 0);

//   const totalOutstanding = invoicesData.reduce((sum, inv) => {
//     const balance = parseFloat(inv.balance.replace(/[₹,]/g, ''));
//     return sum + balance;
//   }, 0);

//   const columns = [
//     {
//       header: 'Invoice No',
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
//       header: 'Order',
//       accessor: 'orderNo'
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
//       header: 'Paid',
//       accessor: 'paid',
//       render: (value) => (
//         <span className="font-medium text-green-600">{value}</span>
//       )
//     },
//     {
//       header: 'Balance',
//       accessor: 'balance',
//       render: (value) => (
//         <span className="font-medium text-red-600">{value}</span>
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
//       header: 'Due Date',
//       accessor: 'dueDate'
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
//               handleViewInvoice(row.id);
//             }}
//           >
//             <Eye className="w-4 h-4 text-gray-500" />
//           </button>
//           <button 
//             className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" 
//             title="Print"
//             onClick={(e) => {
//               e.stopPropagation();
//               handlePrintInvoice(row.id);
//             }}
//           >
//             <Printer className="w-4 h-4 text-gray-500" />
//           </button>
//           <button 
//             className="p-1.5 hover:bg-green-50 rounded-lg transition-colors" 
//             title="Receive Payment"
//             onClick={(e) => {
//               e.stopPropagation();
//               handleReceivePayment(row);
//             }}
//           >
//             <DollarSign className="w-4 h-4 text-green-600" />
//           </button>
//           <button 
//             className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors" 
//             title="Send"
//             onClick={(e) => {
//               e.stopPropagation();
//               handleSendInvoice(row.id);
//             }}
//           >
//             <Send className="w-4 h-4 text-blue-600" />
//           </button>
//         </div>
//       )
//     }
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Premium Page Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div className="flex items-start gap-4">
//           <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm">
//             <Receipt className="w-6 h-6 text-blue-600" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">Invoices</h1>
//             <p className="text-sm text-gray-500 mt-0.5">Manage customer invoices and track payments</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-3 flex-wrap">
//           <Button variant="outline" className="flex items-center gap-2 text-sm border-gray-200 hover:bg-gray-50/80">
//             <Download className="w-4 h-4" />
//             Export
//           </Button>
//           <Button 
//             variant="outline" 
//             className="flex items-center gap-2 text-sm border-blue-200 text-blue-600 hover:bg-blue-50/80"
//             onClick={handleGenerateFromOrder}
//           >
//             <FileText className="w-4 h-4" />
//             Generate from Sales Order
//           </Button>
//         </div>
//       </div>

//       {/* Premium Summary Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         <StatCard 
//           icon={Receipt}
//           label="Total Receivable"
//           value={`₹${totalReceivable.toLocaleString()}`}
//           color="text-blue-600"
//           borderColor="border-blue-500"
//         />
//         <StatCard 
//           icon={CheckCircle}
//           label="Paid"
//           value={`₹${totalPaid.toLocaleString()}`}
//           subtext={`${Math.round((totalPaid / totalReceivable) * 100)}% of total`}
//           color="text-green-600"
//           borderColor="border-green-500"
//         />
//         <StatCard 
//           icon={AlertCircle}
//           label="Outstanding"
//           value={`₹${totalOutstanding.toLocaleString()}`}
//           subtext={`${Math.round((totalOutstanding / totalReceivable) * 100)}% of total`}
//           color="text-red-600"
//           borderColor="border-red-500"
//         />
//       </div>

//       {/* Premium Aging Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//         <Card className="p-4 bg-gradient-to-br from-gray-50 to-gray-100/30 border-gray-200 rounded-xl">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-gray-100 rounded-lg">
//               <Wallet className="w-4 h-4 text-gray-600" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Current</p>
//               <p className="text-lg font-bold text-gray-800">₹2,50,000</p>
//             </div>
//           </div>
//         </Card>
//         <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100/30 border-yellow-200 rounded-xl">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-yellow-100 rounded-lg">
//               <Clock className="w-4 h-4 text-yellow-600" />
//             </div>
//             <div>
//               <p className="text-xs text-yellow-600">1-30 Days</p>
//               <p className="text-lg font-bold text-yellow-600">₹1,20,000</p>
//             </div>
//           </div>
//         </Card>
//         <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100/30 border-orange-200 rounded-xl">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-orange-100 rounded-lg">
//               <AlertCircle className="w-4 h-4 text-orange-600" />
//             </div>
//             <div>
//               <p className="text-xs text-orange-600">31-60 Days</p>
//               <p className="text-lg font-bold text-orange-600">₹80,000</p>
//             </div>
//           </div>
//         </Card>
//         <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100/30 border-red-200 rounded-xl">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-red-100 rounded-lg">
//               <XCircle className="w-4 h-4 text-red-600" />
//             </div>
//             <div>
//               <p className="text-xs text-red-600">60+ Days</p>
//               <p className="text-lg font-bold text-red-600">₹55,000</p>
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
//                 placeholder="Search invoices..."
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
//             <option value="Paid">Paid</option>
//             <option value="Partial">Partial</option>
//             <option value="Unpaid">Unpaid</option>
//             <option value="Overdue">Overdue</option>
//           </select>

//           <Button variant="outline" className="flex items-center gap-2 text-sm border-gray-200/80 hover:bg-gray-50/80">
//             <Filter className="w-4 h-4" />
//             More Filters
//           </Button>

//           <span className="text-sm text-gray-400 ml-auto font-medium">
//             {filteredInvoices.length} invoices found
//           </span>
//         </div>
//       </Card>

//       {/* Premium Invoices Table */}
//       <Card className="p-0 overflow-hidden border border-gray-200/60 shadow-sm bg-white/80 backdrop-blur-sm rounded-xl">
//         <Table 
//           columns={columns} 
//           data={filteredInvoices}
//           totalItems={filteredInvoices.length}
//           onRowClick={(row) => handleViewInvoice(row.id)}
//         />
//       </Card>

//       {/* Receive Payment Modal - Premium */}
//       <Modal
//         isOpen={isPaymentModalOpen}
//         onClose={() => setIsPaymentModalOpen(false)}
//         title={
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl">
//               <DollarSign className="w-5 h-5 text-green-600" />
//             </div>
//             <span className="text-lg font-semibold text-gray-800">Receive Payment</span>
//           </div>
//         }
//         size="md"
//       >
//         {selectedInvoice && (
//           <div className="space-y-6">
//             <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50/50 rounded-xl">
//               <div>
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Invoice</p>
//                 <p className="text-sm font-semibold text-gray-800 mt-0.5">{selectedInvoice.id}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Customer</p>
//                 <p className="text-sm font-medium text-gray-700 mt-0.5">{selectedInvoice.customer}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Total Amount</p>
//                 <p className="text-sm font-semibold text-blue-600 mt-0.5">{selectedInvoice.amount}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Balance</p>
//                 <p className="text-sm font-semibold text-red-600 mt-0.5">{selectedInvoice.balance}</p>
//               </div>
//             </div>

//             <div className="border-t border-gray-200 pt-4">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 tracking-wide mb-1.5">
//                     Payment Amount <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                     <input
//                       type="number"
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
//                       placeholder="Enter amount"
//                       defaultValue={selectedInvoice.balance.replace(/[₹,]/g, '')}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 tracking-wide mb-1.5">
//                     Payment Method
//                   </label>
//                   <div className="relative">
//                     <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                     <select className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all appearance-none">
//                       <option value="bank-transfer">Bank Transfer</option>
//                       <option value="cheque">Cheque</option>
//                       <option value="cash">Cash</option>
//                       <option value="upi">UPI</option>
//                     </select>
//                     <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
//                       <ChevronRight className="w-4 h-4" />
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 tracking-wide mb-1.5">
//                     Reference / Cheque No
//                   </label>
//                   <div className="relative">
//                     <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                     <input
//                       type="text"
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
//                       placeholder="Reference number"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 tracking-wide mb-1.5">
//                     Payment Date
//                   </label>
//                   <div className="relative">
//                     <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                     <input
//                       type="date"
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
//                       defaultValue={new Date().toISOString().split('T')[0]}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 tracking-wide mb-1.5">
//                     Remarks
//                   </label>
//                   <div className="relative">
//                     <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                     <textarea
//                       rows="2"
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none"
//                       placeholder="Any notes..."
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
//               <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)}>
//                 Cancel
//               </Button>
//               <Button className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
//                 <DollarSign className="w-4 h-4" />
//                 Record Payment
//               </Button>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Filter, Download, Search, Eye, Printer, Send,
    DollarSign, CheckCircle, XCircle, Clock, ChevronRight,
    FileText, Calendar, AlertCircle, Receipt, Wallet,
    CreditCard,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import { invoicesAPI, paymentsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const statusColors = {
    Paid: 'success',
    Partial: 'warning',
    Unpaid: 'danger',
    Overdue: 'danger',
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

export default function Invoices() {
    const navigate = useNavigate();
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentForm, setPaymentForm] = useState({
        amount: '',
        method: 'Bank Transfer',
        reference_number: '',
        payment_date: new Date().toISOString().split('T')[0],
        remarks: '',
    });
    const [submitting, setSubmitting] = useState(false);

    // ✅ Load invoices
    const loadInvoices = async () => {
        try {
            setLoading(true);
            const response = await invoicesAPI.getAll({
                search: searchTerm,
                status: filterStatus,
            });
            setInvoices(response.data.data || []);
        } catch (error) {
            console.error('Load invoices error:', error);
            toast.error(error.response?.data?.message || 'Failed to load invoices');
            setInvoices([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(loadInvoices, 300);
        return () => clearTimeout(delay);
    }, [searchTerm, filterStatus]);

    const handleViewInvoice = (id) => {
        navigate(`/invoices/${id}`);
    };

    const handlePrintInvoice = (id) => {
        toast.info(`Printing invoice ${id}...`);
        window.print();
    };

    const handleSendInvoice = (id) => {
        toast.success(`Invoice ${id} sent to customer`);
    };

    // ✅ Open receive payment modal
    const handleReceivePayment = (invoice) => {
        setSelectedInvoice(invoice);
        setPaymentForm({
            amount: invoice.balance || '',
            method: 'Bank Transfer',
            reference_number: '',
            payment_date: new Date().toISOString().split('T')[0],
            remarks: '',
        });
        setIsPaymentModalOpen(true);
    };

    // ✅ Submit payment to backend
    const handleSubmitPayment = async (e) => {
        e.preventDefault();

        if (!paymentForm.amount || Number(paymentForm.amount) <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }

        try {
            setSubmitting(true);
            await paymentsAPI.create({
                invoice_id: selectedInvoice.id,
                customer_id: selectedInvoice.customer_id,
                payment_date: paymentForm.payment_date,
                amount: Number(paymentForm.amount),
                method: paymentForm.method,
                reference_number: paymentForm.reference_number,
                remarks: paymentForm.remarks,
            });

            toast.success('Payment recorded successfully!');
            setIsPaymentModalOpen(false);
            setSelectedInvoice(null);
            loadInvoices();
        } catch (error) {
            console.error('Payment error:', error);
            toast.error(error.response?.data?.message || 'Failed to record payment');
        } finally {
            setSubmitting(false);
        }
    };

    const handleGenerateFromOrder = () => {
        navigate('/sales-orders');
    };

    // Calculate totals from DB data
    const totalReceivable = invoices.reduce(
        (sum, inv) => sum + Number(inv.total || 0),
        0
    );
    const totalPaid = invoices.reduce(
        (sum, inv) => sum + Number(inv.paid_amount || 0),
        0
    );
    const totalOutstanding = invoices.reduce(
        (sum, inv) => sum + Number(inv.balance || 0),
        0
    );

    const columns = [
        { header: 'Invoice No', accessor: 'invoice_number', sortable: true },
        {
            header: 'Date',
            accessor: 'invoice_date',
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
            header: 'Order',
            accessor: 'order_number',
            render: (value) => value || '-',
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
            header: 'Paid',
            accessor: 'paid_amount',
            render: (value) => (
                <span className="font-medium text-green-600">
                    ₹{Number(value || 0).toLocaleString('en-IN')}
                </span>
            ),
        },
        {
            header: 'Balance',
            accessor: 'balance',
            render: (value) => (
                <span className="font-medium text-red-600">
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
            header: 'Due Date',
            accessor: 'due_date',
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
                            handleViewInvoice(row.id);
                        }}
                    >
                        <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-gray-100 rounded-lg"
                        title="Print"
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePrintInvoice(row.id);
                        }}
                    >
                        <Printer className="w-4 h-4 text-gray-500" />
                    </button>
                    {row.balance > 0 && (
                        <button
                            className="p-1.5 hover:bg-green-50 rounded-lg"
                            title="Receive Payment"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleReceivePayment(row);
                            }}
                        >
                            <DollarSign className="w-4 h-4 text-green-600" />
                        </button>
                    )}
                    <button
                        className="p-1.5 hover:bg-blue-50 rounded-lg"
                        title="Send"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSendInvoice(row.id);
                        }}
                    >
                        <Send className="w-4 h-4 text-blue-600" />
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
                        <Receipt className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
                            Invoices
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Manage customer invoices and track payments
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <Button variant="outline" className="flex items-center gap-2 text-sm">
                        <Download className="w-4 h-4" />
                        Export
                    </Button>
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 text-sm border-blue-200 text-blue-600"
                        onClick={handleGenerateFromOrder}
                    >
                        <FileText className="w-4 h-4" />
                        Generate from Sales Order
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <StatCard
                    icon={Receipt}
                    label="Total Receivable"
                    value={`₹${totalReceivable.toLocaleString('en-IN')}`}
                    color="text-blue-600"
                    borderColor="border-blue-500"
                />
                <StatCard
                    icon={CheckCircle}
                    label="Paid"
                    value={`₹${totalPaid.toLocaleString('en-IN')}`}
                    subtext={
                        totalReceivable > 0
                            ? `${Math.round((totalPaid / totalReceivable) * 100)}% of total`
                            : '0%'
                    }
                    color="text-green-600"
                    borderColor="border-green-500"
                />
                <StatCard
                    icon={AlertCircle}
                    label="Outstanding"
                    value={`₹${totalOutstanding.toLocaleString('en-IN')}`}
                    subtext={
                        totalReceivable > 0
                            ? `${Math.round((totalOutstanding / totalReceivable) * 100)}% of total`
                            : '0%'
                    }
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
                                placeholder="Search invoices..."
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
                        <option value="Paid">Paid</option>
                        <option value="Partial">Partial</option>
                        <option value="Unpaid">Unpaid</option>
                        <option value="Overdue">Overdue</option>
                    </select>
                    <span className="text-sm text-gray-400 ml-auto font-medium">
                        {invoices.length} invoices found
                    </span>
                </div>
            </Card>

            {/* Table */}
            <Card className="p-0 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
                        <p className="text-sm text-gray-500 mt-3">Loading invoices...</p>
                    </div>
                ) : invoices.length === 0 ? (
                    <div className="p-12 text-center">
                        <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No invoices found</p>
                        <p className="text-sm text-gray-400 mt-1">
                            Invoices are generated from dispatched sales orders
                        </p>
                        <Button
                            onClick={handleGenerateFromOrder}
                            className="mt-4 inline-flex items-center gap-2"
                        >
                            <FileText className="w-4 h-4" />
                            Go to Sales Orders
                        </Button>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        data={invoices}
                        totalItems={invoices.length}
                        onRowClick={(row) => handleViewInvoice(row.id)}
                    />
                )}
            </Card>

            {/* Receive Payment Modal */}
            <Modal
                isOpen={isPaymentModalOpen}
                onClose={() => {
                    setIsPaymentModalOpen(false);
                    setSelectedInvoice(null);
                }}
                title="Receive Payment"
                size="md"
            >
                {selectedInvoice && (
                    <form onSubmit={handleSubmitPayment} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="text-xs text-gray-500">Invoice</p>
                                <p className="text-sm font-medium">
                                    {selectedInvoice.invoice_number}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Customer</p>
                                <p className="text-sm font-medium">
                                    {selectedInvoice.customer_name}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Total</p>
                                <p className="text-sm font-semibold text-blue-600">
                                    ₹{Number(selectedInvoice.total).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Balance</p>
                                <p className="text-sm font-semibold text-red-600">
                                    ₹{Number(selectedInvoice.balance).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Payment Amount *
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                value={paymentForm.amount}
                                onChange={(e) =>
                                    setPaymentForm({ ...paymentForm, amount: e.target.value })
                                }
                                max={selectedInvoice.balance}
                                className="w-full px-3 py-2 border rounded-lg text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Payment Method
                            </label>
                            <select
                                value={paymentForm.method}
                                onChange={(e) =>
                                    setPaymentForm({ ...paymentForm, method: e.target.value })
                                }
                                className="w-full px-3 py-2 border rounded-lg text-sm"
                            >
                                <option value="Bank Transfer">Bank Transfer</option>
                                <option value="Cheque">Cheque</option>
                                <option value="Cash">Cash</option>
                                <option value="UPI">UPI</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Reference Number
                            </label>
                            <input
                                type="text"
                                value={paymentForm.reference_number}
                                onChange={(e) =>
                                    setPaymentForm({
                                        ...paymentForm,
                                        reference_number: e.target.value,
                                    })
                                }
                                placeholder="Cheque/Transaction number"
                                className="w-full px-3 py-2 border rounded-lg text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Payment Date
                            </label>
                            <input
                                type="date"
                                value={paymentForm.payment_date}
                                onChange={(e) =>
                                    setPaymentForm({
                                        ...paymentForm,
                                        payment_date: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Remarks
                            </label>
                            <textarea
                                rows="2"
                                value={paymentForm.remarks}
                                onChange={(e) =>
                                    setPaymentForm({ ...paymentForm, remarks: e.target.value })
                                }
                                className="w-full px-3 py-2 border rounded-lg text-sm"
                                placeholder="Any notes..."
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => {
                                    setIsPaymentModalOpen(false);
                                    setSelectedInvoice(null);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                loading={submitting}
                                className="flex items-center gap-2"
                            >
                                <DollarSign className="w-4 h-4" />
                                Record Payment
                            </Button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
}