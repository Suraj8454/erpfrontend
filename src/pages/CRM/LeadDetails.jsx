// import { useParams, useNavigate } from 'react-router-dom'
// import { 
//   ArrowLeft, 
//   Edit, 
//   Trash2, 
//   UserPlus,
//   Mail,
//   Phone,
//   MapPin,
//   Calendar,
//   Clock,
//   MessageSquare,
//   FileText,
//   Activity,
//   Download,
//   ChevronRight,
//   Send,
//   Printer,
//   MoreVertical,
//   Building,
//   User,
//   Tag,
//   DollarSign,
//   Percent
// } from 'lucide-react'
// import Card from '../../components/common/Card'
// import Button from '../../components/common/Button'
// import Badge from '../../components/common/Badge'

// // Mock lead data - in real app, fetch from API based on id
// const getLeadData = (id) => ({
//   id: id || 'L-00025',
//   company: 'ABC Traders',
//   contact: 'Rajesh Kumar',
//   mobile: '+91 9876543210',
//   whatsapp: '+91 9876543210',
//   email: 'rajesh@abctraders.com',
//   address: '123, Business Park, Andheri East, Mumbai - 400093',
//   source: 'Website',
//   status: 'Qualified',
//   value: '₹5,00,000',
//   probability: '75%',
//   created: '2026-08-25',
//   nextFollowup: '2026-08-28',
//   salesperson: 'Anita Sharma',
//   remarks: 'Interested in premium 4 Suta Makhana. Requires bulk order.',
//   activities: [
//     { type: 'Call', date: '2026-08-25', time: '10:30 AM', note: 'Initial contact made. Discussed requirements.', by: 'Anita Sharma' },
//     { type: 'Email', date: '2026-08-25', time: '02:15 PM', note: 'Sent product catalogue and price list.', by: 'Anita Sharma' },
//     { type: 'Meeting', date: '2026-08-26', time: '11:00 AM', note: 'Virtual meeting scheduled for next week.', by: 'Rahul Verma' },
//   ]
// })

// export default function LeadDetails() {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const lead = getLeadData(id)

//   const handleConvert = () => {
//     if (window.confirm(`Convert ${lead.company} to a customer?`)) {
//       console.log('Converting lead to customer:', id)
//       navigate('/customers')
//     }
//   }

//   const handleCreateQuotation = () => {
//     navigate(`/quotations?lead=${id}`)
//   }

//   const handleSendEmail = () => {
//     window.location.href = `mailto:${lead.email}`
//   }

