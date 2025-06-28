import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const steps = [
  { path: '/checkout/address', label: 'Details' },
  { path: '/checkout/delivery', label: 'Delivery' },
  { path: '/checkout/payment', label: 'Payment' },
  { path: '/checkout/confirmation', label: 'Done' },
];

const CheckoutLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentStep = steps.findIndex(step => location.pathname.startsWith(step.path));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Progress Steps */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex justify-between items-center">
              {steps.map((step, idx) => (
                <div key={step.path} className="flex-1 flex flex-col items-center">
                  <button
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-1 text-sm font-bold transition-colors duration-200 ${
                      idx <= currentStep ? 'bg-black text-white border-black' : 'bg-gray-200 text-gray-400 border-gray-300'
                    }`}
                    disabled={idx > currentStep}
                    onClick={() => idx <= currentStep && navigate(step.path)}
                  >
                    {idx + 1}
                  </button>
                  <span className={`text-xs text-center ${idx === currentStep ? 'text-black font-semibold' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Content Area */}
          <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLayout;