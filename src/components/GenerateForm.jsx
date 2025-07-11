import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CertificateTemplate1 from '../components/CertificateTemplates/CertificateTemplate1';

const GenerateForm = ({ memberId, onGenerate, onClose }) => {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedData, setGeneratedData] = useState(null);
  const [showPreview, setShowPreview] = useState(false); 
  const [certificateGenerated, setCertificateGenerated] = useState(false); 

  const [formData, setFormData] = useState({
    program: '',
    template: 'CONTROLTE1', // Default template
    issueDate: new Date().toISOString().split('T')[0] // Default to today
  });

  useEffect(() => {
    if (memberId) {
      setLoading(true);
      setError(null);
      axios.get(`http://localhost:5000/api/generateform/${memberId}`)
        .then(res => {
          const memberData = res.data.data || res.data;
          setMember(memberData);
        })
        .catch(err => {
          console.error('Failed to fetch member', err);
          setError('Failed to load member data. Please try again.');
        })
        .finally(() => setLoading(false));
    }
  }, [memberId]);

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));

  if (name === "program") {
    setShowPreview(true);
    setCertificateGenerated(false); // Reset generation state if user retypes
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();

  if (certificateGenerated) return; // Avoid duplicate submission

  try {
    const payload = {
      userId: member.userId,
      programName: formData.program,
      templateName: "Certificate Design 1"
    };

    const res = await axios.post('http://localhost:5000/api/certificatepost', payload);

    const certificateData = {
      name: res.data.fullName,
      regNo: res.data.regNo,
      program: res.data.programName,
      certNo: res.data.certificateNo,
      issueDate: res.data.issueDate,
    };

    setGeneratedData(certificateData);
    setCertificateGenerated(true); // Lock it after generation

    // 🔥 Increment totalCertificates count
    await axios.patch(`http://localhost:5000/api/certificateTotal/${member.userId}`);

    toast.success("🎉 Certificate generated successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

  } catch (err) {
    console.error("Certificate creation failed", err);
    toast.error("❌ Certificate generation failed!");
  }
};





  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading member data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg max-w-md">
          <div className="text-red-500 mb-4">{error}</div>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg">
          <p>No member data available</p>
          <button 
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Generate Certificate</h2>

  

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Registration Number</label>
              <input 
                type="text" 
                value={member.regNo || 'N/A'} 
                readOnly 
                className="w-full border border-gray-300 px-4 py-2 rounded bg-gray-50" 
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input 
                type="text" 
                value={member.name || 'N/A'} 
                readOnly 
                className="w-full border border-gray-300 px-4 py-2 rounded bg-gray-50" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Father's Name</label>
              <input 
                type="text" 
                value={member.fatherName || 'N/A'} 
                readOnly 
                className="w-full border border-gray-300 px-4 py-2 rounded bg-gray-50" 
              />
            </div>

            {/* <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Issue Date *</label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded"
                required
              />
            </div> */}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Program Name *</label>
            <input
              type="text"
              name="program"
              value={formData.program}
              onChange={handleChange}
              placeholder="e.g. Full Stack Development Program"
              className="w-full border border-gray-300 px-4 py-2 rounded"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Certificate Template *</label>
            <select
              name="template"
              value={formData.template}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded"
              required
            >
              <option value="CONTROLTE1">Certificate Design 1</option>
              {/* Add more templates as needed */}
            </select>
          </div>

        {formData.template === 'CONTROLTE1' && (
  <div className="border border-gray-200 p-4 mb-6 rounded-lg bg-gray-50">
    <h3 className="font-medium text-gray-700 mb-3">Preview:</h3>
    <div className="scale-90 origin-top">
      {showPreview && (
        <CertificateTemplate1
          name={member.name}
          regNo={member.regNo}
          program={formData.program}
          issueDate={formData.issueDate}
          certNo="TEMP-CERT-000" // Or just leave it blank
        />
      )}
    </div>
  </div>
)}




          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Generate Certificate
            </button>
          </div>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />

      </div>
    </div>
  );
};

export default GenerateForm;