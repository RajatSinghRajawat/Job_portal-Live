import React from 'react';

const Input = React.forwardRef(({ label, id, type = 'text', error, className = '', ...props }, ref) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5 ml-0.5">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={type}
          ref={ref}
          className={`block w-full px-4 py-3 rounded-xl border ${error ? 'border-red-300 focus:ring-red-500' : 'border-slate-200 focus:ring-primary-500 focus:border-primary-500'} bg-white text-slate-900 placeholder-slate-400 transition-colors duration-200 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-500 ml-0.5 animate-pulse">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
