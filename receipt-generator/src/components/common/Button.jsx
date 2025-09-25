import React from 'react'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  icon: Icon, 
  className = '',
  disabled = false,
  type = 'button',
  loading = false,
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 disabled:bg-primary-300',
    success: 'bg-success-500 text-white hover:bg-success-600 disabled:bg-success-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300',
    gradient: 'bg-gradient-to-r from-primary-600 to-purple-600 text-white hover:from-primary-700 hover:to-purple-700',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white'
  }

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
    full: 'w-full py-3'
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        rounded-lg transition-all duration-200 font-semibold 
        flex items-center justify-center gap-2 
        disabled:cursor-not-allowed disabled:opacity-50
        hover:shadow-lg transform hover:-translate-y-0.1 hover:scale-100
        active:scale-95
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        ${loading ? 'cursor-wait' : ''}
        ${className}
        relative overflow-hidden
      `}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
      ) : (
        <>
          {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">{children}</span>
        </>
      )}
    </button>
  )
}

export default Button