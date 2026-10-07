// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-hot-toast';
// import {
//     Plus, Filter, Download, Search, Eye, Edit, Trash2,
//     RefreshCw, Mail, Phone, Calendar, FileText, User,
//     Building, Clock, Users, Tag, Package, DollarSign,
//     AlertTriangle, UserCheck, Building2, Box, Globe,
//     Zap, Award, Layers, MessageSquare, Sparkles, Palette, Ruler,
// } from 'lucide-react';
// import Card from '../../components/common/Card';
// import Button from '../../components/common/Button';
// import Badge from '../../components/common/Badge';
// import Table from '../../components/common/Table';
// import Modal from '../../components/common/Modal';
// import SearchBar from '../../components/common/SearchBar';
// import Input from '../../components/common/Input';
// import Select from '../../components/common/Select';
// import { enquiriesAPI } from '../../services/api';

// const statusColors = {
//     New: 'info',
//     Quoted: 'warning',
//     'Quotation Sent': 'purple',
//     Converted: 'success',
//     Lost: 'danger',
// };

// const priorityColors = {
//     High: 'danger',
//     Medium: 'warning',
//     Low: 'info',
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

// const SectionHeader = ({ icon: Icon, title }) => (
//     <div className="md:col-span-2">
//         <div className="flex items-center gap-3 pb-2 border-b border-blue-200">
//             <Icon className="w-4 h-4 text-blue-500" strokeWidth={2} />
//             <h3 className="text-sm font-semibold text-blue-600 tracking-wide">{title}</h3>
//         </div>
//     </div>
// );

// export default function Enquiries() {
//     const navigate = useNavigate();
//     const [enquiries, setEnquiries] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filterStatus, setFilterStatus] = useState('all');
//     const [filterPriority, setFilterPriority] = useState('all');
//     const [selectedEnquiry, setSelectedEnquiry] = useState(null);

//     // ✅ Load enquiries from API
//     const loadEnquiries = async () => {
//         try {
//             setLoading(true);
//             const response = await enquiriesAPI.getAll({
//                 search: searchTerm,
//                 status: filterStatus,
//                 priority: filterPriority,
//             });
//             setEnquiries(response.data.data || []);
//         } catch (error) {
//             console.error('Load enquiries error:', error);
//             toast.error(error.response?.data?.message || 'Failed to load enquiries');
//             setEnquiries([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const delay = setTimeout(loadEnquiries, 300);
//         return () => clearTimeout(delay);
//     }, [searchTerm, filterStatus, filterPriority]);

//     const handleViewEnquiry = async (id) => {
//         try {
//             const response = await enquiriesAPI.getById(id);
//             setSelectedEnquiry(response.data.data);
//         } catch (error) {
//             toast.error('Failed to load enquiry details');
//         }
//     };

//     const handleEditEnquiry = (id) => {
//         navigate(`/enquiries/${id}/edit`);
//     };

//     // ✅ Delete enquiry
//     const handleDeleteEnquiry = async (id) => {
//         if (!window.confirm('Are you sure you want to delete this enquiry?')) return;

//         try {
//             await enquiriesAPI.delete(id);
//             toast.success('Enquiry deleted successfully');
//             loadEnquiries();
//         } catch (error) {
//             toast.error('Failed to delete enquiry');
//         }
//     };

//     // ✅ Convert enquiry to quotation
//     const handleCreateQuotation = async (id) => {
//         if (!window.confirm('Create quotation from this enquiry?')) return;

//         try {
//             const response = await enquiriesAPI.convertToQuotation(id);
//             toast.success('Quotation created successfully!');
//             loadEnquiries();
//             setSelectedEnquiry(null);
//             navigate(`/quotations/${response.data.data.id}`);
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Failed to create quotation');
//         }
//     };

//     const columns = [
//         { header: 'Enquiry No', accessor: 'enquiry_number', sortable: true },
//         {
//             header: 'Date',
//             accessor: 'created_at',
//             render: (value) => (value ? new Date(value).toLocaleDateString('en-IN') : '-'),
//         },
//         {
//             header: 'Customer',
//             accessor: 'customer_name',
//             sortable: true,
//             render: (value) => (
//                 <span className="font-medium text-gray-800">{value || 'N/A'}</span>
//             ),
//         },
//         { header: 'Contact', accessor: 'contact_person' },
//         {
//             header: 'Items',
//             accessor: 'item_count',
//             render: (value) => <Badge variant="info">{value || 0} items</Badge>,
//         },
//         {
//             header: 'Status',
//             accessor: 'status',
//             render: (value) => (
//                 <Badge variant={statusColors[value] || 'default'}>{value}</Badge>
//             ),
//         },
//         {
//             header: 'Priority',
//             accessor: 'priority',
//             render: (value) => (
//                 <Badge variant={priorityColors[value] || 'default'}>{value}</Badge>
//             ),
//         },
//         {
//             header: 'Salesperson',
//             accessor: 'salesperson_name',
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
//                             handleViewEnquiry(row.id);
//                         }}
//                     >
//                         <Eye className="w-4 h-4 text-gray-500" />
//                     </button>
//                     <button
//                         className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
//                         title="Edit"
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             handleEditEnquiry(row.id);
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
//                         className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
//                         title="Delete"
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             handleDeleteEnquiry(row.id);
//                         }}
//                     >
//                         <Trash2 className="w-4 h-4 text-red-500" />
//                     </button>
//                 </div>
//             ),
//         },
//     ];

