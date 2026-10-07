
// import { useForm, useFieldArray } from 'react-hook-form';
// import { Plus, Trash2, FileText, Calendar, Building2, Hash, CreditCard, Truck, Warehouse, DollarSign, Package, Ruler, Box, Receipt, ShoppingCart, Users, Clock, Percent, IndianRupee, Send, Save, FileCheck } from 'lucide-react';
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

// const mockSuppliers = [
//   { value: 'Makhana Suppliers Pvt Ltd', label: 'Makhana Suppliers Pvt Ltd' },
//   { value: 'Premium Makhana Exports', label: 'Premium Makhana Exports' },
//   { value: 'Green Valley Makhana', label: 'Green Valley Makhana' },
// ];

// const mockProducts = [
//   { id: 1, name: '4 Suta Makhana', grade: '4 Suta', price: 600, unit: 'KG' },
//   { id: 2, name: '5 Suta Makhana', grade: '5 Suta', price: 550, unit: 'KG' },
//   { id: 3, name: 'Premium Makhana', grade: 'Premium', price: 700, unit: 'KG' },
// ];

// const unitOptions = [
//   { value: 'KG', label: 'KG' },
//   { value: 'G', label: 'G' },
//   { value: 'Ton', label: 'Ton' },
//   { value: 'Pieces', label: 'Pieces' },
// ];

// const warehouseOptions = [
//   { value: 'Mumbai', label: 'Mumbai' },
//   { value: 'Delhi', label: 'Delhi' },
//   { value: 'Bangalore', label: 'Bangalore' },
//   { value: 'Chennai', label: 'Chennai' },
//   { value: 'Kolkata', label: 'Kolkata' },
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

// export default function PurchaseOrderForm({ onClose }) {
//   const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
//     defaultValues: {
//       items: [{ product: '', grade: '', quantity: '', unit: 'KG', rate: '' }]
//     }
//   });
  
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'items'
//   });

//   const onSubmit = async (data) => {
//     try {
//       console.log('Purchase Order data:', data);
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       toast.success('Purchase order created successfully!');
//       onClose();
//     } catch (error) {
//       toast.error('Failed to create purchase order');
//     }
//   };

//   const addItem = () => {
//     append({ product: '', grade: '', quantity: '', unit: 'KG', rate: '' });
//   };

//   // Calculate totals
//   const calculateTotal = (items) => {
//     return items.reduce((total, item) => {
//       const qty = parseFloat(item.quantity) || 0;
//       const rate = parseFloat(item.rate) || 0;
//       return total + (qty * rate);
//     }, 0);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       {/* Page Header */}
//       <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
//         <div className="p-2 bg-blue-50 rounded-lg">
//           <FileText className="w-5 h-5 text-blue-500" />
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold text-gray-900">New Purchase Order</h2>
//           <p className="text-xs text-gray-500">Create purchase order for suppliers</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//         {/* Order Information */}
//         <SectionHeader icon={FileText} title="Order Information" />

//         <Input
//           label="PO No"
//           icon={Hash}
//           {...register('poNo')}
//           defaultValue="PO-004"
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
//           options={mockSuppliers}
//         />

//         <Input
//           label="Quotation Reference"
//           icon={FileCheck}
//           {...register('quoteNo')}
//           placeholder="SQ-001"
//         />

//         {/* Terms & Delivery */}
//         <SectionHeader icon={CreditCard} title="Terms & Delivery" />

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

//         <Input
//           label="Expected Delivery"
//           required
//           icon={Calendar}
//           type="date"
//           {...register('deliveryDate', { required: 'Delivery date is required' })}
//           error={errors.deliveryDate?.message}
//         />

//         <Select
//           label="Warehouse"
//           icon={Warehouse}
//           {...register('warehouse')}
//           options={warehouseOptions}
//         />

