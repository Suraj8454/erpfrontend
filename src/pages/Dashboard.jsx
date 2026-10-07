// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { 
//   TrendingUp, 
//   TrendingDown, 
//   DollarSign, 
//   Package, 
//   Users, 
//   FileText,
//   ArrowUpRight,
//   ArrowDownRight,
//   RefreshCw,
//   Download,
//   ChevronRight,
//   MoreVertical,
//   Calendar,
//   ClipboardCheck,
//   ShoppingCart
// } from 'lucide-react'
// import Card from '../components/common/Card'
// import Button from '../components/common/Button'
// import { 
//   AreaChart, 
//   Area, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend
// } from 'recharts'

// const stats = [
//   { 
//     title: "Today's Sales", 
//     value: '₹2,45,000', 
//     change: '+12.5%', 
//     icon: DollarSign, 
//     trend: 'up',
//     bgColor: 'bg-blue-50',
//     textColor: 'text-blue-600'
//   },
//   { 
//     title: 'Pending Orders', 
//     value: '28', 
//     change: '+3', 
//     icon: FileText, 
//     trend: 'up',
//     bgColor: 'bg-violet-50',
//     textColor: 'text-violet-600'
//   },
//   { 
//     title: 'Total Stock', 
//     value: '12,450 KG', 
//     change: '-2.1%', 
//     icon: Package, 
//     trend: 'down',
//     bgColor: 'bg-amber-50',
//     textColor: 'text-amber-600'
//   },
//   { 
//     title: 'New Leads', 
//     value: '15', 
//     change: '+25%', 
//     icon: Users, 
//     trend: 'up',
//     bgColor: 'bg-emerald-50',
//     textColor: 'text-emerald-600'
//   },
// ]

// const salesData = [
//   { name: 'Mon', sales: 4000, orders: 24 },
//   { name: 'Tue', sales: 3000, orders: 18 },
//   { name: 'Wed', sales: 5000, orders: 32 },
//   { name: 'Thu', sales: 4500, orders: 28 },
//   { name: 'Fri', sales: 6000, orders: 36 },
//   { name: 'Sat', sales: 5500, orders: 30 },
//   { name: 'Sun', sales: 3500, orders: 20 },
// ]

// const stockData = [
//   { name: '4 Suta', value: 35 },
//   { name: '5 Suta', value: 25 },
//   { name: '6 Suta', value: 20 },
//   { name: 'Premium', value: 15 },
//   { name: 'Others', value: 5 },
// ]

// const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981']

// const recentActivities = [
//   { 
//     id: 1, 
//     type: 'Quotation', 
//     customer: 'ABC Traders', 
//     amount: '₹75,000', 
//     status: 'Pending Approval', 
//     time: '2 min ago',
//     color: 'bg-yellow-100 text-yellow-800',
//     path: '/quotations'
//   },
//   { 
//     id: 2, 
//     type: 'GRN', 
//     customer: 'Makhana Suppliers', 
//     amount: '500 KG', 
//     status: 'QC Pending', 
//     time: '15 min ago',
//     color: 'bg-blue-100 text-blue-800',
//     path: '/grn'
//   },
//   { 
//     id: 3, 
//     type: 'Payment', 
//     customer: 'XYZ Retail', 
//     amount: '₹1,20,000', 
//     status: 'Completed', 
//     time: '1 hour ago',
//     color: 'bg-green-100 text-green-800',
//     path: '/payments'
//   },
//   { 
//     id: 4, 
//     type: 'Lead', 
//     customer: 'New Customer', 
//     amount: 'Enquiry', 
//     status: 'New', 
//     time: '2 hours ago',
//     color: 'bg-gray-100 text-gray-800',
//     path: '/leads'
//   },
// ]

// const quickActions = [
//   { icon: Users, label: 'New Lead', color: 'blue', path: '/leads' },
//   { icon: FileText, label: 'New Quotation', color: 'violet', path: '/quotations' },
//   { icon: ShoppingCart, label: 'Purchase Order', color: 'amber', path: '/purchase-orders' },
//   { icon: ClipboardCheck, label: 'QC Check', color: 'green', path: '/qc' },
// ]

