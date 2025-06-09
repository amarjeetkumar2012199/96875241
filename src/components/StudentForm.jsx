import React, { useState } from 'react';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [batch, setBatch] = useState('');
  const [receipt, setReceipt] = useState('');
  const [fee, setFee] = useState('');
  const [notes, setNotes] = useState('');
  const [photo, setPhoto] = useState(null); // Optional

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !fatherName || !mobile || !dob || !admissionDate || !batch) {
      alert('Please fill all required fields!');
      return;
    }
    // Submit Logic here
    console.log('Form Submitted:', {
      name, fatherName, mobile, dob, admissionDate, batch, receipt, fee, notes, photo
    });
    alert('Form submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Name<span className="text-red-500">*</span></label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
          className="border p-2 w-full" />
      </div>

      <div>
        <label>Father's Name<span className="text-red-500">*</span></label>
        <input type="text" value={fatherName} onChange={(e) => setFatherName(e.target.value)} required
          className="border p-2 w-full" />
      </div>

      <div>
        <label>Mobile Number<span className="text-red-500">*</span></label>
        <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required
          className="border p-2 w-full" />
      </div>

      <div>
        <label>Date of Birth<span className="text-red-500">*</span></label>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required
          className="border p-2 w-full" />
      </div>

      <div>
        <label>Admission Date<span className="text-red-500">*</span></label>
        <input type="date" value={admissionDate} onChange={(e) => setAdmissionDate(e.target.value)} required
          className="border p-2 w-full" />
      </div>

      <div>
        <label>Batch<span className="text-red-500">*</span></label>
        <input type="text" value={batch} onChange={(e) => setBatch(e.target.value)} required
          className="border p-2 w-full" />
      </div>

      <div>
        <label>Receipt Number (Optional)</label>
        <input type="text" value={receipt} onChange={(e) => setReceipt(e.target.value)}
          className="border p-2 w-full" />
      </div>

      <div>
        <label>Fee (Optional)</label>
        <input type="number" value={fee} onChange={(e) => setFee(e.target.value)}
          className="border p-2 w-full" />
      </div>

      <div>
        <label>Notes (Optional)</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
          className="border p-2 w-full"></textarea>
      </div>

      <div>
        <label>Photo (Optional)</label>
        <input type="file" onChange={(e) => setPhoto(e.target.files[0])}
          className="border p-2 w-full" />
      </div>

      <button type="submit"
        disabled={!name || !fatherName || !mobile || !dob || !admissionDate || !batch}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50">
        Submit
      </button>
    </form>
  );
};

export default StudentForm;
