import React, { useState } from 'react';
import { User, Phone, DollarSign, Building2, MapPin, CreditCard, ArrowLeft, Heart } from 'lucide-react';

const DonationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    amount: '',
    bankName: '',
    branchName: '',
    panNo: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDonate = () => {
    console.log('Donation submitted:', formData);
    alert('Thank you for your donation!');
  };

  const handleGoBack = () => {
    console.log('Going back...');
    alert('Going back to previous page');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Heart className="w-8 h-8 text-white" fill="currentColor" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Make a Donation</h1>
            <p className="text-blue-100">Your contribution makes a difference</p>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Mobile No</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter mobile number"
                />
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Enter Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter donation amount"
                />
              </div>
            </div>

            {/* Bank Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Bank Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter bank name"
                />
              </div>
            </div>

            {/* Branch Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Branch Name</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter branch name"
                />
              </div>
            </div>

            {/* PAN Number */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">PAN No.</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="panNo"
                  value={formData.panNo}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter PAN number"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col space-y-3 pt-4">
              <button
                onClick={handleDonate}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-6 rounded-lg font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-indigo-800 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Heart className="w-5 h-5" fill="currentColor" />
                <span>Donate Now</span>
              </button>
              
              <button
                onClick={handleGoBack}
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold border border-gray-300 hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Go Back</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Your donation is secure and makes a real impact
          </p>
        </div>
      </div>
    </div>
  );
}

export default DonationForm;