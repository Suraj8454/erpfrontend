
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2, ShoppingCart, Calendar, Users, Hash, UserCheck, Clock, Truck, Warehouse, Building2, Package, Ruler, Box, Receipt, DollarSign, IndianRupee, Percent, Send, Save, FileCheck, Store, MapPin, Ship, ClipboardList } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import { toast } from 'react-hot-toast';

const paymentTermsOptions = [
  { value: 'advance', label: 'Advance' },
  { value: '15-days', label: '15 Days' },
  { value: '30-days', label: '30 Days' },
  { value: '45-days', label: '45 Days' },
  { value: '60-days', label: '60 Days' },
  { value: '90-days', label: '90 Days' },
];

const mockProducts = [
  { id: 1, name: '4 Suta Makhana', grade: '4 Suta', price: 750, unit: 'KG', available: 500 },
  { id: 2, name: '5 Suta Makhana', grade: '5 Suta', price: 700, unit: 'KG', available: 300 },
  { id: 3, name: 'Premium Makhana', grade: 'Premium', price: 850, unit: 'KG', available: 200 },
];

const unitOptions = [
  { value: 'KG', label: 'KG' },
  { value: 'G', label: 'G' },
  { value: 'Ton', label: 'Ton' },
  { value: 'Pieces', label: 'Pieces' },
];

const customerOptions = [
  { value: 'ABC Traders', label: 'ABC Traders' },
  { value: 'XYZ Enterprises', label: 'XYZ Enterprises' },
  { value: 'Makhana House', label: 'Makhana House' },
  { value: 'Green Valley Traders', label: 'Green Valley Traders' },
  { value: 'Premium Exports', label: 'Premium Exports' },
];

const salespersonOptions = [
  { value: 'Anita Sharma', label: 'Anita Sharma' },
  { value: 'Rahul Verma', label: 'Rahul Verma' },
  { value: 'Priya Patel', label: 'Priya Patel' },
  { value: 'Amit Kumar', label: 'Amit Kumar' },
];

const warehouseOptions = [
  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Delhi', label: 'Delhi' },
  { value: 'Bangalore', label: 'Bangalore' },
  { value: 'Chennai', label: 'Chennai' },
  { value: 'Kolkata', label: 'Kolkata' },
];

const transporterOptions = [
  { value: 'Blue Dart', label: 'Blue Dart' },
  { value: 'DTDC', label: 'DTDC' },
  { value: 'FedEx', label: 'FedEx' },
  { value: 'DHL', label: 'DHL' },
  { value: 'Gati', label: 'Gati' },
  { value: 'Self', label: 'Self' },
];

const SectionHeader = ({ icon: Icon, title }) => (
  <div className="md:col-span-2">
    <div className="flex items-center gap-3 pb-2 border-b border-blue-200">
      <Icon className="w-4 h-4 text-blue-500" strokeWidth={2} />
      <h3 className="text-sm font-semibold text-blue-600 tracking-wide">
        {title}
      </h3>
    </div>
  </div>
);