//   const handleCall = () => {
//     window.location.href = `tel:${lead.mobile}`
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-wrap items-start justify-between gap-4">
//         <div className="flex items-center gap-4">
//           <button 
//             onClick={() => navigate('/leads')}
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </button>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">{lead.company}</h1>
//             <div className="flex items-center gap-3 mt-1">
//               <p className="text-sm text-gray-500">Lead ID: {lead.id}</p>
//               <Badge variant="success">{lead.status}</Badge>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm" className="flex items-center gap-2">
//             <Download className="w-4 h-4" />
//             Export
//           </Button>
//           <Button variant="outline" size="sm" className="flex items-center gap-2">
//             <Edit className="w-4 h-4" />
//             Edit
//           </Button>
//           <Button size="sm" className="flex items-center gap-2" onClick={handleConvert}>
//             <UserPlus className="w-4 h-4" />
//             Convert to Customer
//           </Button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Main Info */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Lead Information Card */}
//           <Card className="p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">Lead Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-xs text-gray-500 font-medium">Company</label>
//                 <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
//                   <Building className="w-4 h-4 text-gray-400" />
//                   {lead.company}
//                 </p>
//               </div>
//               <div>
//                 <label className="text-xs text-gray-500 font-medium">Contact Person</label>
//                 <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
//                   <User className="w-4 h-4 text-gray-400" />
//                   {lead.contact}
//                 </p>
//               </div>
//               <div>
//                 <label className="text-xs text-gray-500 font-medium">Mobile</label>
//                 <p className="text-sm flex items-center gap-2">
//                   {lead.mobile}
//                   <button onClick={handleCall} className="text-primary-600 hover:text-primary-700">
//                     <Phone className="w-4 h-4" />
//                   </button>
//                 </p>
//               </div>
//               <div>
//                 <label className="text-xs text-gray-500 font-medium">WhatsApp</label>
//                 <p className="text-sm">{lead.whatsapp}</p>
//               </div>
//               <div>
//                 <label className="text-xs text-gray-500 font-medium">Email</label>
//                 <p className="text-sm flex items-center gap-2">
//                   {lead.email}
//                   <button onClick={handleSendEmail} className="text-primary-600 hover:text-primary-700">
//                     <Mail className="w-4 h-4" />
//                   </button>
//                 </p>
//               </div>
//               <div>
//                 <label className="text-xs text-gray-500 font-medium">Lead Source</label>
//                 <p className="text-sm"><Tag className="w-4 h-4 inline mr-1 text-gray-400" />{lead.source}</p>
//               </div>
//               <div>
//                 <label className="text-xs text-gray-500 font-medium">Expected Value</label>
//                 <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
//                   <DollarSign className="w-4 h-4 text-gray-400" />
//                   {lead.value}
//                 </p>
//               </div>
//               <div>
//                 <label className="text-xs text-gray-500 font-medium">Salesperson</label>
//                 <p className="text-sm">{lead.salesperson}</p>
//               </div>
//               <div>
//                 <label className="text-xs text-gray-500 font-medium">Created</label>
//                 <p className="text-sm flex items-center gap-2">
//                   <Calendar className="w-4 h-4 text-gray-400" />
//                   {lead.created}
//                 </p>
//               </div>
//               <div>
//                 <label className="text-xs text-gray-500 font-medium">Next Follow-up</label>
//                 <p className="text-sm flex items-center gap-2">
//                   <Calendar className="w-4 h-4 text-gray-400" />
//                   {lead.nextFollowup}
//                 </p>
//               </div>
//               <div>
//                 <label className="text-xs text-gray-500 font-medium">Probability</label>
//                 <div className="flex items-center gap-2">
//                   <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                     <div className="h-full bg-primary-500 rounded-full" style={{ width: lead.probability }} />
//                   </div>
//                   <span className="text-sm font-medium flex items-center gap-1">
//                     <Percent className="w-3 h-3" />
//                     {lead.probability}
//                   </span>
//                 </div>
//               </div>
//               <div className="md:col-span-2">
//                 <label className="text-xs text-gray-500 font-medium">Address</label>
//                 <p className="text-sm flex items-start gap-2">
//                   <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
//                   {lead.address}
//                 </p>
//               </div>
//               <div className="md:col-span-2">
//                 <label className="text-xs text-gray-500 font-medium">Remarks</label>
//                 <p className="text-sm bg-gray-50 p-3 rounded-lg">{lead.remarks}</p>
//               </div>
//             </div>
//           </Card>

//           {/* Activities */}
//           <Card className="p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="font-semibold text-gray-900">Activities</h3>
//               <Button variant="outline" size="sm" className="flex items-center gap-2">
//                 <Clock className="w-4 h-4" />
//                 Add Activity
//               </Button>
//             </div>
//             <div className="space-y-4">
//               {lead.activities.map((activity, index) => (
//                 <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
//                   <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
//                     activity.type === 'Call' ? 'bg-green-50' :
//                     activity.type === 'Email' ? 'bg-blue-50' :
//                     'bg-purple-50'
//                   }`}>
//                     <Activity className={`w-5 h-5 ${
//                       activity.type === 'Call' ? 'text-green-600' :
//                       activity.type === 'Email' ? 'text-blue-600' :
//                       'text-purple-600'
//                     }`} />
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium text-sm">{activity.type}</span>
//                       <div className="flex items-center gap-2 text-xs text-gray-500">
//                         <span>{activity.date}</span>
//                         <span>•</span>
//                         <span>{activity.time}</span>
//                       </div>
//                     </div>
//                     <p className="text-sm text-gray-600 mt-1">{activity.note}</p>
//                     <p className="text-xs text-gray-400 mt-1">By: {activity.by}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           <Card className="p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
//             <div className="space-y-2">
//               <Button className="w-full justify-center" onClick={handleCreateQuotation}>
//                 <FileText className="w-4 h-4 mr-2" />
//                 Create Quotation
//               </Button>
//               <Button variant="outline" className="w-full justify-center" onClick={handleConvert}>
//                 <UserPlus className="w-4 h-4 mr-2" />
//                 Convert to Customer
//               </Button>
//               <Button variant="outline" className="w-full justify-center" onClick={handleSendEmail}>
//                 <Mail className="w-4 h-4 mr-2" />
//                 Send Email
//               </Button>
//               <Button variant="outline" className="w-full justify-center" onClick={handleCall}>
//                 <Phone className="w-4 h-4 mr-2" />
//                 Call Now
//               </Button>
//               <Button variant="outline" className="w-full justify-center">
//                 <Clock className="w-4 h-4 mr-2" />
//                 Schedule Follow-up
//               </Button>
//             </div>
//           </Card>