//     // Calculate stats
//     const totalEnquiries = enquiries.length;
//     const newEnquiries = enquiries.filter((e) => e.status === 'New').length;
//     const quotedEnquiries = enquiries.filter(
//         (e) => e.status === 'Quoted' || e.status === 'Quotation Sent'
//     ).length;
//     const highPriority = enquiries.filter((e) => e.priority === 'High').length;

//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                 <div className="flex items-start gap-4">
//                     <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm">
//                         <Users className="w-6 h-6 text-blue-600" />
//                     </div>
//                     <div>
//                         <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
//                             Customer Enquiries
//                         </h1>
//                         <p className="text-sm text-gray-500 mt-0.5">
//                             Manage and track customer inquiries
//                         </p>
//                     </div>
//                 </div>
//                 <div className="flex items-center gap-3 flex-wrap">
//                     <Button
//                         variant="outline"
//                         onClick={loadEnquiries}
//                         className="flex items-center gap-2 text-sm"
//                     >
//                         <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
//                         Refresh
//                     </Button>
//                     <Button variant="outline" className="flex items-center gap-2 text-sm">
//                         <Download className="w-4 h-4" />
//                         Export
//                     </Button>
//                     <Button
//                         onClick={() => setIsModalOpen(true)}
//                         className="flex items-center gap-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
//                     >
//                         <Plus className="w-4 h-4" />
//                         New Enquiry
//                     </Button>
//                 </div>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <StatCard
//                     icon={Users}
//                     label="Total Enquiries"
//                     value={totalEnquiries}
//                     subtext="All time"
//                     color="text-blue-600"
//                     borderColor="border-blue-500"
//                 />
//                 <StatCard
//                     icon={Zap}
//                     label="New"
//                     value={newEnquiries}
//                     color="text-yellow-600"
//                     borderColor="border-yellow-500"
//                 />
//                 <StatCard
//                     icon={Award}
//                     label="Quoted"
//                     value={quotedEnquiries}
//                     color="text-purple-600"
//                     borderColor="border-purple-500"
//                 />
//                 <StatCard
//                     icon={AlertTriangle}
//                     label="High Priority"
//                     value={highPriority}
//                     color="text-red-600"
//                     borderColor="border-red-500"
//                 />
//             </div>

//             {/* Filters */}
//             <Card className="p-5 bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-sm rounded-xl">
//                 <div className="flex flex-wrap items-center gap-4">
//                     <div className="flex-1 min-w-[200px]">
//                         <SearchBar
//                             placeholder="Search enquiries..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </div>
//                     <select
//                         value={filterStatus}
//                         onChange={(e) => setFilterStatus(e.target.value)}
//                         className="px-4 py-2.5 border border-gray-200/80 rounded-lg text-sm"
//                     >
//                         <option value="all">All Status</option>
//                         <option value="New">New</option>
//                         <option value="Quoted">Quoted</option>
//                         <option value="Quotation Sent">Quotation Sent</option>
//                         <option value="Converted">Converted</option>
//                         <option value="Lost">Lost</option>
//                     </select>
//                     <select
//                         value={filterPriority}
//                         onChange={(e) => setFilterPriority(e.target.value)}
//                         className="px-4 py-2.5 border border-gray-200/80 rounded-lg text-sm"
//                     >
//                         <option value="all">All Priority</option>
//                         <option value="High">High</option>
//                         <option value="Medium">Medium</option>
//                         <option value="Low">Low</option>
//                     </select>
//                     <span className="text-sm text-gray-400 ml-auto font-medium">
//                         {enquiries.length} enquiries found
//                     </span>
//                 </div>
//             </Card>

//             {/* Table */}
//             <Card className="p-0 overflow-hidden border border-gray-200/60 shadow-sm bg-white/80 backdrop-blur-sm rounded-xl">
//                 {loading ? (
//                     <div className="p-12 text-center">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
//                         <p className="text-sm text-gray-500 mt-3">Loading enquiries...</p>
//                     </div>
//                 ) : enquiries.length === 0 ? (
//                     <div className="p-12 text-center">
//                         <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                         <p className="text-gray-500">No enquiries found</p>
//                         <Button
//                             onClick={() => setIsModalOpen(true)}
//                             className="mt-4 inline-flex items-center gap-2"
//                         >
//                             <Plus className="w-4 h-4" />
//                             Create First Enquiry
//                         </Button>
//                     </div>
//                 ) : (
//                     <Table
//                         columns={columns}
//                         data={enquiries}
//                         totalItems={enquiries.length}
//                         onRowClick={(row) => handleViewEnquiry(row.id)}
//                     />
//                 )}
//             </Card>

