// // Customers.jsx - Premium, Modern, Classic UI
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-hot-toast';
// import { 
//   Plus, 
//   Filter, 
//   Download, 
//   Search, 
//   Eye, 
//   Edit, 
//   Trash2,
//   RefreshCw,
//   Users,
//   Mail,
//   Phone,
//   MapPin,
//   ChevronRight,
//   UserPlus,
//   Building2,
//   User,
//   Hash,
//   Globe,
//   CreditCard,
//   DollarSign,
//   CheckCircle,
//   Building,
//   FileText,
//   UserCheck,
//   Calendar,
//   MessageSquare,
//   Tag,
//   Briefcase,
//   Store,
//   Truck,
//   Package,
//   Award,
//   Zap,
//   Target,
//   Activity,
//   TrendingUp,
//   Clock,
//   AlertCircle,
//   BadgeCheck,
//   ShieldCheck,
//   BarChart3,
//   PieChart
// } from 'lucide-react';
// import Card from '../../components/common/Card';
// import Button from '../../components/common/Button';
// import Badge from '../../components/common/Badge';
// import Table from '../../components/common/Table';
// import Modal from '../../components/common/Modal';
// import Input from '../../components/common/Input';
// import Select from '../../components/common/Select';

// const customersData = [
//   {
//     id: 'CUST-001',
//     name: 'ABC Traders',
//     contact: 'Rajesh Kumar',
//     mobile: '+91 9876543210',
//     email: 'rajesh@abctraders.com',
//     type: 'Wholesaler',
//     creditLimit: '₹5,00,000',
//     balance: '₹1,75,000',
//     status: 'Active',
//     city: 'Mumbai',
//     creditDays: '30'
//   },
//   {
//     id: 'CUST-002',
//     name: 'XYZ Enterprises',
//     contact: 'Priya Singh',
//     mobile: '+91 9876543211',
//     email: 'priya@xyz.com',
//     type: 'Distributor',
//     creditLimit: '₹3,00,000',
//     balance: '₹0',
//     status: 'Active',
//     city: 'Delhi',
//     creditDays: '15'
//   },
//   {
//     id: 'CUST-003',
//     name: 'Makhana House',
//     contact: 'Amit Patel',
//     mobile: '+91 9876543212',
//     email: 'amit@makanahouse.com',
//     type: 'Retailer',
//     creditLimit: '₹2,00,000',
//     balance: '₹1,80,000',
//     status: 'Inactive',
//     city: 'Kolkata',
//     creditDays: '45'
//   },
//   {
//     id: 'CUST-004',
//     name: 'Premium Exports',
//     contact: 'Sneha Reddy',
//     mobile: '+91 9876543213',
//     email: 'sneha@premiumexports.com',
//     type: 'Exporter',
//     creditLimit: '₹10,00,000',
//     balance: '₹2,50,000',
//     status: 'Active',
//     city: 'Chennai',
//     creditDays: '60'
//   },
// ];

// const statusColors = {
//   'Active': 'success',
//   'Inactive': 'danger',
//   'Pending': 'warning',
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

// const SectionHeader = ({ icon: Icon, title }) => (
//   <div className="md:col-span-2">
//     <div className="flex items-center gap-3 pb-2 border-b border-blue-200">
//       <Icon className="w-4 h-4 text-blue-500" strokeWidth={2} />
//       <h3 className="text-sm font-semibold text-blue-600 tracking-wide">
//         {title}
//       </h3>
//     </div>
//   </div>
// );

// export default function Customers() {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');

//   const handleViewCustomer = (id) => {
//     navigate(`/customers/${id}`);
//   };

//   const handleEditCustomer = (id) => {
//     console.log('Edit customer:', id);
//   };

//   const handleSendEmail = (email) => {
//     window.location.href = `mailto:${email}`;
//   };

//   const handleConvertFromLead = () => {
//     navigate('/leads');
//   };

