import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const steps = [
  { path: '/checkout/address', label: 'Details & Address' },
  { path: '/checkout/delivery', label: 'Delivery' },
  { path: '/checkout/payment', label: 'Payment' },
  { path: '/checkout/confirmation', label: 'Confirmation' },
];

const CheckoutLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentStep = steps.findIndex(step => location.pathname.startsWith(step.path));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center py-8 px-2 sm:px-0 transition-colors duration-300">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-8 mb-8 mt-20 transition-colors duration-300">
        <div className="flex justify-between items-center mb-6">
          {steps.map((step, idx) => (
            <div key={step.path} className="flex-1 flex flex-col items-center">
              <button
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center mb-1 text-xs sm:text-sm font-bold transition-colors duration-200 ${
                  idx <= currentStep ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-600'
                }`}
                disabled={idx > currentStep}
                onClick={() => idx <= currentStep && navigate(step.path)}
              >
                {idx + 1}
              </button>
              <span className={`text-xs text-center px-1 ${idx === currentStep ? 'text-black dark:text-white font-semibold' : 'text-gray-400 dark:text-gray-500'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default CheckoutLayout;