//             {/* View Modal */}
//             <Modal
//                 isOpen={!!selectedEnquiry}
//                 onClose={() => setSelectedEnquiry(null)}
//                 title="Enquiry Details"
//                 size="lg"
//             >
//                 {selectedEnquiry && (
//                     <div className="space-y-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div className="p-3 bg-gray-50 rounded-lg">
//                                 <label className="text-xs text-gray-500">Enquiry No</label>
//                                 <p className="text-sm font-semibold">
//                                     {selectedEnquiry.enquiry_number}
//                                 </p>
//                             </div>
//                             <div className="p-3 bg-gray-50 rounded-lg">
//                                 <label className="text-xs text-gray-500">Date</label>
//                                 <p className="text-sm">
//                                     {new Date(selectedEnquiry.created_at).toLocaleDateString(
//                                         'en-IN'
//                                     )}
//                                 </p>
//                             </div>
//                             <div className="p-3 bg-gray-50 rounded-lg">
//                                 <label className="text-xs text-gray-500">Customer</label>
//                                 <p className="text-sm font-medium">
//                                     {selectedEnquiry.customer_name || 'N/A'}
//                                 </p>
//                             </div>
//                             <div className="p-3 bg-gray-50 rounded-lg">
//                                 <label className="text-xs text-gray-500">Contact Person</label>
//                                 <p className="text-sm">{selectedEnquiry.contact_person}</p>
//                             </div>
//                             <div className="p-3 bg-gray-50 rounded-lg">
//                                 <label className="text-xs text-gray-500">Status</label>
//                                 <Badge variant={statusColors[selectedEnquiry.status]}>
//                                     {selectedEnquiry.status}
//                                 </Badge>
//                             </div>
//                             <div className="p-3 bg-gray-50 rounded-lg">
//                                 <label className="text-xs text-gray-500">Priority</label>
//                                 <Badge variant={priorityColors[selectedEnquiry.priority]}>
//                                     {selectedEnquiry.priority}
//                                 </Badge>
//                             </div>
//                         </div>

//                         {/* Items */}
//                         {selectedEnquiry.items && selectedEnquiry.items.length > 0 && (
//                             <div>
//                                 <h4 className="font-medium text-gray-900 mb-3">Items</h4>
//                                 <div className="border rounded-lg overflow-hidden">
//                                     <table className="w-full">
//                                         <thead className="bg-gray-50">
//                                             <tr>
//                                                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
//                                                     Product
//                                                 </th>
//                                                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
//                                                     Qty
//                                                 </th>
//                                                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
//                                                     Rate
//                                                 </th>
//                                             </tr>
//                                         </thead>
//                                         <tbody className="divide-y">
//                                             {selectedEnquiry.items.map((item, idx) => (
//                                                 <tr key={idx}>
//                                                     <td className="px-4 py-2 text-sm">
//                                                         {item.product_name}
//                                                     </td>
//                                                     <td className="px-4 py-2 text-sm">
//                                                         {item.quantity} {item.unit}
//                                                     </td>
//                                                     <td className="px-4 py-2 text-sm">
//                                                         ₹{item.target_rate}
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         )}

//                         <div className="flex justify-end gap-3 pt-4 border-t">
//                             <Button variant="outline" onClick={() => setSelectedEnquiry(null)}>
//                                 Close
//                             </Button>
//                             <Button
//                                 className="flex items-center gap-2"
//                                 onClick={() => handleCreateQuotation(selectedEnquiry.id)}
//                             >
//                                 <FileText className="w-4 h-4" />
//                                 Create Quotation
//                             </Button>
//                         </div>
//                     </div>
//                 )}
//             </Modal>

//             {/* New Enquiry Modal */}
//             <Modal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 title="New Enquiry"
//                 size="lg"
//             >
//                 <EnquiryForm
//                     onClose={() => {
//                         setIsModalOpen(false);
//                         loadEnquiries();
//                     }}
//                 />
//             </Modal>
//         </div>
//     );
// }

// // Enquiry Form
// function EnquiryForm({ onClose }) {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors, isSubmitting },
//     } = useForm({
//         defaultValues: {
//             status: 'New',
//             priority: 'Medium',
//             source: 'Website',
//             unit: 'KG',
//             quantity: '',
//             target_rate: '',
//         },
//     });

//     const [items, setItems] = useState([
//         { product_name: '', grade: '', quantity: '', unit: 'KG', target_rate: '', required_date: '' },
//     ]);
//     const [customers, setCustomers] = useState([]);

//     // Load customers for dropdown
//     useEffect(() => {
//         const loadCustomers = async () => {
//             try {
//                 const { customersAPI } = await import('../../services/api');
//                 const res = await customersAPI.getAll();
//                 setCustomers(res.data.data || []);
//             } catch (err) {
//                 console.error('Failed to load customers:', err);
//             }
//         };
//         loadCustomers();
//     }, []);

