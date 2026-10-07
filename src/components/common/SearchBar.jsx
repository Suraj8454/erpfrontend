
import { Search, X } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar({ 
  placeholder = 'Search...', 
  value, 
  onChange, 
  onSearch,
  className = '',
  autoFocus = false,
  showClear = true,
  debounce = 300
}) {
  const [localValue, setLocalValue] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange?.(e);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange?.({ target: { value: '' } });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(localValue);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
          isFocused ? 'text-primary-500' : 'text-gray-400'
        }`}>
          <Search className="w-4 h-4" strokeWidth={1.75} />
        </div>
        
        <input
          type="text"
          placeholder={placeholder}
          value={value !== undefined ? value : localValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoFocus={autoFocus}
          className={`
            w-full pl-11 pr-11 py-2.5 
            bg-white/50 backdrop-blur-sm 
            border rounded-lg 
            text-sm text-gray-700
            placeholder:text-gray-400
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400
            hover:border-gray-300/80
            ${isFocused ? 'border-primary-300/80' : 'border-gray-200/80'}
          `}
        />

        {showClear && (value || localValue) && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {isFocused && (value || localValue) && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/60 py-1.5 z-50 animate-fadeIn">
          <div className="px-4 py-1.5 text-xs text-gray-400 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-400"></span>
            Press Enter to search
          </div>
        </div>
      )}
    </div>
  );
}