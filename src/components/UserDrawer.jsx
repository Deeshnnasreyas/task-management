import { useState, useEffect } from "react";

const UserDrawer = ({ isOpen, onClose, userData, mode, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  useEffect(() => {
    if (mode === "edit" && userData) {
      setForm(userData);
    } else {
      setForm({ name: "", email: "", phone: "", company: "" });
    }
  }, [mode, userData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 w-80 h-full bg-white shadow-lg p-4 z-50">
      <h2 className="text-xl font-semibold mb-4">
        {mode === "edit" ? "Edit User" : "Add User"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border w-full px-2 py-1 rounded"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border w-full px-2 py-1 rounded"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border w-full px-2 py-1 rounded"
        />
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          className="border w-full px-2 py-1 rounded"
        />

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-1 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDrawer;