// export default function Dashboard() {
//   const navigate = useNavigate()
//   const [isRefreshing, setIsRefreshing] = useState(false)

//   const handleRefresh = () => {
//     setIsRefreshing(true)
//     setTimeout(() => setIsRefreshing(false), 1500)
//   }

//   const handleNavigate = (path) => {
//     navigate(path)
//   }

//   return (
//     <div className="space-y-6">
//       {/* Page Header - NO CREATE BUTTON */}
//       <div className="flex flex-wrap items-start justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//           <p className="text-sm text-gray-500 mt-1">Welcome back! Here's your business overview</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <Button 
//             variant="outline" 
//             size="sm"
//             className="flex items-center gap-2"
//             onClick={handleRefresh}
//           >
//             <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
//             Refresh
//           </Button>
//           <Button variant="outline" size="sm" className="flex items-center gap-2">
//             <Download className="w-4 h-4" />
//             Export
//           </Button>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <div key={index} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
//                 <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
//                 <div className={`flex items-center gap-1 mt-2 text-sm ${
//                   stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
//                 }`}>
//                   {stat.trend === 'up' ? (
//                     <TrendingUp className="w-4 h-4" />
//                   ) : (
//                     <TrendingDown className="w-4 h-4" />
//                   )}
//                   {stat.change}
//                   <span className="text-gray-400 text-xs ml-1">vs last month</span>
//                 </div>
//               </div>
//               <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
//                 <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//         {/* Sales Chart */}
//         <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h3 className="font-semibold text-gray-900">Sales Overview</h3>
//               <p className="text-xs text-gray-500 mt-0.5">Weekly performance</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
//                 <option>This Week</option>
//                 <option>This Month</option>
//                 <option>This Quarter</option>
//               </select>
//               <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
//                 <MoreVertical className="w-4 h-4 text-gray-400" />
//               </button>
//             </div>
//           </div>
//           <div className="h-72">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={salesData}>
//                 <defs>
//                   <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
//                     <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
//                 <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
//                 <YAxis stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: 'white', 
//                     border: 'none',
//                     borderRadius: '12px',
//                     boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
//                     padding: '12px 16px'
//                   }}
//                   formatter={(value) => [`₹${value.toLocaleString()}`, 'Sales']}
//                 />
//                 <Area 
//                   type="monotone" 
//                   dataKey="sales" 
//                   stroke="#3b82f6" 
//                   strokeWidth={3}
//                   fill="url(#colorSales)" 
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Stock Distribution */}
//         <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h3 className="font-semibold text-gray-900">Stock Distribution</h3>
//               <p className="text-xs text-gray-500 mt-0.5">By product grade</p>
//             </div>
//           </div>
//           <div className="h-72">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={stockData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={55}
//                   outerRadius={80}
//                   paddingAngle={3}
//                   dataKey="value"
//                 >
//                   {stockData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: 'white', 
//                     border: 'none',
//                     borderRadius: '12px',
//                     boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
//                     padding: '8px 12px'
//                   }}
//                 />
//                 <Legend 
//                   verticalAlign="bottom" 
//                   height={36}
//                   iconType="circle"
//                   iconSize={8}
//                   wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Recent Activity & Quick Actions */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//         {/* Recent Activity */}
//         <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
//           <div className="flex items-center justify-between p-6 border-b border-gray-100">
//             <div>
//               <h3 className="font-semibold text-gray-900">Recent Activity</h3>
//               <p className="text-xs text-gray-500 mt-0.5">Latest updates from your business</p>
//             </div>
//             <Button 
//               variant="ghost" 
//               size="sm" 
//               className="text-blue-600 hover:text-blue-700"
//               onClick={() => handleNavigate('/')}
//             >
//               View All
//               <ChevronRight className="w-4 h-4 ml-1" />
//             </Button>
//           </div>
//           <div className="divide-y divide-gray-100">
//             {recentActivities.map((activity) => (
//               <div 
//                 key={activity.id} 
//                 className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer"
//                 onClick={() => handleNavigate(activity.path)}
//               >
//                 <div className="flex items-center gap-4">
//                   <div className={`w-2 h-2 rounded-full ${
//                     activity.status === 'Completed' ? 'bg-emerald-500' :
//                     activity.status === 'Pending Approval' ? 'bg-amber-500' :
//                     activity.status === 'QC Pending' ? 'bg-blue-500' :
//                     'bg-gray-400'
//                   }`} />
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">
//                       {activity.type}
//                       <span className="font-normal text-gray-500 ml-1">— {activity.customer}</span>
//                     </p>
//                     <div className="flex items-center gap-2 mt-0.5">
//                       <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${activity.color}`}>
//                         {activity.status}
//                       </span>
//                       <span className="text-xs text-gray-400">{activity.time}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <span className="text-sm font-medium text-gray-900">{activity.amount}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
//           <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
//           <div className="space-y-3">
//             {quickActions.map((action, index) => {
//               const colorClasses = {
//                 blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
//                 violet: 'bg-violet-50 text-violet-600 hover:bg-violet-100',
//                 amber: 'bg-amber-50 text-amber-600 hover:bg-amber-100',
//                 green: 'bg-green-50 text-green-600 hover:bg-green-100',
//               }
//               return (
//                 <button
//                   key={index}
//                   onClick={() => handleNavigate(action.path)}
//                   className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-200 group"
//                 >
//                   <div className={`w-10 h-10 rounded-lg ${colorClasses[action.color] || 'bg-gray-50 text-gray-600'} flex items-center justify-center`}>
//                     <action.icon className="w-5 h-5" />
//                   </div>
//                   <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
//                     {action.label}
//                   </span>
//                   <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-gray-500" />
//                 </button>
//               )
//             })}
//           </div>

