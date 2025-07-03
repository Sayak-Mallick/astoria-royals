import React, { useState } from 'react';

const initialState = {
  FirstName: '',
  MobileNo: '',
  Email: '',
  Preferences: '',
  Remark: '',
};

const preferencesOptions = [
  '',
  '1 BHK',
  '2 BHK',
  '3 BHK',
];

const LeadForm = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.FirstName.trim()) return 'Name is required.';
    if (!/^\d{10}$/.test(form.MobileNo)) return 'Valid 10-digit Phone Number required.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.Email)) return 'Valid Email required.';
    if (!form.Preferences) return 'Please select a preference.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    const validationMsg = validate();
    if (validationMsg) {
      setError(validationMsg);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Thank you! Your enquiry has been submitted.');
        setForm(initialState);
      } else {
        setError(data.message || 'Submission failed.');
      }
    } catch (err) {
      console.log(err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full flex justify-center bg-black py-12 px-2">
      <form
        className="w-full max-w-md border border-[#d4af37] bg-black text-white p-8 flex flex-col gap-5 shadow-xl"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl md:text-3xl font-serif text-[#d4af37] mb-6 text-left leading-tight tracking-wide uppercase">
          THE SUITE LIFE UPGRADE<br />YOU'VE BEEN WAITING<br />FOR IS HERE
        </h3>
        {success && <div className="text-green-400 text-left text-sm mb-2">{success}</div>}
        {error && <div className="text-red-400 text-left text-sm mb-2">{error}</div>}
        <div className="flex flex-col gap-1">
          <label htmlFor="FirstName" className="text-sm font-light">Name*</label>
          <input
            type="text"
            name="FirstName"
            id="FirstName"
            placeholder="Enter your name"
            className="bg-black border border-[#d4af37] rounded-none px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            value={form.FirstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="Email" className="text-sm font-light">Email*</label>
          <input
            type="email"
            name="Email"
            id="Email"
            placeholder="Enter your email"
            className="bg-black border border-[#d4af37] rounded-none px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            value={form.Email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="MobileNo" className="text-sm font-light">Phone Number*</label>
          <input
            type="tel"
            name="MobileNo"
            id="MobileNo"
            placeholder="Enter your phone number"
            className="bg-black border border-[#d4af37] rounded-none px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            value={form.MobileNo}
            onChange={handleChange}
            required
            maxLength={10}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="Preferences" className="text-sm font-light">Preferences*</label>
          <select
            name="Preferences"
            id="Preferences"
            className="bg-black border border-[#d4af37] rounded-none px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            value={form.Preferences}
            onChange={handleChange}
            required
          >
            {preferencesOptions.map((opt) => (
              <option key={opt} value={opt} disabled={opt === ''}>
                {opt === '' ? 'Select Preference' : opt}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="Remark" className="text-sm font-light">Remark</label>
          <input
            type="text"
            name="Remark"
            id="Remark"
            placeholder="Remark (optional)"
            className="bg-black border border-[#d4af37] rounded-none px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            value={form.Remark}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-[#d4af37] hover:bg-[#bfa134] text-black font-semibold py-3 mt-2 mb-4 text-lg uppercase tracking-wide transition"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'KNOW MORE'}
        </button>
        <div className="text-xs text-[#d4af37] text-left mt-2">*T&C Apply</div>
        <div className="text-xs text-gray-400 text-left mt-1">*Your privacy is very important to us; we will never share your information.</div>
      </form>
    </section>
  );
};

export default LeadForm;
