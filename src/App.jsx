


import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Auth/Login";

// Dashboard
import Dashboard from "./pages/Dashboard";

// CRM
import Leads from "./pages/CRM/Leads";
import LeadDetails from "./pages/CRM/LeadDetails";
import Enquiries from "./pages/CRM/Enquiries";

// Sales
import Quotations from "./pages/Sales/Quotations";
import QuotationDetails from './pages/Sales/QuotationDetails';
import SalesOrders from "./pages/Sales/SalesOrders";
import SalesOrderDetails from './pages/Sales/SalesOrderDetails';
import Invoices from "./pages/Sales/Invoices";
import InvoiceDetails from './pages/Sales/InvoiceDetails';
import Payments from "./pages/Sales/Payments";
import PaymentDetails from './pages/Sales/PaymentDetails';

// Purchase
import PurchaseOrders from "./pages/Purchase/PurchaseOrders";
import PurchaseOrderDetails from './pages/Purchase/PurchaseOrderDetails';
import GRN from "./pages/Purchase/GRN";
import GRNDetails from './pages/Purchase/GRNDetails';
import Suppliers from "./pages/Purchase/Suppliers";
import SupplierDetails from './pages/Purchase/SupplierDetails';

// Inventory
import Stock from "./pages/Inventory/Stock";
import StockMovements from './pages/Inventory/StockMovements';
import Batches from "./pages/Inventory/Batches";
import QC from "./pages/Inventory/QC";

// Masters
import Products from "./pages/Masters/Products";
import ProductDetails from './pages/Masters/ProductDetails';
import Customers from "./pages/Masters/Customers";
import CustomerDetails from './pages/Masters/CustomerDetails';
import Users from "./pages/Masters/Users";
import UserDetails from './pages/Masters/UserDetails';

// Reports
import Reports from "./pages/Reports/Reports";

// ✅ Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-500">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

// ✅ Public Route (redirect to dashboard if logged in)
const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

function App() {
    return (
        <Routes>
            {/* Public Route */}
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />

            {/* Protected Routes */}
            <Route
                path="/*"
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Dashboard />} />

                {/* CRM */}
                <Route path="leads" element={<Leads />} />
                <Route path="leads/:id" element={<LeadDetails />} />
                <Route path="enquiries" element={<Enquiries />} />

                {/* Sales */}
                <Route path="quotations" element={<Quotations />} />
                <Route path="quotations/:id" element={<QuotationDetails />} />
                <Route path="sales-orders" element={<SalesOrders />} />
                <Route path="sales-orders/:id" element={<SalesOrderDetails />} />
                <Route path="invoices" element={<Invoices />} />
                <Route path="invoices/:id" element={<InvoiceDetails />} />
                <Route path="payments" element={<Payments />} />
                <Route path="payments/:id" element={<PaymentDetails />} />

                {/* Purchase */}
                <Route path="purchase-orders" element={<PurchaseOrders />} />
                <Route path="purchase-orders/:id" element={<PurchaseOrderDetails />} />
                <Route path="grn" element={<GRN />} />
                <Route path="grn/:id" element={<GRNDetails />} />
                <Route path="suppliers" element={<Suppliers />} />
                <Route path="suppliers/:id" element={<SupplierDetails />} />

                {/* Inventory */}
                <Route path="stock" element={<Stock />} />
                <Route path="stock/movements/:productId" element={<StockMovements />} />
                <Route path="batches" element={<Batches />} />
                <Route path="qc" element={<QC />} />

                {/* Masters */}
                <Route path="products" element={<Products />} />
                <Route path="products/:id" element={<ProductDetails />} />
                <Route path="customers" element={<Customers />} />
                <Route path="customers/:id" element={<CustomerDetails />} />
                <Route path="users" element={<Users />} />
                <Route path="users/:id" element={<UserDetails />} />

                {/* Reports */}
                <Route path="reports" element={<Reports />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;