//         <Input
//           label="Freight"
//           icon={DollarSign}
//           {...register('freight')}
//           type="number"
//           placeholder="0"
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
//               <table className="w-full min-w-[900px]">
//                 <thead className="bg-gray-50 border-b border-gray-200">
//                   <tr>
//                     <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Product</th>
//                     <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Grade</th>
//                     <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Quantity</th>
//                     <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Unit</th>
//                     <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Rate (₹)</th>
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
//                           placeholder="600"
//                         />
//                       </td>
//                       <td className="px-3 py-2">
//                         <span className="text-sm font-medium text-gray-700">
//                           ₹{(parseFloat(register(`items.${index}.quantity`).value) || 0) * (parseFloat(register(`items.${index}.rate`).value) || 0)}
//                         </span>
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
//                       <td colSpan="7" className="px-4 py-8 text-center text-gray-400 text-sm">
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
//                 <span className="text-gray-500">Freight</span>
//                 <span className="font-medium text-gray-700">₹0</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">Tax</span>
//                 <span className="font-medium text-gray-700">₹0</span>
//               </div>
//               <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-300">
//                 <span className="text-gray-900">Total</span>
//                 <span className="text-blue-600">₹0</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Remarks */}
//         <SectionHeader icon={Receipt} title="Remarks" />

//         <div className="md:col-span-2">
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
//           Create PO
//         </Button>
//       </div>
//     </form>
//   );
// }


import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {
    Plus, Trash2, FileText, Calendar, Building2, Hash, CreditCard,
    Truck, Warehouse, DollarSign, Package, Receipt, Clock, Save,
} from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import { purchaseOrdersAPI, suppliersAPI, productsAPI } from '../../services/api';
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

