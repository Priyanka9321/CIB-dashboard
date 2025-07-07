import React from 'react';

const CertificateTemplate1 = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg shadow-2xl">
      {/* Main Certificate Container */}
      <div className="bg-white rounded-lg p-8 shadow-inner relative">
        
        {/* Header Section with Images */}
        <div className="flex justify-between items-start mb-8">
          {/* Left Image Placeholder */}
          <div className="w-20 h-16 bg-gray-200 rounded border-2 border-gray-300 flex items-center justify-center">
            <div className="w-16 h-12 bg-gray-100 rounded"></div>
          </div>
          
          {/* Right QR Code Area */}
          <div className="text-right">
            <div className="w-16 h-16 bg-gray-100 border border-gray-300 rounded mb-2"></div>
            <p className="text-xs text-gray-600 font-medium">Scan To Verify Certificate</p>
          </div>
        </div>

        {/* Certificate Title */}
        <div className="text-center mb-8">
          <div className="inline-block">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full mb-4 transform -skew-x-12">
              <h1 className="text-3xl font-bold tracking-wide transform skew-x-12">CERTIFICATE</h1>
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full transform -skew-x-12">
              <p className="text-lg font-semibold tracking-wider transform skew-x-12">OF ACHIEVEMENT</p>
            </div>
          </div>
        </div>

        {/* Presented To Section */}
        <div className="text-center mb-12">
          <p className="text-gray-700 font-semibold text-lg mb-4 tracking-wide">PRESENTED TO</p>
          <div className="border-b-2 border-purple-300 w-80 mx-auto mb-8"></div>
          
          {/* Recipient Name Area */}
          <div className="h-16 mb-8"></div>
          
          {/* Signature Line */}
          <div className="w-48 mx-auto">
            <div className="border-b border-gray-400 mb-2"></div>
          </div>
        </div>

        {/* Seal/Badge */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full"></div>
              </div>
            </div>
            {/* Seal rays */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 border-4 border-purple-400 rounded-full opacity-50 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Footer Information */}
        <div className="flex justify-between items-end text-sm text-gray-600">
          <div>
            <p className="font-semibold mb-1">Reg No:</p>
            <p className="font-medium text-purple-600">Visit Website:</p>
          </div>
          <div className="text-right">
            <p className="font-semibold mb-1">Certificate Number:</p>
            <p className="font-semibold">Issue Date:</p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20"></div>
        <div className="absolute top-8 right-8 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20"></div>
        <div className="absolute bottom-4 left-8 w-4 h-4 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-20"></div>
        <div className="absolute bottom-8 right-4 w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-20"></div>
      </div>
    </div>
  );
};

export default CertificateTemplate1;