export default function SalesOrderForm({ onClose }) {
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      items: [{ product: '', grade: '', quantity: '', unit: 'KG', rate: '', available: 0 }]
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  const onSubmit = async (data) => {
    try {
      console.log('Sales Order data:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Sales order created successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to create sales order');
    }
  };

  const addItem = () => {
    append({ product: '', grade: '', quantity: '', unit: 'KG', rate: '', available: 0 });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
        <div className="p-2 bg-blue-50 rounded-lg">
          <ShoppingCart className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">New Sales Order</h2>
          <p className="text-xs text-gray-500">Create sales order for customers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* Order Information */}
        <SectionHeader icon={ShoppingCart} title="Order Information" />

        <Input
          label="Order No"
          icon={Hash}
          {...register('orderNo')}
          defaultValue="SO-004"
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
          defaultValue={new Date().toISOString().split('T')[0]}
        />

        <Select
          label="Customer"
          required
          icon={Users}
          {...register('customer', { required: 'Customer is required' })}
          error={errors.customer?.message}
          options={customerOptions}
        />

        <Input
          label="Quotation No"
          icon={FileCheck}
          {...register('quotationNo')}
          placeholder="Q-001"
        />

        <Select
          label="Salesperson"
          icon={UserCheck}
          {...register('salesperson')}
          options={salespersonOptions}
        />

        <Input
          label="Delivery Date"
          required
          icon={Calendar}
          type="date"
          {...register('deliveryDate', { required: 'Delivery date is required' })}
          error={errors.deliveryDate?.message}
        />

        <Select
          label="Payment Terms"
          icon={Clock}
          {...register('paymentTerms')}
          options={paymentTermsOptions}
        />

        <Select
          label="Warehouse"
          icon={Warehouse}
          {...register('warehouse')}
          options={warehouseOptions}
        />

        <Select
          label="Transporter"
          icon={Truck}
          {...register('transporter')}
          options={transporterOptions}
        />

        <Input
          label="Freight"
          icon={DollarSign}
          {...register('freight')}
          type="number"
          placeholder="0"
        />

        {/* Items */}
        <div className="md:col-span-2 mt-2">
          <div className="flex items-center justify-between pb-2 border-b border-blue-200">
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4 text-blue-500" strokeWidth={2} />
              <h3 className="text-sm font-semibold text-blue-600 tracking-wide">Order Items</h3>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addItem} className="flex items-center gap-1">
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
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Product</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Grade</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Quantity</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Unit</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Rate (₹)</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Available</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
                    <th className="px-3 py-2.5 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {fields.map((field, index) => (
                    <tr key={field.id}>
                      <td className="px-3 py-2">
                        <select
                          {...register(`items.${index}.product`)}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                        >
                          <option value="">Select Product</option>
                          {mockProducts.map(p => (
                            <option key={p.id} value={p.name}>{p.name}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <input
                          {...register(`items.${index}.grade`)}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                          placeholder="4 Suta"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          {...register(`items.${index}.quantity`)}
                          type="number"
                          className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                          placeholder="100"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <select
                          {...register(`items.${index}.unit`)}
                          className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                        >
                          {unitOptions.map(unit => (
                            <option key={unit.value} value={unit.value}>{unit.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <input
                          {...register(`items.${index}.rate`)}
                          type="number"
                          className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                          placeholder="750"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <span className="text-sm text-gray-500">{mockProducts[0]?.available || 0} {field.unit || 'KG'}</span>
                      </td>
                      <td className="px-3 py-2">
                        <span className="text-sm font-medium text-gray-700">₹0</span>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {fields.length === 0 && (
                    <tr>
                      <td colSpan="8" className="px-4 py-8 text-center text-gray-400 text-sm">
                        No items added. Click "Add Item" to add products.
                      </td>
                    </tr>
                  )}
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
                <span className="font-medium text-gray-700">₹0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Discount</span>
                <span className="font-medium text-gray-700">₹0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax</span>
                <span className="font-medium text-gray-700">₹0</span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-300">
                <span className="text-gray-900">Total</span>
                <span className="text-blue-600">₹0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Remarks */}
        <SectionHeader icon={Receipt} title="Remarks" />

        <div className="md:col-span-2">
          <div className="relative">
            <Receipt className="absolute left-3 top-3 w-4 h-4 text-blue-500" strokeWidth={1.75} />
            <textarea
              {...register('remarks')}
              rows="2"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none placeholder:text-gray-400"
              placeholder="Any additional notes..."
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Button variant="outline" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button variant="outline" type="submit" loading={isSubmitting} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save as Draft
        </Button>
        <Button type="submit" loading={isSubmitting} className="flex items-center gap-2">
          <Send className="w-4 h-4" />
          Create Order
        </Button>
      </div>
    </form>
  );
}