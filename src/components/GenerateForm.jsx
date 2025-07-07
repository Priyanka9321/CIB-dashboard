import { useEffect, useState } from 'react';
import axios from 'axios';
import CertificateTemplate1 from '../components/CertificateTemplates/CertificateTemplate1';

const GenerateForm = ({ memberId, onGenerate, onClose }) => {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    program: '',
    template: ''
  });

  useEffect(() => {
    if (memberId) {
      setLoading(true);
      setError(null);
      console.log('Fetching member data for ID:', memberId);
      axios.get(`http://localhost:5000/api/generateform/${memberId}`)
        .then(res => {
          console.log('API Response:', res);
          // Check if data is nested in a data property
          const memberData = res.data.data || res.data;
          console.log('Member data to set:', memberData);
          setMember(memberData);
        })
        .catch(err => {
          console.error('Failed to fetch member', err);
          setError('Failed to load member data');
        })
        .finally(() => setLoading(false));
    }
  }, [memberId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      regNo: member.regNo,
      memberName: member.name
    };
    console.log("Certificate Payload:", payload);
    onGenerate(payload);
  };

  if (loading) {
    return <div className="text-center p-8">Loading member data...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  if (!member) {
    return <div className="text-center p-8">No member data available</div>;
  }

  console.log('Current member state:', member);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-red-600 text-xl">&times;</button>
        <h2 className="text-xl font-bold mb-4">Generate Certificate</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Reg No</label>
            <input type="text" value={member.regNo || ''} readOnly className="w-full border px-3 py-2 rounded" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" value={member.name || ''} readOnly className="w-full border px-3 py-2 rounded" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Father's Name</label>
            <input type="text" value={member.fatherName || ''} readOnly className="w-full border px-3 py-2 rounded" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Program Name *</label>
            <input
              type="text"
              name="program"
              value={formData.program}
              onChange={handleChange}
              placeholder="e.g. Full Stack Dev"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Certificate Template *</label>
            <select
              name="template"
              value={formData.template}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select Template</option>
              <option value="CONTROLTE1">Certificate Design 1</option>
            </select>
          </div>

          {formData.template === 'CONTROLTE1' && (
            <div className="border p-4 mb-4">
              <CertificateTemplate1
                name={member.name || ''}
                regNo={member.regNo || ''}
                program={formData.program}
              />
            </div>
          )}

          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
            Generate Certificate
          </button>
        </form>
      </div>
    </div>
  );
};

export default GenerateForm;