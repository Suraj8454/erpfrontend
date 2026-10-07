// // QC.jsx - Premium, Modern, Classic UI
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Search, 
//   Filter, 
//   Download, 
//   Eye, 
//   Edit,
//   CheckCircle,
//   XCircle,
//   Clock,
//   RefreshCw,
//   ClipboardCheck,
//   AlertCircle,
//   ChevronRight,
//   FileText,
//   Users,
//   Package,
//   TrendingUp,
//   Award,
//   Zap,
//   Target,
//   Activity,
//   Microscope,
//   Beaker,
//   TestTube,
//   FlaskConical,
//   ShieldCheck,
//   BadgeCheck,
//   AlertTriangle,
//   Info,
//   Printer,
//   Calendar,
//   Building2
// } from 'lucide-react';
// import Card from '../../components/common/Card';
// import Button from '../../components/common/Button';
// import Badge from '../../components/common/Badge';
// import Table from '../../components/common/Table';
// import Modal from '../../components/common/Modal';
// import QCForm from '../../components/forms/QCForm';

// const qcData = [
//   {
//     id: 'QC-001',
//     date: '2026-08-25',
//     supplier: 'Makhana Suppliers Pvt Ltd',
//     grnNo: 'GRN-001',
//     product: '4 Suta Makhana',
//     quantity: '500 KG',
//     moisture: '8.5%',
//     broken: '2.5%',
//     foreignMaterial: '0.2%',
//     colour: 'White',
//     size: 'Medium',
//     suta: '4 Suta',
//     result: 'Accepted',
//     inspector: 'Anita Sharma',
//     remarks: 'Quality meets specifications'
//   },
//   {
//     id: 'QC-002',
//     date: '2026-08-24',
//     supplier: 'Premium Makhana Exports',
//     grnNo: 'GRN-002',
//     product: '5 Suta Makhana',
//     quantity: '300 KG',
//     moisture: '9.2%',
//     broken: '3.0%',
//     foreignMaterial: '0.5%',
//     colour: 'Golden',
//     size: 'Small',
//     suta: '5 Suta',
//     result: 'Partially Accepted',
//     inspector: 'Rahul Verma',
//     remarks: 'Moisture slightly higher than specification'
//   },
//   {
//     id: 'QC-003',
//     date: '2026-08-23',
//     supplier: 'Green Valley Makhana',
//     grnNo: 'GRN-003',
//     product: 'Premium Makhana',
//     quantity: '200 KG',
//     moisture: '10.5%',
//     broken: '4.0%',
//     foreignMaterial: '1.0%',
//     colour: 'Golden',
//     size: 'Large',
//     suta: 'Premium',
//     result: 'Rejected',
//     inspector: 'Anita Sharma',
//     remarks: 'Moisture and foreign material exceed limits'
//   },
// ];

// const resultColors = {
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

// export default function QC() {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterResult, setFilterResult] = useState('all');
//   const [selectedQC, setSelectedQC] = useState(null);
//   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

//   const handleViewQC = (qc) => {
//     setSelectedQC(qc);
//     setIsDetailModalOpen(true);
//   };

//   const handleEditQC = (id) => {
//     console.log('Edit QC:', id);
//   };

//   const handleCreateFromGRN = () => {
//     navigate('/grn');
//   };

//   const handleViewGRN = (grnNo) => {
//     navigate(`/grn/${grnNo}`);
//   };

