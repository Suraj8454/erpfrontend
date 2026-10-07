// // Batches.jsx - Premium, Modern, Classic UI
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Search, 
//   Filter, 
//   Download, 
//   Eye,
//   RefreshCw,
//   Calendar,
//   Package,
//   Truck,
//   CheckCircle,
//   XCircle,
//   Clock,
//   ChevronRight,
//   FileText,
//   Users,
//   Box,
//   TrendingUp,
//   Award,
//   Zap,
//   Target,
//   Activity,
//   Layers,
//   Hash,
//   Building2,
//   ClipboardCheck,
//   AlertCircle,
//   BadgeCheck,
//   ShieldCheck,
//   Microscope,
//   Beaker,
//   TestTube
// } from 'lucide-react';
// import Card from '../../components/common/Card';
// import Button from '../../components/common/Button';
// import Badge from '../../components/common/Badge';
// import Table from '../../components/common/Table';
// import Modal from '../../components/common/Modal';

// const batchesData = [
//   {
//     id: 'MKH-260825-001',
//     product: '4 Suta Makhana',
//     supplier: 'Makhana Suppliers Pvt Ltd',
//     poNo: 'PO-001',
//     grnNo: 'GRN-001',
//     quantity: '500 KG',
//     available: '450 KG',
//     moisture: '8.5%',
//     broken: '2.5%',
//     foreignMaterial: '0.2%',
//     grade: 'Premium',
//     status: 'Available',
//     expiryDate: '2027-08-25',
//     manufacturedDate: '2026-08-25',
//     qcResult: 'Accepted'
//   },
//   {
//     id: 'MKH-260825-002',
//     product: '5 Suta Makhana',
//     supplier: 'Premium Makhana Exports',
//     poNo: 'PO-002',
//     grnNo: 'GRN-002',
//     quantity: '300 KG',
//     available: '280 KG',
//     moisture: '9.2%',
//     broken: '3.0%',
//     foreignMaterial: '0.5%',
//     grade: 'Standard',
//     status: 'Available',
//     expiryDate: '2027-08-24',
//     manufacturedDate: '2026-08-24',
//     qcResult: 'Partially Accepted'
//   },
//   {
//     id: 'MKH-260825-003',
//     product: 'Premium Makhana',
//     supplier: 'Green Valley Makhana',
//     poNo: 'PO-003',
//     grnNo: 'GRN-003',
//     quantity: '200 KG',
//     available: '0 KG',
//     moisture: '7.8%',
//     broken: '4.0%',
//     foreignMaterial: '1.0%',
//     grade: 'Premium',
//     status: 'Exhausted',
//     expiryDate: '2027-08-23',
//     manufacturedDate: '2026-08-23',
//     qcResult: 'Rejected'
//   },
// ];

// const statusColors = {
//   'Available': 'success',
//   'Partial': 'warning',
//   'Exhausted': 'danger',
//   'Hold': 'warning',
// };

// const qcColors = {
//   'Accepted': 'success',
//   'Partially Accepted': 'warning',
//   'Rejected': 'danger',
//   'Hold': 'warning',
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

// export default function Batches() {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [selectedBatch, setSelectedBatch] = useState(null);
//   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

//   const handleViewBatch = (batch) => {
//     setSelectedBatch(batch);
//     setIsDetailModalOpen(true);
//   };

//   const handleViewTraceability = (batchId) => {
//     navigate(`/batches/${batchId}/trace`);
//   };

//   const handleViewGRN = (grnNo) => {
//     navigate(`/grn/${grnNo}`);
//   };

