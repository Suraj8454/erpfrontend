import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000,
});

// Request interceptor - Add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    register: (data) => api.post("/auth/register", data),
    login: (credentials) => api.post("/auth/login", credentials),
    getProfile: () => api.get("/auth/profile"),
    updateProfile: (data) => api.put("/auth/profile", data),
};

// Dashboard APIs
export const dashboardAPI = {
    getStats: () => api.get("/dashboard/stats"),
    getActivities: () => api.get("/dashboard/activities"),
    getSalesChart: (params) => api.get("/dashboard/sales-chart", { params }),
    getStockDistribution: () => api.get("/dashboard/stock-distribution"),
};

// Lead APIs
export const leadsAPI = {
    getAll: (params) => api.get("/leads", { params }),
    getById: (id) => api.get(`/leads/${id}`),
    create: (data) => api.post("/leads", data),
    update: (id, data) => api.put(`/leads/${id}`, data),
    delete: (id) => api.delete(`/leads/${id}`),
    convert: (id) => api.post(`/leads/${id}/convert`),
    addActivity: (id, data) => api.post(`/leads/${id}/activities`, data),
};

// Product APIs
export const productsAPI = {
    getAll: (params) => api.get("/products", { params }),
    getById: (id) => api.get(`/products/${id}`),
    create: (data) => api.post("/products", data),
    update: (id, data) => api.put(`/products/${id}`, data),
    delete: (id) => api.delete(`/products/${id}`),
    getCategories: () => api.get("/products/categories"),
    getGrades: () => api.get("/products/grades"),
};

// Customer APIs
export const customersAPI = {
    getAll: (params) => api.get("/customers", { params }),
    getById: (id) => api.get(`/customers/${id}`),
    create: (data) => api.post("/customers", data),
    update: (id, data) => api.put(`/customers/${id}`, data),
    delete: (id) => api.delete(`/customers/${id}`),
};

// Supplier APIs
export const suppliersAPI = {
    getAll: (params) => api.get("/suppliers", { params }),
    getById: (id) => api.get(`/suppliers/${id}`),
    create: (data) => api.post("/suppliers", data),
    update: (id, data) => api.put(`/suppliers/${id}`, data),
    delete: (id) => api.delete(`/suppliers/${id}`),
};

// Quotation APIs
export const quotationsAPI = {
    getAll: (params) => api.get("/quotations", { params }),
    getById: (id) => api.get(`/quotations/${id}`),
    create: (data) => api.post("/quotations", data),
    update: (id, data) => api.put(`/quotations/${id}`, data),
    updateStatus: (id, status) => api.patch(`/quotations/${id}/status`, { status }),
    approve: (id) => api.post(`/quotations/${id}/approve`),
    convert: (id, data) => api.post(`/quotations/${id}/convert`, data),
    delete: (id) => api.delete(`/quotations/${id}`),
};

// Sales Order APIs
export const salesOrdersAPI = {
    getAll: (params) => api.get("/sales-orders", { params }),
    getById: (id) => api.get(`/sales-orders/${id}`),
    updateStatus: (id, status) => api.patch(`/sales-orders/${id}/status`, { status }),
    dispatch: (id, data) => api.post(`/sales-orders/${id}/dispatch`, data),
    generateInvoice: (id) => api.post(`/sales-orders/${id}/generate-invoice`),
    delete: (id) => api.delete(`/sales-orders/${id}`),
};

// Purchase Order APIs
export const purchaseOrdersAPI = {
    getAll: (params) => api.get("/purchase-orders", { params }),
    getById: (id) => api.get(`/purchase-orders/${id}`),
    create: (data) => api.post("/purchase-orders", data),
    updateStatus: (id, status) => api.patch(`/purchase-orders/${id}/status`, { status }),
    receive: (id, data) => api.post(`/purchase-orders/${id}/receive`, data),
    delete: (id) => api.delete(`/purchase-orders/${id}`),
};

// GRN APIs
export const grnAPI = {
    getAll: (params) => api.get("/grn", { params }),
    getById: (id) => api.get(`/grn/${id}`),
    updateStatus: (id, data) => api.patch(`/grn/${id}/status`, data),
};

