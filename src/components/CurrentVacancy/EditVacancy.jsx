import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Pencil, Briefcase, MapPin, DollarSign, Calendar, FileText, Code2, Clock } from "lucide-react";
import Breadcrumb from "../common/Breadcrumb";
import Footer from "../Footer";
import { getVacancies } from "./vacancyStore";

// Common Indian City to State dictionary for instant local lookup
const CITY_TO_STATE_MAP = {
  "mumbai": "Maharashtra", "pune": "Maharashtra", "nagpur": "Maharashtra", "nashik": "Maharashtra", "thane": "Maharashtra", "aurangabad": "Maharashtra", "solapur": "Maharashtra", "nanded": "Maharashtra", "kolhapur": "Maharashtra", "amravati": "Maharashtra",
  "bengaluru": "Karnataka", "bangalore": "Karnataka", "mysuru": "Karnataka", "mysore": "Karnataka", "hubballi": "Karnataka", "mangalore": "Karnataka", "belagavi": "Karnataka",
  "hyderabad": "Telangana", "warangal": "Telangana", "nizamabad": "Telangana", "khammam": "Telangana",
  "chennai": "Tamil Nadu", "coimbatore": "Tamil Nadu", "madurai": "Tamil Nadu", "tiruchirappalli": "Tamil Nadu", "salem": "Tamil Nadu",
  "delhi": "Delhi", "new delhi": "Delhi", "noida": "Uttar Pradesh", "greater noida": "Uttar Pradesh", "ghaziabad": "Uttar Pradesh", "lucknow": "Uttar Pradesh", "kanpur": "Uttar Pradesh", "agra": "Uttar Pradesh", "varanasi": "Uttar Pradesh", "prayagraj": "Uttar Pradesh", "allahabad": "Uttar Pradesh",
  "gurugram": "Haryana", "gurgaon": "Haryana", "faridabad": "Haryana", "panipat": "Haryana", "ambala": "Haryana",
  "ahmedabad": "Gujarat", "surat": "Gujarat", "vadodara": "Gujarat", "rajkot": "Gujarat", "gandhinagar": "Gujarat",
  "kolkata": "West Bengal", "howrah": "West Bengal", "durgapur": "West Bengal", "siliguri": "West Bengal",
  "jaipur": "Rajasthan", "jodhpur": "Rajasthan", "udaipur": "Rajasthan", "kota": "Rajasthan",
  "bhopal": "Madhya Pradesh", "indore": "Madhya Pradesh", "gwalior": "Madhya Pradesh", "jabalpur": "Madhya Pradesh",
  "patna": "Bihar", "gaya": "Bihar", "muzaffarpur": "Bihar",
  "ranchi": "Jharkhand", "jamshedpur": "Jharkhand", "dhanbad": "Jharkhand",
  "bhubaneswar": "Odisha", "cuttack": "Odisha", "rourkela": "Odisha",
  "thiruvananthapuram": "Kerala", "kochi": "Kerala", "kozhikode": "Kerala", "trivandrum": "Kerala",
  "guwahati": "Assam", "silchar": "Assam",
  "chandigarh": "Punjab", "ludhiana": "Punjab", "amritsar": "Punjab", "jalandhar": "Punjab",
  "dehradun": "Uttarakhand", "haridwar": "Uttarakhand", "halwani": "Uttarakhand",
  "shimla": "Himachal Pradesh", "dharamshala": "Himachal Pradesh",
  "panaji": "Goa", "margao": "Goa",
  "raipur": "Chhattisgarh", "bilaspur": "Chhattisgarh"
};

