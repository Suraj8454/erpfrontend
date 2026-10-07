import { useState, useEffect } from 'react';
import {
    Download,
    TrendingUp,
    DollarSign,
    Package,
    Users,
    Calendar,
    RefreshCw,
    BarChart3,
    FileText,
    PieChart as PieChartIcon,
    Loader,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { reportAPI } from '../../services/api';
import toast from 'react-hot-toast';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981'];

export default function Reports() {
    const [activeTab, setActiveTab] = useState('sales');
    const [loading, setLoading] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const [salesData, setSalesData] = useState([]);
    const [salesSummary, setSalesSummary] = useState(null);
    const [purchaseData, setPurchaseData] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [crmData, setCrmData] = useState([]);
    const [financialData, setFinancialData] = useState(null);

    const loadReport = async () => {
        setLoading(true);
        try {
            const params = {};
            if (fromDate) params.from_date = fromDate;
            if (toDate) params.to_date = toDate;

            if (activeTab === 'sales') {
                const [byCustomer, summary] = await Promise.all([
                    reportAPI.getSalesByCustomer(params),
                    reportAPI.getSalesSummary(params),
                ]);
                setSalesData(byCustomer.data.data || []);
                setSalesSummary(summary.data.data || null);
            } else if (activeTab === 'purchase') {
                const res = await reportAPI.getPurchaseBySupplier(params);
                setPurchaseData(res.data.data || []);
            } else if (activeTab === 'stock') {
                const res = await reportAPI.getStockReport(params);
                setStockData(res.data.data?.rows || []);
            } else if (activeTab === 'crm') {
                const res = await reportAPI.getLeadFunnel(params);
                setCrmData(res.data.data || []);
            } else if (activeTab === 'financial') {
                const res = await reportAPI.getProfitLoss(params);
                setFinancialData(res.data.data);
            }
        } catch (error) {
            console.error('Load report error:', error);
            toast.error('Failed to load report');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReport();
    }, [activeTab]);

    const tabs = [
        { id: 'sales', label: 'Sales', icon: TrendingUp },
        { id: 'purchase', label: 'Purchase', icon: Package },
        { id: 'stock', label: 'Stock', icon: Package },
        { id: 'crm', label: 'CRM', icon: Users },
        { id: 'financial', label: 'Financial', icon: DollarSign },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm">
                        <BarChart3 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
                            Reports
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Business analytics and insights
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={loadReport}
                        className="flex items-center gap-2"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Date Filters */}
            <Card className="p-5">
                <div className="flex flex-wrap items-end gap-4">
                    <div>
                        <label className="text-xs text-gray-500 font-medium">From Date</label>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="block mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 font-medium">To Date</label>
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="block mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <Button onClick={loadReport} className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Apply Filter
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setFromDate('');
                            setToDate('');
                        }}
                    >
                        Clear
                    </Button>
                </div>
            </Card>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            {loading ? (
                <Card className="p-16 text-center">
                    <Loader className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
                    <p className="mt-4 text-gray-500">Loading report...</p>
                </Card>
            ) : (
                <>
                    {/* Sales Tab */}
                    {activeTab === 'sales' && (
                        <div className="space-y-6">
                            {salesSummary && (
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                                    <Card className="p-5 border-l-4 border-blue-500">
                                        <p className="text-xs text-gray-500 uppercase">Total Sales</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">
                                            ₹
                                            {Number(salesSummary.total_sales || 0).toLocaleString(
                                                'en-IN'
                                            )}
                                        </p>
                                    </Card>
                                    <Card className="p-5 border-l-4 border-violet-500">
                                        <p className="text-xs text-gray-500 uppercase">Total Orders</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">
                                            {salesSummary.total_orders || 0}
                                        </p>
                                    </Card>
                                    <Card className="p-5 border-l-4 border-green-500">
                                        <p className="text-xs text-gray-500 uppercase">Total Tax</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">
                                            ₹
                                            {Number(salesSummary.total_tax || 0).toLocaleString(
                                                'en-IN'
                                            )}
                                        </p>
                                    </Card>
                                    <Card className="p-5 border-l-4 border-amber-500">
                                        <p className="text-xs text-gray-500 uppercase">Discount</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">
                                            ₹
                                            {Number(
                                                salesSummary.total_discount || 0
                                            ).toLocaleString('en-IN')}
                                        </p>
                                    </Card>
                                </div>
                            )}

                            <Card className="p-0 overflow-hidden">
                                <div className="p-5 border-b border-gray-100">
                                    <h3 className="font-semibold text-gray-900">
                                        Sales by Customer
                                    </h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Customer
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Orders
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Total Sales
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Paid
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Outstanding
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {salesData.length === 0 ? (
                                                <tr>
                                                    <td
                                                        colSpan={5}
                                                        className="px-6 py-12 text-center text-gray-500"
                                                    >
                                                        No data available
                                                    </td>
                                                </tr>
                                            ) : (
                                                salesData.map((row, idx) => (
                                                    <tr
                                                        key={idx}
                                                        className="hover:bg-gray-50 transition-colors"
                                                    >
                                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                            {row.company_name}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm">
                                                            {row.total_orders}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm font-medium">
                                                            ₹
                                                            {Number(
                                                                row.total_sales || 0
                                                            ).toLocaleString('en-IN')}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-green-600 font-medium">
                                                            ₹
                                                            {Number(
                                                                row.total_paid || 0
                                                            ).toLocaleString('en-IN')}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-red-600 font-medium">
                                                            ₹
                                                            {Number(
                                                                row.outstanding || 0
                                                            ).toLocaleString('en-IN')}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* Purchase Tab */}
                    {activeTab === 'purchase' && (
                        <Card className="p-0 overflow-hidden">
                            <div className="p-5 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-900">
                                    Purchase by Supplier
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Supplier
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Orders
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Total Purchase
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {purchaseData.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={3}
                                                    className="px-6 py-12 text-center text-gray-500"
                                                >
                                                    No data available
                                                </td>
                                            </tr>
                                        ) : (
                                            purchaseData.map((row, idx) => (
                                                <tr key={idx} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm font-medium">
                                                        {row.company_name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        {row.total_orders}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium">
                                                        ₹
                                                        {Number(
                                                            row.total_purchase || 0
                                                        ).toLocaleString('en-IN')}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    )}

                    {/* Stock Tab */}
                    {activeTab === 'stock' && (
                        <Card className="p-0 overflow-hidden">
                            <div className="p-5 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-900">Current Stock</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Product
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Quantity
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Unit
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {stockData.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={3}
                                                    className="px-6 py-12 text-center text-gray-500"
                                                >
                                                    No stock data
                                                </td>
                                            </tr>
                                        ) : (
                                            stockData.map((row, idx) => (
                                                <tr key={idx} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm font-medium">
                                                        {row.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        {Number(
                                                            row.total_quantity || 0
                                                        ).toLocaleString('en-IN')}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        {row.unit}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    )}

                    {/* CRM Tab */}
                    {activeTab === 'crm' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {crmData.map((item, idx) => (
                                <Card key={idx} className="p-5">
                                    <p className="text-sm text-gray-500">{item.status}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">
                                        {item.count} leads
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Value: ₹
                                        {Number(item.total_value || 0).toLocaleString('en-IN')}
                                    </p>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Financial Tab */}
                    {activeTab === 'financial' && financialData && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="p-6 border-l-4 border-blue-500">
                                <p className="text-sm text-gray-500">Total Sales</p>
                                <p className="text-2xl font-bold text-gray-900 mt-2">
                                    ₹{financialData.totalSales?.toLocaleString()}
                                </p>
                            </Card>
                            <Card className="p-6 border-l-4 border-violet-500">
                                <p className="text-sm text-gray-500">Total Purchases</p>
                                <p className="text-2xl font-bold text-gray-900 mt-2">
                                    ₹{financialData.totalPurchases?.toLocaleString()}
                                </p>
                            </Card>
                            <Card className="p-6 border-l-4 border-green-500">
                                <p className="text-sm text-gray-500">Gross Profit</p>
                                <p className="text-2xl font-bold text-green-600 mt-2">
                                    ₹{financialData.grossProfit?.toLocaleString()}
                                </p>
                                <span className="text-xs text-green-600">
                                    Margin: {financialData.grossMargin}%
                                </span>
                            </Card>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}