//   const columns = [
//     {
//       header: 'Customer Code',
//       accessor: 'id',
//       sortable: true,
//       render: (value) => (
//         <span className="font-mono font-medium text-gray-800 text-sm">{value}</span>
//       )
//     },
//     {
//       header: 'Customer Name',
//       accessor: 'name',
//       sortable: true,
//       render: (value) => (
//         <span className="font-medium text-gray-800">{value}</span>
//       )
//     },
//     {
//       header: 'Contact',
//       accessor: 'contact'
//     },
//     {
//       header: 'Mobile',
//       accessor: 'mobile',
//       render: (value) => (
//         <a href={`tel:${value}`} className="text-blue-600 hover:text-blue-700 font-medium">
//           {value}
//         </a>
//       )
//     },
//     {
//       header: 'City',
//       accessor: 'city'
//     },
//     {
//       header: 'Type',
//       accessor: 'type',
//       render: (value) => (
//         <Badge variant="info">{value}</Badge>
//       )
//     },
//     {
//       header: 'Credit Limit',
//       accessor: 'creditLimit'
//     },
//     {
//       header: 'Balance',
//       accessor: 'balance',
//       render: (value) => {
//         const num = parseFloat(value.replace(/[₹,]/g, ''));
//         const isOverdue = num > 0;
//         return (
//           <span className={isOverdue ? 'text-red-600 font-semibold' : 'text-green-600 font-medium'}>
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
//       header: 'Actions',
//       accessor: 'id',
//       render: (_, row) => (
//         <div className="flex items-center gap-1">
//           <button 
//             className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" 
//             title="View"
//             onClick={(e) => {
//               e.stopPropagation();
//               handleViewCustomer(row.id);
//             }}
//           >
//             <Eye className="w-4 h-4 text-gray-500" />
//           </button>
//           <button 
//             className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" 
//             title="Edit"
//             onClick={(e) => {
//               e.stopPropagation();
//               handleEditCustomer(row.id);
//             }}
//           >
//             <Edit className="w-4 h-4 text-gray-500" />
//           </button>
//           <button 
//             className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors" 
//             title="Send Email"
//             onClick={(e) => {
//               e.stopPropagation();
//               handleSendEmail(row.email);
//             }}
//           >
//             <Mail className="w-4 h-4 text-blue-600" />
//           </button>
//           <button 
//             className="p-1.5 hover:bg-red-50 rounded-lg transition-colors" 
//             title="Delete"
//             onClick={(e) => {
//               e.stopPropagation();
//               if (window.confirm('Are you sure you want to delete this customer?')) {
//                 console.log('Delete:', row.id);
//               }
//             }}
//           >
//             <Trash2 className="w-4 h-4 text-red-500" />
//           </button>
//         </div>
//       )
//     }
//   ];

//   const filteredCustomers = customersData.filter(customer => {
//     const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          customer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          customer.id.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesType = filterType === 'all' || customer.type === filterType;
//     const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
//     return matchesSearch && matchesType && matchesStatus;
//   });

//   // Calculate stats
//   const totalCustomers = customersData.length;
//   const activeCustomers = customersData.filter(c => c.status === 'Active').length;
//   const totalBalance = customersData.reduce((sum, c) => {
//     const balance = parseFloat(c.balance.replace(/[₹,]/g, ''));
//     return sum + balance;
//   }, 0);

//   return (
//     <div className="space-y-6">
//       {/* Premium Page Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div className="flex items-start gap-4">
//           <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm">
//             <Users className="w-6 h-6 text-blue-600" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">Customers</h1>
//             <p className="text-sm text-gray-500 mt-0.5">Manage customer relationships and sales history</p>
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
//             onClick={handleConvertFromLead}
//           >
//             <UserPlus className="w-4 h-4" />
//             Convert from Lead
//           </Button>
//           <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-sm hover:shadow-md transition-all">
//             <Plus className="w-4 h-4" />
//             New Customer
//           </Button>
//         </div>
//       </div>

//       {/* Premium Summary Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <StatCard 
//           icon={Users}
//           label="Total Customers"
//           value={totalCustomers}
//           color="text-blue-600"
//           borderColor="border-blue-500"
//         />
//         <StatCard 
//           icon={CheckCircle}
//           label="Active"
//           value={activeCustomers}
//           subtext={`${Math.round((activeCustomers / totalCustomers) * 100)}% of total`}
//           color="text-green-600"
//           borderColor="border-green-500"
//         />
//         <StatCard 
//           icon={DollarSign}
//           label="Total Outstanding"
//           value={`₹${totalBalance.toLocaleString()}`}
//           color="text-red-600"
//           borderColor="border-red-500"
//         />
//         <StatCard 
//           icon={Store}
//           label="Customer Types"
//           value={new Set(customersData.map(c => c.type)).size}
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
//                 placeholder="Search customers..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2.5 border border-gray-200/80 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 bg-white/50 transition-all placeholder:text-gray-400"
//               />
//             </div>
//           </div>
          
//           <select
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             className="px-4 py-2.5 border border-gray-200/80 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 bg-white/50 transition-all"
//           >
//             <option value="all">All Types</option>
//             <option value="Retailer">Retailer</option>
//             <option value="Distributor">Distributor</option>
//             <option value="Wholesaler">Wholesaler</option>
//             <option value="Exporter">Exporter</option>
//             <option value="E-commerce">E-commerce</option>
//             <option value="Corporate">Corporate</option>
//           </select>

//           <select
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//             className="px-4 py-2.5 border border-gray-200/80 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 bg-white/50 transition-all"
//           >
//             <option value="all">All Status</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//             <option value="Pending">Pending</option>
//           </select>

//           <Button variant="outline" className="flex items-center gap-2 text-sm border-gray-200/80 hover:bg-gray-50/80">
//             <Filter className="w-4 h-4" />
//             More Filters
//           </Button>

//           <span className="text-sm text-gray-400 ml-auto font-medium">
//             {filteredCustomers.length} customers found
//           </span>
//         </div>
//       </Card>

//       {/* Premium Customers Table */}
//       <Card className="p-0 overflow-hidden border border-gray-200/60 shadow-sm bg-white/80 backdrop-blur-sm rounded-xl">
//         <Table 
//           columns={columns} 
//           data={filteredCustomers}
//           totalItems={filteredCustomers.length}
//           onRowClick={(row) => handleViewCustomer(row.id)}
//         />
//       </Card>

//       {/* New Customer Modal - Premium */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl">
//               <Users className="w-5 h-5 text-blue-600" />
//             </div>
//             <span className="text-lg font-semibold text-gray-800">New Customer</span>
//           </div>
//         }
//         size="lg"
//       >
//         <CustomerForm onClose={() => setIsModalOpen(false)} />
//       </Modal>
//     </div>
//   );
// }

// // Customer Form Component - Premium
// function CustomerForm({ onClose }) {
//   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
//     defaultValues: {
//       status: 'Active',
//       type: 'Retailer',
//       creditDays: '30',
//       country: 'India'
//     }
//   });

//   const onSubmit = async (data) => {
//     try {
//       console.log('Customer data:', data);
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       toast.success('Customer created successfully!');
//       onClose();
//     } catch (error) {
//       toast.error('Failed to create customer');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//         {/* Company Information */}
//         <SectionHeader icon={Building2} title="Company Information" />

//         <Input
//           label="Customer Code"
//           icon={Hash}
//           {...register('customerCode')}
//           defaultValue="CUST-005"
//           disabled
//           className="bg-gray-50"
//         />

//         <Input
//           label="Company Name"
//           required
//           icon={Building2}
//           {...register('companyName', { required: 'Company name is required' })}
//           error={errors.companyName?.message}
//           placeholder="ABC Traders"
//         />

//         <Input
//           label="GST No"
//           icon={FileText}
//           {...register('gstNo')}
//           placeholder="22AAAAA0000A1Z5"
//         />

//         <Input
//           label="PAN No"
//           icon={FileText}
//           {...register('panNo')}
//           placeholder="AAAAA0000A"
//         />

//         {/* Contact Information */}
//         <SectionHeader icon={User} title="Contact Information" />

