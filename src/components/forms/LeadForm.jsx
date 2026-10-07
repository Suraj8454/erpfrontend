
// import { useForm } from 'react-hook-form';
// import Button from '../common/Button';
// import Input from '../common/Input';
// import Select from '../common/Select';
// import { toast } from 'react-hot-toast';
// import {
//   Building2,
//   User,
//   Phone,
//   Smartphone,
//   Mail,
//   MapPin,
//   Globe,
//   Tag,
//   Package,
//   DollarSign,
//   Calendar,
//   Star,
//   UserCog,
//   TrendingUp,
//   Clock,
//   MessageSquare,
//   Users,
//   Store,
//   Briefcase,
//   Percent,
//   CalendarDays,
//   UserPlus,
// } from 'lucide-react';

// const sourceOptions = [
//   { value: 'website', label: 'Website' },
//   { value: 'referral', label: 'Referral' },
//   { value: 'social-media', label: 'Social Media' },
//   { value: 'email', label: 'Email' },
//   { value: 'phone', label: 'Phone' },
//   { value: 'other', label: 'Other' },
// ];

// const customerTypeOptions = [
//   { value: 'retailer', label: 'Retailer' },
//   { value: 'distributor', label: 'Distributor' },
//   { value: 'wholesaler', label: 'Wholesaler' },
//   { value: 'exporter', label: 'Exporter' },
//   { value: 'manufacturer', label: 'Manufacturer' },
//   { value: 'ecommerce', label: 'E-commerce' },
//   { value: 'corporate', label: 'Corporate' },
// ];

// const statusOptions = [
//   { value: 'New', label: 'New' },
//   { value: 'Contacted', label: 'Contacted' },
//   { value: 'Qualified', label: 'Qualified' },
//   { value: 'Quotation Sent', label: 'Quotation Sent' },
//   { value: 'Negotiation', label: 'Negotiation' },
//   { value: 'Won', label: 'Won' },
//   { value: 'Lost', label: 'Lost' },
// ];

// const productOptions = [
//   { value: '4-suta', label: '4 Suta Makhana' },
//   { value: '6-suta', label: '6 Suta Makhana' },
//   { value: '8-suta', label: '8 Suta Makhana' },
//   { value: 'premium', label: 'Premium Makhana' },
//   { value: 'organic', label: 'Organic Makhana' },
//   { value: 'roasted', label: 'Roasted Makhana' },
//   { value: 'flavored', label: 'Flavored Makhana' },
// ];

// const gradeOptions = [
//   { value: 'premium', label: 'Premium' },
//   { value: 'standard', label: 'Standard' },
//   { value: 'economy', label: 'Economy' },
//   { value: 'export', label: 'Export Quality' },
// ];

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

// export default function LeadForm({ onClose, editData }) {
//   const { 
//     register, 
//     handleSubmit, 
//     formState: { errors, isSubmitting },
//   } = useForm({
//     defaultValues: {
//       status: 'New',
//       probability: 75,
//       source: 'website',
//       ...editData,
//     },
//   });

//   const onSubmit = async (data) => {
//     try {
//       console.log('Lead data:', data);
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       toast.success(editData ? 'Lead updated successfully!' : 'Lead created successfully!');
//       onClose();
//     } catch (error) {
//       toast.error('Failed to save lead');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       {/* Page Header */}
//       <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
//         <div className="p-2 bg-blue-50 rounded-lg">
//           <UserPlus className="w-5 h-5 text-blue-500" />
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold text-gray-900">New Lead</h2>
//           <p className="text-xs text-gray-500">Add new lead information and track potential opportunities</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//         {/* Lead Information */}
//         <SectionHeader icon={Building2} title="Lead Information" />

//         <Input
//           label="Company Name"
//           required
//           icon={Building2}
//           {...register('companyName', { required: 'Company name is required' })}
//           error={errors.companyName?.message}
//           placeholder="ABC Traders"
//         />

//         <Input
//           label="Contact Person"
//           icon={User}
//           {...register('contactPerson')}
//           placeholder="Rajesh Kumar"
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
//           label="WhatsApp Number"
//           icon={Smartphone}
//           {...register('whatsapp')}
//           placeholder="+91 9876543210"
//         />

