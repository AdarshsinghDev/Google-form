import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    team: "",
    skills: "",
    experience: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        form,
        {
          withCredentials: true,
        },
      );
      alert(res.data.message);
      setForm({
        fullname: "",
        email: "",
        password: "",
        role: "",
        team: "",
        skills: "",
        experience: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }finally{
      navigate("/login")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black px-4">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fullname"
            placeholder="Full Name"
            value={form.fullname}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="role"
            placeholder="Role (Developer, Tester etc)"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="team"
            placeholder="Team"
            value={form.team}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="skills"
            placeholder="Skills (React, Node, etc)"
            value={form.skills}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="experience"
            placeholder="Experience"
            value={form.experience}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold text-white"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
