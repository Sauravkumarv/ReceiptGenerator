import React from 'react'

const FormSection = ({ 
  title, 
  description,
  icon: Icon,
  children, 
  className = '' 
}) => {
  return (
    <div className={`mb-6 p-6 bg-gray-50 rounded-xl border border-gray-200 ${className}`}>
      <div className="flex items-center mb-4">
        {Icon && <Icon className="h-5 w-5 text-primary-600 mr-2" />}
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      {description && (
        <p className="text-sm text-gray-600 mb-4">{description}</p>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

export default FormSection