//         <Input
//           label="Email"
//           icon={Mail}
//           {...register('email', {
//             pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
//           })}
//           error={errors.email?.message}
//           placeholder="rajesh@abctraders.com"
//         />

//         <Input
//           label="City"
//           icon={MapPin}
//           {...register('city')}
//           placeholder="Mumbai"
//         />

//         <Select
//           label="Lead Source"
//           icon={Globe}
//           {...register('source')}
//           options={sourceOptions}
//         />

//         {/* Business Information */}
//         <SectionHeader icon={Store} title="Business Information" />

//         <Select
//           label="Customer Type"
//           icon={Users}
//           {...register('customerType')}
//           options={customerTypeOptions}
//         />

//         <Select
//           label="Interested Product"
//           icon={Tag}
//           {...register('interestedProduct')}
//           options={productOptions}
//         />

//         <Input
//           label="Expected Quantity"
//           icon={Package}
//           {...register('expectedQuantity')}
//           placeholder="500 KG"
//         />

//         <Input
//           label="Expected Purchase Value"
//           icon={DollarSign}
//           {...register('expectedValue')}
//           placeholder="₹5,00,000"
//         />

//         <Input
//           label="Expected Order Date"
//           icon={Calendar}
//           {...register('expectedDate')}
//           type="date"
//         />

//         <Select
//           label="Required Grade"
//           icon={Star}
//           {...register('requiredGrade')}
//           options={gradeOptions}
//         />

//         <Select
//           label="Status"
//           icon={TrendingUp}
//           {...register('status')}
//           options={statusOptions}
//         />

//         <Input
//           label="Probability (%)"
//           icon={Percent}
//           {...register('probability', {
//             min: { value: 0, message: 'Minimum 0%' },
//             max: { value: 100, message: 'Maximum 100%' },
//           })}
//           type="number"
//           min="0"
//           max="100"
//           placeholder="75"
//           error={errors.probability?.message}
//         />

//         <Input
//           label="Expected Closing Date"
//           icon={CalendarDays}
//           {...register('closingDate')}
//           type="date"
//         />

//         <Input
//           label="Next Follow-up Date"
//           icon={Clock}
//           {...register('nextFollowup')}
//           type="date"
//         />

//         <Input
//           label="Salesperson"
//           icon={Briefcase}
//           {...register('salesperson')}
//           placeholder="Anita Sharma"
//         />

//         {/* Remarks - Full Width */}
//         <div className="md:col-span-2 mt-2">
//           <label className="block text-xs font-medium text-gray-700 tracking-wide mb-1.5">
//             Remarks
//           </label>
//           <div className="relative flex items-center">
//             <div className="absolute left-0 inset-y-0 flex items-center">
//               <div className="flex items-center gap-2 pl-3">
//                 <MessageSquare className="w-4 h-4 text-blue-500" strokeWidth={1.75} />
//                 <div className="w-px h-6 bg-gray-300"></div>
//               </div>
//             </div>
//             <textarea
//               {...register('remarks')}
//               rows="3"
//               className="w-full pl-14 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none placeholder:text-gray-400"
//               placeholder="Any additional notes about this lead..."
//             />
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
//         <Button 
//           variant="outline" 
//           onClick={onClose} 
//           type="button"
//         >
//           Cancel
//         </Button>
//         <Button 
//           type="submit" 
//           loading={isSubmitting}
//         >
//           Save Lead
//         </Button>
//       </div>
//     </form>
//   );
// }

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { leadsAPI } from '../../services/api';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import { toast } from 'react-hot-toast';
import {
    Building2,
    User,
    Phone,
    Smartphone,
    Mail,
    MapPin,
    Globe,
    Tag,
    Package,
    DollarSign,
    Calendar,
    Star,
    TrendingUp,
    Clock,
    MessageSquare,
    Users,
    Store,
    Briefcase,
    Percent,
    CalendarDays,
    UserPlus,
} from 'lucide-react';