//     const addItem = () => {
//         setItems([
//             ...items,
//             { product_name: '', grade: '', quantity: '', unit: 'KG', target_rate: '', required_date: '' },
//         ]);
//     };

//     const removeItem = (index) => {
//         setItems(items.filter((_, i) => i !== index));
//     };

//     const updateItem = (index, field, value) => {
//         const newItems = [...items];
//         newItems[index][field] = value;
//         setItems(newItems);
//     };

//     const onSubmit = async (data) => {
//         try {
//             const payload = {
//                 customer_id: data.customer_id || null,
//                 contact_person: data.contact_person,
//                 salesperson_id: null,
//                 source: data.source,
//                 required_delivery_date: data.required_delivery_date || null,
//                 payment_terms: data.payment_terms,
//                 shipping_location: data.shipping_location,
//                 status: data.status,
//                 priority: data.priority,
//                 packaging: data.packaging,
//                 brand: data.brand,
//                 private_label: data.private_label || false,
//                 flavour: data.flavour,
//                 specification: data.specification,
//                 qc_requirements: data.qc_requirements,
//                 remarks: data.remarks,
//                 items: items.filter((item) => item.product_name),
//             };

//             await enquiriesAPI.create(payload);
//             toast.success('Enquiry created successfully!');
//             onClose();
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Failed to create enquiry');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                 <SectionHeader icon={Building2} title="Customer Information" />

//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         Customer
//                     </label>
//                     <select
//                         {...register('customer_id', { required: 'Customer is required' })}
//                         className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
//                     >
//                         <option value="">Select Customer</option>
//                         {customers.map((c) => (
//                             <option key={c.id} value={c.id}>
//                                 {c.company_name}
//                             </option>
//                         ))}
//                     </select>
//                     {errors.customer_id && (
//                         <p className="text-red-500 text-xs mt-1">{errors.customer_id.message}</p>
//                     )}
//                 </div>

//                 <Input
//                     label="Contact Person"
//                     icon={User}
//                     {...register('contact_person')}
//                     placeholder="Contact person name"
//                 />

//                 <Select
//                     label="Source"
//                     icon={Globe}
//                     {...register('source')}
//                     options={[
//                         { value: 'Website', label: 'Website' },
//                         { value: 'Referral', label: 'Referral' },
//                         { value: 'Phone', label: 'Phone' },
//                         { value: 'Email', label: 'Email' },
//                         { value: 'Social Media', label: 'Social Media' },
//                         { value: 'Other', label: 'Other' },
//                     ]}
//                 />

//                 <Select
//                     label="Status"
//                     icon={FileText}
//                     {...register('status')}
//                     options={[
//                         { value: 'New', label: 'New' },
//                         { value: 'Quoted', label: 'Quoted' },
//                         { value: 'Quotation Sent', label: 'Quotation Sent' },
//                         { value: 'Converted', label: 'Converted' },
//                         { value: 'Lost', label: 'Lost' },
//                     ]}
//                 />

//                 <Select
//                     label="Priority"
//                     icon={AlertTriangle}
//                     {...register('priority')}
//                     options={[
//                         { value: 'High', label: 'High' },
//                         { value: 'Medium', label: 'Medium' },
//                         { value: 'Low', label: 'Low' },
//                     ]}
//                 />

//                 <Input
//                     label="Required Delivery Date"
//                     icon={Calendar}
//                     type="date"
//                     {...register('required_delivery_date')}
//                 />

//                 {/* Items */}
//                 <SectionHeader icon={Package} title="Products" />

//                 <div className="md:col-span-2">
//                     {items.map((item, index) => (
//                         <div
//                             key={index}
//                             className="grid grid-cols-12 gap-2 mb-3 p-3 bg-gray-50 rounded-lg"
//                         >
//                             <input
//                                 type="text"
//                                 placeholder="Product Name"
//                                 value={item.product_name}
//                                 onChange={(e) => updateItem(index, 'product_name', e.target.value)}
//                                 className="col-span-4 px-3 py-2 border rounded-lg text-sm"
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Grade"
//                                 value={item.grade}
//                                 onChange={(e) => updateItem(index, 'grade', e.target.value)}
//                                 className="col-span-2 px-3 py-2 border rounded-lg text-sm"
//                             />
//                             <input
//                                 type="number"
//                                 placeholder="Qty"
//                                 value={item.quantity}
//                                 onChange={(e) => updateItem(index, 'quantity', e.target.value)}
//                                 className="col-span-2 px-3 py-2 border rounded-lg text-sm"
//                             />
//                             <select
//                                 value={item.unit}
//                                 onChange={(e) => updateItem(index, 'unit', e.target.value)}
//                                 className="col-span-1 px-2 py-2 border rounded-lg text-sm"
//                             >
//                                 <option value="KG">KG</option>
//                                 <option value="G">G</option>
//                             </select>
//                             <input
//                                 type="number"
//                                 placeholder="Rate"
//                                 value={item.target_rate}
//                                 onChange={(e) => updateItem(index, 'target_rate', e.target.value)}
//                                 className="col-span-2 px-3 py-2 border rounded-lg text-sm"
//                             />
//                             {items.length > 1 && (
//                                 <button
//                                     type="button"
//                                     onClick={() => removeItem(index)}
//                                     className="col-span-1 text-red-500 hover:text-red-700"
//                                 >
//                                     <Trash2 className="w-4 h-4" />
//                                 </button>
//                             )}
//                         </div>
//                     ))}
//                     <Button type="button" variant="outline" onClick={addItem} className="flex items-center gap-2">
//                         <Plus className="w-4 h-4" />
//                         Add Product
//                     </Button>
//                 </div>