//   const columns = [
//     {
//       header: 'Batch No',
//       accessor: 'id',
//       sortable: true,
//       render: (value) => (
//         <span className="font-mono font-medium text-gray-800 text-sm">{value}</span>
//       )
//     },
//     {
//       header: 'Product',
//       accessor: 'product',
//       sortable: true,
//       render: (value) => (
//         <span className="font-medium text-gray-800">{value}</span>
//       )
//     },
//     {
//       header: 'Supplier',
//       accessor: 'supplier'
//     },
//     {
//       header: 'PO',
//       accessor: 'poNo',
//       render: (value) => (
//         <span className="text-blue-600 hover:text-blue-700 font-medium">
//           {value}
//         </span>
//       )
//     },
//     {
//       header: 'GRN',
//       accessor: 'grnNo',
//       render: (value) => (
//         <button 
//           className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
//           onClick={(e) => {
//             e.stopPropagation();
//             handleViewGRN(value);
//           }}
//         >
//           {value}
//         </button>
//       )
//     },
//     {
//       header: 'Qty',
//       accessor: 'quantity'
//     },
//     {
//       header: 'Available',
//       accessor: 'available',
//       render: (value) => (
//         <span className={parseInt(value.replace(/[^0-9]/g, '')) === 0 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
//           {value}
//         </span>
//       )
//     },
//     {
//       header: 'Moisture',
//       accessor: 'moisture'
//     },
//     {
//       header: 'Grade',
//       accessor: 'grade'
//     },
//     {
//       header: 'QC Result',
//       accessor: 'qcResult',
//       render: (value) => (
//         <Badge variant={qcColors[value] || 'default'}>
//           {value}
//         </Badge>
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
//       header: 'Expiry',
//       accessor: 'expiryDate'
//     },
//     {
//       header: 'Actions',
//       accessor: 'id',
//       render: (_, row) => (
//         <div className="flex items-center gap-1">
//           <button 
//             className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" 
//             title="View Details"
//             onClick={(e) => {
//               e.stopPropagation();
//               handleViewBatch(row);
//             }}
//           >
//             <Eye className="w-4 h-4 text-gray-500" />
//           </button>
//           <button 
//             className="p-1.5 hover:bg-purple-50 rounded-lg transition-colors" 
//             title="Traceability"
//             onClick={(e) => {
//               e.stopPropagation();
//               handleViewTraceability(row.id);
//             }}
//           >
//             <FileText className="w-4 h-4 text-purple-600" />
//           </button>
//         </div>
//       )
//     }
//   ];

//   const filteredBatches = batchesData.filter(batch => {
//     const matchesSearch = batch.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          batch.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          batch.supplier.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = filterStatus === 'all' || batch.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   // Calculate stats
//   const totalBatches = batchesData.length;
//   const availableBatches = batchesData.filter(b => b.status === 'Available').length;
//   const totalAvailableQty = batchesData.reduce((sum, b) => {
//     const qty = parseInt(b.available.replace(/[^0-9]/g, ''));
//     return sum + qty;
//   }, 0);

//   return (
//     <div className="space-y-6">
//       {/* Premium Page Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div className="flex items-start gap-4">
//           <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm">
//             <Layers className="w-6 h-6 text-blue-600" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">Batch Tracking</h1>
//             <p className="text-sm text-gray-500 mt-0.5">Track inventory by batch and lot numbers</p>
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
//         </div>
//       </div>

//       {/* Premium Summary Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <StatCard 
//           icon={Layers}
//           label="Total Batches"
//           value={totalBatches}
//           color="text-blue-600"
//           borderColor="border-blue-500"
//         />
//         <StatCard 
//           icon={CheckCircle}
//           label="Available"
//           value={availableBatches}
//           subtext={`${Math.round((availableBatches / totalBatches) * 100)}% of total`}
//           color="text-green-600"
//           borderColor="border-green-500"
//         />
//         <StatCard 
//           icon={Package}
//           label="Total Available Stock"
//           value={`${totalAvailableQty.toLocaleString()} KG`}
//           color="text-blue-600"
//           borderColor="border-blue-500"
//         />
//         <StatCard 
//           icon={Box}
//           label="Products"
//           value={new Set(batchesData.map(b => b.product)).size}
//           color="text-purple-600"
//           borderColor="border-purple-500"
//         />
//       </div>

//       {/* Premium Filters */}
//       <Card className="p-5 bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-sm rounded-xl">
//         <div className="flex flex-wrap items-center gap-4">
//           <div className="flex-1 min-w-[200px]">
//             <div className="relative">
//               <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search batches..."
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
//             <option value="Available">Available</option>
//             <option value="Partial">Partial</option>
//             <option value="Exhausted">Exhausted</option>
//             <option value="Hold">Hold</option>
//           </select>

//           <Button variant="outline" className="flex items-center gap-2 text-sm border-gray-200/80 hover:bg-gray-50/80">
//             <Filter className="w-4 h-4" />
//             More Filters
//           </Button>

//           <span className="text-sm text-gray-400 ml-auto font-medium">
//             {filteredBatches.length} batches found
//           </span>
//         </div>
//       </Card>