function EditVacancy() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const vacancies = getVacancies(); // To get existing company names
  const existingVacancy = location.state?.vacancy || null;

  const [formData, setFormData] = useState({
    hiring: existingVacancy?.hiring || "Internal",
    priority: existingVacancy?.priority || "Medium",
    state: existingVacancy?.state || "",
    city: existingVacancy?.city || "",
    category: existingVacancy?.category || "IT",
    subCategory: existingVacancy?.subCategory || "",
    profile: existingVacancy?.designation || existingVacancy?.profile || "",
    technology: existingVacancy?.subCategory || "",
    experience: existingVacancy?.experience || "",
    workMode: existingVacancy?.workMode || "Remote",
    jobType: existingVacancy?.jobType || "Full-Time",
    salaryRange: existingVacancy?.budget || existingVacancy?.salaryRange || "",
    deadline: existingVacancy?.deadline ? new Date(existingVacancy.deadline).toISOString().split('T')[0] : "",
    requirements: existingVacancy?.jobDescription || existingVacancy?.requirements || "",
    noOfVacancy: existingVacancy?.numberOfVacancies || existingVacancy?.noOfVacancy || "1"
  });

  const [errors, setErrors] = useState({});
  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Extract unique existing company names for selection dropdown
  const existingCompanyNames = useMemo(() => {
    const names = vacancies.map((v) => v.companyName).filter(Boolean);
    return Array.from(new Set(names));
  }, [vacancies]);

  // Fetch States from Open Source API (CountriesNow API)
  useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: "India" })
        });
        const data = await response.json();
        if (data && data.data && data.data.states) {
          const stateNames = data.data.states.map((s) => s.name);
          setStatesList(stateNames);
        }
      } catch (err) {
        console.error("Error fetching states:", err);
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, []);

  // Fetch Cities based on selected State
  useEffect(() => {
    if (!formData.state) {
      setCitiesList([]);
      return;
    }

    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: "India", state: formData.state })
        });
        const data = await response.json();
        if (data && data.data) {
          setCitiesList(data.data);
        } else {
          setCitiesList([]);
        }
      } catch (err) {
        console.error("Error fetching cities:", err);
        setCitiesList([]);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, [formData.state]);

  const validate = () => {
    const newErrors = {};

    if (!formData.hiring) {
      newErrors.hiring = "Hiring Type is required";
    }
    if (!formData.profile.trim()) {
      newErrors.profile = "Profile / Designation is required";
    }
    if (!formData.state) {
      newErrors.state = "Job Location State is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "Job Location City is required";
    }
    if (!formData.technology.trim()) {
      newErrors.technology = "Technology / Skill is required";
    }
    if (!formData.experience) {
      newErrors.experience = "Experience is required";
    }
    if (!formData.workMode) {
      newErrors.workMode = "Work mode is required";
    }
    if (!formData.jobType) {
      newErrors.jobType = "Job type is required";
    }
    if (!formData.salaryRange.trim()) {
      newErrors.salaryRange = "Salary Range is required";
    }
    if (!formData.deadline) {
      newErrors.deadline = "Deadline date is required";
    }
    if (!formData.requirements.trim()) {
      newErrors.requirements = "Job Description & Requirements are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCityChange = (cityName) => {
    const trimmedCity = cityName.trim().toLowerCase();
    
    // Check local lookup table first
    let matchedState = CITY_TO_STATE_MAP[trimmedCity];

    setFormData((prev) => {
      const updated = { ...prev, city: cityName };
      if (matchedState) {
        updated.state = matchedState;
      }
      return updated;
    });

    if (errors.city) setErrors((prev) => ({ ...prev, city: null }));
    if (matchedState && errors.state) setErrors((prev) => ({ ...prev, state: null }));
  };

  const handleChange = (field, value) => {
    if (field === "city") {
      handleCityChange(value);
      return;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        const match = document.cookie.match(/(?:^|;)\s*(?:token|access_token)\s*=\s*([^;]+)/);
        if (match) token = match[1];
      }
      
      const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://new-job-portal-be.onrender.com";
      const payload = {
        hiring: formData.hiring,
        priority: formData.priority,
        designation: formData.profile,
        category: formData.category,
        subCategory: formData.technology, 
        numberOfVacancies: Number(formData.noOfVacancy),
        experience: formData.experience,
        budget: formData.salaryRange,
        workMode: formData.workMode,
        deadline: formData.deadline,
        state: formData.state,
        city: formData.city,
        jobDescription: formData.requirements
      };
      
      const headers = { "Content-Type": "application/json" };
      if (token && token !== "null") {
        headers["Authorization"] = `Bearer ${token}`;
      }
      
      const response = await axios.put(`${BASE_URL}/api/admin/vacancies/${id}`, payload, {
        headers
      });
      if (!response.data.success && response.data.success !== undefined) {
        throw new Error(response.data.message || "Failed to update vacancy");
      }
      navigate("/current-vacancy?page=1");
    } catch (error) {
      console.error(error);
      alert("Error updating vacancy: " + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#F4F6FA] min-h-screen px-4 pt-2 sm:px-6 flex flex-col justify-between">
      <div className="w-full flex flex-col gap-4 mb-10">
        
        {/* --- BREADCRUMB --- */}
        <Breadcrumb items={[
          { label: "Staffing Management", link: "/staffing-management" },
          { label: "Current Vacancy", link: "/current-vacancy" },
          { label: "Edit Vacancy" }
        ]} />

        {/* --- HEADER --- */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h4 className="text-2xl font-bold text-black flex items-center gap-2">
                <Briefcase className="text-purple-600" size={26} />
                Edit Vacancy
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Modify existing job requirements and vacancy details.
              </p>
            </div>
          </div>
        </div>

        {/* --- FORM CARD --- */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 bg-purple-600 text-white flex items-center gap-2">
            <Pencil size={20} />
            <h3 className="font-bold text-lg">Vacancy Details</h3>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
            
            {/* Hiring, Priority & No. of Vacancies */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Hiring Type Selection */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-700 block">Hiring <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select
                    value={formData.hiring}
                    onChange={(e) => handleChange("hiring", e.target.value)}
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 font-medium bg-slate-50/50 cursor-pointer ${
                      errors.hiring ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-purple-400"
                    }`}
                  >
                    <option value="Internal">Internal</option>
                    <option value="External">External</option>
                  </select>
                </div>
                {errors.hiring && (
                  <p className="text-red-600 text-xs font-semibold mt-1">{errors.hiring}</p>
                )}
              </div>

              {/* Priority */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-700 block">Priority</label>
                <div className="relative">
                  <select
                    value={formData.priority}
                    onChange={(e) => handleChange("priority", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 cursor-pointer font-medium"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              {/* No. of Vacancies */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-700 block">No. of Vacancies</label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 1"
                  value={formData.noOfVacancy}
                  onChange={(e) => handleChange("noOfVacancy", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 font-medium"
                />
              </div>
            </div>

            {/* Category & Profile / Designation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-700 block">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 cursor-pointer font-medium"
                >
                  <option value="IT">IT</option>
                  <option value="Non IT">Non IT</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-700 block">Profile / Designation <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Senior Frontend Developer"
                  value={formData.profile}
                  onChange={(e) => handleChange("profile", e.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 font-medium bg-slate-50/50 ${
                    errors.profile ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-purple-400"
                  }`}
                />
                {errors.profile && (
                  <p className="text-red-600 text-xs font-semibold mt-1">{errors.profile}</p>
                )}
              </div>
            </div>

            {/* Job Location: State & City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* State (Auto Detected or Manual Dropdown) */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-700 block">Job Location State <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  list="state-options"
                  placeholder={loadingStates ? "Loading States..." : "Select State"}
                  value={formData.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 font-medium bg-slate-50/50 ${
                    errors.state ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-purple-400"
                  }`}
                />
                <datalist id="state-options">
                  {statesList.length > 0 ? (
                    statesList.map((st) => <option key={st} value={st} />)
                  ) : (
                    <>
                      <option value="Andhra Pradesh" />
                      <option value="Delhi" />
                      <option value="Gujarat" />
                      <option value="Haryana" />
                      <option value="Karnataka" />
                      <option value="Maharashtra" />
                      <option value="Tamil Nadu" />
                      <option value="Telangana" />
                      <option value="Uttar Pradesh" />
                      <option value="West Bengal" />
                    </>
                  )}
                </datalist>
                {errors.state && (
                  <p className="text-red-600 text-xs font-semibold mt-1">{errors.state}</p>
                )}
              </div>
              
              {/* City */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-700 block">Job Location City <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  list="city-options"
                  placeholder="Enter city (e.g. Mumbai, Pune, Bengaluru)"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 font-medium bg-slate-50/50 ${
                    errors.city ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-purple-400"
                  }`}
                />
                {citiesList.length > 0 && (
                  <datalist id="city-options">
                    {citiesList.map((ct) => (
                      <option key={ct} value={ct} />
                    ))}
                  </datalist>
                )}
                {errors.city && (
                  <p className="text-red-600 text-xs font-semibold mt-1">{errors.city}</p>
                )}
              </div>
            </div>


            {/* Technology / Skill & Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-700 block">Technology / Skill <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. React, Node.js, Python, Figma"
                  value={formData.technology}
                  onChange={(e) => handleChange("technology", e.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 font-medium bg-slate-50/50 ${
                    errors.technology ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-purple-400"
                  }`}
                />
                {errors.technology && (
                  <p className="text-red-600 text-xs font-semibold mt-1">{errors.technology}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-700 block">Experience <span className="text-red-500">*</span></label>
                <select
                  value={formData.experience}
                  onChange={(e) => handleChange("experience", e.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 font-medium bg-slate-50/50 cursor-pointer ${
                    errors.experience ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-purple-400"
                  }`}
                >
                  <option value="">Select Experience</option>
                  <option value="0-1 Years">0-1 Years</option>
                  <option value="1-2 Years">1-2 Years</option>
                  <option value="2-3 Years">2-3 Years</option>
                  <option value="3-5 Years">3-5 Years</option>
                  <option value="5-8 Years">5-8 Years</option>
                  <option value="8+ Years">8+ Years</option>
                </select>
                {errors.experience && (
                  <p className="text-red-600 text-xs font-semibold mt-1">{errors.experience}</p>
                )}
              </div>
            </div>

            {/* Work Mode & Job Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-700 block">Work Mode <span className="text-red-500">*</span></label>
                <select
                  value={formData.workMode}
                  onChange={(e) => handleChange("workMode", e.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 font-medium bg-slate-50/50 cursor-pointer ${
                    errors.workMode ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-purple-400"
                  }`}
                >
                  <option value="Remote">Remote</option>
                  <option value="Onsite">Onsite</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                {errors.workMode && (
                  <p className="text-red-600 text-xs font-semibold mt-1">{errors.workMode}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-700 block">Job Type <span className="text-red-500">*</span></label>
                <select
                  value={formData.jobType}
                  onChange={(e) => handleChange("jobType", e.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 font-medium bg-slate-50/50 cursor-pointer ${
                    errors.jobType ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-purple-400"
                  }`}
                >
                  <option value="Internship(Paid)">Internship(Paid)</option>
                  <option value="Internship(Unpaid)">Internship(Unpaid)</option>
                  <option value="Full-Time">Full-Time</option>
                </select>
                {errors.jobType && (
                  <p className="text-red-600 text-xs font-semibold mt-1">{errors.jobType}</p>
                )}
              </div>
            </div>

            {/* Salary Range & Deadline Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-700 block">Salary Range :- <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. ₹5,000 - ₹10,000 / month or 6-8 LPA"
                  value={formData.salaryRange}
                  onChange={(e) => handleChange("salaryRange", e.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 font-medium bg-slate-50/50 ${
                    errors.salaryRange ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-purple-400"
                  }`}
                />
                {errors.salaryRange && (
                  <p className="text-red-600 text-xs font-semibold mt-1">{errors.salaryRange}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-700 block">Deadline (Date) <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleChange("deadline", e.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 font-medium bg-slate-50/50 ${
                    errors.deadline ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-purple-400"
                  }`}
                />
                {errors.deadline && (
                  <p className="text-red-600 text-xs font-semibold mt-1">{errors.deadline}</p>
                )}
              </div>
            </div>



            {/* Job Description & Requirements */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-700 block">Job Description & Requirements <span className="text-red-500">*</span></label>
              <textarea
                rows={4}
                placeholder="Enter detailed job requirements..."
                value={formData.requirements}
                onChange={(e) => handleChange("requirements", e.target.value)}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 font-medium bg-slate-50/50 resize-none ${
                  errors.requirements ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-purple-400"
                }`}
              />
              {errors.requirements && (
                <p className="text-red-600 text-xs font-semibold mt-1">{errors.requirements}</p>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-5 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate("/current-vacancy")}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-bold hover:bg-gray-100 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold transition shadow-sm flex gap-2 items-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Clock size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Pencil size={18} />
                    Update Vacancy
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default EditVacancy;

