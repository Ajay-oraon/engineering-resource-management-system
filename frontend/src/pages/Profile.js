import React, { useEffect, useState } from "react";
import axios from "axios";
const API_BASE =
  process.env.REACT_APP_API_URL ||
  "https://engineering-resource-management-system-5d0n.onrender.com";
const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: "", skills: "", department: "" });

  useEffect(() => {
    axios.get(`${API_BASE}/api/auth/profile`).then((res) => {
      setProfile(res.data);
      setForm({
        name: res.data.name,
        skills: res.data.skills?.join(", ") || "",
        department: res.data.department || "",
      });
    });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    await axios.put(`${API_BASE}/api/auth/profile`, {
      name: form.name,
      skills: form.skills.split(",").map((s) => s.trim()),
      department: form.department,
    });
    setEdit(false);
    window.location.reload();
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="card max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      {edit ? (
        <>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            name="skills"
            value={form.skills}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            name="department"
            value={form.department}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
          />
          <button className="btn-primary w-full mb-2" onClick={handleSave}>
            Save
          </button>
          <button
            className="btn-secondary w-full"
            onClick={() => setEdit(false)}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <div>
            <b>Name:</b> {profile.name}
          </div>
          <div>
            <b>Skills:</b> {profile.skills?.join(", ")}
          </div>
          <div>
            <b>Department:</b> {profile.department}
          </div>
          <button
            className="btn-primary w-full mt-2"
            onClick={() => setEdit(true)}
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default Profile;
