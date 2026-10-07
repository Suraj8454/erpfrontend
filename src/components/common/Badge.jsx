
export default function Badge({ children, variant = 'default', className = '', size = 'md' }) {
  const variants = {
    default: 'bg-gray-100 text-gray-700 border-gray-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    primary: 'bg-primary-50 text-primary-700 border-primary-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  };

  return (
    <span className={`
      inline-flex items-center 
      ${sizes[size]} 
      rounded-full 
      font-medium 
      border
      ${variants[variant]} 
      ${className}
      transition-all duration-200
    `}>
      {children}
    </span>
  );
}