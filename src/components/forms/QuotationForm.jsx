
// import { useForm, useFieldArray } from 'react-hook-form';
// import { Plus, Trash2, FileText, Calendar, Users, Hash, UserCheck, Clock, Truck, DollarSign, Package, Ruler, Box, Receipt, Percent, IndianRupee, Send, Save, FileCheck, ShoppingCart, Building2, CreditCard, Ship, ClipboardList, BadgeCheck, FileSignature } from 'lucide-react';
// import Button from '../common/Button';
// import Input from '../common/Input';
// import Select from '../common/Select';
// import { toast } from 'react-hot-toast';

// const paymentTermsOptions = [
//   { value: 'advance', label: 'Advance' },
//   { value: '15-days', label: '15 Days' },
//   { value: '30-days', label: '30 Days' },
//   { value: '45-days', label: '45 Days' },
//   { value: '60-days', label: '60 Days' },
//   { value: '90-days', label: '90 Days' },
// ];

// const deliveryTermsOptions = [
//   { value: 'ex-works', label: 'Ex Works' },
//   { value: 'fob', label: 'FOB' },
//   { value: 'cif', label: 'CIF' },
//   { value: 'dap', label: 'DAP' },
//   { value: 'ddp', label: 'DDP' },
// ];

// const freightTermsOptions = [
//   { value: 'prepaid', label: 'Prepaid' },
//   { value: 'collect', label: 'Collect' },
//   { value: 'third-party', label: 'Third Party' },
// ];

// const mockProducts = [
//   { id: 1, name: '4 Suta Makhana', grade: '4 Suta', price: 750, unit: 'KG' },
//   { id: 2, name: '5 Suta Makhana', grade: '5 Suta', price: 700, unit: 'KG' },
//   { id: 3, name: 'Premium Makhana', grade: 'Premium', price: 850, unit: 'KG' },
// ];

// const unitOptions = [
//   { value: 'KG', label: 'KG' },
//   { value: 'G', label: 'G' },
//   { value: 'Ton', label: 'Ton' },
//   { value: 'Pieces', label: 'Pieces' },
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

// export default function QuotationForm({ onClose, quotationData = null }) {
//   const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
//     defaultValues: {
//       items: [{ product: '', grade: '', quantity: '', unit: 'KG', rate: '', discount: 0 }]
//     }
//   });
  
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'items'
//   });

//   const onSubmit = async (data) => {
//     try {
//       console.log('Quotation data:', data);
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       toast.success(quotationData ? 'Quotation updated successfully!' : 'Quotation created successfully!');
//       onClose();
//     } catch (error) {
//       toast.error('Failed to save quotation');
//     }
//   };

//   const addItem = () => {
//     append({ product: '', grade: '', quantity: '', unit: 'KG', rate: '', discount: 0 });
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       {/* Page Header */}
//       <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
//         <div className="p-2 bg-blue-50 rounded-lg">
//           <FileText className="w-5 h-5 text-blue-500" />
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold text-gray-900">{quotationData ? 'Edit Quotation' : 'New Quotation'}</h2>
//           <p className="text-xs text-gray-500">Create quotation for customers</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//         {/* Quotation Information */}
//         <SectionHeader icon={FileText} title="Quotation Information" />

//         <Input
//           label="Quotation No"
//           icon={Hash}
//           {...register('quotationNo')}
//           defaultValue="Q-004"
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
//           label="Customer"
//           required
//           icon={Users}
//           {...register('customer', { required: 'Customer is required' })}
//           error={errors.customer?.message}
//           options={[
//             { value: 'ABC Traders', label: 'ABC Traders' },
//             { value: 'XYZ Enterprises', label: 'XYZ Enterprises' },
//             { value: 'Makhana House', label: 'Makhana House' },
//           ]}
//         />

//         <Input
//           label="Enquiry No"
//           icon={FileCheck}
//           {...register('enquiryNo')}
//           placeholder="ENQ-001"
//         />