//   const columns = [
//     {
//       header: 'QC No',
//       accessor: 'id',
//       sortable: true
//     },
//     {
//       header: 'Date',
//       accessor: 'date'
//     },
//     {
//       header: 'Supplier',
//       accessor: 'supplier',
//       sortable: true,
//       render: (value) => (
//         <span className="font-medium text-gray-800">{value}</span>
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
//       header: 'Product',
//       accessor: 'product'
//     },
//     {
//       header: 'Quantity',
//       accessor: 'quantity'
//     },
//     {
//       header: 'Moisture',
//       accessor: 'moisture'
//     },
//     {
//       header: 'Broken',
//       accessor: 'broken'
//     },
//     {
//       header: 'Foreign Material',
//       accessor: 'foreignMaterial'
//     },
//     {
//       header: 'Result',
//       accessor: 'result',
//       render: (value) => (
//         <Badge variant={resultColors[value] || 'default'}>
//           {value}
//         </Badge>
//       )
//     },
//     {
//       header: 'Inspector',
//       accessor: 'inspector'
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
//               handleViewQC(row);
//             }}
//           >
//             <Eye className="w-4 h-4 text-gray-500" />
//           </button>
//           <button 
//             className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" 
//             title="Edit"
//             onClick={(e) => {
//               e.stopPropagation();
//               handleEditQC(row.id);
//             }}
//           >
//             <Edit className="w-4 h-4 text-gray-500" />
//           </button>
//         </div>
//       )
//     }
//   ];

//   const filteredQC = qcData.filter(qc => {
//     const matchesSearch = qc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          qc.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          qc.product.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesResult = filterResult === 'all' || qc.result === filterResult;
//     return matchesSearch && matchesResult;
//   });

//   // Calculate stats
//   const totalInspections = qcData.length;
//   const accepted = qcData.filter(q => q.result === 'Accepted').length;
//   const partiallyAccepted = qcData.filter(q => q.result === 'Partially Accepted').length;
//   const rejected = qcData.filter(q => q.result === 'Rejected').length;

//   return (
//     <div className="space-y-6">
//       {/* Premium Page Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div className="flex items-start gap-4">
//           <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm">
//             <Microscope className="w-6 h-6 text-blue-600" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">Quality Control</h1>
//             <p className="text-sm text-gray-500 mt-0.5">Inspect and certify Makhana quality</p>
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
//             onClick={handleCreateFromGRN}
//           >
//             <FileText className="w-4 h-4" />
//             Start from GRN
//           </Button>
//         </div>
//       </div>

//       {/* Premium Summary Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <StatCard 
//           icon={ClipboardCheck}
//           label="Total Inspections"
//           value={totalInspections}
//           color="text-blue-600"
//           borderColor="border-blue-500"
//         />
//         <StatCard 
//           icon={CheckCircle}
//           label="Accepted"
//           value={accepted}
//           subtext={`${Math.round((accepted / totalInspections) * 100)}% of total`}
//           color="text-green-600"
//           borderColor="border-green-500"
//         />
//         <StatCard 
//           icon={AlertCircle}
//           label="Partially Accepted"
//           value={partiallyAccepted}
//           subtext={`${Math.round((partiallyAccepted / totalInspections) * 100)}% of total`}
//           color="text-yellow-600"
//           borderColor="border-yellow-500"
//         />
//         <StatCard 
//           icon={XCircle}
//           label="Rejected"
//           value={rejected}
//           subtext={`${Math.round((rejected / totalInspections) * 100)}% of total`}
//           color="text-red-600"
//           borderColor="border-red-500"
//         />
//       </div>

//       {/* Quality Overview - Premium */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//         <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100/30 border-green-200 rounded-xl">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-green-100 rounded-lg">
//               <BadgeCheck className="w-4 h-4 text-green-600" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Acceptance Rate</p>
//               <p className="text-lg font-bold text-green-600">{Math.round((accepted / totalInspections) * 100)}%</p>
//             </div>
//           </div>
//         </Card>
//         <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100/30 border-yellow-200 rounded-xl">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-yellow-100 rounded-lg">
//               <AlertTriangle className="w-4 h-4 text-yellow-600" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Partial Rate</p>
//               <p className="text-lg font-bold text-yellow-600">{Math.round((partiallyAccepted / totalInspections) * 100)}%</p>
//             </div>
//           </div>
//         </Card>
//         <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100/30 border-red-200 rounded-xl">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-red-100 rounded-lg">
//               <XCircle className="w-4 h-4 text-red-600" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Rejection Rate</p>
//               <p className="text-lg font-bold text-red-600">{Math.round((rejected / totalInspections) * 100)}%</p>
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
//                 placeholder="Search QC records..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2.5 border border-gray-200/80 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 bg-white/50 transition-all placeholder:text-gray-400"
//               />
//             </div>
//           </div>
          
