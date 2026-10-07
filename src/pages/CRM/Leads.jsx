
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//     Plus,
//     Filter,
//     Download,
//     Search,
//     Eye,
//     Edit,
//     Trash2,
//     UserPlus,
//     ChevronRight,
//     RefreshCw,
//     FileText,
//     Users,
//     TrendingUp,
//     DollarSign,
//     Calendar,
//     Phone,
//     Mail,
//     Building2,
//     User,
//     Tag,
//     BarChart3,
//     Target,
//     Award,
//     Zap,
//     PieChart,
//     Activity,
//     XCircle,
// } from 'lucide-react';
// import Card from '../../components/common/Card';
// import Button from '../../components/common/Button';
// import Modal from '../../components/common/Modal';
// import Badge from '../../components/common/Badge';
// import LeadForm from '../../components/forms/LeadForm';
// import Table from '../../components/common/Table';
// import { leadsAPI } from '../../services/api';
// import toast from 'react-hot-toast';

// const statusOptions = [
//     { value: 'all', label: 'All Status' },
//     { value: 'New', label: 'New' },
//     { value: 'Contacted', label: 'Contacted' },
//     { value: 'Qualified', label: 'Qualified' },
//     { value: 'Quotation Sent', label: 'Quotation Sent' },
//     { value: 'Negotiation', label: 'Negotiation' },
//     { value: 'Won', label: 'Won' },
//     { value: 'Lost', label: 'Lost' },
// ];

// const sourceOptions = [
//     { value: 'all', label: 'All Sources' },
//     { value: 'Website', label: 'Website' },
//     { value: 'Referral', label: 'Referral' },
//     { value: 'Social Media', label: 'Social Media' },
//     { value: 'Email', label: 'Email' },
//     { value: 'Phone', label: 'Phone' },
//     { value: 'Other', label: 'Other' },
// ];

// const statusColors = {
//     New: 'gray',
//     Contacted: 'info',
//     Qualified: 'success',
//     'Quotation Sent': 'purple',
//     Negotiation: 'warning',
//     Won: 'success',
//     Lost: 'danger',
// };

// // Premium Stat Card Component
// const StatCard = ({ icon: Icon, label, value, subtext, color, borderColor }) => (
//     <Card
//         className={`p-5 border-l-4 ${borderColor} bg-gradient-to-br from-white to-gray-50/50 hover:shadow-md transition-all duration-300`}
//     >
//         <div className="flex items-start justify-between">
//             <div>
//                 <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
//                     {label}
//                 </p>
//                 <p className="text-2xl font-bold text-gray-800 mt-1.5">{value}</p>
//                 {subtext && <span className={`text-xs font-medium ${color}`}>{subtext}</span>}
//             </div>
//             <div className={`p-2.5 rounded-xl ${color.replace('text', 'bg').replace('600', '50')}`}>
//                 <Icon className={`w-5 h-5 ${color}`} />
//             </div>
//         </div>
//     </Card>
// );

// export default function Leads() {
//     const navigate = useNavigate();
//     const [leads, setLeads] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filterStatus, setFilterStatus] = useState('all');
//     const [filterSource, setFilterSource] = useState('all');

//     // ✅ Load leads from API
//     const loadLeads = async () => {
//         try {
//             setLoading(true);
//             const response = await leadsAPI.getAll({
//                 search: searchTerm,
//                 status: filterStatus,
//                 source: filterSource,
//             });
//             setLeads(response.data.data || []);
//         } catch (error) {
//             console.error('Load leads error:', error);
//             toast.error(error.response?.data?.message || 'Failed to load leads');
//             setLeads([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Load on mount and when filters change
//     useEffect(() => {
//         const delay = setTimeout(loadLeads, 300);
//         return () => clearTimeout(delay);
//     }, [searchTerm, filterStatus, filterSource]);

//     const handleViewLead = (id) => {
//         navigate(`/leads/${id}`);
//     };

//     const handleEditLead = (id) => {
//         navigate(`/leads/${id}/edit`);
//     };

