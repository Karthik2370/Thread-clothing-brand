import React, { useState, useEffect } from 'react';

const PROFILE_IMAGE = 'https://randomuser.me/api/portraits/men/32.jpg';

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: 'John Doe',
    email: 'john@example.com',
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-2 sm:px-0 flex flex-col items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4 sm:p-8 flex flex-col items-center">
        <img src={PROFILE_IMAGE} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-gray-200" />
        {edit ? (
          <form className="w-full space-y-4 mb-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="flex gap-2">
              <button type="button" onClick={() => setEdit(false)} className="flex-1 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200">Save</button>
              <button type="button" onClick={() => setEdit(false)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200">Cancel</button>
            </div>
          </form>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-1">{form.name}</h2>
            <div className="text-gray-500 mb-4">{form.email}</div>
            <button onClick={() => setEdit(true)} className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 mb-2">Edit Profile</button>
          </>
        )}
        <div className="w-full mt-6">
          <h3 className="font-semibold mb-2">Account Info</h3>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <div><span className="font-medium">Member Since:</span> 2023</div>
            <div><span className="font-medium">Default Address:</span> 123 Main Street, Mumbai</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 