//         <Select
//           label="Salesperson"
//           icon={UserCheck}
//           {...register('salesperson')}
//           options={[
//             { value: 'Anita Sharma', label: 'Anita Sharma' },
//             { value: 'Rahul Verma', label: 'Rahul Verma' },
//           ]}
//         />

//         <Input
//           label="Valid Until"
//           required
//           icon={Clock}
//           type="date"
//           {...register('validUntil', { required: 'Valid until date is required' })}
//           error={errors.validUntil?.message}
//         />

//         {/* Terms */}
//         <SectionHeader icon={CreditCard} title="Terms" />

//         <Select
//           label="Payment Terms"
//           icon={Clock}
//           {...register('paymentTerms')}
//           options={paymentTermsOptions}
//         />

//         <Select
//           label="Delivery Terms"
//           icon={Truck}
//           {...register('deliveryTerms')}
//           options={deliveryTermsOptions}
//         />

//         <Select
//           label="Freight Terms"
//           icon={Ship}
//           {...register('freightTerms')}
//           options={freightTermsOptions}
//         />

//         {/* Items */}
//         <div className="md:col-span-2 mt-2">
//           <div className="flex items-center justify-between pb-2 border-b border-blue-200">
//             <div className="flex items-center gap-3">
//               <Package className="w-4 h-4 text-blue-500" strokeWidth={2} />
//               <h3 className="text-sm font-semibold text-blue-600 tracking-wide">Items</h3>
//             </div>
//             <Button type="button" variant="outline" size="sm" onClick={addItem} className="flex items-center gap-1">
//               <Plus className="w-4 h-4" />
//               Add Item
//             </Button>
//           </div>
//         </div>

//         <div className="md:col-span-2">
//           <div className="border border-gray-200 rounded-lg overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[1000px]">
//                 <thead className="bg-gray-50 border-b border-gray-200">
//                   <tr>
//                     <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Product</th>
//                     <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Grade</th>
//                     <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Quantity</th>
//                     <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Unit</th>
//                     <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Rate (₹)</th>
//                     <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Disc (%)</th>
//                     <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
//                     <th className="px-3 py-2.5 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200 bg-white">
//                   {fields.map((field, index) => (
//                     <tr key={field.id}>
//                       <td className="px-3 py-2">
//                         <select
//                           {...register(`items.${index}.product`)}
//                           className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
//                         >
//                           <option value="">Select Product</option>
//                           {mockProducts.map(p => (
//                             <option key={p.id} value={p.name}>{p.name}</option>
//                           ))}
//                         </select>
//                       </td>
//                       <td className="px-3 py-2">
//                         <input
//                           {...register(`items.${index}.grade`)}
//                           className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
//                           placeholder="4 Suta"
//                         />
//                       </td>
//                       <td className="px-3 py-2">
//                         <input
//                           {...register(`items.${index}.quantity`)}
//                           type="number"
//                           className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
//                           placeholder="100"
//                         />
//                       </td>
//                       <td className="px-3 py-2">
//                         <select
//                           {...register(`items.${index}.unit`)}
//                           className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
//                         >
//                           {unitOptions.map(unit => (
//                             <option key={unit.value} value={unit.value}>{unit.label}</option>
//                           ))}
//                         </select>
//                       </td>
//                       <td className="px-3 py-2">
//                         <input
//                           {...register(`items.${index}.rate`)}
//                           type="number"
//                           className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
//                           placeholder="750"
//                         />
//                       </td>
//                       <td className="px-3 py-2">
//                         <input
//                           {...register(`items.${index}.discount`)}
//                           type="number"
//                           className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
//                           placeholder="0"
//                         />
//                       </td>
//                       <td className="px-3 py-2">
//                         <span className="text-sm font-medium text-gray-700">₹0</span>
//                       </td>
//                       <td className="px-3 py-2 text-center">
//                         <button
//                           type="button"
//                           onClick={() => remove(index)}
//                           className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-400 hover:text-red-600"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                   {fields.length === 0 && (
//                     <tr>
//                       <td colSpan="8" className="px-4 py-8 text-center text-gray-400 text-sm">
//                         No items added. Click "Add Item" to add products.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Totals */}
//         <div className="md:col-span-2">
//           <div className="flex justify-end">
//             <div className="w-72 space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">Subtotal</span>
//                 <span className="font-medium text-gray-700">₹0</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">Discount</span>
//                 <span className="font-medium text-gray-700">₹0</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">Tax (GST)</span>
//                 <span className="font-medium text-gray-700">₹0</span>
//               </div>
//               <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-300">
//                 <span className="text-gray-900">Total</span>
//                 <span className="text-blue-600">₹0</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Commercial Conditions */}
//         <SectionHeader icon={FileSignature} title="Commercial Conditions" />

