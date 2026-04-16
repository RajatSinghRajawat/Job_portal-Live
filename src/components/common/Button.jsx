import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-indigo-600 text-white hover:from-primary-700 hover:to-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 focus:ring-indigo-500 transform hover:-translate-y-0.5',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:border-primary-200 hover:bg-slate-50 focus:ring-slate-200',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-600',
    ghost: 'text-slate-600 hover:text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const sizeClass = props.size ? sizes[props.size] : sizes.md;

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizeClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
