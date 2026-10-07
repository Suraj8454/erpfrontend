
// import { useForm } from 'react-hook-form';
// import Button from '../common/Button';
// import Input from '../common/Input';
// import Select from '../common/Select';
// import { toast } from 'react-hot-toast';
// import {
//   Package,
//   Hash,
//   Tag,
//   FolderOpen,
//   Star,
//   Ruler,
//   Maximize2,
//   Palette,
//   Award,
//   DollarSign,
//   IndianRupee,
//   Percent,
//   CheckSquare,
//   Calendar,
//   ClipboardCheck,
//   Layers,
//   Box,
//   ShoppingBag,
//   Gauge,
//   Droplet,
//   Sparkles,
//   PackageCheck,
// } from 'lucide-react';

// const categoryOptions = [
//   { value: 'raw', label: 'Raw' },
//   { value: 'popped', label: 'Popped' },
//   { value: 'flavoured', label: 'Flavoured' },
//   { value: 'roasted', label: 'Roasted' },
//   { value: 'organic', label: 'Organic' },
// ];

// const sizeOptions = [
//   { value: 'small', label: 'Small' },
//   { value: 'medium', label: 'Medium' },
//   { value: 'large', label: 'Large' },
//   { value: 'extra-large', label: 'Extra Large' },
// ];

// const qualityOptions = [
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

// export default function ProductForm({ onClose, editData }) {
//   const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm({
//     defaultValues: {
//       batchRequired: false,
//       expiryRequired: false,
//       qcRequired: false,
//       ...editData,
//     },
//   });

//   const onSubmit = async (data) => {
//     try {
//       console.log('Product data:', data);
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       toast.success(editData ? 'Product updated successfully!' : 'Product created successfully!');
//       onClose();
//     } catch (error) {
//       toast.error('Failed to save product');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       {/* Page Header */}
//       <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
//         <div className="p-2 bg-blue-50 rounded-lg">
//           <Package className="w-5 h-5 text-blue-500" />
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold text-gray-900">{editData ? 'Edit Product' : 'New Product'}</h2>
//           <p className="text-xs text-gray-500">Add product details and specifications</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//         {/* Basic Information */}
//         <SectionHeader icon={Package} title="Basic Information" />

//         <Input
//           label="Product Code"
//           required
//           icon={Hash}
//           {...register('productCode', { required: 'Product code is required' })}
//           error={errors.productCode?.message}
//           placeholder="MKH-001"
//         />

//         <Input
//           label="Product Name"
//           required
//           icon={Tag}
//           {...register('productName', { required: 'Product name is required' })}
//           error={errors.productName?.message}
//           placeholder="Makhana"
//         />

//         <Select
//           label="Category"
//           icon={FolderOpen}
//           {...register('category')}
//           options={categoryOptions}
//         />

//         <Input
//           label="Grade"
//           icon={Star}
//           {...register('grade')}
//           placeholder="4 Suta"
//         />

//         {/* Makhana Specifications */}
//         <SectionHeader icon={Layers} title="Makhana Specifications" />

//         <Input
//           label="Suta"
//           icon={Ruler}
//           {...register('suta')}
//           placeholder="4 Suta"
//         />

//         <Select
//           label="Size"
//           icon={Maximize2}
//           {...register('size')}
//           options={sizeOptions}
//         />

//         <Input
//           label="Colour"
//           icon={Palette}
//           {...register('colour')}
//           placeholder="White / Golden"
//         />

//         <Select
//           label="Quality"
//           icon={Award}
//           {...register('quality')}
//           options={qualityOptions}
//         />

//         {/* Pricing */}
//         <SectionHeader icon={DollarSign} title="Pricing" />

//         <Input
//           label="Purchase Rate (₹/KG)"
//           icon={IndianRupee}
//           {...register('purchaseRate')}
//           type="number"
//           placeholder="600"
//         />

//         <Input
//           label="Sales Rate (₹/KG)"
//           icon={DollarSign}
//           {...register('salesRate')}
//           type="number"
//           placeholder="750"
//         />

//         <Input
//           label="GST (%)"
//           icon={Percent}
//           {...register('gst')}
//           type="number"
//           placeholder="5"
//         />

//         {/* Settings */}
//         <SectionHeader icon={CheckSquare} title="Settings" />

//         <div className="md:col-span-2">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
//             <label className="flex items-center gap-3 cursor-pointer group">
//               <input
//                 type="checkbox"
//                 {...register('batchRequired')}
//                 className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
//               />
//               <div className="flex items-center gap-2">
//                 <PackageCheck className="w-4 h-4 text-gray-500 group-hover:text-blue-500 transition-colors" />
//                 <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">Batch Required</span>
//               </div>
//             </label>
            
//             <label className="flex items-center gap-3 cursor-pointer group">
//               <input
//                 type="checkbox"
//                 {...register('expiryRequired')}
//                 className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
//               />
//               <div className="flex items-center gap-2">
//                 <Calendar className="w-4 h-4 text-gray-500 group-hover:text-blue-500 transition-colors" />
//                 <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">Expiry Required</span>
//               </div>
//             </label>
            
//             <label className="flex items-center gap-3 cursor-pointer group">
//               <input
//                 type="checkbox"
//                 {...register('qcRequired')}
//                 className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
//               />
//               <div className="flex items-center gap-2">
//                 <ClipboardCheck className="w-4 h-4 text-gray-500 group-hover:text-blue-500 transition-colors" />
//                 <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">QC Required</span>
//               </div>
//             </label>
//           </div>
//         </div>

//         {/* Remarks */}
//         <SectionHeader icon={Box} title="Remarks" />

//         <div className="md:col-span-2">
//           <div className="relative">
//             <Box className="absolute left-3 top-3 w-4 h-4 text-blue-500" strokeWidth={1.75} />
//             <textarea
//               {...register('remarks')}
//               rows="2"
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none placeholder:text-gray-400"
//               placeholder="Any additional notes about this product..."
//             />
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
//         <Button variant="outline" onClick={onClose} type="button">
//           Cancel
//         </Button>
//         <Button type="submit" loading={isSubmitting}>
//           {editData ? 'Update Product' : 'Save Product'}
//         </Button>
//       </div>
//     </form>
//   );
// }


import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import { productsAPI } from '../../services/api';
import { toast } from 'react-hot-toast';
import {
    Package, Hash, Tag, FolderOpen, Star, Ruler, Maximize2,
    Palette, Award, DollarSign, IndianRupee, Percent,
    CheckSquare, Calendar, ClipboardCheck, Layers, Box,
    PackageCheck,
} from 'lucide-react';

const categoryOptions = [
    { value: 'Raw', label: 'Raw' },
    { value: 'Popped', label: 'Popped' },
    { value: 'Flavoured', label: 'Flavoured' },
    { value: 'Roasted', label: 'Roasted' },
    { value: 'Organic', label: 'Organic' },
];

