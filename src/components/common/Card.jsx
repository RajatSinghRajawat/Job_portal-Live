import React from 'react';

const Card = ({ children, className = '', hover = false, ...props }) => {
  const baseStyle = 'bg-white rounded-2xl border border-slate-100 shadow-sm p-6';
  const hoverStyle = hover ? 'transition-all duration-300 hover:shadow-xl hover:shadow-indigo-50 hover:-translate-y-1 hover:border-primary-100 cursor-pointer' : '';

  return (
    <div className={`${baseStyle} ${hoverStyle} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
