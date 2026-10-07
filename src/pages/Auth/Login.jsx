// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";

// export default function Login() {
//     const [email, setEmail] = useState("surajki@gmail.com");
//     const [password, setPassword] = useState("test123");
//     const [showPassword, setShowPassword] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();
//     const { login } = useAuth();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);

//         const result = await login(email, password);

//         if (result.success) {
//             navigate("/");
//         }

//         setIsLoading(false);
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
//             <div className="w-full max-w-md">
//                 {/* Logo */}
//                 <div className="text-center mb-8">
//                     <div className="flex items-center justify-center gap-2 mb-2">
//                         <span className="text-4xl">🌿</span>
//                         <h1 className="text-3xl font-bold text-blue-600">Makhana ERP</h1>
//                     </div>
//                     <p className="text-gray-500">Complete Business Management Solution</p>
//                 </div>

//                 {/* Login Card */}
//                 <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
//                     <div className="mb-6">
//                         <h2 className="text-xl font-semibold text-gray-900">Welcome Back</h2>
//                         <p className="text-sm text-gray-500 mt-1">Sign in to your account to continue</p>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-5">
//                         <div>
//                             <label className="form-label">Email Address</label>
//                             <div className="relative">
//                                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                                 <input
//                                     type="email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     placeholder="admin@makhana.com"
//                                     required
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <label className="form-label">Password</label>
//                             <div className="relative">
//                                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     placeholder="••••••••"
//                                     required
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowPassword(!showPassword)}
//                                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                                 >
//                                     {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="flex items-center justify-between">
//                             <label className="flex items-center gap-2">
//                                 <input type="checkbox" className="form-checkbox" />
//                                 <span className="text-sm text-gray-600">Remember me</span>
//                             </label>
//                             <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
//                                 Forgot Password?
//                             </a>
//                         </div>

//                         <button
//                             type="submit"
//                             disabled={isLoading}
//                             className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                         >
//                             {isLoading ? (
//                                 <>
//                                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                                     Signing in...
//                                 </>
//                             ) : (
//                                 <>
//                                     Sign In
//                                     <ArrowRight className="w-4 h-4" />
//                                 </>
//                             )}
//                         </button>

//                         <div className="relative my-6">
//                             <div className="absolute inset-0 flex items-center">
//                                 <div className="w-full border-t border-gray-200"></div>
//                             </div>
//                             <div className="relative flex justify-center text-sm">
//                                 <span className="px-4 bg-white text-gray-500">Demo Credentials</span>
//                             </div>
//                         </div>

//                         <div className="bg-gray-50 rounded-lg p-3 text-center">
//                             <p className="text-xs text-gray-500">
//                                 <span className="font-medium">Email:</span> surajki@gmail.com
//                                 <span className="mx-2">•</span>
//                                 <span className="font-medium">Password:</span> test123
//                             </p>
//                         </div>
//                     </form>
//                 </div>

//                 <p className="text-center text-xs text-gray-400 mt-6">
//                     © 2026 Makhana ERP. All rights reserved.
//                 </p>
//             </div>
//         </div>
//     );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
    Loader2,
    Leaf,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate("/");
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex bg-slate-50">
            {/* ============ LEFT PANEL — BRAND ============ */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden">
                {/* Subtle pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                        backgroundSize: "24px 24px",
                    }}
                ></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center">
                            <Leaf className="w-6 h-6 text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">Makhana </h1>
                            <p className="text-xs text-slate-400 font-medium">
                                Business Management Suite
                            </p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-6 max-w-md">
                        <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight tracking-tight">
                            Manage your
                            <br />
                            <span className="text-emerald-400">Makhana business</span>
                            <br />
                            with confidence.
                        </h2>

                        <p className="text-base text-slate-400 leading-relaxed">
                            From lead to delivery — track every step of your business
                            with a complete ERP system built for Makhana traders.
                        </p>

                        {/* Small feature list */}
                        <div className="pt-4 space-y-3">
                            {[
                                "Complete CRM & Sales workflow",
                                "Real-time stock tracking",
                                "Automated QC & reporting",
                            ].map((text, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                                    </div>
                                    <span className="text-sm text-slate-300">
                                        {text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>© 2026 Makhana ERP</span>
                        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                        <span>All rights reserved</span>
                    </div>
                </div>
            </div>

            {/* ============ RIGHT PANEL — LOGIN FORM ============ */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
                        <div className="w-11 h-11 rounded-xl bg-emerald-600 flex items-center justify-center">
                            <Leaf className="w-6 h-6 text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                Makhana ERP
                            </h1>
                            <p className="text-xs text-gray-500">
                                Business Management Suite
                            </p>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-10 shadow-sm">
                        {/* Header */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
                                Sign in
                            </h2>
                            <p className="text-sm text-gray-500 mt-1.5">
                                Welcome back! Please enter your details.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="email"
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-colors"
                                        placeholder="you@company.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <a
                                        href="#"
                                        className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="current-password"
                                        className="w-full pl-10 pr-11 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-colors"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me */}
                            <label className="flex items-center gap-2.5 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer"
                                />
                                <span className="text-sm text-gray-600">
                                    Keep me signed in
                                </span>
                            </label>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-medium text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign in
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Bottom hint */}
                        <p className="text-xs text-gray-400 text-center mt-6">
                            Need an account? Contact your administrator.
                        </p>
                    </div>

                    {/* Mobile Footer */}
                    <p className="lg:hidden text-center text-xs text-gray-400 mt-6">
                        © 2026 Makhana . All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}