//           <select
//             value={filterResult}
//             onChange={(e) => setFilterResult(e.target.value)}
//             className="px-4 py-2.5 border border-gray-200/80 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 bg-white/50 transition-all"
//           >
//             <option value="all">All Results</option>
//             <option value="Accepted">Accepted</option>
//             <option value="Partially Accepted">Partially Accepted</option>
//             <option value="Rejected">Rejected</option>
//             <option value="Hold">Hold</option>
//           </select>

//           <Button variant="outline" className="flex items-center gap-2 text-sm border-gray-200/80 hover:bg-gray-50/80">
//             <Filter className="w-4 h-4" />
//             More Filters
//           </Button>

//           <span className="text-sm text-gray-400 ml-auto font-medium">
//             {filteredQC.length} records found
//           </span>
//         </div>
//       </Card>

//       {/* Premium QC Table */}
//       <Card className="p-0 overflow-hidden border border-gray-200/60 shadow-sm bg-white/80 backdrop-blur-sm rounded-xl">
//         <Table 
//           columns={columns} 
//           data={filteredQC}
//           totalItems={filteredQC.length}
//           onRowClick={(row) => handleViewQC(row)}
//         />
//       </Card>

//       {/* QC Detail Modal - Premium */}
//       <Modal
//         isOpen={isDetailModalOpen}
//         onClose={() => setIsDetailModalOpen(false)}
//         title={
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl">
//               <ClipboardCheck className="w-5 h-5 text-blue-600" />
//             </div>
//             <span className="text-lg font-semibold text-gray-800">QC Inspection Details</span>
//           </div>
//         }
//         size="lg"
//       >
//         {selectedQC && (
//           <div className="space-y-6">
//             {/* Header */}
//             <div className="bg-gradient-to-br from-gray-50 to-gray-100/30 rounded-xl p-4 flex items-center justify-between border border-gray-200">
//               <div>
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">QC Number</p>
//                 <p className="text-lg font-bold text-gray-900 mt-0.5">{selectedQC.id}</p>
//               </div>
//               <Badge variant={resultColors[selectedQC.result] || 'default'}>
//                 {selectedQC.result}
//               </Badge>
//             </div>

//             {/* Basic Info */}
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               <div className="p-3 bg-gray-50/50 rounded-lg">
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Date</p>
//                 <p className="text-sm font-medium text-gray-700 mt-0.5 flex items-center gap-2">
//                   <Calendar className="w-3.5 h-3.5 text-gray-400" />
//                   {selectedQC.date}
//                 </p>
//               </div>
//               <div className="p-3 bg-gray-50/50 rounded-lg">
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Inspector</p>
//                 <p className="text-sm font-medium text-gray-700 mt-0.5 flex items-center gap-2">
//                   <Users className="w-3.5 h-3.5 text-gray-400" />
//                   {selectedQC.inspector}
//                 </p>
//               </div>
//               <div className="p-3 bg-gray-50/50 rounded-lg">
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Supplier</p>
//                 <p className="text-sm font-medium text-gray-700 mt-0.5 flex items-center gap-2">
//                   <Building2 className="w-3.5 h-3.5 text-gray-400" />
//                   {selectedQC.supplier}
//                 </p>
//               </div>
//               <div className="p-3 bg-gray-50/50 rounded-lg">
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">GRN Number</p>
//                 <p className="text-sm font-medium text-blue-600 mt-0.5">{selectedQC.grnNo}</p>
//               </div>
//               <div className="p-3 bg-gray-50/50 rounded-lg">
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Product</p>
//                 <p className="text-sm font-medium text-gray-700 mt-0.5 flex items-center gap-2">
//                   <Package className="w-3.5 h-3.5 text-gray-400" />
//                   {selectedQC.product}
//                 </p>
//               </div>
//               <div className="p-3 bg-gray-50/50 rounded-lg">
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Quantity</p>
//                 <p className="text-sm font-medium text-gray-700 mt-0.5">{selectedQC.quantity}</p>
//               </div>
//             </div>