//         <Input
//           label="Contact Person"
//           required
//           icon={User}
//           {...register('contactPerson', { required: 'Contact person is required' })}
//           error={errors.contactPerson?.message}
//           placeholder="Rajesh Kumar"
//         />

//         <Input
//           label="Designation"
//           icon={UserCheck}
//           {...register('designation')}
//           placeholder="Manager"
//         />

//         <Input
//           label="Mobile Number"
//           required
//           icon={Phone}
//           {...register('mobile', { required: 'Mobile number is required' })}
//           error={errors.mobile?.message}
//           placeholder="+91 9876543210"
//         />

//         <Input
//           label="Email"
//           required
//           icon={Mail}
//           {...register('email', {
//             required: 'Email is required',
//             pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
//           })}
//           error={errors.email?.message}
//           placeholder="rajesh@abctraders.com"
//         />

//         {/* Address Information */}
//         <SectionHeader icon={MapPin} title="Address Information" />

//         <div className="md:col-span-2">
//           <Input
//             label="Address"
//             icon={MapPin}
//             {...register('address')}
//             placeholder="123, Business Park, Andheri East"
//           />
//         </div>

//         <Input
//           label="City"
//           icon={Building}
//           {...register('city')}
//           placeholder="Mumbai"
//         />

//         <Input
//           label="State"
//           icon={MapPin}
//           {...register('state')}
//           placeholder="Maharashtra"
//         />

//         <Input
//           label="Pincode"
//           icon={MapPin}
//           {...register('pincode')}
//           placeholder="400093"
//         />

//         <Select
//           label="Country"
//           icon={Globe}
//           {...register('country')}
//           options={[
//             { value: 'India', label: 'India' },
//             { value: 'USA', label: 'USA' },
//             { value: 'UK', label: 'UK' },
//             { value: 'UAE', label: 'UAE' },
//           ]}
//         />

//         {/* Customer Details */}
//         <SectionHeader icon={Store} title="Customer Details" />

//         <Select
//           label="Customer Type"
//           required
//           icon={Users}
//           {...register('type', { required: 'Customer type is required' })}
//           error={errors.type?.message}
//           options={[
//             { value: 'Retailer', label: 'Retailer' },
//             { value: 'Distributor', label: 'Distributor' },
//             { value: 'Wholesaler', label: 'Wholesaler' },
//             { value: 'Exporter', label: 'Exporter' },
//             { value: 'E-commerce', label: 'E-commerce' },
//             { value: 'Corporate', label: 'Corporate' },
//           ]}
//         />

//         <Input
//           label="Credit Limit (₹)"
//           icon={CreditCard}
//           {...register('creditLimit')}
//           type="number"
//           placeholder="500000"
//         />

//         <Input
//           label="Credit Days"
//           icon={Calendar}
//           {...register('creditDays')}
//           type="number"
//           placeholder="30"
//         />

//         <Select
//           label="Status"
//           icon={CheckCircle}
//           {...register('status')}
//           options={[
//             { value: 'Active', label: 'Active' },
//             { value: 'Inactive', label: 'Inactive' },
//             { value: 'Pending', label: 'Pending' },
//           ]}
//         />

//         {/* Business Details */}
//         <SectionHeader icon={Briefcase} title="Business Details" />

//         <Input
//           label="Industry"
//           icon={Tag}
//           {...register('industry')}
//           placeholder="Food Processing"
//         />

//         <Input
//           label="Website"
//           icon={Globe}
//           {...register('website')}
//           placeholder="www.company.com"
//         />

//         {/* Remarks */}
//         <SectionHeader icon={MessageSquare} title="Remarks" />