export default function PurchaseOrderForm({ onClose, editData }) {
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            po_date: new Date().toISOString().split('T')[0],
            payment_terms: '30-days',
            delivery_terms: 'ex-works',
            items: [
                {
                    product_id: '',
                    product_name: '',
                    grade: '',
                    quantity: '',
                    unit: 'KG',
                    rate: '',
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    });

    // Load suppliers + products
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const [suppliersRes, productsRes] = await Promise.all([
                    suppliersAPI.getAll(),
                    productsAPI.getAll(),
                ]);
                setSuppliers(suppliersRes.data.data || []);
                setProducts(productsRes.data.data || []);
            } catch (error) {
                toast.error('Failed to load data');
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    // Prefill if editing
    useEffect(() => {
        if (editData) {
            const loadFull = async () => {
                try {
                    const res = await purchaseOrdersAPI.getById(editData.id);
                    const po = res.data.data;

                    reset({
                        supplier_id: po.supplier_id,
                        po_date: po.po_date?.split('T')[0],
                        expected_delivery: po.expected_delivery?.split('T')[0],
                        payment_terms: po.payment_terms,
                        delivery_terms: po.delivery_terms,
                        quote_reference: po.quote_reference,
                        freight: po.freight,
                        remarks: po.remarks,
                        items: po.items?.map((it) => ({
                            product_id: it.product_id,
                            product_name: it.product_name,
                            grade: it.grade,
                            quantity: it.quantity,
                            unit: it.unit,
                            rate: it.rate,
                        })) || [],
                    });
                } catch (err) {
                    toast.error('Failed to load PO details');
                }
            };
            loadFull();
        }
    }, [editData, reset]);

    const watchedItems = watch('items') || [];

    // Handle product select
    const handleProductChange = (index, productId) => {
        const prod = products.find((p) => p.id === productId);
        if (prod) {
            setValue(`items.${index}.product_name`, prod.name);
            setValue(`items.${index}.grade`, prod.grade || '');
            setValue(`items.${index}.rate`, prod.purchase_rate || '');
            setValue(`items.${index}.unit`, prod.unit || 'KG');
        }
    };

    const addItem = () => {
        append({
            product_id: '',
            product_name: '',
            grade: '',
            quantity: '',
            unit: 'KG',
            rate: '',
        });
    };

    const onSubmit = async (data) => {
        try {
            const cleanedItems = data.items
                .filter((it) => it.product_name && it.quantity && it.rate)
                .map((it) => ({
                    product_id: it.product_id || null,
                    product_name: it.product_name,
                    grade: it.grade || '',
                    quantity: Number(it.quantity),
                    unit: it.unit || 'KG',
                    rate: Number(it.rate),
                }));

            if (cleanedItems.length === 0) {
                toast.error('Please add at least one valid item');
                return;
            }

            const payload = {
                supplier_id: data.supplier_id,
                quote_reference: data.quote_reference,
                po_date: data.po_date,
                expected_delivery: data.expected_delivery,
                payment_terms: data.payment_terms,
                delivery_terms: data.delivery_terms,
                freight: Number(data.freight) || 0,
                remarks: data.remarks,
                items: cleanedItems,
            };

            if (editData) {
                await purchaseOrdersAPI.update(editData.id, payload);
                toast.success('Purchase order updated!');
            } else {
                await purchaseOrdersAPI.create(payload);
                toast.success('Purchase order created!');
            }

            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save PO');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <SectionHeader icon={FileText} title="Order Information" />

                <Input
                    label="PO No"
                    icon={Hash}
                    value={editData ? editData.po_number : 'Auto-generated'}
                    disabled
                    className="bg-gray-50"
                />

                <Input
                    label="Date"
                    required
                    icon={Calendar}
                    type="date"
                    {...register('po_date', { required: 'Date is required' })}
                    error={errors.po_date?.message}
                />

                <div>
                    <label className="block text-xs font-medium text-gray-700 tracking-wide mb-1.5">
                        Supplier <span className="text-red-500">*</span>
                    </label>
                    <select
                        {...register('supplier_id', { required: 'Supplier is required' })}
                        disabled={isLoading}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                    >
                        <option value="">Select Supplier</option>
                        {suppliers.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.company_name}
                            </option>
                        ))}
                    </select>
                    {errors.supplier_id && (
                        <p className="text-red-500 text-xs mt-1">{errors.supplier_id.message}</p>
                    )}
                </div>

                <Input
                    label="Quotation Reference"
                    icon={FileText}
                    {...register('quote_reference')}
                    placeholder="SQ-001"
                />

                <SectionHeader icon={CreditCard} title="Terms & Delivery" />

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

                <Input
                    label="Expected Delivery"
                    required
                    icon={Calendar}
                    type="date"
                    {...register('expected_delivery', { required: 'Delivery date required' })}
                    error={errors.expected_delivery?.message}
                />

                <Input
                    label="Freight"
                    icon={DollarSign}
                    type="number"
                    {...register('freight')}
                    placeholder="0"
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
                            <table className="w-full min-w-[900px]">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase">Product</th>
                                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase">Grade</th>
                                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase">Qty</th>
                                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase">Unit</th>
                                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase">Rate</th>
                                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase">Amount</th>
                                        <th className="px-3 py-2.5 text-center text-xs font-medium text-gray-600 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {fields.map((field, index) => {
                                        const item = watchedItems[index] || {};
                                        const amount =
                                            (parseFloat(item.quantity) || 0) *
                                            (parseFloat(item.rate) || 0);

                                        return (
                                            <tr key={field.id}>
                                                <td className="px-3 py-2">
                                                    <select
                                                        {...register(`items.${index}.product_id`)}
                                                        onChange={(e) => {
                                                            setValue(
                                                                `items.${index}.product_id`,
                                                                e.target.value
                                                            );
                                                            handleProductChange(index, e.target.value);
                                                        }}
                                                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                                    >
                                                        <option value="">Select Product</option>
                                                        {products.map((p) => (
                                                            <option key={p.id} value={p.id}>
                                                                {p.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <input
                                                        type="hidden"
                                                        {...register(`items.${index}.product_name`)}
                                                    />
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
                                                    <span className="text-sm font-medium text-gray-700">
                                                        ₹{amount.toFixed(2)}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        className="p-1.5 hover:bg-red-50 rounded-lg text-red-400"
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

                <div className="md:col-span-2">
                    <div className="flex justify-end">
                        <div className="w-72 space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-medium text-gray-700">
                                    ₹
                                    {watchedItems
                                        .reduce(
                                            (sum, it) =>
                                                sum +
                                                (parseFloat(it.quantity) || 0) *
                                                    (parseFloat(it.rate) || 0),
                                            0
                                        )
                                        .toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Freight</span>
                                <span className="font-medium text-gray-700">
                                    ₹{Number(watch('freight') || 0).toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-300">
                                <span className="text-gray-900">Total</span>
                                <span className="text-blue-600">
                                    ₹
                                    {(
                                        watchedItems.reduce(
                                            (sum, it) =>
                                                sum +
                                                (parseFloat(it.quantity) || 0) *
                                                    (parseFloat(it.rate) || 0),
                                            0
                                        ) + Number(watch('freight') || 0)
                                    ).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <SectionHeader icon={Receipt} title="Remarks" />

                <div className="md:col-span-2">
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
                <Button type="submit" loading={isSubmitting} className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    {editData ? 'Update PO' : 'Create PO'}
                </Button>
            </div>
        </form>
    );
}