const sourceOptions = [
    { value: 'Website', label: 'Website' },
    { value: 'Referral', label: 'Referral' },
    { value: 'Social Media', label: 'Social Media' },
    { value: 'Email', label: 'Email' },
    { value: 'Phone', label: 'Phone' },
    { value: 'Other', label: 'Other' },
];

const customerTypeOptions = [
    { value: 'Retailer', label: 'Retailer' },
    { value: 'Distributor', label: 'Distributor' },
    { value: 'Wholesaler', label: 'Wholesaler' },
    { value: 'Exporter', label: 'Exporter' },
    { value: 'Manufacturer', label: 'Manufacturer' },
    { value: 'E-commerce', label: 'E-commerce' },
    { value: 'Corporate', label: 'Corporate' },
];

const statusOptions = [
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Qualified', label: 'Qualified' },
    { value: 'Quotation Sent', label: 'Quotation Sent' },
    { value: 'Negotiation', label: 'Negotiation' },
    { value: 'Won', label: 'Won' },
    { value: 'Lost', label: 'Lost' },
];

const gradeOptions = [
    { value: 'Premium', label: 'Premium' },
    { value: 'Standard', label: 'Standard' },
    { value: 'Economy', label: 'Economy' },
    { value: 'Export Quality', label: 'Export Quality' },
];

const SectionHeader = ({ icon: Icon, title }) => (
    <div className="md:col-span-2">
        <div className="flex items-center gap-3 pb-2 border-b border-blue-200">
            <Icon className="w-4 h-4 text-blue-500" strokeWidth={2} />
            <h3 className="text-sm font-semibold text-blue-600 tracking-wide">{title}</h3>
        </div>
    </div>
);