//             {/* QC Parameters */}
//             <div>
//               <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                 <Beaker className="w-4 h-4 text-blue-500" />
//                 QC Parameters
//               </h4>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                 <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
//                   <p className="text-xs text-blue-600 uppercase tracking-wider">Moisture</p>
//                   <p className="text-sm font-semibold text-blue-700 mt-1">{selectedQC.moisture}</p>
//                 </div>
//                 <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100">
//                   <p className="text-xs text-purple-600 uppercase tracking-wider">Broken</p>
//                   <p className="text-sm font-semibold text-purple-700 mt-1">{selectedQC.broken}</p>
//                 </div>
//                 <div className="p-3 bg-orange-50/50 rounded-lg border border-orange-100">
//                   <p className="text-xs text-orange-600 uppercase tracking-wider">Foreign Material</p>
//                   <p className="text-sm font-semibold text-orange-700 mt-1">{selectedQC.foreignMaterial}</p>
//                 </div>
//                 <div className="p-3 bg-green-50/50 rounded-lg border border-green-100">
//                   <p className="text-xs text-green-600 uppercase tracking-wider">Colour</p>
//                   <p className="text-sm font-semibold text-green-700 mt-1">{selectedQC.colour}</p>
//                 </div>
//                 <div className="p-3 bg-pink-50/50 rounded-lg border border-pink-100">
//                   <p className="text-xs text-pink-600 uppercase tracking-wider">Size</p>
//                   <p className="text-sm font-semibold text-pink-700 mt-1">{selectedQC.size}</p>
//                 </div>
//                 <div className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100">
//                   <p className="text-xs text-indigo-600 uppercase tracking-wider">Suta</p>
//                   <p className="text-sm font-semibold text-indigo-700 mt-1">{selectedQC.suta}</p>
//                 </div>
//                 <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-200 col-span-2">
//                   <p className="text-xs text-gray-500 uppercase tracking-wider">Overall Result</p>
//                   <div className="mt-1">
//                     <Badge variant={resultColors[selectedQC.result] || 'default'}>
//                       {selectedQC.result}
//                     </Badge>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Remarks */}
//             {selectedQC.remarks && (
//               <div>
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">Remarks</p>
//                 <p className="text-sm text-gray-700 p-3 bg-gray-50/50 rounded-lg border border-gray-200 mt-1">
//                   {selectedQC.remarks}
//                 </p>
//               </div>
//             )}

//             <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
//               <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
//                 Close
//               </Button>
//               <Button variant="outline" className="flex items-center gap-2">
//                 <Printer className="w-4 h-4" />
//                 Print Report
//               </Button>
//               <Button className="flex items-center gap-2" onClick={() => handleViewGRN(selectedQC.grnNo)}>
//                 <FileText className="w-4 h-4" />
//                 View GRN
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
    Search, Filter, Download, Eye, Edit, CheckCircle, XCircle,
    RefreshCw, ClipboardCheck, AlertCircle, FileText, Users,
    Package, Microscope, Beaker, BadgeCheck, AlertTriangle,
    Calendar, Building2, Printer,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import { qcAPI } from '../../services/api';
import toast from 'react-hot-toast';

