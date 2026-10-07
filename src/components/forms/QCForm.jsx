
// import { useForm } from 'react-hook-form';
// import Button from '../common/Button';
// import Input from '../common/Input';
// import Select from '../common/Select';
// import { toast } from 'react-hot-toast';
// import {
//   ClipboardCheck,
//   Calendar,
//   Building2,
//   FileText,
//   Package,
//   Box,
//   UserCheck,
//   Droplet,
//   Scissors,
//   AlertTriangle,
//   Palette,
//   Ruler,
//   Gauge,
//   // Seed - removed, using different icon
//   // Flower - removed, using different icon
//   Award,
//   FileUp,
//   CheckCircle,
//   XCircle,
//   Clock,
//   AlertCircle,
//   Microscope,
//   TestTube,
//   Beaker,
//   Thermometer,
//   Weight,
//   Maximize2,
//   Sparkles,
//   Hash,
//   Users,
//   User,
//   DollarSign,
//   CalendarDays,
//   ListChecks,
//   ShieldCheck,
//   FlaskConical,
//   CircleCheck,
//   CircleX,
//   Timer,
//   Info,
// } from 'lucide-react';

// const resultOptions = [
//   { value: 'accepted', label: 'Accepted' },
//   { value: 'partially-accepted', label: 'Partially Accepted' },
//   { value: 'rejected', label: 'Rejected' },
//   { value: 'hold', label: 'Hold' },
// ];

// const supplierOptions = [
//   { value: 'Makhana Suppliers Pvt Ltd', label: 'Makhana Suppliers Pvt Ltd' },
//   { value: 'Premium Makhana Exports', label: 'Premium Makhana Exports' },
//   { value: 'Green Valley Makhana', label: 'Green Valley Makhana' },
// ];

// const productOptions = [
//   { value: '4 Suta Makhana', label: '4 Suta Makhana' },
//   { value: '5 Suta Makhana', label: '5 Suta Makhana' },
//   { value: 'Premium Makhana', label: 'Premium Makhana' },
// ];

// const qualityOptions = [
//   { value: 'excellent', label: 'Excellent' },
//   { value: 'good', label: 'Good' },
//   { value: 'average', label: 'Average' },
//   { value: 'poor', label: 'Poor' },
// ];

// const inspectorOptions = [
//   { value: 'Anita Sharma', label: 'Anita Sharma' },
//   { value: 'Rahul Verma', label: 'Rahul Verma' },
//   { value: 'Priya Patel', label: 'Priya Patel' },
//   { value: 'Amit Kumar', label: 'Amit Kumar' },
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

// export default function QCForm({ onClose }) {
//   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       console.log('QC data:', data);
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       toast.success('QC inspection completed successfully!');
//       onClose();
//     } catch (error) {
//       toast.error('Failed to save QC results');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       {/* Page Header */}
//       <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
//         <div className="p-2 bg-blue-50 rounded-lg">
//           <ClipboardCheck className="w-5 h-5 text-blue-500" />
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold text-gray-900">New QC Inspection</h2>
//           <p className="text-xs text-gray-500">Perform quality control inspection for received goods</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//         {/* QC Information */}
//         <SectionHeader icon={ClipboardCheck} title="QC Information" />

//         <Input
//           label="QC No"
//           icon={Hash}
//           {...register('qcNo')}
//           defaultValue="QC-004"
//           disabled
//           className="bg-gray-50"
//         />

//         <Input
//           label="Date"
//           required
//           icon={Calendar}
//           type="date"
//           {...register('date', { required: 'Date is required' })}
//           error={errors.date?.message}
//           defaultValue={new Date().toISOString().split('T')[0]}
//         />

//         <Select
//           label="Supplier"
//           required
//           icon={Building2}
//           {...register('supplier', { required: 'Supplier is required' })}
//           error={errors.supplier?.message}
//           options={supplierOptions}
//         />

//         <Input
//           label="GRN No"
//           required
//           icon={FileText}
//           {...register('grnNo', { required: 'GRN number is required' })}
//           error={errors.grnNo?.message}
//           placeholder="GRN-001"
//         />

//         <Select
//           label="Product"
//           required
//           icon={Package}
//           {...register('product', { required: 'Product is required' })}
//           error={errors.product?.message}
//           options={productOptions}
//         />

//         <Input
//           label="Quantity"
//           required
//           icon={Weight}
//           {...register('quantity', { required: 'Quantity is required' })}
//           error={errors.quantity?.message}
//           placeholder="500 KG"
//         />