//       {/* Premium Batches Table */}
//       <Card className="p-0 overflow-hidden border border-gray-200/60 shadow-sm bg-white/80 backdrop-blur-sm rounded-xl">
//         <Table 
//           columns={columns} 
//           data={filteredBatches}
//           totalItems={filteredBatches.length}
//           onRowClick={(row) => handleViewBatch(row)}
//         />
//       </Card>

//       {/* Batch Detail Modal - Premium */}
//       <Modal
//         isOpen={isDetailModalOpen}
//         onClose={() => setIsDetailModalOpen(false)}
//         title={
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl">
//               <Layers className="w-5 h-5 text-blue-600" />
//             </div>
//             <span className="text-lg font-semibold text-gray-800">Batch Details</span>
//           </div>
//         }
//         size="lg"
//       >
//         {selectedBatch && (
//           <div className="space-y-6">
//             {/* Header */}
//             <div className="bg-gradient-to-br from-gray-50 to-gray-100/30 rounded-xl p-4 flex items-center justify-between border border-gray-200">
//               <div>
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Batch Number</p>
//                 <p className="text-lg font-bold text-gray-900 mt-0.5 font-mono">{selectedBatch.id}</p>
//               </div>
//               <Badge variant={statusColors[selectedBatch.status] || 'default'}>
//                 {selectedBatch.status}
//               </Badge>
//             </div>

//             {/* Details Grid */}
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               <div className="p-3 bg-gray-50/50 rounded-lg">
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Product</p>
//                 <p className="text-sm font-medium text-gray-700 mt-0.5 flex items-center gap-2">
//                   <Package className="w-3.5 h-3.5 text-gray-400" />
//                   {selectedBatch.product}
//                 </p>
//               </div>
//               <div className="p-3 bg-gray-50/50 rounded-lg">
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Grade</p>
//                 <p className="text-sm font-medium text-gray-700 mt-0.5">{selectedBatch.grade}</p>
//               </div>
//               <div className="p-3 bg-gray-50/50 rounded-lg">
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Supplier</p>
//                 <p className="text-sm font-medium text-gray-700 mt-0.5 flex items-center gap-2">
//                   <Building2 className="w-3.5 h-3.5 text-gray-400" />
//                   {selectedBatch.supplier}
//                 </p>
//               </div>
//               <div className="p-3 bg-gray-50/50 rounded-lg">
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">PO Number</p>
//                 <p className="text-sm font-medium text-blue-600 mt-0.5">{selectedBatch.poNo}</p>
//               </div>
//               <div className="p-3 bg-gray-50/50 rounded-lg">
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">GRN Number</p>
//                 <p className="text-sm font-medium text-blue-600 mt-0.5">{selectedBatch.grnNo}</p>
//               </div>
//               <div className="p-3 bg-gray-50/50 rounded-lg">
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">QC Result</p>
//                 <div className="mt-0.5">
//                   <Badge variant={qcColors[selectedBatch.qcResult] || 'default'}>
//                     {selectedBatch.qcResult}
//                   </Badge>
//                 </div>
//               </div>
//               <div className="p-3 bg-gray-50/50 rounded-lg">
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Total Quantity</p>
//                 <p className="text-sm font-medium text-gray-700 mt-0.5">{selectedBatch.quantity}</p>
//               </div>
//               <div className="p-3 bg-gray-50/50 rounded-lg">
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Available</p>
//                 <p className={`text-sm font-medium mt-0.5 ${parseInt(selectedBatch.available.replace(/[^0-9]/g, '')) === 0 ? 'text-red-600' : 'text-green-600'}`}>
//                   {selectedBatch.available}
//                 </p>
//               </div>
//               <div className="p-3 bg-gray-50/50 rounded-lg">
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Manufactured Date</p>
//                 <p className="text-sm font-medium text-gray-700 mt-0.5 flex items-center gap-2">
//                   <Calendar className="w-3.5 h-3.5 text-gray-400" />
//                   {selectedBatch.manufacturedDate}
//                 </p>
//               </div>
//               <div className="p-3 bg-gray-50/50 rounded-lg">
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Expiry Date</p>
//                 <p className="text-sm font-medium text-gray-700 mt-0.5 flex items-center gap-2">
//                   <Calendar className="w-3.5 h-3.5 text-gray-400" />
//                   {selectedBatch.expiryDate}
//                 </p>
//               </div>
//             </div>