const resultColors = {
    Accepted: 'success',
    'Partially Accepted': 'warning',
    Rejected: 'danger',
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

export default function QC() {
    const navigate = useNavigate();
    const [qcList, setQcList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterResult, setFilterResult] = useState('all');
    const [selectedQC, setSelectedQC] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    // ✅ Load QC records
    const loadQC = async () => {
        try {
            setLoading(true);
            const response = await qcAPI.getAll({
                search: searchTerm,
                result: filterResult,
            });
            setQcList(response.data.data || []);
        } catch (error) {
            console.error('Load QC error:', error);
            toast.error(error.response?.data?.message || 'Failed to load QC records');
            setQcList([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(loadQC, 300);
        return () => clearTimeout(delay);
    }, [searchTerm, filterResult]);

    const handleViewQC = (qc) => {
        setSelectedQC(qc);
        setIsDetailModalOpen(true);
    };

    const handleCreateFromGRN = () => {
        navigate('/grn');
    };

    const handleViewGRN = (grnId) => {
        if (grnId) navigate(`/grn/${grnId}`);
    };

    const columns = [
        { header: 'QC No', accessor: 'qc_number', sortable: true },
        {
            header: 'Date',
            accessor: 'inspection_date',
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
            header: 'GRN',
            accessor: 'grn_number',
            render: (value, row) => (
                <button
                    className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleViewGRN(row.grn_id);
                    }}
                >
                    {value || '-'}
                </button>
            ),
        },
        {
            header: 'Product',
            accessor: 'product_name',
            render: (value) => value || '-',
        },
        {
            header: 'Quantity',
            accessor: 'quantity',
            render: (value, row) => (
                <span className="font-medium">
                    {Number(value || 0).toLocaleString('en-IN')} {row.unit || 'KG'}
                </span>
            ),
        },
        {
            header: 'Result',
            accessor: 'result',
            render: (value) => (
                <Badge variant={resultColors[value] || 'default'}>{value}</Badge>
            ),
        },
        {
            header: 'Quality',
            accessor: 'overall_quality',
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
                            handleViewQC(row);
                        }}
                    >
                        <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                </div>
            ),
        },
    ];

    // Stats
    const totalInspections = qcList.length;
    const accepted = qcList.filter((q) => q.result === 'Accepted').length;
    const partiallyAccepted = qcList.filter(
        (q) => q.result === 'Partially Accepted'
    ).length;
    const rejected = qcList.filter((q) => q.result === 'Rejected').length;

    const acceptedPct =
        totalInspections > 0 ? Math.round((accepted / totalInspections) * 100) : 0;
    const partialPct =
        totalInspections > 0 ? Math.round((partiallyAccepted / totalInspections) * 100) : 0;
    const rejectedPct =
        totalInspections > 0 ? Math.round((rejected / totalInspections) * 100) : 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm">
                        <Microscope className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
                            Quality Control
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Inspect and certify Makhana quality
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <Button
                        variant="outline"
                        onClick={loadQC}
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
                        onClick={handleCreateFromGRN}
                    >
                        <FileText className="w-4 h-4" />
                        Start from GRN
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    icon={ClipboardCheck}
                    label="Total Inspections"
                    value={totalInspections}
                    color="text-blue-600"
                    borderColor="border-blue-500"
                />
                <StatCard
                    icon={CheckCircle}
                    label="Accepted"
                    value={accepted}
                    subtext={`${acceptedPct}% of total`}
                    color="text-green-600"
                    borderColor="border-green-500"
                />
                <StatCard
                    icon={AlertCircle}
                    label="Partially Accepted"
                    value={partiallyAccepted}
                    subtext={`${partialPct}% of total`}
                    color="text-yellow-600"
                    borderColor="border-yellow-500"
                />
                <StatCard
                    icon={XCircle}
                    label="Rejected"
                    value={rejected}
                    subtext={`${rejectedPct}% of total`}
                    color="text-red-600"
                    borderColor="border-red-500"
                />
            </div>

            {/* Quality Overview */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100/30 border-green-200 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <BadgeCheck className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Acceptance Rate</p>
                            <p className="text-lg font-bold text-green-600">{acceptedPct}%</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100/30 border-yellow-200 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Partial Rate</p>
                            <p className="text-lg font-bold text-yellow-600">{partialPct}%</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100/30 border-red-200 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <XCircle className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Rejection Rate</p>
                            <p className="text-lg font-bold text-red-600">{rejectedPct}%</p>
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
                                placeholder="Search QC records..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200/80 rounded-lg text-sm"
                            />
                        </div>
                    </div>
                    <select
                        value={filterResult}
                        onChange={(e) => setFilterResult(e.target.value)}
                        className="px-4 py-2.5 border border-gray-200/80 rounded-lg text-sm"
                    >
                        <option value="all">All Results</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Partially Accepted">Partially Accepted</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Hold">Hold</option>
                    </select>
                    <span className="text-sm text-gray-400 ml-auto font-medium">
                        {qcList.length} records found
                    </span>
                </div>
            </Card>

            {/* Table */}
            <Card className="p-0 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
                        <p className="text-sm text-gray-500 mt-3">Loading QC records...</p>
                    </div>
                ) : qcList.length === 0 ? (
                    <div className="p-12 text-center">
                        <Microscope className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No QC records found</p>
                        <p className="text-sm text-gray-400 mt-1">
                            QC records are created when you inspect received goods
                        </p>
                        <Button
                            onClick={handleCreateFromGRN}
                            className="mt-4 inline-flex items-center gap-2"
                        >
                            <FileText className="w-4 h-4" />
                            Go to GRN
                        </Button>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        data={qcList}
                        totalItems={qcList.length}
                        onRowClick={(row) => handleViewQC(row)}
                    />
                )}
            </Card>

            {/* Detail Modal */}
            <Modal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                title="QC Inspection Details"
                size="lg"
            >
                {selectedQC && (
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500">QC Number</p>
                                <p className="text-lg font-bold">
                                    {selectedQC.qc_number}
                                </p>
                            </div>
                            <Badge variant={resultColors[selectedQC.result]}>
                                {selectedQC.result}
                            </Badge>
                        </div>

                        {/* Basic Info */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500">Date</p>
                                <p className="text-sm font-medium flex items-center gap-2 mt-0.5">
                                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                    {selectedQC.inspection_date
                                        ? new Date(
                                            selectedQC.inspection_date
                                        ).toLocaleDateString('en-IN')
                                        : '-'}
                                </p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500">Supplier</p>
                                <p className="text-sm font-medium flex items-center gap-2 mt-0.5">
                                    <Building2 className="w-3.5 h-3.5 text-gray-400" />
                                    {selectedQC.supplier_name || '-'}
                                </p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500">GRN Number</p>
                                <p className="text-sm font-medium text-blue-600 mt-0.5">
                                    {selectedQC.grn_number || '-'}
                                </p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500">Product</p>
                                <p className="text-sm font-medium mt-0.5">
                                    {selectedQC.product_name || '-'}
                                </p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500">Quantity</p>
                                <p className="text-sm font-medium mt-0.5">
                                    {Number(selectedQC.quantity || 0).toLocaleString()}{' '}
                                    {selectedQC.unit || 'KG'}
                                </p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500">Quality</p>
                                <p className="text-sm font-medium mt-0.5">
                                    {selectedQC.overall_quality || '-'}
                                </p>
                            </div>
                        </div>

                        {/* Remarks */}
                        {selectedQC.remarks && (
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Remarks</p>
                                <p className="text-sm p-3 bg-gray-50 rounded-lg">
                                    {selectedQC.remarks}
                                </p>
                            </div>
                        )}

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
                                onClick={() => window.print()}
                            >
                                <Printer className="w-4 h-4" />
                                Print
                            </Button>
                            <Button
                                className="flex items-center gap-2"
                                onClick={() => handleViewGRN(selectedQC.grn_id)}
                            >
                                <FileText className="w-4 h-4" />
                                View GRN
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}