//           <Card className="p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">Summary</h3>
//             <dl className="space-y-3">
//               <div className="flex justify-between">
//                 <dt className="text-sm text-gray-500">Total Activities</dt>
//                 <dd className="text-sm font-medium">12</dd>
//               </div>
//               <div className="flex justify-between">
//                 <dt className="text-sm text-gray-500">Calls</dt>
//                 <dd className="text-sm font-medium">5</dd>
//               </div>
//               <div className="flex justify-between">
//                 <dt className="text-sm text-gray-500">Emails</dt>
//                 <dd className="text-sm font-medium">4</dd>
//               </div>
//               <div className="flex justify-between">
//                 <dt className="text-sm text-gray-500">Meetings</dt>
//                 <dd className="text-sm font-medium">3</dd>
//               </div>
//               <div className="flex justify-between pt-3 border-t border-gray-200">
//                 <dt className="text-sm text-gray-500">Days Since Lead</dt>
//                 <dd className="text-sm font-medium">5 days</dd>
//               </div>
//               <div className="flex justify-between">
//                 <dt className="text-sm text-gray-500">Last Activity</dt>
//                 <dd className="text-sm font-medium">2 days ago</dd>
//               </div>
//             </dl>
//           </Card>

//           <Card className="p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">Lead Details</h3>
//             <div className="space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">Created By</span>
//                 <span className="font-medium">Admin</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">Last Modified</span>
//                 <span className="font-medium">2026-08-26</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">Source Detail</span>
//                 <span className="font-medium">Google Ads</span>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Edit,
    UserPlus,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Clock,
    FileText,
    Activity,
    Download,
    Send,
    Building,
    User,
    Tag,
    DollarSign,
    Percent,
    Loader,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { leadsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const statusColors = {
    New: 'gray',
    Contacted: 'info',
    Qualified: 'success',
    'Quotation Sent': 'purple',
    Negotiation: 'warning',
    Won: 'success',
    Lost: 'danger',
};

export default function LeadDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ Load lead from API
    useEffect(() => {
        const loadLead = async () => {
            try {
                setLoading(true);
                const response = await leadsAPI.getById(id);
                setLead(response.data.data);
            } catch (error) {
                console.error('Load lead error:', error);
                toast.error('Failed to load lead details');
                navigate('/leads');
            } finally {
                setLoading(false);
            }
        };

        if (id) loadLead();
    }, [id, navigate]);

    const handleConvert = async () => {
        if (!window.confirm(`Convert ${lead.company_name} to a customer?`)) return;

        try {
            await leadsAPI.convert(id);
            toast.success('Lead converted to customer successfully!');
            navigate('/customers');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Conversion failed');
        }
    };

    const handleCreateQuotation = () => {
        navigate(`/quotations?lead=${id}`);
    };

    const handleSendEmail = () => {
        window.location.href = `mailto:${lead.email}`;
    };

    const handleCall = () => {
        window.location.href = `tel:${lead.mobile}`;
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-500">Loading lead details...</p>
                </div>
            </div>
        );
    }

    if (!lead) return null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/leads')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{lead.company_name}</h1>
                        <div className="flex items-center gap-3 mt-1">
                            <p className="text-sm text-gray-500">Lead ID: {lead.lead_number}</p>
                            <Badge variant={statusColors[lead.status] || 'default'}>
                                {lead.status}
                            </Badge>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => navigate(`/leads/${id}/edit`)}
                    >
                        <Edit className="w-4 h-4" />
                        Edit
                    </Button>
                    <Button size="sm" className="flex items-center gap-2" onClick={handleConvert}>
                        <UserPlus className="w-4 h-4" />
                        Convert to Customer
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Lead Information Card */}
                    <Card className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Lead Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-500 font-medium">Company</label>
                                <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                    <Building className="w-4 h-4 text-gray-400" />
                                    {lead.company_name}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-medium">
                                    Contact Person
                                </label>
                                <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                    <User className="w-4 h-4 text-gray-400" />
                                    {lead.contact_person}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-medium">Mobile</label>
                                <p className="text-sm flex items-center gap-2">
                                    {lead.mobile}
                                    <button
                                        onClick={handleCall}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        <Phone className="w-4 h-4" />
                                    </button>
                                </p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-medium">WhatsApp</label>
                                <p className="text-sm">{lead.whatsapp || '-'}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-medium">Email</label>
                                <p className="text-sm flex items-center gap-2">
                                    {lead.email || '-'}
                                    {lead.email && (
                                        <button
                                            onClick={handleSendEmail}
                                            className="text-blue-600 hover:text-blue-700"
                                        >
                                            <Mail className="w-4 h-4" />
                                        </button>
                                    )}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-medium">
                                    Lead Source
                                </label>
                                <p className="text-sm">
                                    <Tag className="w-4 h-4 inline mr-1 text-gray-400" />
                                    {lead.source || '-'}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-medium">
                                    Expected Value
                                </label>
                                <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-gray-400" />₹
                                    {Number(lead.expected_value || 0).toLocaleString('en-IN')}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-medium">
                                    Probability
                                </label>
                                <div className="flex items-center gap-2">
                                    <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 rounded-full"
                                            style={{ width: `${lead.probability || 0}%` }}
                                        />
                                    </div>
                                    <span className="text-sm font-medium flex items-center gap-1">
                                        <Percent className="w-3 h-3" />
                                        {lead.probability || 0}%
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-medium">Created</label>
                                <p className="text-sm flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    {lead.created_at
                                        ? new Date(lead.created_at).toLocaleDateString('en-IN')
                                        : '-'}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-medium">
                                    Next Follow-up
                                </label>
                                <p className="text-sm flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    {lead.next_followup_date
                                        ? new Date(lead.next_followup_date).toLocaleDateString('en-IN')
                                        : '-'}
                                </p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-xs text-gray-500 font-medium">City</label>
                                <p className="text-sm flex items-start gap-2">
                                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    {lead.city || '-'}
                                </p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-xs text-gray-500 font-medium">Remarks</label>
                                <p className="text-sm bg-gray-50 p-3 rounded-lg">
                                    {lead.remarks || 'No remarks'}
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Activities */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">Activities</h3>
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Add Activity
                            </Button>
                        </div>
                        <div className="space-y-4">
                            {lead.activities && lead.activities.length > 0 ? (
                                lead.activities.map((activity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                                    >
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${activity.activity_type === 'call'
                                                    ? 'bg-green-50'
                                                    : activity.activity_type === 'email'
                                                        ? 'bg-blue-50'
                                                        : 'bg-purple-50'
                                                }`}
                                        >
                                            <Activity
                                                className={`w-5 h-5 ${activity.activity_type === 'call'
                                                        ? 'text-green-600'
                                                        : activity.activity_type === 'email'
                                                            ? 'text-blue-600'
                                                            : 'text-purple-600'
                                                    }`}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-sm capitalize">
                                                    {activity.activity_type}
                                                </span>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <span>
                                                        {activity.created_at
                                                            ? new Date(activity.created_at).toLocaleDateString('en-IN')
                                                            : ''}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {activity.description || activity.subject}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 text-center py-4">
                                    No activities yet
                                </p>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            <Button
                                className="w-full justify-center"
                                onClick={handleCreateQuotation}
                            >
                                <FileText className="w-4 h-4 mr-2" />
                                Create Quotation
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-center"
                                onClick={handleConvert}
                            >
                                <UserPlus className="w-4 h-4 mr-2" />
                                Convert to Customer
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-center"
                                onClick={handleSendEmail}
                            >
                                <Mail className="w-4 h-4 mr-2" />
                                Send Email
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-center"
                                onClick={handleCall}
                            >
                                <Phone className="w-4 h-4 mr-2" />
                                Call Now
                            </Button>
                            <Button variant="outline" className="w-full justify-center">
                                <Clock className="w-4 h-4 mr-2" />
                                Schedule Follow-up
                            </Button>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Summary</h3>
                        <dl className="space-y-3">
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Total Activities</dt>
                                <dd className="text-sm font-medium">
                                    {lead.activities?.length || 0}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Status</dt>
                                <dd className="text-sm font-medium">{lead.status}</dd>
                            </div>
                            <div className="flex justify-between pt-3 border-t border-gray-200">
                                <dt className="text-sm text-gray-500">Lead Age</dt>
                                <dd className="text-sm font-medium">
                                    {lead.created_at
                                        ? Math.floor(
                                            (new Date() - new Date(lead.created_at)) /
                                            (1000 * 60 * 60 * 24)
                                        ) + ' days'
                                        : '-'}
                                </dd>
                            </div>
                        </dl>
                    </Card>
                </div>
            </div>
        </div>
    );
}