//             {/* QC Parameters */}
//             <div>
//               <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                 <Microscope className="w-4 h-4 text-blue-500" />
//                 QC Parameters
//               </h4>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                 <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
//                   <p className="text-xs text-blue-600 uppercase tracking-wider">Moisture</p>
//                   <p className="text-sm font-semibold text-blue-700 mt-1">{selectedBatch.moisture}</p>
//                 </div>
//                 <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100">
//                   <p className="text-xs text-purple-600 uppercase tracking-wider">Broken</p>
//                   <p className="text-sm font-semibold text-purple-700 mt-1">{selectedBatch.broken}</p>
//                 </div>
//                 <div className="p-3 bg-orange-50/50 rounded-lg border border-orange-100">
//                   <p className="text-xs text-orange-600 uppercase tracking-wider">Foreign Material</p>
//                   <p className="text-sm font-semibold text-orange-700 mt-1">{selectedBatch.foreignMaterial}</p>
//                 </div>
//                 <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-200">
//                   <p className="text-xs text-gray-500 uppercase tracking-wider">Overall Result</p>
//                   <div className="mt-1">
//                     <Badge variant={qcColors[selectedBatch.qcResult] || 'default'}>
//                       {selectedBatch.qcResult}
//                     </Badge>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
//               <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
//                 Close
//               </Button>
//               <Button variant="outline" className="flex items-center gap-2" onClick={() => handleViewTraceability(selectedBatch.id)}>
//                 <FileText className="w-4 h-4" />
//                 Traceability
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
    Search, Filter, Download, Eye, RefreshCw, Calendar,
    Package, CheckCircle, Layers, Box, Building2, Microscope,
    FileText,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import { stockAPI } from '../../services/api';
import toast from 'react-hot-toast';