export default function LeadForm({ onClose, editData }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            status: 'New',
            probability: 50,
            source: 'Website',
            customerType: 'Retailer',
        },
    });

    // ✅ FIX: editData (snake_case from backend) ko form fields (camelCase) mein map karo
    useEffect(() => {
        if (editData) {
            reset({
                companyName: editData.company_name || '',
                contactPerson: editData.contact_person || '',
                mobile: editData.mobile || '',
                whatsapp: editData.whatsapp || '',
                email: editData.email || '',
                city: editData.city || '',
                source: editData.source || 'Website',
                customerType: editData.customer_type || 'Retailer',
                interestedProduct: editData.interested_product || '',
                expectedQuantity: editData.expected_quantity || '',
                expectedValue: editData.expected_value || '',
                expectedDate: editData.expected_order_date
                    ? editData.expected_order_date.split('T')[0]
                    : '',
                requiredGrade: editData.required_grade || '',
                status: editData.status || 'New',
                probability: editData.probability || 0,
                closingDate: editData.expected_closing_date
                    ? editData.expected_closing_date.split('T')[0]
                    : '',
                nextFollowup: editData.next_followup_date
                    ? editData.next_followup_date.split('T')[0]
                    : '',
                remarks: editData.remarks || '',
            });
        }
    }, [editData, reset]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                company_name: data.companyName,
                contact_person: data.contactPerson,
                mobile: data.mobile,
                whatsapp: data.whatsapp,
                email: data.email,
                city: data.city,
                source: data.source,
                customer_type: data.customerType,
                interested_product: data.interestedProduct,
                expected_quantity: data.expectedQuantity,
                expected_value: data.expectedValue
                    ? Number(String(data.expectedValue).replace(/[₹,]/g, ''))
                    : 0,
                expected_order_date: data.expectedDate || null,
                required_grade: data.requiredGrade,
                status: data.status,
                probability: Number(data.probability) || 0,
                expected_closing_date: data.closingDate || null,
                next_followup_date: data.nextFollowup || null,
                remarks: data.remarks,
            };

            if (editData) {
                await leadsAPI.update(editData.id, payload);
                toast.success('Lead updated successfully!');
            } else {
                await leadsAPI.create(payload);
                toast.success('Lead created successfully!');
            }

            onClose();
        } catch (error) {
            console.error('Submit error:', error);
            toast.error(error.response?.data?.message || 'Failed to save lead');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Page Header — yahi hai woh "Create/Edit" icon section */}
            <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <UserPlus className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        {editData ? 'Edit Lead' : 'New Lead'}
                    </h2>
                    <p className="text-xs text-gray-500">
                        {editData
                            ? 'Update lead information'
                            : 'Add new lead information and track potential opportunities'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {/* Lead Information */}
                <SectionHeader icon={Building2} title="Lead Information" />

                <Input
                    label="Company Name"
                    required
                    icon={Building2}
                    {...register('companyName', { required: 'Company name is required' })}
                    error={errors.companyName?.message}
                    placeholder="ABC Traders"
                />

                <Input
                    label="Contact Person"
                    icon={User}
                    {...register('contactPerson')}
                    placeholder="Rajesh Kumar"
                />

                <Input
                    label="Mobile Number"
                    required
                    icon={Phone}
                    {...register('mobile', { required: 'Mobile number is required' })}
                    error={errors.mobile?.message}
                    placeholder="+91 9876543210"
                />

                <Input
                    label="WhatsApp Number"
                    icon={Smartphone}
                    {...register('whatsapp')}
                    placeholder="+91 9876543210"
                />

                <Input
                    label="Email"
                    icon={Mail}
                    {...register('email', {
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                    })}
                    error={errors.email?.message}
                    placeholder="rajesh@abctraders.com"
                />

                <Input
                    label="City"
                    icon={MapPin}
                    {...register('city')}
                    placeholder="Mumbai"
                />

                <Select
                    label="Lead Source"
                    icon={Globe}
                    {...register('source')}
                    options={sourceOptions}
                />

                {/* Business Information */}
                <SectionHeader icon={Store} title="Business Information" />

                <Select
                    label="Customer Type"
                    icon={Users}
                    {...register('customerType')}
                    options={customerTypeOptions}
                />

                <Input
                    label="Interested Product"
                    icon={Tag}
                    {...register('interestedProduct')}
                    placeholder="4 Suta Makhana"
                />

                <Input
                    label="Expected Quantity"
                    icon={Package}
                    {...register('expectedQuantity')}
                    placeholder="500 KG"
                />

                <Input
                    label="Expected Purchase Value"
                    icon={DollarSign}
                    {...register('expectedValue')}
                    placeholder="₹5,00,000"
                />

                <Input
                    label="Expected Order Date"
                    icon={Calendar}
                    {...register('expectedDate')}
                    type="date"
                />

                <Select
                    label="Required Grade"
                    icon={Star}
                    {...register('requiredGrade')}
                    options={gradeOptions}
                />

                <Select
                    label="Status"
                    icon={TrendingUp}
                    {...register('status')}
                    options={statusOptions}
                />

                <Input
                    label="Probability (%)"
                    icon={Percent}
                    {...register('probability', {
                        min: { value: 0, message: 'Minimum 0%' },
                        max: { value: 100, message: 'Maximum 100%' },
                    })}
                    type="number"
                    min="0"
                    max="100"
                    placeholder="75"
                    error={errors.probability?.message}
                />

                <Input
                    label="Expected Closing Date"
                    icon={CalendarDays}
                    {...register('closingDate')}
                    type="date"
                />

                <Input
                    label="Next Follow-up Date"
                    icon={Clock}
                    {...register('nextFollowup')}
                    type="date"
                />

                {/* Remarks - Full Width */}
                <div className="md:col-span-2 mt-2">
                    <label className="block text-xs font-medium text-gray-700 tracking-wide mb-1.5">
                        Remarks
                    </label>
                    <div className="relative flex items-center">
                        <div className="absolute left-0 inset-y-0 flex items-center">
                            <div className="flex items-center gap-2 pl-3">
                                <MessageSquare className="w-4 h-4 text-blue-500" strokeWidth={1.75} />
                                <div className="w-px h-6 bg-gray-300"></div>
                            </div>
                        </div>
                        <textarea
                            {...register('remarks')}
                            rows="3"
                            className="w-full pl-14 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none placeholder:text-gray-400"
                            placeholder="Any additional notes about this lead..."
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <Button variant="outline" onClick={onClose} type="button">
                    Cancel
                </Button>
                <Button type="submit" loading={isSubmitting}>
                    {editData ? 'Update Lead' : 'Create Lead'}
                </Button>
            </div>
        </form>
    );
}