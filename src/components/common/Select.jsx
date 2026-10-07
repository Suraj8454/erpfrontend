
import { forwardRef } from 'react';

const Select = forwardRef(({ 
  label, 
  error, 
  icon: Icon,
  options, 
  className = '',
  required = false,
  ...props 
}, ref) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-xs font-medium text-gray-700 tracking-wide">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        <div className="absolute left-0 inset-y-0 flex items-center">
          <div className="flex items-center gap-2 pl-3">
            {Icon && (
              <Icon className="w-4 h-4 text-blue-500" strokeWidth={1.75} />
            )}
            <div className="w-px h-6 bg-gray-300"></div>
          </div>
        </div>
        
        <select
          ref={ref}
          className={`
            w-full py-2.5 pr-10
            pl-14
            bg-white 
            border border-gray-300 
            rounded-lg 
            text-sm text-gray-700
            appearance-none
            focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
            hover:border-gray-400
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-300 focus:ring-red-500/30 focus:border-red-400' : ''}
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;