//           {/* Today's Summary */}
//           <div className="mt-6 pt-6 border-t border-gray-100">
//             <div className="flex items-center gap-2 text-xs text-gray-500">
//               <Calendar className="w-4 h-4" />
//               <span>{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}</span>
//             </div>
//             <div className="flex items-center gap-4 mt-2">
//               <div>
//                 <p className="text-xs text-gray-400">Today's Orders</p>
//                 <p className="text-sm font-semibold text-gray-900">12</p>
//               </div>
//               <div className="w-px h-8 bg-gray-200" />
//               <div>
//                 <p className="text-xs text-gray-400">Pending Tasks</p>
//                 <p className="text-sm font-semibold text-amber-600">3</p>
//               </div>
//               <div className="w-px h-8 bg-gray-200" />
//               <div>
//                 <p className="text-xs text-gray-400">Low Stock</p>
//                 <p className="text-sm font-semibold text-red-600">2</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { dashboardAPI } from '../services/api'
import {
    DollarSign, Package, Users, FileText, RefreshCw, Download,
    ChevronRight, ClipboardCheck, ShoppingCart, TrendingUp,IndianRupee
} from 'lucide-react'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts'
import toast from 'react-hot-toast'

const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981']

export default function Dashboard() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    const [stats, setStats] = useState({
        todaySales: { amount: 0, count: 0 },
        monthSales: { amount: 0, count: 0 },
        pendingOrders: 0,
        totalStock: { quantity: 0, value: 0 },
        newLeads: 0,
        pendingQuotations: 0,
        receivables: { amount: 0, count: 0 },
        lowStockItems: 0,
        pendingQC: 0,
    })

    const [activities, setActivities] = useState([])
    const [salesChart, setSalesChart] = useState([])
    const [stockDistribution, setStockDistribution] = useState([])

    const loadDashboard = async () => {
        try {
            setLoading(true)

            const [statsRes, activitiesRes, chartRes, distributionRes] = await Promise.all([
                dashboardAPI.getStats(),
                dashboardAPI.getActivities(),
                dashboardAPI.getSalesChart({ period: 'week' }),
                dashboardAPI.getStockDistribution(),
            ])

            setStats(statsRes.data.data)
            setActivities(activitiesRes.data.data || [])
            setSalesChart(chartRes.data.data || [])
            setStockDistribution(distributionRes.data.data || [])
        } catch (error) {
            toast.error('Failed to load dashboard')
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(() => {
        loadDashboard()
    }, [])

    const handleRefresh = () => {
        setRefreshing(true)
        loadDashboard()
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    const statCards = [
        {
            title: "Today's Sales",
            value: `₹${stats.todaySales.amount.toLocaleString()}`,
            change: `${stats.todaySales.count} orders`,
            icon: IndianRupee,
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600',
        },
        {
            title: 'Pending Orders',
            value: stats.pendingOrders,
            change: 'Needs attention',
            icon: FileText,
            bgColor: 'bg-violet-50',
            textColor: 'text-violet-600',
        },
        {
            title: 'Total Stock',
            value: `${stats.totalStock.quantity.toLocaleString()} KG`,
            change: `₹${stats.totalStock.value.toLocaleString()}`,
            icon: Package,
            bgColor: 'bg-amber-50',
            textColor: 'text-amber-600',
        },
        {
            title: 'New Leads',
            value: stats.newLeads,
            change: 'This month',
            icon: Users,
            bgColor: 'bg-emerald-50',
            textColor: 'text-emerald-600',
        },
    ]

    const quickActions = [
        { icon: Users, label: 'New Lead', path: '/leads', color: 'blue' },
        { icon: FileText, label: 'New Quotation', path: '/quotations', color: 'violet' },
        { icon: ShoppingCart, label: 'Purchase Order', path: '/purchase-orders', color: 'amber' },
        { icon: ClipboardCheck, label: 'QC Check', path: '/qc', color: 'green' },
    ]

    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
        violet: 'bg-violet-50 text-violet-600 hover:bg-violet-100',
        amber: 'bg-amber-50 text-amber-600 hover:bg-amber-100',
        green: 'bg-green-50 text-green-600 hover:bg-green-100',
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Welcome back! Here's your business overview
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        className="flex items-center gap-2"
                    >
                        <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {statCards.map((stat, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                                    {stat.change}
                                </div>
                            </div>
                            <div
                                className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}
                            >
                                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Sales Overview</h3>
                    <div className="h-72">
                        {salesChart.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={salesChart}>
                                    <defs>
                                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                    <XAxis dataKey="label" stroke="#94a3b8" fontSize={12} />
                                    <YAxis stroke="#94a3b8" fontSize={12} />
                                    <Tooltip
                                        formatter={(value) => [`₹${value.toLocaleString()}`, 'Sales']}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        fill="url(#colorSales)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                No sales data available
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Stock Distribution</h3>
                    <div className="h-72">
                        {stockDistribution.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={stockDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={55}
                                        outerRadius={80}
                                        dataKey="quantity"
                                        nameKey="product"
                                    >
                                        {stockDistribution.map((entry, index) => (
                                            <Cell
                                                key={index}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend
                                        verticalAlign="bottom"
                                        iconType="circle"
                                        iconSize={8}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                No stock data
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100">
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {activities.length === 0 ? (
                            <div className="p-6 text-center text-gray-500 text-sm">
                                No recent activity
                            </div>
                        ) : (
                            activities.map((activity, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {activity.type} — {activity.customer}
                                            </p>
                                            <span className="text-xs text-gray-500">
                                                {new Date(activity.created_at).toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">
                                        ₹{Number(activity.amount || 0).toLocaleString()}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        {quickActions.map((action, idx) => (
                            <button
                                key={idx}
                                onClick={() => navigate(action.path)}
                                className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group"
                            >
                                <div
                                    className={`w-10 h-10 rounded-lg ${colorClasses[action.color]} flex items-center justify-center`}
                                >
                                    <action.icon className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                    {action.label}
                                </span>
                                <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-gray-500" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}