//     // ✅ Convert lead to customer via API
//     const handleConvertLead = async (id) => {
//         if (!window.confirm('Convert this lead to a customer?')) return;

//         try {
//             await leadsAPI.convert(id);
//             toast.success('Lead converted to customer successfully!');
//             loadLeads();
//             // Optionally navigate to customer
//             // navigate(`/customers`);
//         } catch (error) {
//             console.error('Convert error:', error);
//             toast.error(error.response?.data?.message || 'Conversion failed');
//         }
//     };

//     // ✅ Delete lead via API
//     const handleDeleteLead = async (id) => {
//         if (!window.confirm('Are you sure you want to delete this lead?')) return;

//         try {
//             await leadsAPI.delete(id);
//             toast.success('Lead deleted successfully');
//             loadLeads();
//         } catch (error) {
//             console.error('Delete error:', error);
//             toast.error(error.response?.data?.message || 'Failed to delete lead');
//         }
//     };

//     const handleCreateQuotation = (id) => {
//         navigate(`/quotations?lead=${id}`);
//     };

//     const columns = [
//         {
//             header: 'Lead ID',
//             accessor: 'lead_number',
//             sortable: true,
//         },
//         {
//             header: 'Company',
//             accessor: 'company_name',
//             sortable: true,
//         },
//         {
//             header: 'Contact',
//             accessor: 'contact_person',
//         },
//         {
//             header: 'Mobile',
//             accessor: 'mobile',
//         },
//         {
//             header: 'Source',
//             accessor: 'source',
//             render: (value) => <Badge variant="info">{value || 'N/A'}</Badge>,
//         },
//         {
//             header: 'Status',
//             accessor: 'status',
//             render: (value) => (
//                 <Badge variant={statusColors[value] || 'default'}>{value}</Badge>
//             ),
//         },
//         {
//             header: 'Value',
//             accessor: 'expected_value',
//             render: (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`,
//         },
//         {
//             header: 'Probability',
//             accessor: 'probability',
//             render: (value) => (
//                 <div className="flex items-center gap-2">
//                     <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                         <div
//                             className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
//                             style={{ width: `${value || 0}%` }}
//                         />
//                     </div>
//                     <span className="text-xs font-medium text-gray-600">{value || 0}%</span>
//                 </div>
//             ),
//         },
//         {
//             header: 'Next Follow-up',
//             accessor: 'next_followup_date',
//             render: (value) => (value ? new Date(value).toLocaleDateString('en-IN') : '-'),
//         },
//         {
//             header: 'Actions',
//             accessor: 'id',
//             render: (_, row) => (
//                 <div className="flex items-center gap-1">
//                     <button
//                         className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
//                         title="View"
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             handleViewLead(row.id);
//                         }}
//                     >
//                         <Eye className="w-4 h-4 text-gray-500" />
//                     </button>
//                     <button
//                         className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
//                         title="Edit"
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             handleEditLead(row.id);
//                         }}
//                     >
//                         <Edit className="w-4 h-4 text-gray-500" />
//                     </button>
//                     <button
//                         className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
//                         title="Create Quotation"
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             handleCreateQuotation(row.id);
//                         }}
//                     >
//                         <FileText className="w-4 h-4 text-blue-600" />
//                     </button>
//                     <button
//                         className="p-1.5 hover:bg-green-50 rounded-lg transition-colors"
//                         title="Convert to Customer"
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             handleConvertLead(row.id);
//                         }}
//                     >
//                         <UserPlus className="w-4 h-4 text-green-600" />
//                     </button>
//                     <button
//                         className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
//                         title="Delete"
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             handleDeleteLead(row.id);
//                         }}
//                     >
//                         <Trash2 className="w-4 h-4 text-red-500" />
//                     </button>
//                 </div>
//             ),
//         },
//     ];

//     // Calculate stats from loaded leads
//     const totalLeads = leads.length;
//     const newLeads = leads.filter((l) => l.status === 'New').length;
//     const qualifiedLeads = leads.filter(
//         (l) => l.status === 'Qualified' || l.status === 'Quotation Sent'
//     ).length;
//     const lostLeads = leads.filter((l) => l.status === 'Lost').length;
//     const conversionRate = totalLeads > 0 ? Math.round((qualifiedLeads / totalLeads) * 100) : 0;