// QC APIs
export const qcAPI = {
    getAll: (params) => api.get("/qc", { params }),
    getById: (id) => api.get(`/qc/${id}`),
    create: (data) => api.post("/qc", data),
    getParameters: () => api.get("/qc/parameters"),
};


// Stock APIs
export const stockAPI = {
    getCurrent: (params) => api.get("/stock", { params }),
    getSummary: () => api.get("/stock/summary"),
    getLedger: (params) => api.get("/stock/ledger", { params }),
    getBatches: (params) => api.get("/stock/batches", { params }),
    adjust: (data) => api.post("/stock/adjust", data),
    getMovements: (productId) => api.get(`/stock/movements/${productId}`),
};

// Invoice APIs
export const invoicesAPI = {
    getAll: (params) => api.get("/invoices", { params }),
    getById: (id) => api.get(`/invoices/${id}`),
    getOutstanding: () => api.get("/invoices/outstanding"),
    send: (id) => api.post(`/invoices/${id}/send`),
    print: (id) => api.get(`/invoices/${id}/print`),
};


// Payment APIs
export const paymentsAPI = {
    getAll: (params) => api.get("/payments", { params }),
    getById: (id) => api.get(`/payments/${id}`),
    create: (data) => api.post("/payments", data),
    getSummary: () => api.get("/payments/summary"),
    receipt: (id) => api.get(`/payments/${id}/receipt`),
};

// User APIs
export const usersAPI = {
    getAll: (params) => api.get("/users", { params }),
    getById: (id) => api.get(`/users/${id}`),
    create: (data) => api.post("/users", data),
    update: (id, data) => api.put(`/users/${id}`, data),
    delete: (id) => api.delete(`/users/${id}`),
    toggleStatus: (id) => api.patch(`/users/${id}/toggle-status`),
    getRoles: () => api.get("/users/roles"),
    getStats: () => api.get("/users/stats"),
};


export const reportAPI = {
    // Summary
    getSummary: (params) => api.get("/reports/summary", { params }),

    // Sales Reports
    getSalesSummary: (params) => api.get("/reports/sales/summary", { params }),
    getSalesByCustomer: (params) => api.get("/reports/sales/by-customer", { params }),
    getSalesByProduct: (params) => api.get("/reports/sales/by-product", { params }),
    getSalesBySalesperson: (params) => api.get("/reports/sales/by-salesperson", { params }),
    getCustomerOutstanding: () => api.get("/reports/sales/outstanding"),

    // Purchase Reports
    getPurchaseSummary: (params) => api.get("/reports/purchase/summary", { params }),
    getPurchaseBySupplier: (params) => api.get("/reports/purchase/by-supplier", { params }),
    getPurchasePriceHistory: (params) => api.get("/reports/purchase/price-history", { params }),

    // Stock Reports
    getStockReport: (params) => api.get("/reports/stock/current", { params }),
    getStockMovement: (params) => api.get("/reports/stock/movement", { params }),
    getLowStock: () => api.get("/reports/stock/low-stock"),
    getBatchWiseStock: () => api.get("/reports/stock/batch-wise"),

    // CRM Reports
    getLeadFunnel: (params) => api.get("/reports/crm/lead-funnel", { params }),
    getLeadSource: () => api.get("/reports/crm/lead-source"),
    getQuotationConversion: (params) => api.get("/reports/crm/quotation-conversion", { params }),

    // Financial Reports
    getProfitLoss: (params) => api.get("/reports/financial/profit-loss", { params }),
    getPaymentCollection: (params) => api.get("/reports/financial/payment-collection", { params }),
};

// Enquiry APIs
export const enquiriesAPI = {
    getAll: (params) => api.get("/enquiries", { params }),
    getById: (id) => api.get(`/enquiries/${id}`),
    create: (data) => api.post("/enquiries", data),
    update: (id, data) => api.put(`/enquiries/${id}`, data),
    updateStatus: (id, status) => api.patch(`/enquiries/${id}/status`, { status }),
    delete: (id) => api.delete(`/enquiries/${id}`),
    convertToQuotation: (id) => api.post(`/enquiries/${id}/convert`),
};

export default api;