const statusColors = {
    Available: 'success',
    Partial: 'warning',
    Exhausted: 'danger',
    Hold: 'warning',
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

export default function Batches() {
    const navigate = useNavigate();
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    // ✅ Load batches from API
    const loadBatches = async () => {
        try {
            setLoading(true);
            const response = await stockAPI.getBatches({
                status: filterStatus === 'all' ? undefined : filterStatus,
            });
            console.log('📦 Batches data:', response.data.data);
            setBatches(response.data.data || []);
        } catch (error) {
            console.error('Load batches error:', error);
            toast.error(error.response?.data?.message || 'Failed to load batches');
            setBatches([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBatches();
    }, [filterStatus]);

    // Compute status
    const getBatchStatus = (batch) => {
        const qty = Number(batch.quantity || 0);
        if (qty === 0) return 'Exhausted';
        if (qty < 50) return 'Partial'; // you can adjust threshold
        return 'Available';
    };

    const handleViewBatch = (batch) => {
        setSelectedBatch(batch);
        setIsDetailModalOpen(true);
    };

    const handleViewTraceability = (batchId) => {
        navigate(`/batches/${batchId}/trace`);
    };

    const columns = [
        {
            header: 'Batch No',
            accessor: 'batch_number',
            sortable: true,
            render: (value) => (
                <span className="font-mono font-medium text-gray-800 text-sm">
                    {value || '-'}
                </span>
            ),
        },
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
            header: 'Available',
            accessor: 'quantity',
            sortable: true,
            render: (value, row) => {
                const qty = Number(value || 0);
                return (
                    <span
                        className={
                            qty === 0 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'
                        }
                    >
                        {qty.toLocaleString('en-IN')} {row.unit || 'KG'}
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
            header: 'Value',
            accessor: 'unit_cost',
            render: (value, row) => {
                const val = Number(row.quantity || 0) * Number(value || 0);
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
                const status = getBatchStatus(row);
                return (
                    <Badge variant={statusColors[status] || 'default'}>{status}</Badge>
                );
            },
        },
        {
            header: 'Last Updated',
            accessor: 'last_updated',
            render: (value) =>
                value ? new Date(value).toLocaleDateString('en-IN') : '-',
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
                            handleViewBatch(row);
                        }}
                    >
                        <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-purple-50 rounded-lg"
                        title="View Movements"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/stock/movements/${row.product_id}`);
                        }}
                    >
                        <FileText className="w-4 h-4 text-purple-600" />
                    </button>
                </div>
            ),
        },
    ];

    const filteredBatches = batches.filter((batch) => {
        const matchesSearch =
            (batch.batch_number || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (batch.product_name || '').toLowerCase().includes(searchTerm.toLowerCase());
        const status = getBatchStatus(batch);
        const matchesStatus = filterStatus === 'all' || status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Stats
    const totalBatches = batches.length;
    const availableBatches = batches.filter((b) => Number(b.quantity || 0) > 0).length;
    const totalAvailableQty = batches.reduce(
        (sum, b) => sum + Number(b.quantity || 0),
        0
    );
    const uniqueProducts = new Set(batches.map((b) => b.product_id)).size;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm">
                        <Layers className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
                            Batch Tracking
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Track inventory by batch and lot numbers
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <Button
                        variant="outline"
                        onClick={loadBatches}
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
                    icon={Layers}
                    label="Total Batches"
                    value={totalBatches}
                    color="text-blue-600"
                    borderColor="border-blue-500"
                />
                <StatCard
                    icon={CheckCircle}
                    label="Available"
                    value={availableBatches}
                    subtext={
                        totalBatches > 0
                            ? `${Math.round((availableBatches / totalBatches) * 100)}% of total`
                            : '0%'
                    }
                    color="text-green-600"
                    borderColor="border-green-500"
                />
                <StatCard
                    icon={Package}
                    label="Total Available"
                    value={`${totalAvailableQty.toLocaleString('en-IN')} KG`}
                    color="text-blue-600"
                    borderColor="border-blue-500"
                />
                <StatCard
                    icon={Box}
                    label="Products"
                    value={uniqueProducts}
                    color="text-purple-600"
                    borderColor="border-purple-500"
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
                                placeholder="Search batches..."
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
                        <option value="Available">Available</option>
                        <option value="Partial">Partial</option>
                        <option value="Exhausted">Exhausted</option>
                    </select>
                    <span className="text-sm text-gray-400 ml-auto font-medium">
                        {filteredBatches.length} batches found
                    </span>
                </div>
            </Card>

            {/* Table */}
            <Card className="p-0 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
                        <p className="text-sm text-gray-500 mt-3">Loading batches...</p>
                    </div>
                ) : batches.length === 0 ? (
                    <div className="p-12 text-center">
                        <Layers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No batches found</p>
                        <p className="text-sm text-gray-400 mt-1">
                            Batches are created when POs are received and QC accepts them
                        </p>
                        <Button
                            onClick={() => navigate('/purchase-orders')}
                            className="mt-4 inline-flex items-center gap-2"
                        >
                            <FileText className="w-4 h-4" />
                            Go to Purchase Orders
                        </Button>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        data={filteredBatches}
                        totalItems={filteredBatches.length}
                        onRowClick={(row) => handleViewBatch(row)}
                    />
                )}
            </Card>

            {/* Detail Modal */}
            <Modal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                title="Batch Details"
                size="lg"
            >
                {selectedBatch && (
                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500">Batch Number</p>
                                <p className="text-lg font-bold font-mono">
                                    {selectedBatch.batch_number}
                                </p>
                            </div>
                            <Badge variant={statusColors[getBatchStatus(selectedBatch)]}>
                                {getBatchStatus(selectedBatch)}
                            </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500">Product</p>
                                <p className="text-sm font-medium">
                                    {selectedBatch.product_name}
                                </p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500">Grade</p>
                                <p className="text-sm font-medium">
                                    {selectedBatch.grade || '-'}
                                </p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500">Unit</p>
                                <p className="text-sm font-medium">
                                    {selectedBatch.unit || 'KG'}
                                </p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <p className="text-xs text-green-600">Available</p>
                                <p className="text-lg font-bold text-green-700">
                                    {Number(selectedBatch.quantity || 0).toLocaleString()}
                                </p>
                            </div>
                            <div className="p-3 bg-yellow-50 rounded-lg">
                                <p className="text-xs text-yellow-600">Reserved</p>
                                <p className="text-lg font-bold text-yellow-700">
                                    {Number(selectedBatch.reserved_quantity || 0).toLocaleString()}
                                </p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-lg">
                                <p className="text-xs text-orange-600">Hold</p>
                                <p className="text-lg font-bold text-orange-700">
                                    {Number(selectedBatch.hold_quantity || 0).toLocaleString()}
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
                                variant="outline"
                                className="flex items-center gap-2"
                                onClick={() =>
                                    navigate(`/stock/movements/${selectedBatch.product_id}`)
                                }
                            >
                                <FileText className="w-4 h-4" />
                                View Movements
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}