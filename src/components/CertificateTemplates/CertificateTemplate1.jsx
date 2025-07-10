import React from "react";

const CertificateTemplate1 = ({
  name,
  program,
  regNo,
  certNo,
  issueDate,
  qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://shriramnavyugtrust.org/verify/${certNo}`
})=> {
  return (
    <div className="w-full max-w-[800px] mx-auto bg-white shadow-lg">
      {/* Outer border with gradient */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 p-1.5 rounded-lg">
        {/* Inner certificate area */}
        <div className="bg-white p-8 rounded border-2 border-purple-300 relative overflow-hidden">
          
          {/* Watermark */}
          <div className="absolute inset-0 opacity-10 z-0">
            <div className="flex items-center justify-center h-full">
              <div className="text-[200px] font-bold text-gray-300 rotate-[-20deg]">SRNT</div>
            </div>
          </div>
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 relative z-10">
            {/* Logo */}
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center border-2 border-orange-400 mb-4 md:mb-0">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">SRNT</span>
              </div>
            </div>
            
            {/* Title Section */}
            <div className="text-center mx-4 order-first md:order-none mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-1 rounded-full inline-block mb-2">
                <h2 className="text-md font-bold">Shri Ram Navyug Trust</h2>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-1">CERTIFICATE</h1>
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full inline-block">
                <p className="text-xs font-medium tracking-widest">OF ACHIEVEMENT</p>
              </div>
            </div>
            
            {/* QR Code Section */}
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-gray-300 rounded bg-white flex items-center justify-center mb-1">
                <img src={qrCodeUrl} alt="QR Code" className="w-14 h-14" />
              </div>
              <p className="text-xs text-gray-600">Scan To Verify</p>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="text-center mt-8 mb-8 relative z-10">
            <p className="text-sm font-medium text-gray-700 mb-4">THIS CERTIFICATE IS PROUDLY PRESENTED TO</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 uppercase">{name}</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              For successfully completing the <span className="font-bold text-purple-700">{program}</span>
              <br />
              program organized by <span className="font-bold text-gray-900">Shri Ram Navyug Trust</span>
            </p>
          </div>
          
          {/* Signature and Seal Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-12 mb-8 relative z-10">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <div className="mb-3">
                <div className="w-40 h-0.5 bg-gray-400 mx-auto md:mx-0"></div>
              </div>
              <p className="font-bold text-gray-800">Rajkumar Maurya</p>
              <p className="text-sm text-gray-600">President / Founder</p>
              <p className="text-sm text-gray-600">Shri Ram Navyug Trust</p>
            </div>
            
            {/* Decorative Seal */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-purple-700 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">SRNT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Information */}
          <div className="border-t border-purple-300 pt-4 mt-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-2 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="mb-1">
                  <span className="font-bold text-purple-700">Reg No:</span> {regNo || 'N/A'}
                </p>
                <p>
                  <span className="font-bold text-purple-700">Website:</span>{" "}
                  <span className="text-blue-600">www.shriramnavyugtrust.org</span>
                </p>
              </div>
              <div className="text-center md:text-right">
                <p className="mb-1">
                  <span className="font-bold text-purple-700">Certificate No:</span> {certNo}
                </p>
                <p>
                  <span className="font-bold text-purple-700">IssueDate:</span> {issueDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplate1;