//     return (
//         <div className="space-y-6">
//             {/* Premium Page Header */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                 <div className="flex items-start gap-4">
//                     <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm">
//                         <Users className="w-6 h-6 text-blue-600" />
//                     </div>
//                     <div>
//                         <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
//                             Leads
//                         </h1>
//                         <p className="text-sm text-gray-500 mt-0.5">
//                             Manage and track your potential customers
//                         </p>
//                     </div>
//                 </div>
//                 <div className="flex items-center gap-3 flex-wrap">
//                     <Button
//                         variant="outline"
//                         onClick={loadLeads}
//                         className="flex items-center gap-2 text-sm border-gray-200 hover:bg-gray-50/80"
//                     >
//                         <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
//                         Refresh
//                     </Button>
//                     <Button
//                         variant="outline"
//                         className="flex items-center gap-2 text-sm border-gray-200 hover:bg-gray-50/80"
//                     >
//                         <Download className="w-4 h-4" />
//                         Export
//                     </Button>
//                     <Button
//                         onClick={() => setIsModalOpen(true)}
//                         className="flex items-center gap-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-sm hover:shadow-md transition-all"
//                     >
//                         <Plus className="w-4 h-4" />
//                         New Lead
//                     </Button>
//                 </div>
//             </div>

//             {/* Premium Summary Cards */}
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                 <StatCard
//                     icon={Users}
//                     label="Total Leads"
//                     value={totalLeads}
//                     subtext="All time"
//                     color="text-blue-600"
//                     borderColor="border-blue-500"
//                 />
//                 <StatCard
//                     icon={Zap}
//                     label="New Leads"
//                     value={newLeads}
//                     color="text-yellow-600"
//                     borderColor="border-yellow-500"
//                 />
//                 <StatCard
//                     icon={Award}
//                     label="Qualified"
//                     value={qualifiedLeads}
//                     color="text-green-600"
//                     borderColor="border-green-500"
//                 />
//                 <StatCard
//                     icon={XCircle}
//                     label="Lost"
//                     value={lostLeads}
//                     color="text-red-600"
//                     borderColor="border-red-500"
//                 />
//                 <StatCard
//                     icon={Target}
//                     label="Conversion"
//                     value={`${conversionRate}%`}
//                     color="text-blue-600"
//                     borderColor="border-blue-500"
//                 />
//             </div>

//             {/* Premium Filters */}
//             <Card className="p-5 bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-sm rounded-xl">
//                 <div className="flex flex-wrap items-center gap-4">
//                     <div className="flex-1 min-w-[200px]">
//                         <div className="relative">
//                             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                             <input
//                                 type="text"
//                                 placeholder="Search leads..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="w-full pl-10 pr-4 py-2.5 border border-gray-200/80 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 bg-white/50 transition-all placeholder:text-gray-400"
//                             />
//                         </div>
//                     </div>

//                     <select
//                         value={filterStatus}
//                         onChange={(e) => setFilterStatus(e.target.value)}
//                         className="px-4 py-2.5 border border-gray-200/80 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 bg-white/50 transition-all"
//                     >
//                         {statusOptions.map((opt) => (
//                             <option key={opt.value} value={opt.value}>
//                                 {opt.label}
//                             </option>
//                         ))}
//                     </select>

//                     <select
//                         value={filterSource}
//                         onChange={(e) => setFilterSource(e.target.value)}
//                         className="px-4 py-2.5 border border-gray-200/80 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 bg-white/50 transition-all"
//                     >
//                         {sourceOptions.map((opt) => (
//                             <option key={opt.value} value={opt.value}>
//                                 {opt.label}
//                             </option>
//                         ))}
//                     </select>

//                     <Button
//                         variant="outline"
//                         className="flex items-center gap-2 text-sm border-gray-200/80 hover:bg-gray-50/80"
//                     >
//                         <Filter className="w-4 h-4" />
//                         More Filters
//                     </Button>

