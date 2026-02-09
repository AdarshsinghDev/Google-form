import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MultiStepForm() {
  const loggedInUserName = localStorage.getItem("loggedInUserNameStored");
  const [currentStep, setCurrentStep] = useState(1);
  const [readySubmit, setReadySubmit] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1 data
    email: localStorage.getItem("loggedInEmailStored"),
    submissionType: "",
    employee: "",
    time: "",
    date: "",
    projectTask: "",

    // Step2 data
    yesterdayWork: "",
    todayDeliverables: "",
    hasBlockers: "",
    blockerDescription: "",

    // Step 3 data
    deliveryStatus: "",
    completedSummary: "",
    incompleteReason: "",
    nextAction: "",
    additionalNotes: "",
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
        `${import.meta.env.VITE_BACKEND_URL}/api/form/submit`,
        formData,
      );
      alert(`${formData.submissionType} Stand-up Submitted Successfully`);
      console.log(res);
    } catch (error) {
      alert(error.response?.data?.message || "Submission failed");
    }
  };

  const validStep1 = () => {
    if (
      (currentStep === 1 && !formData.email) ||
      !formData.employee ||
      !formData.time ||
      !formData.date ||
      !formData.projectTask ||
      !formData.submissionType
    ) {
      alert("All fields are required");
      return false;
    }
    return true;
  };

  const validStep2 = () => {
    if (
      (currentStep === 2 && !formData.yesterdayWork) ||
      !formData.todayDeliverables ||
      !formData.hasBlockers ||
      (formData.hasBlockers === "yes" && !formData.blockerDescription)
    ) {
      alert("All fields are required");
      return false;
    }
    return true;
  };
  const validStep3 = () => {
    if (
      (currentStep === 3 && !formData.deliveryStatus) ||
      !formData.completedSummary ||
      !formData.incompleteReason ||
      !formData.nextAction
    ) {
      alert("All fields are required");
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (
      currentStep === 1 &&
      formData.submissionType === "evening" &&
      validStep1()
    ) {
      setCurrentStep(3);
      setReadySubmit(true);
    } else if (
      currentStep === 1 &&
      formData.submissionType === "morning" &&
      validStep1()
    ) {
      setCurrentStep(2);
    }
    if (
      currentStep === 2 &&
      formData.submissionType === "morning" &&
      validStep2()
    ) {
      setCurrentStep(3);
      setReadySubmit(true);
    }
    if (
      currentStep === 3 &&
      (formData.submissionType === "morning" ||
        formData.submissionType === "evening") &&
      validStep3()
    ) {
      setReadySubmit(true);
    } else {
      setReadySubmit(false);
    }
  };
  const prevStep = () => {
    if (currentStep === 3 && formData.submissionType === "evening") {
      setCurrentStep(1);
    }
    if (currentStep === 3 && formData.submissionType === "morning") {
      setCurrentStep(2);
    }
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  useEffect(() => {
    if (
      currentStep === 3 &&
      formData.deliveryStatus &&
      formData.completedSummary &&
      formData.incompleteReason &&
      formData.nextAction
    ) {
      setReadySubmit(true);
    } else {
      setReadySubmit(false);
    }
  }, [
    currentStep,
    formData.deliveryStatus,
    formData.completedSummary,
    formData.incompleteReason,
    formData.nextAction,
  ]);

  const logOut = () =>{
    localStorage.removeItem("token")
    localStorage.removeItem("loggedInUserNameStored")
    localStorage.removeItem("loggedInEmailStored")
    navigate("/login")
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="pb-10 relative"></div>
      <div className="flex items-center relative justify-center">
        <button onClick={logOut} className="flex lg:absolute right-20 bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-150 ease-in-out">
          Log out
        </button>
      </div>
      <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
          <h1 className="mb-6">
            Welcome back,{" "}
            <span className="text-blue-500 italic font-bold">
              {loggedInUserName}
            </span>
          </h1>
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-2">
              Daily Stand-ups
            </h1>
            <p className="text-sm text-gray-500 text-center">
              Morning / Evening
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* STEP 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                    placeholder="you@company.com"
                  />
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
                        value={loggedInUserName}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">
                        {loggedInUserName}
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
              </div>
            )}

            {/* STEP 2: Morning Stand-up Items */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Morning Stand-up Items
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Morning Commitments - Today's Plan
                </p>

                <div>
                  <label
                    htmlFor="yesterdayWork"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    1. Yesterday's Completed Work *
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Clearly mention what was completed yesterday (tasks /
                    features / bugs). Avoid vague statements like "worked on" or
                    "continued work".
                  </p>
                  <textarea
                    id="yesterdayWork"
                    name="yesterdayWork"
                    value={formData.yesterdayWork}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                    placeholder="Example: Fetching data from frontend"
                  />
                </div>

                <div>
                  <label
                    htmlFor="todayDeliverables"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    2. Today's Committed Deliverables *
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    List concrete and testable deliverables you commit to
                    complete today. Example: "API X integrated and unit tested",
                    "UI screen Y completed".
                  </p>
                  <textarea
                    id="todayDeliverables"
                    name="todayDeliverables"
                    value={formData.todayDeliverables}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                    placeholder="Example: API Connected with backend"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    3. Known Blockers *
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out">
                      <input
                        type="radio"
                        name="hasBlockers"
                        value="no"
                        onChange={handleChange}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">
                        No blockers
                      </span>
                    </label>
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out">
                      <input
                        type="radio"
                        name="hasBlockers"
                        value="yes"
                        onChange={handleChange}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">
                        Yes – blocker exists
                      </span>
                    </label>
                  </div>
                </div>
                {formData.hasBlockers === "yes" && (
                  <div>
                    <label
                      htmlFor="blockerDescription"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      4. Describe the Blocker *
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      Mention what is blocking progress and from whom / what you
                      need support.
                    </p>
                    <textarea
                      id="blockerDescription"
                      name="blockerDescription"
                      value={formData.blockerDescription}
                      onChange={handleChange}
                      required
                      rows="3"
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                      placeholder="Describe the blocker and what support you need"
                    />
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: Evening Stand-up Items */}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Evening Stand-up (Before Leaving)
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Delivery Outcomes - Task Status
                </p>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Status of Today's Committed Deliverables *
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out">
                      <input
                        type="radio"
                        name="deliveryStatus"
                        value="completed"
                        onChange={handleChange}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">
                        Completed
                      </span>
                    </label>
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out">
                      <input
                        type="radio"
                        name="deliveryStatus"
                        value="partially"
                        onChange={handleChange}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">
                        Partially Completed
                      </span>
                    </label>
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out">
                      <input
                        type="radio"
                        name="deliveryStatus"
                        value="blocked"
                        onChange={handleChange}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">
                        Blocked
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="completedSummary"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    1. If Completed – Summary of Work Done
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Briefly summarize what was completed and ready for
                    review/testing.
                  </p>
                  <textarea
                    id="completedSummary"
                    name="completedSummary"
                    value={formData.completedSummary}
                    onChange={handleChange}
                    rows="3"
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                    placeholder="Your answer"
                  />
                </div>

                <div>
                  <label
                    htmlFor="incompleteReason"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    2. If Partially Completed or Blocked – Reason
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    State the factual reason for incomplete/blocked work. Avoid
                    generic explanations.
                  </p>
                  <textarea
                    id="incompleteReason"
                    name="incompleteReason"
                    value={formData.incompleteReason}
                    onChange={handleChange}
                    rows="3"
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                    placeholder="Your answer"
                  />
                </div>

                <div>
                  <label
                    htmlFor="nextAction"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    3. Next Action & Expected Completion
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    What is the next action and when do you expect to complete
                    it?
                  </p>
                  <textarea
                    id="nextAction"
                    name="nextAction"
                    value={formData.nextAction}
                    onChange={handleChange}
                    rows="3"
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                    placeholder="Your answer"
                  />
                </div>

                <div>
                  <label
                    htmlFor="additionalNotes"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    4. Any Additional Notes (Optional)
                  </label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    rows="3"
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                    placeholder="Your answer"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}

            <div className="flex gap-4 mt-8">
              {currentStep === 1 ? (
                <button
                  type="button"
                  style={{ cursor: "not-allowed" }}
                  className="flex-1 bg-gray-200 text-gray-400 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-150 ease-in-out"
                >
                  Previous
                </button>
              ) : (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-150 ease-in-out"
                >
                  Previous
                </button>
              )}
              {currentStep < 3 && readySubmit === false && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition duration-150 ease-in-out hover:scale-105 shadow-lg"
                >
                  Next
                </button>
              )}

              {readySubmit === true && (
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform transition duration-150 ease-in-out hover:scale-105 shadow-lg"
                >
                  Submit Stand-up
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
