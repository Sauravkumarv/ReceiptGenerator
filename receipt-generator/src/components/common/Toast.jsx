// src/components/common/Toast.jsx - Unacademy Style
import { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // 4 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyles = () => {
    if (type === "success") {
      return {
        bg: "bg-white",
        textColor: "text-gray-800",
        icon: "✅",
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        border: "border-gray-200"
      };
    } else {
      return {
        bg: "bg-white",
        textColor: "text-gray-800", 
        icon: "❌",
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        border: "border-gray-200"
      };
    }
  };

  const styles = getToastStyles();

  return (
    <div
      className={`fixed top-6 right-6 ${styles.bg} ${styles.textColor} px-4 py-3 rounded-xl 
      shadow-lg ${styles.border} border z-[9999] max-w-sm min-w-[280px]
      transform transition-all duration-300 ease-out animate-slide-in-right`}
      style={{
        animation: 'slideInDown 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)'
      }}
    >
      {/* Content */}
      <div className="flex items-center space-x-3">
        {/* Green Check Icon */}
        <div className={`${styles.iconBg} ${styles.iconColor} rounded-full p-1 flex-shrink-0`}>
          <svg 
            className="w-4 h-4" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        
        {/* Message */}
        <div className="flex-1">
          <p className="font-medium text-sm leading-tight">
            {message}
          </p>
        </div>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 ml-2
          hover:bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center text-xs"
        >
          ×
        </button>
      </div>

      {/* Progress Bar - Time Indicator */}
      <div className="mt-3 h-0.5 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-green-500 rounded-full animate-progress"
          style={{
            animation: 'progress 4s linear forwards'
          }}
        />
      </div>

      {/* Inline Keyframes */}
      <style jsx>{`
        @keyframes slideInDown {
          from {
            transform: translateY(-100%) translateX(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0) translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;