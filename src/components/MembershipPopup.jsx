import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function CongratulationsPopup() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleApplyNow = () => {
    
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-medium transition-all duration-200"
        >
          Show Popup
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      
      {/* Popup Modal */}
      <div className="relative z-50 bg-white rounded-xl shadow-xl p-8 w-full max-w-md mx-4 transform transition-all duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X size={24} />
        </button>

        {/* Header with Green Accent */}
        <div className="bg-green-600 text-white text-center py-3 px-4 rounded-lg mb-6">
          <h2 className="text-lg font-bold">Congratulations!</h2>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Your 1St Step Completed
          </h1>
          <p className="text-gray-600 text-base mb-6">
            Now Apply For Membership.
          </p>
        </div>

        {/* Action Button */}
        <div className="space-y-3">
          <button
            onClick={handleApplyNow}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
          >
            Apply Now
          </button>
          
          <button
            onClick={handleClose}
            className="w-full bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 border border-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}