//         <div className="md:col-span-2">
//           <label className="block text-xs font-medium text-gray-700 tracking-wide mb-1.5">
//             Quality Specification
//           </label>
//           <div className="relative">
//             <BadgeCheck className="absolute left-3 top-3 w-4 h-4 text-blue-500" strokeWidth={1.75} />
//             <textarea
//               {...register('qualitySpec')}
//               rows="2"
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none placeholder:text-gray-400"
//               placeholder="Premium quality, 4 Suta, moisture below 10%"
//             />
//           </div>
//         </div>

//         <div className="md:col-span-2">
//           <label className="block text-xs font-medium text-gray-700 tracking-wide mb-1.5">
//             Remarks
//           </label>
//           <div className="relative">
//             <Receipt className="absolute left-3 top-3 w-4 h-4 text-blue-500" strokeWidth={1.75} />
//             <textarea
//               {...register('remarks')}
//               rows="2"
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none placeholder:text-gray-400"
//               placeholder="Any additional notes..."
//             />
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
//         <Button variant="outline" onClick={onClose} type="button">
//           Cancel
//         </Button>
//         <Button variant="outline" type="submit" loading={isSubmitting} className="flex items-center gap-2">
//           <Save className="w-4 h-4" />
//           Save as Draft
//         </Button>
//         <Button type="submit" loading={isSubmitting} className="flex items-center gap-2">
//           <Send className="w-4 h-4" />
//           Create Quotation
//         </Button>
//       </div>
//     </form>
//   );
// }

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {
    Plus, Trash2, FileText, Calendar, Users, Hash, UserCheck,
    Clock, Truck, Package, Percent, Send, Save, FileCheck,
    Building2, CreditCard, Ship, Receipt, BadgeCheck, FileSignature,
} from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import { quotationsAPI, customersAPI, productsAPI } from '../../services/api';
import { toast } from 'react-hot-toast';

const paymentTermsOptions = [
    { value: 'advance', label: 'Advance' },
    { value: '15-days', label: '15 Days' },
    { value: '30-days', label: '30 Days' },
    { value: '45-days', label: '45 Days' },
    { value: '60-days', label: '60 Days' },
    { value: '90-days', label: '90 Days' },
];

const deliveryTermsOptions = [
    { value: 'ex-works', label: 'Ex Works' },
    { value: 'fob', label: 'FOB' },
    { value: 'cif', label: 'CIF' },
    { value: 'dap', label: 'DAP' },
    { value: 'ddp', label: 'DDP' },
];