//                     <span className="text-sm text-gray-400 ml-auto font-medium">
//                         {leads.length} leads found
//                     </span>
//                 </div>
//             </Card>

//             {/* Premium Leads Table */}
//             <Card className="p-0 overflow-hidden border border-gray-200/60 shadow-sm bg-white/80 backdrop-blur-sm rounded-xl">
//                 {loading ? (
//                     <div className="p-12 text-center">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
//                         <p className="text-sm text-gray-500 mt-3">Loading leads...</p>
//                     </div>
//                 ) : leads.length === 0 ? (
//                     <div className="p-12 text-center">
//                         <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                         <p className="text-gray-500">No leads found</p>
//                         <Button
//                             onClick={() => setIsModalOpen(true)}
//                             className="mt-4 inline-flex items-center gap-2"
//                         >
//                             <Plus className="w-4 h-4" />
//                             Create First Lead
//                         </Button>
//                     </div>
//                 ) : (
//                     <Table
//                         columns={columns}
//                         data={leads}
//                         totalItems={leads.length}
//                         onRowClick={(row) => handleViewLead(row.id)}
//                     />
//                 )}
//             </Card>

//             {/* New Lead Modal */}
//             <Modal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 title={
//                     <div className="flex items-center gap-3">
//                         <div className="p-2 bg-blue-50 rounded-lg">
//                             <UserPlus className="w-5 h-5 text-blue-600" />
//                         </div>
//                         <span className="text-lg font-semibold text-gray-800">New Lead</span>
//                     </div>
//                 }
//                 size="lg"
//             >
//                 <LeadForm
//                     onClose={() => {
//                         setIsModalOpen(false);
//                         loadLeads();
//                     }}
//                 />
//             </Modal>
//         </div>
//     );
// }

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus, Filter, Download, Search, Eye, Edit, Trash2,
    UserPlus, RefreshCw, FileText, Users, Calendar,
    Target, Award, Zap, XCircle, Clock, AlertCircle,
    CheckCircle, Bell, PhoneCall,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Badge from '../../components/common/Badge';
import LeadForm from '../../components/forms/LeadForm';
import Table from '../../components/common/Table';
import { leadsAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { isToday, isTomorrow, isPast, isFuture, parseISO, differenceInDays } from 'date-fns';

const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Qualified', label: 'Qualified' },
    { value: 'Quotation Sent', label: 'Quotation Sent' },
    { value: 'Negotiation', label: 'Negotiation' },
    { value: 'Won', label: 'Won' },
    { value: 'Lost', label: 'Lost' },
];

const sourceOptions = [
    { value: 'all', label: 'All Sources' },
    { value: 'Website', label: 'Website' },
    { value: 'Referral', label: 'Referral' },
    { value: 'Social Media', label: 'Social Media' },
    { value: 'Email', label: 'Email' },
    { value: 'Phone', label: 'Phone' },
    { value: 'Other', label: 'Other' },
];