//                 {/* Additional */}
//                 <SectionHeader icon={Layers} title="Additional Details" />

//                 <Input
//                     label="Packaging"
//                     icon={Box}
//                     {...register('packaging')}
//                     placeholder="Packaging type"
//                 />

//                 <Input label="Brand" icon={Tag} {...register('brand')} placeholder="Brand name" />

//                 <div className="md:col-span-2">
//                     <label className="flex items-center gap-3">
//                         <input
//                             type="checkbox"
//                             {...register('private_label')}
//                             className="w-4 h-4 text-blue-600 border-gray-300 rounded"
//                         />
//                         <span className="text-sm text-gray-700">Private Label</span>
//                     </label>
//                 </div>

//                 <Input
//                     label="Flavour"
//                     icon={Palette}
//                     {...register('flavour')}
//                     placeholder="Flavour"
//                 />

//                 <Input
//                     label="Specification"
//                     icon={FileText}
//                     {...register('specification')}
//                     placeholder="Specifications"
//                 />

//                 <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         Remarks
//                     </label>
//                     <textarea
//                         {...register('remarks')}
//                         rows="2"
//                         className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
//                         placeholder="Any additional notes..."
//                     />
//                 </div>
//             </div>

//             <div className="flex justify-end gap-3 pt-4 border-t">
//                 <Button variant="outline" onClick={onClose} type="button">
//                     Cancel
//                 </Button>
//                 <Button type="submit" loading={isSubmitting}>
//                     Create Enquiry
//                 </Button>
//             </div>
//         </form>
//     );
// }

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import {
    Plus, Filter, Download, Search, Eye, Edit, Trash2,
    RefreshCw, Mail, Phone, Calendar, FileText, User,
    Building, Clock, Users, Tag, Package, DollarSign,
    AlertTriangle, UserCheck, Building2, Box, Globe,
    Zap, Award, Layers, MessageSquare, Sparkles, Palette, Ruler,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import SearchBar from '../../components/common/SearchBar';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { enquiriesAPI } from '../../services/api';

const statusColors = {
    New: 'info',
    Quoted: 'warning',
    'Quotation Sent': 'purple',
    Converted: 'success',
    Lost: 'danger',
};

const priorityColors = {
    High: 'danger',
    Medium: 'warning',
    Low: 'info',
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

export default function Enquiries() {
    const navigate = useNavigate();
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    // ✅ NEW: edit ke liye alag state
    const [editingEnquiry, setEditingEnquiry] = useState(null);

    const loadEnquiries = async () => {
        try {
            setLoading(true);
            const response = await enquiriesAPI.getAll({
                search: searchTerm,
                status: filterStatus,
                priority: filterPriority,
            });
            setEnquiries(response.data.data || []);
        } catch (error) {
            console.error('Load enquiries error:', error);
            toast.error(error.response?.data?.message || 'Failed to load enquiries');
            setEnquiries([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(loadEnquiries, 300);
        return () => clearTimeout(delay);
    }, [searchTerm, filterStatus, filterPriority]);

    const handleViewEnquiry = async (id) => {
        try {
            const response = await enquiriesAPI.getById(id);
            setSelectedEnquiry(response.data.data);
        } catch (error) {
            toast.error('Failed to load enquiry details');
        }
    };

    // ✅ FIX: navigate ki jagah modal kholo + full data fetch karo
    const handleEditEnquiry = async (id) => {
        try {
            const response = await enquiriesAPI.getById(id);
            setEditingEnquiry(response.data.data);
            setIsModalOpen(true);
        } catch (error) {
            toast.error('Failed to load enquiry for editing');
        }
    };

    const handleDeleteEnquiry = async (id) => {
        if (!window.confirm('Are you sure you want to delete this enquiry?')) return;

        try {
            await enquiriesAPI.delete(id);
            toast.success('Enquiry deleted successfully');
            loadEnquiries();
        } catch (error) {
            toast.error('Failed to delete enquiry');
        }
    };

    const handleCreateQuotation = async (id) => {
        if (!window.confirm('Create quotation from this enquiry?')) return;

        try {
            const response = await enquiriesAPI.convertToQuotation(id);
            toast.success('Quotation created successfully!');
            loadEnquiries();
            setSelectedEnquiry(null);
            navigate(`/quotations/${response.data.data.id}`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create quotation');
        }
    };

    // ✅ FIX: modal close karte waqt editingEnquiry bhi clear karo
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingEnquiry(null);
        loadEnquiries();
    };

    const columns = [
        { header: 'Enquiry No', accessor: 'enquiry_number', sortable: true },
        {
            header: 'Date',
            accessor: 'created_at',
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
        { header: 'Contact', accessor: 'contact_person' },
        {
            header: 'Items',
            accessor: 'item_count',
            render: (value) => <Badge variant="info">{value || 0} items</Badge>,
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (value) => (
                <Badge variant={statusColors[value] || 'default'}>{value}</Badge>
            ),
        },
        {
            header: 'Priority',
            accessor: 'priority',
            render: (value) => (
                <Badge variant={priorityColors[value] || 'default'}>{value}</Badge>
            ),
        },
        {
            header: 'Salesperson',
            accessor: 'salesperson_name',
        },
        {
            header: 'Actions',
            accessor: 'id',
            render: (_, row) => (
                <div className="flex items-center gap-1">
                    <button
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleViewEnquiry(row.id);
                        }}
                    >
                        <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditEnquiry(row.id);
                        }}
                    >
                        <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Create Quotation"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCreateQuotation(row.id);
                        }}
                    >
                        <FileText className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEnquiry(row.id);
                        }}
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                </div>
            ),
        },
    ];

    const totalEnquiries = enquiries.length;
    const newEnquiries = enquiries.filter((e) => e.status === 'New').length;
    const quotedEnquiries = enquiries.filter(
        (e) => e.status === 'Quoted' || e.status === 'Quotation Sent'
    ).length;
    const highPriority = enquiries.filter((e) => e.priority === 'High').length;

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
                            Customer Enquiries
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Manage and track customer inquiries
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <Button
                        variant="outline"
                        onClick={loadEnquiries}
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
                            setEditingEnquiry(null);
                            setIsModalOpen(true);
                        }}
                        className="flex items-center gap-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    >
                        <Plus className="w-4 h-4" />
                        New Enquiry
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    icon={Users}
                    label="Total Enquiries"
                    value={totalEnquiries}
                    subtext="All time"
                    color="text-blue-600"
                    borderColor="border-blue-500"
                />
                <StatCard
                    icon={Zap}
                    label="New"
                    value={newEnquiries}
                    color="text-yellow-600"
                    borderColor="border-yellow-500"
                />
                <StatCard
                    icon={Award}
                    label="Quoted"
                    value={quotedEnquiries}
                    color="text-purple-600"
                    borderColor="border-purple-500"
                />
                <StatCard
                    icon={AlertTriangle}
                    label="High Priority"
                    value={highPriority}
                    color="text-red-600"
                    borderColor="border-red-500"
                />
            </div>

            {/* Filters */}
            <Card className="p-5 bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-sm rounded-xl">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <SearchBar
                            placeholder="Search enquiries..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2.5 border border-gray-200/80 rounded-lg text-sm"
                    >
                        <option value="all">All Status</option>
                        <option value="New">New</option>
                        <option value="Quoted">Quoted</option>
                        <option value="Quotation Sent">Quotation Sent</option>
                        <option value="Converted">Converted</option>
                        <option value="Lost">Lost</option>
                    </select>
                    <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className="px-4 py-2.5 border border-gray-200/80 rounded-lg text-sm"
                    >
                        <option value="all">All Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <span className="text-sm text-gray-400 ml-auto font-medium">
                        {enquiries.length} enquiries found
                    </span>
                </div>
            </Card>

            {/* Table */}
            <Card className="p-0 overflow-hidden border border-gray-200/60 shadow-sm bg-white/80 backdrop-blur-sm rounded-xl">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
                        <p className="text-sm text-gray-500 mt-3">Loading enquiries...</p>
                    </div>
                ) : enquiries.length === 0 ? (
                    <div className="p-12 text-center">
                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No enquiries found</p>
                        <Button
                            onClick={() => {
                                setEditingEnquiry(null);
                                setIsModalOpen(true);
                            }}
                            className="mt-4 inline-flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Create First Enquiry
                        </Button>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        data={enquiries}
                        totalItems={enquiries.length}
                        onRowClick={(row) => handleViewEnquiry(row.id)}
                    />
                )}
            </Card>

            {/* View Modal */}
            <Modal
                isOpen={!!selectedEnquiry}
                onClose={() => setSelectedEnquiry(null)}
                title="Enquiry Details"
                size="lg"
            >
                {selectedEnquiry && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <label className="text-xs text-gray-500">Enquiry No</label>
                                <p className="text-sm font-semibold">
                                    {selectedEnquiry.enquiry_number}
                                </p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <label className="text-xs text-gray-500">Date</label>
                                <p className="text-sm">
                                    {new Date(selectedEnquiry.created_at).toLocaleDateString(
                                        'en-IN'
                                    )}
                                </p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <label className="text-xs text-gray-500">Customer</label>
                                <p className="text-sm font-medium">
                                    {selectedEnquiry.customer_name || 'N/A'}
                                </p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <label className="text-xs text-gray-500">Contact Person</label>
                                <p className="text-sm">{selectedEnquiry.contact_person}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <label className="text-xs text-gray-500">Status</label>
                                <Badge variant={statusColors[selectedEnquiry.status]}>
                                    {selectedEnquiry.status}
                                </Badge>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <label className="text-xs text-gray-500">Priority</label>
                                <Badge variant={priorityColors[selectedEnquiry.priority]}>
                                    {selectedEnquiry.priority}
                                </Badge>
                            </div>
                        </div>

                        {selectedEnquiry.items && selectedEnquiry.items.length > 0 && (
                            <div>
                                <h4 className="font-medium text-gray-900 mb-3">Items</h4>
                                <div className="border rounded-lg overflow-hidden">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                                    Product
                                                </th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                                    Qty
                                                </th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                                    Rate
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {selectedEnquiry.items.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td className="px-4 py-2 text-sm">
                                                        {item.product_name}
                                                    </td>
                                                    <td className="px-4 py-2 text-sm">
                                                        {item.quantity} {item.unit}
                                                    </td>
                                                    <td className="px-4 py-2 text-sm">
                                                        ₹{item.target_rate}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button variant="outline" onClick={() => setSelectedEnquiry(null)}>
                                Close
                            </Button>
                            <Button
                                className="flex items-center gap-2"
                                onClick={() => handleCreateQuotation(selectedEnquiry.id)}
                            >
                                <FileText className="w-4 h-4" />
                                Create Quotation
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* New / Edit Enquiry Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingEnquiry ? 'Edit Enquiry' : 'New Enquiry'}
                size="lg"
            >
                <EnquiryForm
                    onClose={closeModal}
                    editData={editingEnquiry}
                />
            </Modal>
        </div>
    );
}

// ============================================================
// Enquiry Form (with Edit support)
// ============================================================
function EnquiryForm({ onClose, editData = null }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            status: 'New',
            priority: 'Medium',
            source: 'Website',
            unit: 'KG',
        },
    });

    const [items, setItems] = useState([
        { product_name: '', grade: '', quantity: '', unit: 'KG', target_rate: '', required_date: '' },
    ]);
    const [customers, setCustomers] = useState([]);

    // Load customers
    useEffect(() => {
        const loadCustomers = async () => {
            try {
                const { customersAPI } = await import('../../services/api');
                const res = await customersAPI.getAll();
                setCustomers(res.data.data || []);
            } catch (err) {
                console.error('Failed to load customers:', err);
            }
        };
        loadCustomers();
    }, []);

    // ✅ FIX: edit ke waqt form prefill karo
    useEffect(() => {
        if (editData) {
            reset({
                customer_id: editData.customer_id || '',
                contact_person: editData.contact_person || '',
                source: editData.source || 'Website',
                status: editData.status || 'New',
                priority: editData.priority || 'Medium',
                required_delivery_date: editData.required_delivery_date
                    ? editData.required_delivery_date.split('T')[0]
                    : '',
                payment_terms: editData.payment_terms || '',
                shipping_location: editData.shipping_location || '',
                packaging: editData.packaging || '',
                brand: editData.brand || '',
                private_label: editData.private_label || false,
                flavour: editData.flavour || '',
                specification: editData.specification || '',
                qc_requirements: editData.qc_requirements || '',
                remarks: editData.remarks || '',
            });

            // ✅ Items bhi prefill karo
            if (editData.items && editData.items.length > 0) {
                setItems(
                    editData.items.map((item) => ({
                        product_name: item.product_name || '',
                        grade: item.grade || '',
                        quantity: item.quantity || '',
                        unit: item.unit || 'KG',
                        target_rate: item.target_rate || '',
                        required_date: item.required_date
                            ? item.required_date.split('T')[0]
                            : '',
                    }))
                );
            }
        } else {
            // New enquiry — reset to default
            reset({
                status: 'New',
                priority: 'Medium',
                source: 'Website',
            });
            setItems([
                { product_name: '', grade: '', quantity: '', unit: 'KG', target_rate: '', required_date: '' },
            ]);
        }
    }, [editData, reset]);

    const addItem = () => {
        setItems([
            ...items,
            { product_name: '', grade: '', quantity: '', unit: 'KG', target_rate: '', required_date: '' },
        ]);
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const onSubmit = async (data) => {
        try {
            const payload = {
                customer_id: data.customer_id || null,
                contact_person: data.contact_person,
                salesperson_id: null,
                source: data.source,
                required_delivery_date: data.required_delivery_date || null,
                payment_terms: data.payment_terms,
                shipping_location: data.shipping_location,
                status: data.status,
                priority: data.priority,
                packaging: data.packaging,
                brand: data.brand,
                private_label: data.private_label || false,
                flavour: data.flavour,
                specification: data.specification,
                qc_requirements: data.qc_requirements,
                remarks: data.remarks,
                items: items.filter((item) => item.product_name),
            };

            if (editData) {
                await enquiriesAPI.update(editData.id, payload);
                toast.success('Enquiry updated successfully!');
            } else {
                await enquiriesAPI.create(payload);
                toast.success('Enquiry created successfully!');
            }
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save enquiry');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <SectionHeader icon={Building2} title="Customer Information" />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Customer
                    </label>
                    <select
                        {...register('customer_id', { required: 'Customer is required' })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                    >
                        <option value="">Select Customer</option>
                        {customers.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.company_name}
                            </option>
                        ))}
                    </select>
                    {errors.customer_id && (
                        <p className="text-red-500 text-xs mt-1">{errors.customer_id.message}</p>
                    )}
                </div>

                <Input
                    label="Contact Person"
                    icon={User}
                    {...register('contact_person')}
                    placeholder="Contact person name"
                />

                <Select
                    label="Source"
                    icon={Globe}
                    {...register('source')}
                    options={[
                        { value: 'Website', label: 'Website' },
                        { value: 'Referral', label: 'Referral' },
                        { value: 'Phone', label: 'Phone' },
                        { value: 'Email', label: 'Email' },
                        { value: 'Social Media', label: 'Social Media' },
                        { value: 'Other', label: 'Other' },
                    ]}
                />

                <Select
                    label="Status"
                    icon={FileText}
                    {...register('status')}
                    options={[
                        { value: 'New', label: 'New' },
                        { value: 'Quoted', label: 'Quoted' },
                        { value: 'Quotation Sent', label: 'Quotation Sent' },
                        { value: 'Converted', label: 'Converted' },
                        { value: 'Lost', label: 'Lost' },
                    ]}
                />

                <Select
                    label="Priority"
                    icon={AlertTriangle}
                    {...register('priority')}
                    options={[
                        { value: 'High', label: 'High' },
                        { value: 'Medium', label: 'Medium' },
                        { value: 'Low', label: 'Low' },
                    ]}
                />

                <Input
                    label="Required Delivery Date"
                    icon={Calendar}
                    type="date"
                    {...register('required_delivery_date')}
                />

                <SectionHeader icon={Package} title="Products" />

                <div className="md:col-span-2">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-12 gap-2 mb-3 p-3 bg-gray-50 rounded-lg"
                        >
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={item.product_name}
                                onChange={(e) => updateItem(index, 'product_name', e.target.value)}
                                className="col-span-4 px-3 py-2 border rounded-lg text-sm"
                            />
                            <input
                                type="text"
                                placeholder="Grade"
                                value={item.grade}
                                onChange={(e) => updateItem(index, 'grade', e.target.value)}
                                className="col-span-2 px-3 py-2 border rounded-lg text-sm"
                            />
                            <input
                                type="number"
                                placeholder="Qty"
                                value={item.quantity}
                                onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                                className="col-span-2 px-3 py-2 border rounded-lg text-sm"
                            />
                            <select
                                value={item.unit}
                                onChange={(e) => updateItem(index, 'unit', e.target.value)}
                                className="col-span-1 px-2 py-2 border rounded-lg text-sm"
                            >
                                <option value="KG">KG</option>
                                <option value="G">G</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Rate"
                                value={item.target_rate}
                                onChange={(e) => updateItem(index, 'target_rate', e.target.value)}
                                className="col-span-2 px-3 py-2 border rounded-lg text-sm"
                            />
                            {items.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeItem(index)}
                                    className="col-span-1 text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addItem} className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Product
                    </Button>
                </div>

                <SectionHeader icon={Layers} title="Additional Details" />

                <Input
                    label="Packaging"
                    icon={Box}
                    {...register('packaging')}
                    placeholder="Packaging type"
                />

                <Input label="Brand" icon={Tag} {...register('brand')} placeholder="Brand name" />

                <div className="md:col-span-2">
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            {...register('private_label')}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Private Label</span>
                    </label>
                </div>

                <Input
                    label="Flavour"
                    icon={Palette}
                    {...register('flavour')}
                    placeholder="Flavour"
                />

                <Input
                    label="Specification"
                    icon={FileText}
                    {...register('specification')}
                    placeholder="Specifications"
                />

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Remarks
                    </label>
                    <textarea
                        {...register('remarks')}
                        rows="2"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                        placeholder="Any additional notes..."
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={onClose} type="button">
                    Cancel
                </Button>
                <Button type="submit" loading={isSubmitting}>
                    {editData ? 'Update Enquiry' : 'Create Enquiry'}
                </Button>
            </div>
        </form>
    );
}