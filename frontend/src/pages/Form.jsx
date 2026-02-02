import { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
export default function Form() {
  const [formData, setFormData] = useState({
    email: "",
    submissionType: "",
    employee: "",
    time: "",
    date: "",
    projectTask: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/submit`,
        formData,
      );
      alert(`${formData.submissionType}, Task Submitted Successfully`);
      console.log(res);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ">
      <div className="pb-10 pt-5 relative">
        <NavLink
          to="/dashboard"
          className="bg-gray-800 cursor-pointer text-white absolute p-2 right-5  rounded-sm"
        >
          Admin Dashboard
        </NavLink>
      </div>
      <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-2">
              Daily Stand-ups
            </h1>
            <p className="text-sm text-gray-500 text-center">
              Morning / Evening
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Submission Type
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out">
                  <input
                    type="radio"
                    name="submissionType"
                    value="morning"
                    onChange={handleChange}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Morning Stand-up (Do After Reach)
                  </span>
                </label>
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out">
                  <input
                    type="radio"
                    name="submissionType"
                    onChange={handleChange}
                    value="evening"
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Evening Stand-up (Do Before Leaving)
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Employee
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out">
                  <input
                    type="radio"
                    name="employee"
                    onChange={handleChange}
                    value="emp1"
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Emp1
                  </span>
                </label>
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out">
                  <input
                    type="radio"
                    name="employee"
                    onChange={handleChange}
                    value="emp2"
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Emp2
                  </span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  {formData.submissionType === "morning"
                    ? "Reaching Time"
                    : "Leaving time"}
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="projectTask"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Project / Task Name
              </label>
              <input
                type="text"
                id="projectTask"
                name="projectTask"
                value={formData.projectTask}
                onChange={handleChange}
                required
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                placeholder="Enter project or task name"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r cursor-pointer from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition duration-150 ease-in-out hover:scale-105 shadow-lg"
            >
              Submit Stand-up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
