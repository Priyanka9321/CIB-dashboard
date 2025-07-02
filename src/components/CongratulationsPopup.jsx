import { X } from 'lucide-react';
import { usePopup } from '../context/PopupContext';

export default function CongratulationsPopup() {
  const { isPopupOpen, handleClose, handleApplyNow } = usePopup();

  if (!isPopupOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
      {/* Popup Modal with matching gradient background */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4 fixed inset-0">
        <div className="relative z-50 bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4 transform transition-all duration-300">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X size={24} />
          </button>

          {/* Header with Green Success Banner - matching ResetPasswordForm style */}
          <div className="text-center mb-6">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg mb-4 text-sm font-medium">
              Congratulations! Your 1st Step Completed ✓
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Apply For Membership</h1>
            <p className="text-sm text-gray-600">Crime Investigation Bureau</p>
          </div>

          {/* Content */}
          <div className="text-center mb-6">
            <p className="text-gray-600 text-base">
              You have successfully completed your first step. Now proceed to apply for your membership to continue.
            </p>
          </div>

          {/* Action Buttons - matching ResetPasswordForm button styles */}
          <div className="space-y-4">
            <div className="pt-2">
              <button
                onClick={handleApplyNow}
                className="w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 bg-green-600 hover:bg-green-700 hover:shadow-lg text-white"
              >
                Apply Now
              </button>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}