const freightTermsOptions = [
    { value: 'prepaid', label: 'Prepaid' },
    { value: 'collect', label: 'Collect' },
    { value: 'third-party', label: 'Third Party' },
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

export default function QuotationForm({ onClose, quotationData = null }) {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
        setValue,  // ✅ ADD setValue
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            date: new Date().toISOString().split('T')[0],
            valid_until: '',
            payment_terms: '30-days',
            delivery_terms: 'ex-works',
            freight_terms: 'prepaid',
            items: [
                {
                    product_id: '',
                    product_name: '',
                    grade: '',
                    quantity: '',
                    unit: 'KG',
                    rate: '',
                    discount_percent: 0,
                    gst_rate: 5,
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    });

    // Load customers + products
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoadingData(true);
                const [customersRes, productsRes] = await Promise.all([
                    customersAPI.getAll(),
                    productsAPI.getAll(),
                ]);
                console.log('📦 Customers:', customersRes.data.data);
                console.log('📦 Products:', productsRes.data.data);
                setCustomers(customersRes.data.data || []);
                setProducts(productsRes.data.data || []);
            } catch (error) {
                console.error('Load data error:', error);
                toast.error('Failed to load customers/products');
            } finally {
                setIsLoadingData(false);
            }
        };
        loadData();
    }, []);

    // Prefill if editing
    useEffect(() => {
        if (quotationData) {
            const loadFull = async () => {
                try {
                    const res = await quotationsAPI.getById(quotationData.id);
                    const q = res.data.data;

                    reset({
                        customer_id: q.customer_id,
                        date: q.date?.split('T')[0],
                        valid_until: q.valid_until?.split('T')[0],
                        payment_terms: q.payment_terms,
                        delivery_terms: q.delivery_terms,
                        freight_terms: q.freight_terms,
                        quality_spec: q.quality_spec,
                        remarks: q.remarks,
                        items: q.items?.map((it) => ({
                            product_id: it.product_id,
                            product_name: it.product_name,
                            grade: it.grade,
                            quantity: it.quantity,
                            unit: it.unit,
                            rate: it.rate,
                            discount_percent: it.discount_percent,
                            gst_rate: it.gst_rate,
                        })) || [],
                    });
                } catch (err) {
                    toast.error('Failed to load quotation details');
                }
            };
            loadFull();
        }
    }, [quotationData, reset]);

    const watchedItems = watch('items') || [];

    // Calculate totals
    const calculateTotals = () => {
        let subtotal = 0;
        let totalDiscount = 0;
        let totalTax = 0;

        watchedItems.forEach((item) => {
            const qty = parseFloat(item.quantity) || 0;
            const rate = parseFloat(item.rate) || 0;
            const disc = parseFloat(item.discount_percent) || 0;
            const gst = parseFloat(item.gst_rate) || 0;

            const lineTotal = qty * rate;
            const lineDisc = lineTotal * (disc / 100);
            const taxable = lineTotal - lineDisc;
            const lineTax = taxable * (gst / 100);

            subtotal += lineTotal;
            totalDiscount += lineDisc;
            totalTax += lineTax;
        });

        const total = subtotal - totalDiscount + totalTax;
        return { subtotal, totalDiscount, totalTax, total };
    };

    const totals = calculateTotals();

    const addItem = () => {
        append({
            product_id: '',
            product_name: '',
            grade: '',
            quantity: '',
            unit: 'KG',
            rate: '',
            discount_percent: 0,
            gst_rate: 5,
        });
    };

    // ✅ Handle product selection with setValue
    const handleProductChange = (index, productId) => {
        const prod = products.find((p) => p.id === productId);

        if (prod) {
            setValue(`items.${index}.product_name`, prod.name, { shouldValidate: true });
            setValue(`items.${index}.grade`, prod.grade || '', { shouldValidate: true });
            setValue(`items.${index}.rate`, prod.sales_rate || '', { shouldValidate: true });
            setValue(`items.${index}.gst_rate`, prod.gst_rate || 5, { shouldValidate: true });
            setValue(`items.${index}.unit`, prod.unit || 'KG', { shouldValidate: true });
        } else {
            setValue(`items.${index}.product_name`, '');
            setValue(`items.${index}.grade`, '');
            setValue(`items.${index}.rate`, '');
        }
    };

    const onSubmit = async (data) => {
        try {
            console.log('📝 Form data:', data);

            // ✅ Flexible filtering: include if has product_name OR (product_id + qty + rate)
            const cleanedItems = data.items
                .filter((it) => {
                    const hasProduct = it.product_id || it.product_name;
                    const hasQty = Number(it.quantity) > 0;
                    const hasRate = Number(it.rate) > 0;
                    return hasProduct && hasQty && hasRate;
                })
                .map((it) => ({
                    product_id: it.product_id || null,
                    product_name: it.product_name || 'Custom Product',
                    grade: it.grade || '',
                    quantity: Number(it.quantity),
                    unit: it.unit || 'KG',
                    rate: Number(it.rate),
                    discount_percent: Number(it.discount_percent) || 0,
                    gst_rate: Number(it.gst_rate) || 0,
                }));

            console.log('✅ Cleaned items:', cleanedItems);

            if (cleanedItems.length === 0) {
                toast.error('Please select a product and enter quantity + rate');
                return;
            }

            const payload = {
                customer_id: data.customer_id,
                date: data.date,
                valid_until: data.valid_until,
                payment_terms: data.payment_terms,
                delivery_terms: data.delivery_terms,
                freight_terms: data.freight_terms,
                quality_spec: data.quality_spec,
                remarks: data.remarks,
                items: cleanedItems,
            };

            console.log('🚀 Sending:', payload);

            if (quotationData) {
                await quotationsAPI.update(quotationData.id, payload);
                toast.success('Quotation updated successfully!');
            } else {
                await quotationsAPI.create(payload);
                toast.success('Quotation created successfully!');
            }

            onClose();
        } catch (error) {
            console.error('❌ Submit error:', error);
            toast.error(error.response?.data?.message || 'Failed to save quotation');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <SectionHeader icon={FileText} title="Quotation Information" />

                <Input
                    label="Quotation No"
                    icon={Hash}
                    value={quotationData ? quotationData.quotation_number : 'Auto-generated'}
                    disabled
                    className="bg-gray-50"
                />

                <Input
                    label="Date"
                    required
                    icon={Calendar}
                    type="date"
                    {...register('date', { required: 'Date is required' })}
                    error={errors.date?.message}
                />

                <div>
                    <label className="block text-xs font-medium text-gray-700 tracking-wide mb-1.5">
                        Customer <span className="text-red-500">*</span>
                    </label>
                    <select
                        {...register('customer_id', { required: 'Customer is required' })}
                        disabled={isLoadingData}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                    >
                        <option value="">
                            {isLoadingData ? 'Loading...' : 'Select Customer'}
                        </option>
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
                    label="Valid Until"
                    required
                    icon={Clock}
                    type="date"
                    {...register('valid_until', { required: 'Valid until date is required' })}
                    error={errors.valid_until?.message}
                />

                <SectionHeader icon={CreditCard} title="Terms" />

                <Select
                    label="Payment Terms"
                    icon={Clock}
                    {...register('payment_terms')}
                    options={paymentTermsOptions}
                />

                <Select
                    label="Delivery Terms"
                    icon={Truck}
                    {...register('delivery_terms')}
                    options={deliveryTermsOptions}
                />

                <Select
                    label="Freight Terms"
                    icon={Ship}
                    {...register('freight_terms')}
                    options={freightTermsOptions}
                />

                <div className="md:col-span-2 mt-2">
                    <div className="flex items-center justify-between pb-2 border-b border-blue-200">
                        <div className="flex items-center gap-3">
                            <Package className="w-4 h-4 text-blue-500" strokeWidth={2} />
                            <h3 className="text-sm font-semibold text-blue-600 tracking-wide">
                                Items
                            </h3>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addItem}
                            className="flex items-center gap-1"
                        >
                            <Plus className="w-4 h-4" />
                            Add Item
                        </Button>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1000px]">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase">Product</th>
                                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase">Grade</th>
                                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase">Qty</th>
                                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase">Unit</th>
                                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase">Rate</th>
                                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase">Disc %</th>
                                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase">GST %</th>
                                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase">Amount</th>
                                        <th className="px-3 py-2.5 text-center text-xs font-medium text-gray-600 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {fields.map((field, index) => {
                                        const item = watchedItems[index] || {};
                                        const qty = parseFloat(item.quantity) || 0;
                                        const rate = parseFloat(item.rate) || 0;
                                        const disc = parseFloat(item.discount_percent) || 0;
                                        const gst = parseFloat(item.gst_rate) || 0;
                                        const lineTotal = qty * rate;
                                        const lineDisc = lineTotal * (disc / 100);
                                        const taxable = lineTotal - lineDisc;
                                        const lineGst = taxable * (gst / 100);
                                        const lineAmount = taxable + lineGst;

                                        return (
                                            <tr key={field.id}>
                                                <td className="px-3 py-2">
                                                    <select
                                                        {...register(`items.${index}.product_id`)}
                                                        onChange={(e) => {
                                                            setValue(`items.${index}.product_id`, e.target.value);
                                                            handleProductChange(index, e.target.value);
                                                        }}
                                                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                                    >
                                                        <option value="">
                                                            {products.length === 0
                                                                ? 'No products'
                                                                : 'Select Product'}
                                                        </option>
                                                        {products.map((p) => (
                                                            <option key={p.id} value={p.id}>
                                                                {p.name} - ₹{p.sales_rate}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {/* Hidden inputs to store product_name */}
                                                    <input type="hidden" {...register(`items.${index}.product_name`)} />
                                                </td>
                                                <td className="px-3 py-2">
                                                    <input
                                                        {...register(`items.${index}.grade`)}
                                                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                                        placeholder="Grade"
                                                    />
                                                </td>
                                                <td className="px-3 py-2">
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        {...register(`items.${index}.quantity`)}
                                                        className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                                        placeholder="0"
                                                    />
                                                </td>
                                                <td className="px-3 py-2">
                                                    <select
                                                        {...register(`items.${index}.unit`)}
                                                        className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                                    >
                                                        {unitOptions.map((u) => (
                                                            <option key={u.value} value={u.value}>
                                                                {u.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        {...register(`items.${index}.rate`)}
                                                        className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                                        placeholder="0"
                                                    />
                                                </td>
                                                <td className="px-3 py-2">
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        {...register(`items.${index}.discount_percent`)}
                                                        className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                                        placeholder="0"
                                                    />
                                                </td>
                                                <td className="px-3 py-2">
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        {...register(`items.${index}.gst_rate`)}
                                                        className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                                        placeholder="5"
                                                    />
                                                </td>
                                                <td className="px-3 py-2">
                                                    <span className="text-sm font-medium text-gray-700">
                                                        ₹{lineAmount.toFixed(2)}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        className="p-1.5 hover:bg-red-50 rounded-lg text-red-400 hover:text-red-600"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Totals */}
                <div className="md:col-span-2">
                    <div className="flex justify-end">
                        <div className="w-72 space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-medium text-gray-700">
                                    ₹{totals.subtotal.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Discount</span>
                                <span className="font-medium text-gray-700">
                                    -₹{totals.totalDiscount.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Tax (GST)</span>
                                <span className="font-medium text-gray-700">
                                    ₹{totals.totalTax.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-300">
                                <span className="text-gray-900">Total</span>
                                <span className="text-blue-600">
                                    ₹{totals.total.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <SectionHeader icon={FileSignature} title="Commercial Conditions" />

                <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 tracking-wide mb-1.5">
                        Quality Specification
                    </label>
                    <div className="relative">
                        <BadgeCheck className="absolute left-3 top-3 w-4 h-4 text-blue-500" />
                        <textarea
                            {...register('quality_spec')}
                            rows="2"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm"
                            placeholder="Premium quality, 4 Suta, moisture below 10%"
                        />
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 tracking-wide mb-1.5">
                        Remarks
                    </label>
                    <div className="relative">
                        <Receipt className="absolute left-3 top-3 w-4 h-4 text-blue-500" />
                        <textarea
                            {...register('remarks')}
                            rows="2"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm"
                            placeholder="Any additional notes..."
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <Button variant="outline" onClick={onClose} type="button">
                    Cancel
                </Button>
                <Button type="submit" loading={isSubmitting} className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    {quotationData ? 'Update Quotation' : 'Create Quotation'}
                </Button>
            </div>
        </form>
    );
}