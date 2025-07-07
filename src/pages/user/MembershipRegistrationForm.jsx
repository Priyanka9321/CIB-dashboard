import React, { useState } from "react";
import {
  User,
  Users,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  CreditCard,
  MapPin,
  Building,
  Camera,
  Send,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Droplet,
} from "lucide-react";

const Toast = ({ message, type, onClose, downloadLinks }) => {
  const bgColor = type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800";
  const Icon = type === "success" ? CheckCircle : AlertCircle;

  return (
    <div className={`fixed top-4 right-4 ${bgColor} border px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm`}>
      <div className="flex items-center">
        <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
          {downloadLinks && (
            <div className="mt-2">
              <a href={downloadLinks.form} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                Download Form PDF
              </a>
              <br />
              <a href={downloadLinks.idCard} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                Download ID Card PDF
              </a>
            </div>
          )}
        </div>
        <button onClick={onClose} className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const MembershipRegistrationForm = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    email: "",
    mobileNo: "",
    qualification: "",
    dob: "",
    uniqueId: "",
    address: "",
    memberDivision: "",
    memberWorkLocation: "",
    validTill: "",
    bloodGroup: "",
    memberDesignation: "",
    profilePic: null,
    signature: null,
    formType: "membership", // Default value, adjust as needed
  });

  const [profilePreview, setProfilePreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAllFieldsError, setShowAllFieldsError] = useState(false);
  const [toast, setToast] = useState(null);

  const designationOptions = [
    { value: "", label: "Select Designation" },
    { value: "director", label: "Director" },
    { value: "secretary", label: "Secretary" },
    { value: "president", label: "President" },
    { value: "vice-president", label: "Vice President" },
    { value: "treasurer", label: "Treasurer" },
    { value: "member", label: "Member" },
    { value: "volunteer", label: "Volunteer" },
    { value: "social-worker", label: "Social Worker" },
  ];

  const bloodGroupOptions = [
    { value: "", label: "Select Blood Group" },
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];

  const showToast = (message, type, downloadLinks = null) => {
    setToast({ message, type, downloadLinks });
    setTimeout(() => {
      setToast(null);
    }, 10000); // Increased timeout to allow downloading PDFs
  };

  const closeToast = () => {
    setToast(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (showAllFieldsError) {
      setShowAllFieldsError(false);
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        const errorMsg = "File size should be less than 5MB";
        setErrors((prev) => ({
          ...prev,
          [field]: errorMsg,
        }));
        showToast(errorMsg, "error");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        const errorMsg = "Please select a valid image file";
        setErrors((prev) => ({
          ...prev,
          [field]: errorMsg,
        }));
        showToast(errorMsg, "error");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [field]: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === "profilePic") {
          setProfilePreview(reader.result);
        } else if (field === "signature") {
          setSignaturePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);

      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      }

      if (showAllFieldsError) {
        setShowAllFieldsError(false);
      }

      showToast(`${field === "profilePic" ? "Profile picture" : "Signature"} uploaded successfully!`, "success");
    }
  };

  const checkIfFormEmpty = () => {
    const requiredFields = [
      "fullName",
      "fatherName",
      "email",
      "mobileNo",
      "qualification",
      "dob",
      "uniqueId",
      "address",
      "memberDesignation",
    ];
    return requiredFields.every((field) => !formData[field]?.toString().trim());
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required";
    }

    if (!formData.fatherName.trim()) {
      newErrors.fatherName = "Father's name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNo.replace(/\D/g, ""))) {
      newErrors.mobileNo = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.qualification.trim()) {
      newErrors.qualification = "Qualification is required";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }

    if (!formData.uniqueId.trim()) {
      newErrors.uniqueId = "Aadhar number is required";
    } else if (!/^\d{12}$/.test(formData.uniqueId.replace(/\D/g, ""))) {
      newErrors.uniqueId = "Please enter a valid 12-digit Aadhar number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.memberDesignation) {
      newErrors.memberDesignation = "Please select a designation";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (checkIfFormEmpty()) {
      setShowAllFieldsError(true);
      showToast("All required fields must be filled!", "error");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setShowAllFieldsError(false);

    if (!validateForm()) {
      showToast("Please fix the errors in the form before submitting.", "error");
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "profilePic" && key !== "signature") {
          formDataToSend.append(key, formData[key]);
        }
      });
      if (formData.profilePic) {
        console.log("Uploading profilePic:", formData.profilePic);
        formDataToSend.append("photoPath", formData.profilePic);
      } else {
        showToast("Profile picture is required!", "error");
        setIsLoading(false);
        return;
      }
      if (formData.signature) {
        console.log("Uploading signature:", formData.signature);
        formDataToSend.append("signaturePath", formData.signature);
      }

      // Log FormData contents
      console.log("FormData contents:");
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value instanceof File ? value.name : value);
      }

      const response = await fetch(`${baseURL}/auth/registerform`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        throw new Error(`Server returned ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      showToast("Membership Registration submitted successfully!", "success", {
        form: result.downloadForm,
        idCard: result.downloadIDCard,
      });

      // Reset form
      setFormData({
        fullName: "",
        fatherName: "",
        email: "",
        mobileNo: "",
        qualification: "",
        dob: "",
        uniqueId: "",
        address: "",
        memberDivision: "",
        memberWorkLocation: "",
        validTill: "",
        bloodGroup: "",
        memberDesignation: "",
        profilePic: null,
        signature: null,
        formType: "membership",
      });
      setProfilePreview(null);
      setSignaturePreview(null);
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast(`Failed to submit registration: ${error.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          downloadLinks={toast.downloadLinks}
          onClose={closeToast}
        />
      )}

      <div className="bg-white shadow-xl p-8 w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Membership Registration</h1>
        </div>

        {showAllFieldsError && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            All required fields must be filled!
          </div>
        )}

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Picture */}
            <div className="md:col-span-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Camera className="w-4 h-4 mr-2 text-blue-600" />
                Profile Picture <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 overflow-hidden bg-gray-100 border-2 border-gray-300 flex-shrink-0">
                  {profilePreview ? (
                    <img src={profilePreview} alt="Profile Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <label
                    className={`flex items-center justify-center px-4 py-3 border-2 border-dashed cursor-pointer hover:bg-gray-50 transition-colors ${errors.profilePic ? "border-red-500" : "border-gray-300"
                      }`}
                  >
                    <Upload className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {formData.profilePic ? formData.profilePic.name : "Choose image file"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "profilePic")}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                </div>
              </div>
              {errors.profilePic && <p className="text-red-500 text-sm mt-1">{errors.profilePic}</p>}
            </div>

            {/* Signature */}
            <div className="md:col-span-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Camera className="w-4 h-4 mr-2 text-blue-600" />
                Signature
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 overflow-hidden bg-gray-100 border-2 border-gray-300 flex-shrink-0">
                  {signaturePreview ? (
                    <img src={signaturePreview} alt="Signature Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <label
                    className={`flex items-center justify-center px-4 py-3 border-2 border-dashed cursor-pointer hover:bg-gray-50 transition-colors ${errors.signature ? "border-red-500" : "border-gray-300"
                      }`}
                  >
                    <Upload className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {formData.signature ? formData.signature.name : "Choose image file"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "signature")}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                </div>
              </div>
              {errors.signature && <p className="text-red-500 text-sm mt-1">{errors.signature}</p>}
            </div>

            {/* Full Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2 text-blue-600" />
                Full Name <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Enter your full name"
                required
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            {/* Father Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2 text-blue-600" />
                Father Name <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.fatherName ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Enter father's name"
                required
              />
              {errors.fatherName && <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 mr-2 text-blue-600" />
                Email <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Enter your email address"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 mr-2 text-blue-600" />
                Mobile Number <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.mobileNo ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Enter 10-digit mobile number"
                required
              />
              {errors.mobileNo && <p className="text-red-500 text-sm mt-1">{errors.mobileNo}</p>}
            </div>

            {/* Qualification */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
                Qualification <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.qualification ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Enter your qualification"
                required
              />
              {errors.qualification && <p className="text-red-500 text-sm mt-1">{errors.qualification}</p>}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                Date of Birth <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.dob ? "border-red-500" : "border-gray-300"
                  }`}
                required
              />
              {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
            </div>

            {/* Aadhar Number */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
                Aadhar Number <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="uniqueId"
                value={formData.uniqueId}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.uniqueId ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Enter 12-digit Aadhar number"
                maxLength="12"
                required
              />
              {errors.uniqueId && <p className="text-red-500 text-sm mt-1">{errors.uniqueId}</p>}
            </div>

            {/* Blood Group */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Droplet className="w-4 h-4 mr-2 text-blue-600" />
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.bloodGroup ? "border-red-500" : "border-gray-300"
                  }`}
              >
                {bloodGroupOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.bloodGroup && <p className="text-red-500 text-sm mt-1">{errors.bloodGroup}</p>}
            </div>

            {/* Member Division */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Building className="w-4 h-4 mr-2 text-blue-600" />
                Member Division
              </label>
              <input
                type="text"
                name="memberDivision"
                value={formData.memberDivision}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.memberDivision ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Enter member division"
              />
              {errors.memberDivision && <p className="text-red-500 text-sm mt-1">{errors.memberDivision}</p>}
            </div>

            {/* Member Work Location */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Building className="w-4 h-4 mr-2 text-blue-600" />
                Member Work Location
              </label>
              <input
                type="text"
                name="memberWorkLocation"
                value={formData.memberWorkLocation}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.memberWorkLocation ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Enter work location"
              />
              {errors.memberWorkLocation && <p className="text-red-500 text-sm mt-1">{errors.memberWorkLocation}</p>}
            </div>

            {/* Valid Till */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                Valid Till
              </label>
              <input
                type="date"
                name="validTill"
                value={formData.validTill}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.validTill ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.validTill && <p className="text-red-500 text-sm mt-1">{errors.validTill}</p>}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 mr-2 text-blue-600" />
              Complete Address <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none ${errors.address ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter your complete residential address"
              required
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          {/* Designation */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 mr-2 text-blue-600" />
              Select Designation <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="memberDesignation"
              value={formData.memberDesignation}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.memberDesignation ? "border-red-500" : "border-gray-300"
                }`}
              required
            >
              {designationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.memberDesignation && <p className="text-red-500 text-sm mt-1">{errors.memberDesignation}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className={`flex items-center justify-center px-8 py-3 font-medium transition-all duration-200 ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
                } text-white`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting Registration...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit Registration
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipRegistrationForm;