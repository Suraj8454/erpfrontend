
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2, Package, Truck, User, Building2, Calendar, Hash, MapPin, FileText, Users, Warehouse, ShoppingBag, Box, Ruler, CheckCircle, XCircle, ClipboardList, UserCheck } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import { toast } from 'react-hot-toast';

const mockSuppliers = [
  { value: 'Makhana Suppliers Pvt Ltd', label: 'Makhana Suppliers Pvt Ltd' },
  { value: 'Premium Makhana Exports', label: 'Premium Makhana Exports' },
  { value: 'Green Valley Makhana', label: 'Green Valley Makhana' },
];

const mockProducts = [
  { id: 1, name: '4 Suta Makhana', grade: '4 Suta', unit: 'KG' },
  { id: 2, name: '5 Suta Makhana', grade: '5 Suta', unit: 'KG' },
  { id: 3, name: 'Premium Makhana', grade: 'Premium', unit: 'KG' },
];

const unitOptions = [
  { value: 'KG', label: 'KG' },
  { value: 'G', label: 'G' },
  { value: 'Ton', label: 'Ton' },
  { value: 'Pieces', label: 'Pieces' },
];

const warehouseOptions = [
  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Delhi', label: 'Delhi' },
  { value: 'Bangalore', label: 'Bangalore' },
  { value: 'Chennai', label: 'Chennai' },
  { value: 'Kolkata', label: 'Kolkata' },
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

export default function GRNForm({ onClose }) {
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      items: [{ product: '', grade: '', orderedQty: '', receivedQty: '', acceptedQty: '', rejectedQty: '', unit: 'KG' }]
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  const onSubmit = async (data) => {
    try {
      console.log('GRN data:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('GRN created successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to create GRN');
    }
  };

  const addItem = () => {
    append({ product: '', grade: '', orderedQty: '', receivedQty: '', acceptedQty: '', rejectedQty: '', unit: 'KG' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
        <div className="p-2 bg-blue-50 rounded-lg">
          <ClipboardList className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">New GRN</h2>
          <p className="text-xs text-gray-500">Create goods receipt note for received inventory</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* GRN Information */}
        <SectionHeader icon={FileText} title="GRN Information" />

        <Input
          label="GRN No"
          icon={Hash}
          {...register('grnNo')}
          defaultValue="GRN-004"
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
          label="Supplier"
          required
          icon={Building2}
          {...register('supplier', { required: 'Supplier is required' })}
          error={errors.supplier?.message}
          options={mockSuppliers}
        />

        <Input
          label="PO No"
          required
          icon={ShoppingBag}
          {...register('poNo', { required: 'PO number is required' })}
          error={errors.poNo?.message}
          placeholder="PO-001"
        />

        {/* Shipping Information */}
        <SectionHeader icon={Truck} title="Shipping Information" />

        <Input
          label="Vehicle Number"
          icon={Truck}
          {...register('vehicleNo')}
          placeholder="MH-01-AB-1234"
        />

        <Input
          label="Driver"
          icon={User}
          {...register('driver')}
          placeholder="Driver name"
        />

        <Select
          label="Warehouse"
          icon={Warehouse}
          {...register('warehouse')}
          options={warehouseOptions}
        />

        <Input
          label="Received By"
          icon={UserCheck}
          {...register('receivedBy')}
          placeholder="Your name"
        />

        {/* Received Items */}
        <div className="md:col-span-2 mt-2">
          <div className="flex items-center justify-between pb-2 border-b border-blue-200">
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4 text-blue-500" strokeWidth={2} />
              <h3 className="text-sm font-semibold text-blue-600 tracking-wide">Received Items</h3>
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
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Product</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Grade</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Ordered</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Received</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Accepted</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Rejected</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Unit</th>
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
                          {...register(`items.${index}.orderedQty`)}
                          type="number"
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                          placeholder="100"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          {...register(`items.${index}.receivedQty`)}
                          type="number"
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                          placeholder="100"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          {...register(`items.${index}.acceptedQty`)}
                          type="number"
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                          placeholder="100"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          {...register(`items.${index}.rejectedQty`)}
                          type="number"
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                          placeholder="0"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <select
                          {...register(`items.${index}.unit`)}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                        >
                          {unitOptions.map(unit => (
                            <option key={unit.value} value={unit.value}>{unit.label}</option>
                          ))}
                        </select>
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

        {/* Remarks */}
        <div className="md:col-span-2 mt-2">
          <SectionHeader icon={FileText} title="Remarks" />
        </div>

        <div className="md:col-span-2">
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-4 h-4 text-blue-500" strokeWidth={1.75} />
            <textarea
              {...register('remarks')}
              rows="3"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none placeholder:text-gray-400"
              placeholder="Any notes about the received goods..."
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
          Create GRN
        </Button>
      </div>
    </form>
  );
}