import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  const [forms, setForms] = useState([]);
  const [submissionType, setSubmissionType] = useState("");
  const [employee, setEmployee] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    const getAllForms = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/form/all`,
        );
        setForms(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllForms();
  }, []);
  console.log(forms);

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filteredForm = forms.filter((form) => {
    const matchesType =
      submissionType == "all" || form.submissionType === submissionType;
    const matchesEmployee = employee === "";
  });
  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex gap-3 items-center md:flex-row lg:flex-row flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Stand-up Submissions
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage and view daily stand-up reports
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800">
              User
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">
                  Admin User
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">AU</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="relative left-0 my-5">
          <NavLink
            to="/form"
            className="bg-gray-800 text-white  absolute p-2 right-8 rounded-sm"
          >
            Go to Form
          </NavLink>
        </div>
        <div className="flex-1 overflow-auto p-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                      Employee
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                      Submission Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                      Project / Task Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                      Office Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Static Row */}

                  {forms.map((form) => {
                    return (
                      <tr key={form._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">
                              EM
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-gray-800">
                            {form.employee}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {form.email}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                            {form.submissionType}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800">
                          {form.projectTask}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {form.time}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDateTime(form.date)}
                        </td>
                      </tr>
                    );
                  })}

                  {/* You can duplicate rows for UI preview */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