//         <div className="md:col-span-2">
//           <div className="relative">
//             <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-blue-500" strokeWidth={1.75} />
//             <textarea
//               {...register('remarks')}
//               rows="2"
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none placeholder:text-gray-400"
//               placeholder="Any additional notes about this customer..."
//             />
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
//         <Button variant="outline" onClick={onClose} type="button">
//           Cancel
//         </Button>
//         <Button type="submit" loading={isSubmitting}>
//           Create Customer
//         </Button>
//       </div>
//     </form>
//   );
// }

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import {
    Plus, Filter, Download, Search, Eye, Edit, Trash2,
    RefreshCw, Users, Mail, Phone, MapPin, UserPlus, Building2,
    User, Hash, Globe, CreditCard, DollarSign, CheckCircle,
    Building, FileText, UserCheck, Calendar, MessageSquare,
    Tag, Briefcase, Store,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { customersAPI } from '../../services/api';

const statusColors = {
    Active: 'success',
    Inactive: 'danger',
    Pending: 'warning',
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

const SectionHeader = ({ icon: Icon, title }) => (
    <div className="md:col-span-2">
        <div className="flex items-center gap-3 pb-2 border-b border-blue-200">
            <Icon className="w-4 h-4 text-blue-500" strokeWidth={2} />
            <h3 className="text-sm font-semibold text-blue-600 tracking-wide">{title}</h3>
        </div>
    </div>
);

export default function Customers() {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    // ✅ Load customers
    const loadCustomers = async () => {
        try {
            setLoading(true);
            const response = await customersAPI.getAll({
                search: searchTerm,
                type: filterType,
                status: filterStatus,
            });
            setCustomers(response.data.data || []);
        } catch (error) {
            console.error('Load customers error:', error);
            toast.error(error.response?.data?.message || 'Failed to load customers');
            setCustomers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(loadCustomers, 300);
        return () => clearTimeout(delay);
    }, [searchTerm, filterType, filterStatus]);

    const handleViewCustomer = (id) => {
        navigate(`/customers/${id}`);
    };

    const handleEditCustomer = (customer) => {
        setEditingCustomer(customer);
        setIsModalOpen(true);
    };

    const handleDeleteCustomer = async (id) => {
        if (!window.confirm('Are you sure you want to delete this customer?')) return;

        try {
            await customersAPI.delete(id);
            toast.success('Customer deleted');
            loadCustomers();
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const handleSendEmail = (email) => {
        if (email) window.location.href = `mailto:${email}`;
    };

    const handleConvertFromLead = () => {
        navigate('/leads');
    };

    const handleNewCustomer = () => {
        setEditingCustomer(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCustomer(null);
    };

    const columns = [
        {
            header: 'Customer Code',
            accessor: 'customer_code',
            sortable: true,
            render: (value) => (
                <span className="font-mono font-medium text-gray-800 text-sm">{value}</span>
            ),
        },
        {
            header: 'Customer Name',
            accessor: 'company_name',
            sortable: true,
            render: (value) => (
                <span className="font-medium text-gray-800">{value || 'N/A'}</span>
            ),
        },
        { header: 'Contact', accessor: 'contact_person' },
        {
            header: 'Mobile',
            accessor: 'mobile',
            render: (value) =>
                value ? (
                    <a
                        href={`tel:${value}`}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        {value}
                    </a>
                ) : (
                    '-'
                ),
        },
        { header: 'City', accessor: 'city' },
        {
            header: 'Type',
            accessor: 'customer_type',
            render: (value) => <Badge variant="info">{value || 'N/A'}</Badge>,
        },
        {
            header: 'Credit Limit',
            accessor: 'credit_limit',
            render: (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`,
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (value) => (
                <Badge variant={statusColors[value] || 'default'}>{value}</Badge>
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
                            handleViewCustomer(row.id);
                        }}
                    >
                        <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-gray-100 rounded-lg"
                        title="Edit"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditCustomer(row);
                        }}
                    >
                        <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-blue-50 rounded-lg"
                        title="Send Email"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSendEmail(row.email);
                        }}
                    >
                        <Mail className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-red-50 rounded-lg"
                        title="Delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCustomer(row.id);
                        }}
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                </div>
            ),
        },
    ];

    // Stats
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter((c) => c.status === 'Active').length;
    const totalCreditLimit = customers.reduce(
        (sum, c) => sum + Number(c.credit_limit || 0),
        0
    );
    const uniqueTypes = new Set(customers.map((c) => c.customer_type).filter(Boolean)).size;

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
                            Customers
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Manage customer relationships and sales history
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <Button
                        variant="outline"
                        onClick={loadCustomers}
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
                        onClick={handleConvertFromLead}
                    >
                        <UserPlus className="w-4 h-4" />
                        Convert from Lead
                    </Button>
                    <Button
                        onClick={handleNewCustomer}
                        className="flex items-center gap-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700"
                    >
                        <Plus className="w-4 h-4" />
                        New Customer
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    icon={Users}
                    label="Total Customers"
                    value={totalCustomers}
                    color="text-blue-600"
                    borderColor="border-blue-500"
                />
                <StatCard
                    icon={CheckCircle}
                    label="Active"
                    value={activeCustomers}
                    subtext={
                        totalCustomers > 0
                            ? `${Math.round((activeCustomers / totalCustomers) * 100)}% of total`
                            : '0%'
                    }
                    color="text-green-600"
                    borderColor="border-green-500"
                />
                <StatCard
                    icon={DollarSign}
                    label="Total Credit Limit"
                    value={`₹${totalCreditLimit.toLocaleString('en-IN')}`}
                    color="text-red-600"
                    borderColor="border-red-500"
                />
                <StatCard
                    icon={Store}
                    label="Customer Types"
                    value={uniqueTypes}
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
                                placeholder="Search customers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200/80 rounded-lg text-sm"
                            />
                        </div>
                    </div>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-4 py-2.5 border border-gray-200/80 rounded-lg text-sm"
                    >
                        <option value="all">All Types</option>
                        <option value="Retailer">Retailer</option>
                        <option value="Distributor">Distributor</option>
                        <option value="Wholesaler">Wholesaler</option>
                        <option value="Exporter">Exporter</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Corporate">Corporate</option>
                    </select>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2.5 border border-gray-200/80 rounded-lg text-sm"
                    >
                        <option value="all">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                    </select>
                    <span className="text-sm text-gray-400 ml-auto font-medium">
                        {customers.length} customers found
                    </span>
                </div>
            </Card>

            {/* Table */}
            <Card className="p-0 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
                        <p className="text-sm text-gray-500 mt-3">Loading customers...</p>
                    </div>
                ) : customers.length === 0 ? (
                    <div className="p-12 text-center">
                        <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No customers found</p>
                        <Button
                            onClick={handleNewCustomer}
                            className="mt-4 inline-flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Create First Customer
                        </Button>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        data={customers}
                        totalItems={customers.length}
                        onRowClick={(row) => handleViewCustomer(row.id)}
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
                            <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-lg font-semibold text-gray-800">
                            {editingCustomer ? 'Edit Customer' : 'New Customer'}
                        </span>
                    </div>
                }
                size="lg"
            >
                <CustomerForm
                    onClose={() => {
                        handleCloseModal();
                        setTimeout(loadCustomers, 300);
                    }}
                    editData={editingCustomer}
                />
            </Modal>
        </div>
    );
}

// Customer Form
function CustomerForm({ onClose, editData }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            company_name: editData?.company_name || '',
            contact_person: editData?.contact_person || '',
            mobile: editData?.mobile || '',
            email: editData?.email || '',
            address: editData?.billing_address || '',
            city: editData?.city || '',
            state: editData?.state || '',
            pin_code: editData?.pin_code || '',
            country: editData?.country || 'India',
            gstin: editData?.gstin || '',
            pan: editData?.pan || '',
            customer_type: editData?.customer_type || 'Retailer',
            credit_limit: editData?.credit_limit || '',
            credit_days: editData?.credit_days || 30,
            status: editData?.status || 'Active',
        },
    });

    const onSubmit = async (data) => {
        try {
            const payload = {
                company_name: data.company_name,
                contact_person: data.contact_person,
                mobile: data.mobile,
                email: data.email,
                billing_address: data.address,
                city: data.city,
                state: data.state,
                pin_code: data.pin_code,
                country: data.country,
                gstin: data.gstin,
                pan: data.pan,
                customer_type: data.customer_type,
                credit_limit: Number(data.credit_limit) || 0,
                credit_days: Number(data.credit_days) || 30,
                status: data.status,
            };

            if (editData) {
                await customersAPI.update(editData.id, payload);
                toast.success('Customer updated successfully!');
            } else {
                await customersAPI.create(payload);
                toast.success('Customer created successfully!');
            }
            onClose();
        } catch (error) {
            console.error('Submit error:', error);
            toast.error(error.response?.data?.message || 'Failed to save customer');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <SectionHeader icon={Building2} title="Company Information" />

                <Input
                    label="Customer Code"
                    icon={Hash}
                    value={editData ? editData.customer_code : 'Auto-generated'}
                    disabled
                    className="bg-gray-50"
                />

                <Input
                    label="Company Name"
                    required
                    icon={Building2}
                    {...register('company_name', { required: 'Company name is required' })}
                    error={errors.company_name?.message}
                    placeholder="ABC Traders"
                />

                <Input label="GST No" icon={FileText} {...register('gstin')} placeholder="22AAAAA0000A1Z5" />

                <Input label="PAN No" icon={FileText} {...register('pan')} placeholder="AAAAA0000A" />

                <SectionHeader icon={User} title="Contact Information" />

                <Input
                    label="Contact Person"
                    required
                    icon={User}
                    {...register('contact_person', { required: 'Contact person is required' })}
                    error={errors.contact_person?.message}
                    placeholder="Rajesh Kumar"
                />

                <Input label="Mobile Number" required icon={Phone} {...register('mobile', { required: 'Required' })} error={errors.mobile?.message} placeholder="+91 9876543210" />

                <Input
                    label="Email"
                    required
                    icon={Mail}
                    {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                    })}
                    error={errors.email?.message}
                    placeholder="rajesh@abctraders.com"
                />

                <SectionHeader icon={MapPin} title="Address Information" />

                <div className="md:col-span-2">
                    <Input label="Address" icon={MapPin} {...register('address')} placeholder="123, Business Park" />
                </div>

                <Input label="City" icon={Building} {...register('city')} placeholder="Mumbai" />
                <Input label="State" icon={MapPin} {...register('state')} placeholder="Maharashtra" />
                <Input label="Pincode" icon={MapPin} {...register('pin_code')} placeholder="400093" />

                <Select
                    label="Country"
                    icon={Globe}
                    {...register('country')}
                    options={[
                        { value: 'India', label: 'India' },
                        { value: 'USA', label: 'USA' },
                        { value: 'UK', label: 'UK' },
                    ]}
                />

                <SectionHeader icon={Store} title="Customer Details" />

                <Select
                    label="Customer Type"
                    required
                    icon={Users}
                    {...register('customer_type', { required: 'Type required' })}
                    error={errors.customer_type?.message}
                    options={[
                        { value: 'Retailer', label: 'Retailer' },
                        { value: 'Distributor', label: 'Distributor' },
                        { value: 'Wholesaler', label: 'Wholesaler' },
                        { value: 'Exporter', label: 'Exporter' },
                        { value: 'E-commerce', label: 'E-commerce' },
                        { value: 'Corporate', label: 'Corporate' },
                    ]}
                />

                <Input label="Credit Limit (₹)" icon={CreditCard} {...register('credit_limit')} type="number" placeholder="500000" />

                <Input label="Credit Days" icon={Calendar} {...register('credit_days')} type="number" placeholder="30" />

                <Select
                    label="Status"
                    icon={CheckCircle}
                    {...register('status')}
                    options={[
                        { value: 'Active', label: 'Active' },
                        { value: 'Inactive', label: 'Inactive' },
                        { value: 'Pending', label: 'Pending' },
                    ]}
                />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={onClose} type="button">
                    Cancel
                </Button>
                <Button type="submit" loading={isSubmitting}>
                    {editData ? 'Update Customer' : 'Create Customer'}
                </Button>
            </div>
        </form>
    );
}