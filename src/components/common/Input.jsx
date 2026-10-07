
import { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  error, 
  className = '', 
  icon: Icon,
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
        
        <input
          ref={ref}
          className={`
            w-full py-2.5 
            pl-14 pr-3.5
            bg-white 
            border border-gray-300 
            rounded-lg 
            text-sm text-gray-700
            placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
            hover:border-gray-400
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-300 focus:ring-red-500/30 focus:border-red-400' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;