const sizeOptions = [
    { value: 'Small', label: 'Small' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Large', label: 'Large' },
    { value: 'Extra Large', label: 'Extra Large' },
];

const qualityOptions = [
    { value: 'Premium', label: 'Premium' },
    { value: 'Standard', label: 'Standard' },
    { value: 'Economy', label: 'Economy' },
    { value: 'Export Quality', label: 'Export Quality' },
];

const unitOptions = [
    { value: 'KG', label: 'KG' },
    { value: 'G', label: 'G' },
    { value: 'Ton', label: 'Ton' },
];

const SectionHeader = ({ icon: Icon, title }) => (
    <div className="md:col-span-2">
        <div className="flex items-center gap-3 pb-2 border-b border-blue-200">
            <Icon className="w-4 h-4 text-blue-500" strokeWidth={2} />
            <h3 className="text-sm font-semibold text-blue-600 tracking-wide">{title}</h3>
        </div>
    </div>
);

export default function ProductForm({ onClose, editData }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            code: editData?.code || '',
            name: editData?.name || '',
            category: editData?.category || 'Raw',
            grade: editData?.grade || '',
            size: editData?.size || 'Medium',
            quality: editData?.quality || 'Standard',
            suta: editData?.suta || '',
            colour: editData?.colour || '',
            unit: editData?.unit || 'KG',
            purchase_rate: editData?.purchase_rate || '',
            sales_rate: editData?.sales_rate || '',
            gst_rate: editData?.gst_rate || 5,
            reorder_level: editData?.reorder_level || '',
            batch_required: editData?.batch_required ?? true,
            expiry_required: editData?.expiry_required ?? false,
            qc_required: editData?.qc_required ?? true,
            description: editData?.description || '',
        },
    });

    const onSubmit = async (data) => {
        try {
            const payload = {
                code: data.code,
                name: data.name,
                category: data.category,
                grade: data.grade,
                size: data.size,
                quality: data.quality,
                suta: data.suta,
                colour: data.colour,
                unit: data.unit,
                purchase_rate: Number(data.purchase_rate) || 0,
                sales_rate: Number(data.sales_rate) || 0,
                gst_rate: Number(data.gst_rate) || 0,
                reorder_level: Number(data.reorder_level) || 0,
                batch_required: data.batch_required,
                expiry_required: data.expiry_required,
                qc_required: data.qc_required,
                description: data.description,
            };

            if (editData) {
                await productsAPI.update(editData.id, payload);
                toast.success('Product updated successfully!');
            } else {
                await productsAPI.create(payload);
                toast.success('Product created successfully!');
            }
            onClose();
        } catch (error) {
            console.error('Submit error:', error);
            toast.error(error.response?.data?.message || 'Failed to save product');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {/* Basic Information */}
                <SectionHeader icon={Package} title="Basic Information" />

                <Input
                    label="Product Code"
                    required
                    icon={Hash}
                    {...register('code', { required: 'Product code is required' })}
                    error={errors.code?.message}
                    placeholder="MKH-001"
                />

                <Input
                    label="Product Name"
                    required
                    icon={Tag}
                    {...register('name', { required: 'Product name is required' })}
                    error={errors.name?.message}
                    placeholder="Makhana"
                />

                <Select
                    label="Category"
                    icon={FolderOpen}
                    {...register('category')}
                    options={categoryOptions}
                />

                <Input
                    label="Grade"
                    icon={Star}
                    {...register('grade')}
                    placeholder="4 Suta"
                />

                {/* Specifications */}
                <SectionHeader icon={Layers} title="Makhana Specifications" />

                <Input
                    label="Suta"
                    icon={Ruler}
                    {...register('suta')}
                    placeholder="4 Suta"
                />

                <Select
                    label="Size"
                    icon={Maximize2}
                    {...register('size')}
                    options={sizeOptions}
                />

                <Input
                    label="Colour"
                    icon={Palette}
                    {...register('colour')}
                    placeholder="White / Golden"
                />

                <Select
                    label="Quality"
                    icon={Award}
                    {...register('quality')}
                    options={qualityOptions}
                />

                <Select
                    label="Unit"
                    icon={Package}
                    {...register('unit')}
                    options={unitOptions}
                />

                {/* Pricing */}
                <SectionHeader icon={DollarSign} title="Pricing" />

                <Input
                    label="Purchase Rate (₹)"
                    icon={IndianRupee}
                    {...register('purchase_rate')}
                    type="number"
                    placeholder="600"
                />

                <Input
                    label="Sales Rate (₹)"
                    icon={DollarSign}
                    {...register('sales_rate')}
                    type="number"
                    placeholder="750"
                />

                <Input
                    label="GST (%)"
                    icon={Percent}
                    {...register('gst_rate')}
                    type="number"
                    placeholder="5"
                />

                <Input
                    label="Reorder Level"
                    icon={Layers}
                    {...register('reorder_level')}
                    type="number"
                    placeholder="100"
                />

                {/* Settings */}
                <SectionHeader icon={CheckSquare} title="Settings" />

                <div className="md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                {...register('batch_required')}
                                className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span className="text-sm text-gray-700">Batch Required</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                {...register('expiry_required')}
                                className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span className="text-sm text-gray-700">Expiry Required</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                {...register('qc_required')}
                                className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span className="text-sm text-gray-700">QC Required</span>
                        </label>
                    </div>
                </div>

                {/* Remarks */}
                <SectionHeader icon={Box} title="Remarks" />

                <div className="md:col-span-2">
                    <textarea
                        {...register('description')}
                        rows="2"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                        placeholder="Any additional notes about this product..."
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={onClose} type="button">
                    Cancel
                </Button>
                <Button type="submit" loading={isSubmitting}>
                    {editData ? 'Update Product' : 'Create Product'}
                </Button>
            </div>
        </form>
    );
}