//         <Input
//           label="Batch No"
//           icon={Box}
//           {...register('batchNo')}
//           placeholder="MKH-260825-001"
//         />

//         <Select
//           label="Inspector"
//           icon={UserCheck}
//           {...register('inspector')}
//           options={inspectorOptions}
//         />

//         {/* QC Parameters */}
//         <SectionHeader icon={Microscope} title="QC Parameters" />

//         <Input
//           label="Moisture %"
//           icon={Droplet}
//           {...register('moisture')}
//           placeholder="8.5"
//           step="0.1"
//           type="number"
//         />

//         <Input
//           label="Broken %"
//           icon={Scissors}
//           {...register('broken')}
//           placeholder="2.5"
//           step="0.1"
//           type="number"
//         />

//         <Input
//           label="Foreign Material %"
//           icon={AlertTriangle}
//           {...register('foreignMaterial')}
//           placeholder="0.2"
//           step="0.1"
//           type="number"
//         />

//         <Input
//           label="Colour"
//           icon={Palette}
//           {...register('colour')}
//           placeholder="White / Golden"
//         />

//         <Input
//           label="Size"
//           icon={Maximize2}
//           {...register('size')}
//           placeholder="Medium"
//         />

//         <Input
//           label="Suta"
//           icon={Ruler}
//           {...register('suta')}
//           placeholder="4 Suta"
//         />

//         <Input
//           label="Black Seeds %"
//           icon={CircleX}
//           {...register('blackSeeds')}
//           placeholder="0.5"
//           step="0.1"
//           type="number"
//         />

//         <Input
//           label="Yellow Seeds %"
//           icon={CircleCheck}
//           {...register('yellowSeeds')}
//           placeholder="1.0"
//           step="0.1"
//           type="number"
//         />

//         <Select
//           label="Overall Quality"
//           icon={Award}
//           {...register('overallQuality')}
//           options={qualityOptions}
//         />

//         {/* Remarks & Results */}
//         <SectionHeader icon={FileText} title="Remarks & Results" />

//         <div className="md:col-span-2">
//           <div className="relative">
//             <FileText className="absolute left-3 top-3 w-4 h-4 text-blue-500" strokeWidth={1.75} />
//             <textarea
//               {...register('remarks')}
//               rows="2"
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none placeholder:text-gray-400"
//               placeholder="Any observations or notes..."
//             />
//           </div>
//         </div>

//         <Select
//           label="QC Result"
//           required
//           icon={CheckCircle}
//           {...register('result', { required: 'QC result is required' })}
//           error={errors.result?.message}
//           options={resultOptions}
//         />

//         {/* Attachments */}
//         <div className="md:col-span-2">
//           <label className="block text-xs font-medium text-gray-700 tracking-wide mb-1.5">
//             Attachments
//           </label>
//           <div className="relative">
//             <FileUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" strokeWidth={1.75} />
//             <input
//               type="file"
//               {...register('attachments')}
//               multiple
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer"
//             />
//           </div>
//           <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
//             <span className="inline-block w-1 h-1 rounded-full bg-gray-300"></span>
//             Upload lab reports, photos, or supplier documents
//           </p>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
//         <Button variant="outline" onClick={onClose} type="button">
//           Cancel
//         </Button>
//         <Button type="submit" loading={isSubmitting}>
//           Submit QC Results
//         </Button>
//       </div>
//     </form>
//   );
// }

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import { qcAPI } from '../../services/api';
import { toast } from 'react-hot-toast';
import {
    ClipboardCheck, Calendar, Building2, FileText, Package,
    Box, UserCheck, Droplet, Scissors, AlertTriangle, Palette,
    Ruler, Award, CheckCircle, Hash, Weight, Maximize2,
    CircleCheck, CircleX,
} from 'lucide-react';

