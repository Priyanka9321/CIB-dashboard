import React, { useState } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Download,
  QrCode,
  IdCard,
  Camera,
  Edit3,
  Save,
} from "lucide-react";

const GenerateIdCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Vaithi जी",
    idNo: "MBR-17",
    mobNo: "1234567890",
    email: "anushkawinggosoft@gmail.com",
    city: "Lucknow",
    joiningDate: "26-12-2024",
    validityDate: "26-12-2025",
  });

  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* ID Card Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl">
                <IdCard className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Your ID Card</h2>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg"
            >
              {isEditing ? (
                <Save className="w-5 h-5" />
              ) : (
                <Edit3 className="w-5 h-5" />
              )}
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          {/* ID Cards Display */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Front Side */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl p-6 text-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="text-center mb-6">
                <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold mb-4">
                  Registration No: MH/2021/0277920
                </div>

                <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">श्री</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2">
                  Shri Ram Navyug Trust
                </h3>
                <p className="text-blue-200 text-sm">
                  www.shriramnavyugtrust.org
                </p>
              </div>

              <div className="flex gap-6 mb-6">
                {/* Profile Photo */}
                <div className="relative">
                  <div className="w-24 h-28 bg-gradient-to-br from-blue-300 to-blue-500 rounded-lg flex items-center justify-center border-4 border-white shadow-lg">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <button className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-lg">
                    <Camera className="w-4 h-4 text-blue-600" />
                  </button>
                </div>

                {/* QR Code */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-gray-800" />
                  </div>
                </div>
              </div>

              <div className="text-center mb-6">
                {isEditing ? (
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg px-4 py-2 text-white placeholder-blue-200 text-center text-xl font-bold w-full"
                  />
                ) : (
                  <h4 className="text-xl font-bold">{userInfo.name}</h4>
                )}
              </div>

              {/* Details */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-200">ID No</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userInfo.idNo}
                      onChange={(e) =>
                        handleInputChange("idNo", e.target.value)
                      }
                      className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded px-2 py-1 text-white text-right w-24"
                    />
                  ) : (
                    <span className="font-semibold">{userInfo.idNo}</span>
                  )}
                </div>

                <div className="flex justify-between">
                  <span className="text-blue-200">Mob No</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userInfo.mobNo}
                      onChange={(e) =>
                        handleInputChange("mobNo", e.target.value)
                      }
                      className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded px-2 py-1 text-white text-right w-32"
                    />
                  ) : (
                    <span className="font-semibold">{userInfo.mobNo}</span>
                  )}
                </div>

                <div className="flex justify-between">
                  <span className="text-blue-200">Email</span>
                  {isEditing ? (
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded px-2 py-1 text-white text-right w-48"
                    />
                  ) : (
                    <span className="font-semibold text-xs">
                      {userInfo.email}
                    </span>
                  )}
                </div>

                <div className="flex justify-between">
                  <span className="text-blue-200">City</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userInfo.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded px-2 py-1 text-white text-right w-24"
                    />
                  ) : (
                    <span className="font-semibold">{userInfo.city}</span>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-blue-400 text-center">
                <div className="text-xs text-blue-200 mb-2">
                  Rajkumar Maurya Maurya
                </div>
                <div className="text-xs text-blue-200">
                  (President / Founder)
                </div>
              </div>

              <div className="mt-4 text-center text-xs text-blue-200">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    +91 85648 53303
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    info@shriramnavyugtrust.org
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  Ekta Nagar PGI Lucknow
                </div>
              </div>
            </div>

            {/* Back Side - Terms & Conditions */}
            <div className="bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl p-6 text-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="text-center mb-6">
                <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold mb-4">
                  Registration No: MH/2021/0277920
                </div>

                <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">श्री</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2">
                  Shri Ram Navyug Trust
                </h3>
                <p className="text-slate-300 text-sm">
                  www.shriramnavyugtrust.org
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-lg text-center font-bold text-lg mb-6">
                TERMS &amp; CONDITIONS
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="font-semibold text-yellow-300">
                    Identification:
                  </span>
                  <span className="ml-2">
                    Carry the ID card at all times during working hours for
                    identification purposes.
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-yellow-300">
                    Authorized Use:
                  </span>
                  <span className="ml-2">
                    The ID card is strictly for official use and should not be
                    shared or used for unauthorized purposes.
                  </span>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-500">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2 text-green-300">
                        <Calendar className="w-4 h-4" />
                        <span className="font-semibold">Joining:</span>
                        {isEditing ? (
                          <input
                            type="text"
                            value={userInfo.joiningDate}
                            onChange={(e) =>
                              handleInputChange("joiningDate", e.target.value)
                            }
                            className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded px-2 py-1 text-white w-24 text-xs"
                          />
                        ) : (
                          <span>{userInfo.joiningDate}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-red-300 mt-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-semibold">Validity:</span>
                        {isEditing ? (
                          <input
                            type="text"
                            value={userInfo.validityDate}
                            onChange={(e) =>
                              handleInputChange("validityDate", e.target.value)
                            }
                            className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded px-2 py-1 text-white w-24 text-xs"
                          />
                        ) : (
                          <span>{userInfo.validityDate}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center text-xs text-slate-300">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    +91 85648 53303
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    info@shriramnavyugtrust.org
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  Ekta Nagar PGI Lucknow
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mt-8 gap-4">
            {isEditing && (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            )}

            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg">
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Profile</h3>
                <p className="text-gray-600">Member since 2024</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl">
                <IdCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  ID Status
                </h3>
                <p className="text-green-600 font-medium">Active</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Validity
                </h3>
                <p className="text-gray-600">Until 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateIdCard;
