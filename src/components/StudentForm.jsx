import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { supabase } from '../supabaseClient';

function StudentForm() {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    mobile: '',
    dob: '',
    receipt: '',
    admissionDate: '',
    batch: '',
    fee: '',
    notes: '',
    photo: null,
  });
  const [capture, setCapture] = useState(false);
  const webcamRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, photo: URL.createObjectURL(e.target.files[0]) }));
    }
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setFormData((prev) => ({ ...prev, photo: imageSrc }));
    setCapture(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, fatherName, mobile, dob, admissionDate, batch } = formData;

    // Validation: check required fields
    if (!name || !fatherName || !mobile || !dob || !admissionDate || !batch) {
      alert('Please fill all required fields.');
      return; // Stop submission if validation fails
    }

    // Prepare data to send
    const studentData = { ...formData };

    const { data, error } = await supabase.from('students').insert([studentData]);

    if (error) {
      console.error('❌ Supabase insert error:', error.message);
      alert('Error saving data: ' + error.message);
    } else {
      alert('✅ Form submitted and saved to Supabase!');
      setFormData({
        name: '',
        fatherName: '',
        mobile: '',
        dob: '',
        receipt: '',
        admissionDate: '',
        batch: '',
        fee: '',
        notes: '',
        photo: null,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
      <label htmlFor="name">Student's Name:</label>
      <input
        id="name"
        name="name"
        placeholder="Student's Name"
        className="input"
        onChange={handleChange}
        value={formData.name}
      />

      <label htmlFor="fatherName">Father's Name:</label>
      <input
        id="fatherName"
        name="fatherName"
        placeholder="Father's Name"
        className="input"
        onChange={handleChange}
        value={formData.fatherName}
      />

      <label htmlFor="mobile">Mobile Number:</label>
      <input
        id="mobile"
        name="mobile"
        placeholder="Mobile Number"
        className="input"
        onChange={handleChange}
        value={formData.mobile}
      />

      <label htmlFor="dob">Date of Birth:</label>
      <input
        id="dob"
        name="dob"
        type="date"
        className="input"
        onChange={handleChange}
        value={formData.dob}
      />

      <label htmlFor="receipt">Receipt Number:</label>
      <input
        id="receipt"
        name="receipt"
        placeholder="Receipt Number"
        className="input"
        onChange={handleChange}
        value={formData.receipt}
      />

      <label htmlFor="admissionDate">Admission Date:</label>
      <input
        id="admissionDate"
        name="admissionDate"
        type="date"
        className="input"
        onChange={handleChange}
        value={formData.admissionDate}
      />

      <label htmlFor="batch">Batch:</label>
      <select
        id="batch"
        name="batch"
        className="input"
        onChange={handleChange}
        value={formData.batch}
      >
        <option value="">Select Batch</option>
        <option value="Morning">Morning</option>
        <option value="Evening">Evening</option>
      </select>

      <label htmlFor="fee">Fee (optional):</label>
      <input
        id="fee"
        name="fee"
        placeholder="Fee (optional)"
        className="input"
        onChange={handleChange}
        value={formData.fee}
      />

      <label htmlFor="notes">Notes (optional):</label>
      <textarea
        id="notes"
        name="notes"
        placeholder="Notes (optional)"
        className="input"
        onChange={handleChange}
        value={formData.notes}
      ></textarea>

      <label htmlFor="photo">Upload Photo:</label>
      <input
        id="photo"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="input"
      />

      <button
        type="button"
        onClick={() => setCapture((prev) => !prev)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {capture ? 'Cancel' : 'Capture with Webcam'}
      </button>

      {capture && (
        <div className="flex flex-col items-center">
          <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="rounded" />
          <button
            type="button"
            onClick={capturePhoto}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
          >
            Capture
          </button>
        </div>
      )}

      {formData.photo && (
        <img
          src={formData.photo}
          alt="Preview"
          className="w-32 h-32 object-cover rounded border"
        />
      )}

      <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded">
        Submit
      </button>
    </form>
  );
}

export default StudentForm;