const resultOptions = [
    { value: 'Accepted', label: 'Accepted' },
    { value: 'Partially Accepted', label: 'Partially Accepted' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Hold', label: 'Hold' },
];

const qualityOptions = [
    { value: 'Excellent', label: 'Excellent' },
    { value: 'Good', label: 'Good' },
    { value: 'Average', label: 'Average' },
    { value: 'Poor', label: 'Poor' },
];

const SectionHeader = ({ icon: Icon, title }) => (
    <div className="md:col-span-2">
        <div className="flex items-center gap-3 pb-2 border-b border-blue-200">
            <Icon className="w-4 h-4 text-blue-500" strokeWidth={2} />
            <h3 className="text-sm font-semibold text-blue-600 tracking-wide">{title}</h3>
        </div>
    </div>
);

export default function QCForm({ onClose, grnData }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            inspection_date: new Date().toISOString().split('T')[0],
            result: 'Accepted',
            overall_quality: 'Good',
        },
    });

    const onSubmit = async (data) => {
        try {
            const payload = {
                grn_id: grnData?.id || null,
                supplier_id: grnData?.supplier_id || null,
                product_id: grnData?.product_id || null,
                inspection_date: data.inspection_date,
                quantity: Number(data.quantity) || Number(grnData?.total_quantity) || 0,
                batch_number: data.batch_number || null,
                result: data.result,
                overall_quality: data.overall_quality,
                remarks: data.remarks || '',
            };

            console.log('🚀 Submitting QC:', payload);

            await qcAPI.create(payload);
            toast.success('QC inspection created successfully!');
            onClose();
        } catch (error) {
            console.error('QC submit error:', error);
            toast.error(error.response?.data?.message || 'Failed to create QC');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <SectionHeader icon={ClipboardCheck} title="QC Information" />

                <Input
                    label="QC No"
                    icon={Hash}
                    value="Auto-generated"
                    disabled
                    className="bg-gray-50"
                />

                <Input
                    label="Inspection Date"
                    required
                    icon={Calendar}
                    type="date"
                    {...register('inspection_date', { required: 'Date is required' })}
                    error={errors.inspection_date?.message}
                />

                <Input
                    label="Supplier"
                    icon={Building2}
                    value={grnData?.supplier_name || ''}
                    disabled
                    className="bg-gray-50"
                />

                <Input
                    label="GRN No"
                    icon={FileText}
                    value={grnData?.grn_number || ''}
                    disabled
                    className="bg-gray-50"
                />

                <Input
                    label="Total Quantity (KG)"
                    icon={Weight}
                    value={grnData?.total_quantity || 0}
                    disabled
                    className="bg-gray-50"
                />

                <Input
                    label="Inspected Quantity"
                    required
                    icon={Weight}
                    type="number"
                    step="0.01"
                    {...register('quantity', { required: 'Quantity is required' })}
                    error={errors.quantity?.message}
                    placeholder="500"
                />

                <Input
                    label="Batch Number"
                    icon={Box}
                    {...register('batch_number')}
                    placeholder="MKH-260825-001"
                />

                <Select
                    label="Overall Quality"
                    icon={Award}
                    {...register('overall_quality')}
                    options={qualityOptions}
                />

                <SectionHeader icon={Droplet} title="QC Parameters" />

                <Input
                    label="Moisture %"
                    icon={Droplet}
                    {...register('moisture')}
                    placeholder="8.5"
                    step="0.1"
                    type="number"
                />

                <Input
                    label="Broken %"
                    icon={Scissors}
                    {...register('broken')}
                    placeholder="2.5"
                    step="0.1"
                    type="number"
                />

                <Input
                    label="Foreign Material %"
                    icon={AlertTriangle}
                    {...register('foreignMaterial')}
                    placeholder="0.2"
                    step="0.1"
                    type="number"
                />

                <Input
                    label="Colour"
                    icon={Palette}
                    {...register('colour')}
                    placeholder="White / Golden"
                />

                <Input
                    label="Size"
                    icon={Maximize2}
                    {...register('size')}
                    placeholder="Medium"
                />

                <Input
                    label="Suta"
                    icon={Ruler}
                    {...register('suta')}
                    placeholder="4 Suta"
                />

                <Input
                    label="Black Seeds %"
                    icon={CircleX}
                    {...register('blackSeeds')}
                    placeholder="0.5"
                    step="0.1"
                    type="number"
                />

                <Input
                    label="Yellow Seeds %"
                    icon={CircleCheck}
                    {...register('yellowSeeds')}
                    placeholder="1.0"
                    step="0.1"
                    type="number"
                />

                <SectionHeader icon={FileText} title="Remarks & Result" />

                <div className="md:col-span-2">
                    <textarea
                        {...register('remarks')}
                        rows="2"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                        placeholder="Any observations or notes..."
                    />
                </div>

                <Select
                    label="QC Result"
                    required
                    icon={CheckCircle}
                    {...register('result', { required: 'Result is required' })}
                    error={errors.result?.message}
                    options={resultOptions}
                />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={onClose} type="button">
                    Cancel
                </Button>
                <Button type="submit" loading={isSubmitting}>
                    Submit QC Results
                </Button>
            </div>
        </form>
    );
}