const statusColors = {
    New: 'gray',
    Contacted: 'info',
    Qualified: 'success',
    'Quotation Sent': 'purple',
    Negotiation: 'warning',
    Won: 'success',
    Lost: 'danger',
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

export default function Leads() {
    const navigate = useNavigate();
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLead, setEditingLead] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterSource, setFilterSource] = useState('all');
    const [filterFollowup, setFilterFollowup] = useState('all');
    const [refreshKey, setRefreshKey] = useState(0);
    const [editingFollowupId, setEditingFollowupId] = useState(null);
    const [followupValue, setFollowupValue] = useState('');

    // ✅ Load leads
    const loadLeads = async () => {
        try {
            setLoading(true);
            const response = await leadsAPI.getAll({
                search: searchTerm,
                status: filterStatus,
                source: filterSource,
            });
            setLeads(response.data.data || []);
        } catch (error) {
            console.error('Load leads error:', error);
            toast.error(error.response?.data?.message || 'Failed to load leads');
            setLeads([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(loadLeads, 300);
        return () => clearTimeout(delay);
    }, [searchTerm, filterStatus, filterSource]);

    useEffect(() => {
        if (refreshKey > 0) loadLeads();
    }, [refreshKey]);

    // ✅ View
    const handleViewLead = (id) => navigate(`/leads/${id}`);

    // ✅ Edit — OPEN MODAL with prefilled data (FIXED)
    const handleEditLead = (lead) => {
        setEditingLead(lead);
        setIsModalOpen(true);
    };

    // ✅ Close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingLead(null);
    };

    // ✅ After save (create OR edit)
    const handleSaveSuccess = () => {
        setIsModalOpen(false);
        setEditingLead(null);
        setRefreshKey((k) => k + 1);
    };

    // ✅ Convert to customer
    const handleConvertLead = async (id) => {
        if (!window.confirm('Convert this lead to a customer?')) return;
        try {
            await leadsAPI.convert(id);
            toast.success('Lead converted to customer!');
            setRefreshKey((k) => k + 1);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Conversion failed');
        }
    };

    // ✅ Delete
    const handleDeleteLead = async (id) => {
        if (!window.confirm('Delete this lead?')) return;
        try {
            await leadsAPI.delete(id);
            toast.success('Lead deleted');
            setRefreshKey((k) => k + 1);
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    // ✅ Create Quotation
    const handleCreateQuotation = (id) => {
        navigate(`/quotations?lead=${id}`);
    };

    // ✅ Inline Follow-up Date Update
    const startEditingFollowup = (lead) => {
        setEditingFollowupId(lead.id);
        setFollowupValue(
            lead.next_followup_date ? lead.next_followup_date.split('T')[0] : ''
        );
    };

    const saveFollowup = async (id) => {
        try {
            await leadsAPI.update(id, { next_followup_date: followupValue || null });
            toast.success('Follow-up date updated');
            setEditingFollowupId(null);
            setRefreshKey((k) => k + 1);
        } catch (error) {
            toast.error('Failed to update follow-up');
        }
    };

    const cancelFollowupEdit = () => {
        setEditingFollowupId(null);
        setFollowupValue('');
    };

    // ✅ Follow-up status helper
    const getFollowupInfo = (dateStr) => {
        if (!dateStr) return { label: 'No follow-up', color: 'gray', priority: 99 };
        const date = parseISO(dateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (isToday(date)) {
            return { label: 'Today', color: 'danger', priority: 1 };
        }
        if (isTomorrow(date)) {
            return { label: 'Tomorrow', color: 'warning', priority: 2 };
        }
        if (isPast(date) && !isToday(date)) {
            const days = Math.abs(differenceInDays(date, today));
            return { label: `${days}d overdue`, color: 'danger', priority: 0 };
        }
        const days = differenceInDays(date, today);
        if (days <= 7) {
            return { label: `In ${days}d`, color: 'info', priority: 3 };
        }
        return { label: `In ${days}d`, color: 'gray', priority: 4 };
    };

    // ✅ Sort: Follow-ups first (today, then overdue, then upcoming)
    const sortedLeads = [...leads].sort((a, b) => {
        const aInfo = getFollowupInfo(a.next_followup_date);
        const bInfo = getFollowupInfo(b.next_followup_date);
        if (aInfo.priority !== bInfo.priority) return aInfo.priority - bInfo.priority;
        if (!a.next_followup_date) return 1;
        if (!b.next_followup_date) return -1;
        return new Date(a.next_followup_date) - new Date(b.next_followup_date);
    });

    // ✅ Apply follow-up filter
    const filteredLeads = sortedLeads.filter((lead) => {
        if (filterFollowup === 'all') return true;
        if (!lead.next_followup_date) return filterFollowup === 'none';

        const date = parseISO(lead.next_followup_date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (filterFollowup === 'today') return isToday(date);
        if (filterFollowup === 'tomorrow') return isTomorrow(date);
        if (filterFollowup === 'overdue') return isPast(date) && !isToday(date);
        if (filterFollowup === 'upcoming')
            return isFuture(date) && !isToday(date) && !isTomorrow(date);
        return true;
    });

    // ✅ Stats
    const totalLeads = leads.length;
    const newLeads = leads.filter((l) => l.status === 'New').length;
    const qualifiedLeads = leads.filter(
        (l) => l.status === 'Qualified' || l.status === 'Quotation Sent'
    ).length;
    const lostLeads = leads.filter((l) => l.status === 'Lost').length;
    const conversionRate = totalLeads > 0 ? Math.round((qualifiedLeads / totalLeads) * 100) : 0;
    const followupsToday = leads.filter(
        (l) => l.next_followup_date && isToday(parseISO(l.next_followup_date))
    ).length;
    const followupsOverdue = leads.filter(
        (l) =>
            l.next_followup_date &&
            isPast(parseISO(l.next_followup_date)) &&
            !isToday(parseISO(l.next_followup_date))
    ).length;

    // ✅ Columns
    const columns = [
        { header: 'Lead ID', accessor: 'lead_number', sortable: true },
        {
            header: 'Company',
            accessor: 'company_name',
            sortable: true,
            render: (value) => (
                <span className="font-medium text-gray-800">{value}</span>
            ),
        },
        { header: 'Contact', accessor: 'contact_person' },
        {
            header: 'Mobile',
            accessor: 'mobile',
            render: (value) => (
                <a
                    href={`tel:${value}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                >
                    {value}
                </a>
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
            header: 'Value',
            accessor: 'expected_value',
            render: (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`,
        },
        // ✅ FOLLOW-UP COLUMN with inline edit
        {
            header: 'Follow-up',
            accessor: 'next_followup_date',
            render: (_, row) => {
                const info = getFollowupInfo(row.next_followup_date);
                const isEditing = editingFollowupId === row.id;

                if (isEditing) {
                    return (
                        <div
                            className="flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <input
                                type="date"
                                value={followupValue}
                                onChange={(e) => setFollowupValue(e.target.value)}
                                className="text-xs px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                autoFocus
                            />
                            <button
                                onClick={() => saveFollowup(row.id)}
                                className="p-1 bg-green-500 hover:bg-green-600 text-white rounded"
                                title="Save"
                            >
                                <CheckCircle className="w-3 h-3" />
                            </button>
                            <button
                                onClick={cancelFollowupEdit}
                                className="p-1 bg-gray-400 hover:bg-gray-500 text-white rounded"
                                title="Cancel"
                            >
                                <XCircle className="w-3 h-3" />
                            </button>
                        </div>
                    );
                }

                return (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            startEditingFollowup(row);
                        }}
                        className="group flex items-center gap-2 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                        title="Click to edit follow-up date"
                    >
                        <Badge variant={info.color}>
                            <Bell className="w-3 h-3 mr-1" />
                            {info.label}
                        </Badge>
                        {row.next_followup_date && (
                            <span className="text-xs text-gray-500 group-hover:text-blue-600">
                                {new Date(row.next_followup_date).toLocaleDateString(
                                    'en-IN',
                                    { day: '2-digit', month: 'short' }
                                )}
                            </span>
                        )}
                    </button>
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
                        title="View"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleViewLead(row.id);
                        }}
                    >
                        <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-gray-100 rounded-lg"
                        title="Edit"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditLead(row); // ✅ FIXED - Opens modal
                        }}
                    >
                        <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-blue-50 rounded-lg"
                        title="Create Quotation"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCreateQuotation(row.id);
                        }}
                    >
                        <FileText className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-green-50 rounded-lg"
                        title="Convert to Customer"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleConvertLead(row.id);
                        }}
                    >
                        <UserPlus className="w-4 h-4 text-green-600" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-red-50 rounded-lg"
                        title="Delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteLead(row.id);
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
                        <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
                            Leads
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Manage and track your potential customers
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <Button
                        variant="outline"
                        onClick={loadLeads}
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
                        onClick={() => {
                            setEditingLead(null);
                            setIsModalOpen(true);
                        }}
                        className="flex items-center gap-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700"
                    >
                        <Plus className="w-4 h-4" />
                        New Lead
                    </Button>
                </div>
            </div>

            {/* ✅ Follow-up Alert Banner */}
            {(followupsToday > 0 || followupsOverdue > 0) && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-5 flex items-start gap-4">
                    <div className="p-2 bg-amber-100 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-amber-800">
                            Follow-up Reminders
                        </p>
                        <p className="text-sm text-amber-700 mt-1">
                            {followupsToday > 0 && (
                                <>
                                    You have{' '}
                                    <strong>{followupsToday} follow-up(s) today</strong>
                                    {followupsOverdue > 0 && ' and '}
                                </>
                            )}
                            {followupsOverdue > 0 && (
                                <>
                                    <strong>
                                        {followupsOverdue} follow-up(s) overdue
                                    </strong>
                                </>
                            )}
                            . Click the follow-up column to update.
                        </p>
                        <div className="flex gap-2 mt-3">
                            {followupsToday > 0 && (
                                <Button
                                    size="sm"
                                    className="bg-amber-600 hover:bg-amber-700"
                                    onClick={() => setFilterFollowup('today')}
                                >
                                    <Bell className="w-3.5 h-3.5 mr-1" />
                                    Show Today ({followupsToday})
                                </Button>
                            )}
                            {followupsOverdue > 0 && (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-red-300 text-red-700 hover:bg-red-50"
                                    onClick={() => setFilterFollowup('overdue')}
                                >
                                    <Clock className="w-3.5 h-3.5 mr-1" />
                                    Show Overdue ({followupsOverdue})
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <StatCard
                    icon={Users}
                    label="Total Leads"
                    value={totalLeads}
                    color="text-blue-600"
                    borderColor="border-blue-500"
                />
                <StatCard
                    icon={Zap}
                    label="New"
                    value={newLeads}
                    color="text-yellow-600"
                    borderColor="border-yellow-500"
                />
                <StatCard
                    icon={Award}
                    label="Qualified"
                    value={qualifiedLeads}
                    color="text-green-600"
                    borderColor="border-green-500"
                />
                <StatCard
                    icon={Bell}
                    label="Today's Follow-ups"
                    value={followupsToday}
                    color="text-orange-600"
                    borderColor="border-orange-500"
                />
                <StatCard
                    icon={Target}
                    label="Conversion"
                    value={`${conversionRate}%`}
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
                                placeholder="Search leads..."
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
                        {statusOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filterSource}
                        onChange={(e) => setFilterSource(e.target.value)}
                        className="px-4 py-2.5 border border-gray-200/80 rounded-lg text-sm"
                    >
                        {sourceOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filterFollowup}
                        onChange={(e) => setFilterFollowup(e.target.value)}
                        className="px-4 py-2.5 border border-gray-200/80 rounded-lg text-sm"
                    >
                        <option value="all">All Follow-ups</option>
                        <option value="today">Today</option>
                        <option value="tomorrow">Tomorrow</option>
                        <option value="overdue">Overdue</option>
                        <option value="upcoming">Upcoming (7 days)</option>
                        <option value="none">No follow-up set</option>
                    </select>

                    <span className="text-sm text-gray-400 ml-auto font-medium">
                        {filteredLeads.length} leads found
                    </span>
                </div>
            </Card>

            {/* Table */}
            <Card className="p-0 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
                        <p className="text-sm text-gray-500 mt-3">Loading leads...</p>
                    </div>
                ) : filteredLeads.length === 0 ? (
                    <div className="p-12 text-center">
                        <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No leads found</p>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        data={filteredLeads}
                        totalItems={filteredLeads.length}
                        onRowClick={(row) => handleViewLead(row.id)}
                    />
                )}
            </Card>

            {/* Modal — Create OR Edit */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <UserPlus className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-lg font-semibold text-gray-800">
                            {editingLead ? 'Edit Lead' : 'New Lead'}
                        </span>
                    </div>
                }
                size="lg"
            >
                <LeadForm
                    onClose={handleSaveSuccess}
                    editData={editingLead}
                />
            </Modal>
        </div>
    );
}