// import React, { useState, useEffect } from "react";
// import { Formik, Form, Field } from "formik";
// import {
//   ArrowLeft,
//   Eye,
//   EyeOff,
//   Upload,
//   Image as ImageIcon,
//   Building2,
//   Briefcase,
//   BadgeCheck,
//   Linkedin, 
//   Twitter,
//   Facebook,
//   X,
// } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { updateEmployer, resetUpdateState } from "../../redux/slice/employer/updateEmployeeSlice";
// import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
// import "react-country-state-city/dist/react-country-state-city.css";

// const EditEmployee = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { loading, success } = useSelector((state) => state.updateEmployee);

//   const [showPassword, setShowPassword] = useState(false);
//   const [logo, setLogo] = useState(null);
//   const [banner, setBanner] = useState(null);
//   const [skills, setSkills] = useState([]);
//   const [skillInput, setSkillInput] = useState("");
//   const [countryid, setCountryid] = useState(0);
//   const [stateData, setStateData] = useState({ id: 0, name: "" });
//   const [cityData, setCityData] = useState({ id: 0, name: "" });

//   const years = Array.from({ length: 2026 - 1950 + 1 }, (_, i) => 2026 - i);

//   const initialValues = {
//     name: "",
//     email: "",
//     password: "",
//     mobile: "",
//     tagline: "",
//     website: "",
//     linkedin: "",
//     twitter: "",
//     facebook: "",
//     foundedIn: "",
//     companyType: "",
//     companySize: "",
//     about: "",
//     hiringFor: "",
//     jobLocationType: "",
//     avgHiring: "",
//     legalName: "",
//     regNumber: "",
//     gstNumber: "",
//     cinNumber: "",
//     area: "",
//   };

//   useEffect(() => {
//     if (success) {
//       dispatch(resetUpdateState());
//       navigate("/employee");
//     }
//   }, [success, navigate, dispatch]);

//   const handleAddSkill = (e) => {
//     if (e.key === "Enter" && skillInput.trim()) {
//       e.preventDefault();
//       if (!skills.includes(skillInput.trim()))
//         setSkills([...skills, skillInput.trim()]);
//       setSkillInput("");
//     }
//   };

//   const handleSubmit = async (values) => {
//     const formData = new FormData();

//     // Mapping Basic Fields
//     if (values.name) formData.append("name", values.name);
//     if (values.email) formData.append("email", values.email);
//     if (values.password) formData.append("password", values.password);
//     if (values.mobile) formData.append("mobileNumber", values.mobile);
//     if (stateData.name) formData.append("state", stateData.name);
//     if (cityData.name) formData.append("city", cityData.name);

//     // Company & Business Details
//     if (values.tagline) formData.append("companyDetail[companyTagline]", values.tagline);
//     if (values.website) formData.append("companyDetail[companyWebsite]", values.website);
//     if (values.area) formData.append("companyDetail[location][area]", values.area);
//     if (values.foundedIn) formData.append("businessDetail[fundedIn]", values.foundedIn);
//     if (values.companyType) formData.append("businessDetail[typeOfCompany]", values.companyType);
//     if (values.companySize) formData.append("businessDetail[companySize]", values.companySize);
//     if (values.about) formData.append("businessDetail[aboutCompany]", values.about);

//     // Hiring Preference
//     if (values.hiringFor) formData.append("hiringPreference[hiringFor]", values.hiringFor);
//     if (values.jobLocationType) formData.append("hiringPreference[jobLocation][type]", values.jobLocationType);
//     if (values.avgHiring) formData.append("hiringPreference[averageHiringPerMonth]", values.avgHiring);
//     if (skills.length > 0) formData.append("hiringPreference[topHiringSkill]", skills.join(", "));

//     // Legal Documentation
//     if (values.legalName) formData.append("verificationAndDocumentation[companyLegalName]", values.legalName);
//     if (values.regNumber) formData.append("verificationAndDocumentation[companyRegisterNumber]", values.regNumber);
//     if (values.gstNumber) formData.append("verificationAndDocumentation[GSTNumber]", values.gstNumber);
//     if (values.cinNumber) formData.append("verificationAndDocumentation[CINNumber]", values.cinNumber);

//     // Images
//     if (logo) formData.append("companyLogo", logo);
//     if (banner) formData.append("companyBanner", banner);

//     dispatch(updateEmployer({ id, formData }));
//   };

//   const inputClass = "w-full mt-2 bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all";
//   const sectionHeading = "flex items-center gap-2 text-lg font-bold text-purple-800 mb-5 border-b border-purple-100 pb-2";

//   return (
//     <div className="w-full min-h-screen p-8 bg-gray-50">
//       <div className="w-full bg-white rounded-xl p-6 shadow-md">
//         <div className="flex items-center gap-3 mb-6">
//           <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-100 transition">
//             <ArrowLeft size={18} />
//           </button>
//           <h1 className="text-2xl font-bold text-gray-800">Edit Employer Details</h1>
//         </div>

//         <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//           {({ setFieldValue }) => (
//             <Form className="space-y-12">

//               {/* Section: Basic Info & Logo/Banner */}
//               <div className="bg-white border border-gray-200 p-4 rounded-2xl">
//                 <h2 className={sectionHeading}><Building2 size={20} /> Basic Info</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   <div className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-xl p-6 relative hover:border-purple-400 transition cursor-pointer">
//                     <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setLogo(e.target.files[0])} />
//                     {logo ? <img src={URL.createObjectURL(logo)} alt="logo" className="h-16 w-16 object-contain" /> : <div className="text-center"><Upload className="mx-auto text-purple-500 mb-1" size={20} /><p className="text-xs text-gray-500">Change Logo</p></div>}
//                   </div>
//                   <div className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-xl p-6 relative hover:border-purple-400 transition cursor-pointer">
//                     <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setBanner(e.target.files[0])} />
//                     {banner ? <img src={URL.createObjectURL(banner)} alt="banner" className="h-16 w-full object-cover rounded" /> : <div className="text-center"><ImageIcon className="mx-auto text-purple-500 mb-1" size={20} /><p className="text-xs text-gray-500">Change Banner</p></div>}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <div><label className="text-sm font-semibold text-gray-700">Company Name</label><Field name="name" className={inputClass} /></div>
//                   <div><label className="text-sm font-semibold text-gray-700">Email</label><Field name="email" type="email" className={inputClass} /></div>
//                   <div className="relative">
//                     <label className="text-sm font-semibold text-gray-700">New Password</label>
//                     <Field name="password" type={showPassword ? "text" : "password"} className={inputClass} />
//                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-10 text-gray-400">
//                       {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 p-4 bg-purple-50/30 rounded-lg">
//                   <CountrySelect onChange={(e) => setCountryid(e.id)} placeHolder="Update Country" />
//                   <StateSelect countryid={countryid} onChange={(e) => setStateData({ id: e.id, name: e.name })} placeHolder="Update State" />
//                   <CitySelect countryid={countryid} stateid={stateData.id} onChange={(e) => setCityData({ id: e.id, name: e.name })} placeHolder="Update City" />
//                 </div>
//               </div>

//               {/* Section: Business Details */}
//               <div className="border border-gray-200 rounded-2xl p-4">
//                 <h2 className={sectionHeading}><Briefcase size={20} /> Business Details</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <Field as="select" name="foundedIn" className={inputClass}>
//                     <option value="">Founded Year</option>
//                     {years.map((y) => <option key={y} value={y}>{y}</option>)}
//                   </Field>
//                   <Field as="select" name="companyType" className={inputClass}>
//                     <option value="">Company Type</option>
//                     <option value="Startup">Startup</option>
//                     <option value="Private Limited">Private Limited</option>
//                     <option value="MNC">MNC</option>
//                   </Field>
//                   <Field as="select" name="companySize" className={inputClass}>
//                     <option value="">Company Size</option>
//                     <option value="1-10">1-10 Employees</option>
//                     <option value="11-50">11-50 Employees</option>
//                     <option value="51-200">51-200 Employees</option>
//                     <option value="201-500">201-500 Employees</option>
//                     <option value="500+">500+ Employees</option>
//                   </Field>
//                 </div>
//                 <Field as="textarea" name="about" rows="4" className={`${inputClass} mt-4`} placeholder="About Company..." />
//               </div>

//               {/* Section: Hiring Preference */}
//               <div className="border border-gray-200 rounded-2xl p-4">
//                 <h2 className={sectionHeading}><BadgeCheck size={20} /> Hiring Preference</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <Field name="hiringFor" placeholder="Hiring For (e.g. Developers)" className={inputClass} />
//                   <Field as="select" name="jobLocationType" className={inputClass}>
//                     <option value="">Location Type</option>
//                     <option value="Onsite">Onsite</option>
//                     <option value="Remote">Remote</option>
//                     <option value="Hybrid">Hybrid</option>
//                   </Field>
//                   <Field name="avgHiring" type="number" placeholder="Avg Hiring/Month" className={inputClass} />
//                 </div>
//                 <div className="mt-4">
//                   <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={handleAddSkill} placeholder="Skills needed (Press Enter)" className={inputClass} />
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {skills.map((skill, index) => (
//                       <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs flex items-center gap-1">
//                         {skill} <X size={12} className="cursor-pointer" onClick={() => setSkills(skills.filter((s) => s !== skill))} />
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Section: Legal Documentation */}
//               <div className="border border-gray-200 rounded-2xl p-4">
//                 <h2 className={sectionHeading}><ImageIcon size={20} /> Legal Documentation</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div><label className="text-sm font-semibold text-gray-700">Legal Name</label><Field name="legalName" className={inputClass} /></div>
//                   <div><label className="text-sm font-semibold text-gray-700">Registration Number</label><Field name="regNumber" className={inputClass} /></div>
//                   <div><label className="text-sm font-semibold text-gray-700">GST Number</label><Field name="gstNumber" className={inputClass} /></div>
//                   <div><label className="text-sm font-semibold text-gray-700">CIN Number</label><Field name="cinNumber" className={inputClass} /></div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex justify-center gap-6 pt-4">
//                 <button type="button" onClick={() => navigate(-1)} className="px-12 py-2.5 rounded-lg bg-gray-100 font-bold">Cancel</button>
//                 <button type="submit" disabled={loading} className="px-12 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-900 text-white font-bold shadow-lg cursor-pointer">
//                   {loading ? "Updating..." : "Update Details"}
//                 </button>
//               </div>

//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default EditEmployee;








import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Upload,
  Image as ImageIcon,
  Building2,
  Briefcase,
  BadgeCheck,
  X,
  Phone,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployer, resetUpdateState } from "../../redux/slice/employer/updateEmployeeSlice";
import { fetchEmployerById } from "../../redux/slice/employer/getEmployeeById";
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { toast } from "react-toastify";

const validateImageFile = (file) => {
  if (!file) return false;
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  const maxSizeBytes = 2 * 1024 * 1024; // 2MB

  if (!allowedTypes.includes(file.type)) {
    toast.error("Invalid file format. Only JPG, JPEG, and PNG are allowed.");
    return false;
  }
  if (file.size > maxSizeBytes) {
    toast.error("File size exceeds 2MB limit. Please upload a smaller image.");
    return false;
  }
  return true;
};

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, success } = useSelector((state) => state.updateEmployee);
  const { employer, loading: fetchLoading } = useSelector((state) => state.employeeDetails);

  const [showPassword, setShowPassword] = useState(false);
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [countryid, setCountryid] = useState(101);
  const [stateData, setStateData] = useState({ id: 0, name: "" });
  const [cityData, setCityData] = useState({ id: 0, name: "" });

  const years = Array.from({ length: 2026 - 1950 + 1 }, (_, i) => 2026 - i);

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, "Name must contain only alphabetic characters and proper spacing")
      .required("Company Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobileNumber: Yup.string()
      .matches(/^(?!00)[0-9]{10}$/, "Mobile number must be exactly 10 digits and cannot start with '00'")
      .required("Mobile number is required"),
    password: Yup.string()
      .nullable()
      .notRequired()
      .test("is-strong", "Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character", (value) => {
        if (!value) return true; // optional
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
      }),
    hiringFor: Yup.string()
      .max(100, "Hiring For must be at most 100 characters")
      .matches(
        /^[A-Za-z0-9\s,\-\/\.\(\)]*$/,
        "Hiring For can only contain alphanumeric characters, spaces, and common symbols like , - / . ()"
      ),
    legalName: Yup.string()
      .nullable()
      .notRequired()
      .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, "Legal Name must contain only alphabetic characters and proper spacing"),
    regNumber: Yup.string()
      .nullable()
      .notRequired()
      .matches(/^\d{6}$/, "Registration Number must be exactly 6 digits"),
    gstNumber: Yup.string()
      .nullable()
      .notRequired()
      .matches(
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i,
        "GST Number must be a valid 15-digit code (e.g. 22AAAAA0000A1Z5)"
      ),
    cinNumber: Yup.string()
      .nullable()
      .notRequired()
      .matches(
        /^[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/i,
        "CIN Number must be a valid 21-character code (e.g. L01234MH2026PTC012345)"
      ),
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployerById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (employer) {
      if (employer.hiringPreference?.topHiringSkill) {
        setSkills(employer.hiringPreference.topHiringSkill.split(",").map(s => s.trim()));
      }
      if (employer.companyDetail?.location) {
        setStateData({ name: employer.companyDetail.location.name || "" });
        setCityData({ name: employer.companyDetail.location.cityName || "" });
      }
    }
  }, [employer]);

  useEffect(() => {
    if (success) {
      dispatch(resetUpdateState());
      navigate("/employee");
    }
  }, [success, navigate, dispatch]);

  const initialValues = {
    name: employer?.name || "",
    email: employer?.email || "",
    password: "",
    mobileNumber: employer?.mobileNumber ? employer.mobileNumber.replace(/^\+91/, "").replace(/^91/, "") : "", // Fixed field name
    tagline: employer?.companyDetail?.companyTagline || "",
    website: employer?.companyDetail?.companyWebsite || "",
    area: employer?.companyDetail?.location?.area || "",
    foundedIn: employer?.businessDetail?.fundedIn || "",
    companyType: employer?.businessDetail?.typeOfCompany || "",
    companySize: employer?.businessDetail?.companySize || "",
    about: employer?.businessDetail?.aboutCompany || "",
    hiringFor: employer?.hiringPreference?.hiringFor || "",
    jobLocationType: employer?.hiringPreference?.jobLocation?.type || "",
    avgHiring: employer?.hiringPreference?.averageHiringPerMonth || "",
    legalName: employer?.verificationAndDocumentation?.companyLegalName || "",
    regNumber: employer?.verificationAndDocumentation?.companyRegisterNumber || "",
    gstNumber: employer?.verificationAndDocumentation?.GSTNumber || "",
    cinNumber: employer?.verificationAndDocumentation?.CINNumber || "",
  };

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim()))
        setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("email", values.email);
    if (values.password) formData.append("password", values.password);
    formData.append("mobileNumber", "+91" + values.mobileNumber); // Using mobileNumber key

    if (stateData.name) formData.append("state", stateData.name);
    if (cityData.name) formData.append("city", cityData.name);

    formData.append("companyDetail[companyTagline]", values.tagline);
    formData.append("companyDetail[companyWebsite]", values.website);
    formData.append("companyDetail[location][area]", values.area);
    formData.append("businessDetail[fundedIn]", values.foundedIn);
    formData.append("businessDetail[typeOfCompany]", values.companyType);
    formData.append("businessDetail[companySize]", values.companySize);
    formData.append("businessDetail[aboutCompany]", values.about);
    formData.append("hiringPreference[hiringFor]", values.hiringFor);
    formData.append("hiringPreference[jobLocation][type]", values.jobLocationType);
    formData.append("hiringPreference[averageHiringPerMonth]", values.avgHiring);
    formData.append("hiringPreference[topHiringSkill]", skills.join(", "));
    formData.append("verificationAndDocumentation[companyLegalName]", values.legalName);
    formData.append("verificationAndDocumentation[companyRegisterNumber]", values.regNumber);
    formData.append("verificationAndDocumentation[GSTNumber]", values.gstNumber);
    formData.append("verificationAndDocumentation[CINNumber]", values.cinNumber);

    if (logo) formData.append("companyLogo", logo);
    if (banner) formData.append("companyBanner", banner);

    dispatch(updateEmployer({ id, formData }));
  };

  const inputClass = "w-full mt-2 bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all";
  const inputErrorClass = "w-full mt-2 bg-gray-50 border border-red-400 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-400 transition-all";
  const sectionHeading = "flex items-center gap-2 text-lg font-bold text-purple-800 mb-5 border-b border-purple-100 pb-2";

  if (fetchLoading) return <div className="p-8 text-center font-bold">Fetching Data...</div>;

  return (
    <div className="w-full min-h-screen p-8 bg-gray-50">
      <div className="w-full bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-100 transition">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Edit Employer Details</h1>
        </div>

        <Formik initialValues={initialValues} enableReinitialize={true} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ errors, touched, setFieldValue }) => (
            <Form className="space-y-12">

              <div className="bg-white border border-gray-200 p-4 rounded-2xl">
                <h2 className={sectionHeading}><Building2 size={20} /> Basic Info</h2>

                {/* Logo & Banner Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-xl p-6 relative hover:border-purple-400 transition cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          if (validateImageFile(file)) {
                            setLogo(file);
                          } else {
                            e.target.value = "";
                          }
                        }
                      }}
                    />
                    {logo ? (
                      <div className="relative group w-full h-full flex items-center justify-center p-2">
                        <img src={URL.createObjectURL(logo)} alt="logo" className="h-16 w-16 object-contain" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition rounded-xl">
                          <p className="text-white text-xs font-semibold">Change Logo</p>
                        </div>
                      </div>
                    ) : employer?.companyDetail?.companyLogo?.[0] ? (
                      <div className="relative group w-full h-full flex items-center justify-center p-2">
                        <img src={employer.companyDetail.companyLogo[0]} alt="logo" className="h-16 w-16 object-contain" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition rounded-xl">
                          <p className="text-white text-xs font-semibold">Change Logo</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-4">
                        <Upload className="mx-auto text-purple-500 mb-2" size={24} />
                        <p className="text-sm font-semibold text-gray-700">Company Logo</p>
                        <p className="text-[11px] text-gray-400 mt-1">PNG, JPG, JPEG (Max 2MB)</p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-xl p-6 relative hover:border-purple-400 transition cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          if (validateImageFile(file)) {
                            setBanner(file);
                          } else {
                            e.target.value = "";
                          }
                        }
                      }}
                    />
                    {banner ? (
                      <div className="relative group w-full h-full flex items-center justify-center p-2">
                        <img src={URL.createObjectURL(banner)} alt="banner" className="h-16 w-full object-cover rounded" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition rounded-xl">
                          <p className="text-white text-xs font-semibold">Change Banner</p>
                        </div>
                      </div>
                    ) : employer?.companyDetail?.companyBanner?.[0] ? (
                      <div className="relative group w-full h-full flex items-center justify-center p-2">
                        <img src={employer.companyDetail.companyBanner[0]} alt="banner" className="h-16 w-full object-cover rounded" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition rounded-xl">
                          <p className="text-white text-xs font-semibold">Change Banner</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-4">
                        <ImageIcon className="mx-auto text-purple-500 mb-2" size={24} />
                        <p className="text-sm font-semibold text-gray-700">Company Banner</p>
                        <p className="text-[11px] text-gray-400 mt-1">PNG, JPG, JPEG (Max 2MB)</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Image Upload Guidelines */}
                <div className="mb-8 bg-purple-50/40 border border-purple-100 rounded-xl p-4 flex flex-col gap-2">
                  <p className="text-sm font-semibold text-purple-900">Image Upload Guidelines:</p>
                  <ul className="text-xs text-gray-600 space-y-1 list-disc pl-5">
                    <li>Supported Formats: <span className="font-medium text-gray-800">PNG, JPG, JPEG</span></li>
                    <li>Maximum File Size: <span className="font-medium text-gray-800">2MB</span> per image</li>
                    <li>Recommended Dimensions: <span className="font-medium text-gray-800">Square (1:1 Ratio)</span> for Logo, <span className="font-medium text-gray-800">Landscape (16:9 Ratio)</span> for Banner</li>
                  </ul>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Company Name *</label>
                    <Field name="name" className={touched.name && errors.name ? inputErrorClass : inputClass} />
                    <ErrorMessage name="name" component="p" className="text-red-500 text-xs mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Email *</label>
                    <Field name="email" type="email" className={touched.email && errors.email ? inputErrorClass : inputClass} />
                    <ErrorMessage name="email" component="p" className="text-red-500 text-xs mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Mobile Number *</label>
                    <div className={`flex items-center mt-2 bg-gray-50 border rounded-md transition-all focus-within:ring-1 ${touched.mobileNumber && errors.mobileNumber
                        ? "border-red-400 focus-within:ring-red-400"
                        : "border-gray-300 focus-within:ring-purple-400"
                      }`}>
                      <span className={`pl-4 text-sm font-semibold select-none border-r pr-3 py-2 bg-gray-100 rounded-l-md ${touched.mobileNumber && errors.mobileNumber
                          ? "text-red-500 border-red-400"
                          : "text-gray-500 border-gray-300"
                        }`}>
                        +91
                      </span>
                      <Field
                        name="mobileNumber"
                        type="text"
                        inputMode="numeric"
                        className="w-full bg-transparent px-4 py-2 text-sm focus:outline-none text-gray-800"
                        onChange={(e) => {
                          const val = e.target.value;
                          const onlyNums = val.replace(/\D/g, "");
                          if (onlyNums.length <= 10) {
                            setFieldValue("mobileNumber", onlyNums);
                          }
                        }}
                      />
                    </div>
                    <ErrorMessage name="mobileNumber" component="p" className="text-red-500 text-xs mt-1" />
                  </div>
                  <div className="relative">
                    <label className="text-sm font-semibold text-gray-700">New Password</label>
                    <Field name="password" type={showPassword ? "text" : "password"} className={touched.password && errors.password ? inputErrorClass : inputClass} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-10 text-gray-400">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <ErrorMessage name="password" component="p" className="text-red-500 text-xs mt-1" />
                    <p className="text-xs text-gray-500 mt-1">
                      Must be at least 8 characters, containing 1 uppercase, 1 lowercase, 1 number, and 1 special character (e.g. @$!%*?&).
                    </p>
                  </div>
                </div>

                {/* Location Selectors */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 p-4 bg-purple-50/30 rounded-lg">
                  <CountrySelect onChange={(e) => setCountryid(e ? e.id : 101)} placeHolder="Update Country" />
                  <StateSelect countryid={countryid || 101} onChange={(e) => e && setStateData({ id: e.id, name: e.name })} placeHolder="Update State *" />
                  <CitySelect countryid={countryid || 101} stateid={stateData.id} onChange={(e) => e && setCityData({ id: e.id, name: e.name })} placeHolder="Update City *" />
                </div>
              </div>

              {/* Business Details Section */}
              <div className="border border-gray-200 rounded-2xl p-4">
                <h2 className={sectionHeading}><Briefcase size={20} /> Business Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Field as="select" name="foundedIn" className={inputClass}>
                    <option value="">Founded Year</option>
                    {years.map((y) => <option key={y} value={y}>{y}</option>)}
                  </Field>
                  <Field as="select" name="companyType" className={inputClass}>
                    <option value="">Company Type</option>
                    <option value="Startup">Startup</option>
                    <option value="Private Limited">Private Limited</option>
                    <option value="MNC">MNC</option>
                  </Field>
                  <Field as="select" name="companySize" className={inputClass}>
                    <option value="">Company Size</option>
                    <option value="1-10">1-10 Employees</option>
                    <option value="11-50">11-50 Employees</option>
                    <option value="51-200">51-200 Employees</option>
                    <option value="500+">500+ Employees</option>
                  </Field>
                </div>
                <Field as="textarea" name="about" rows="4" className={`${inputClass} mt-4`} placeholder="About Company..." />
              </div>

              {/* Hiring Preference Section */}
              <div className="border border-gray-200 rounded-2xl p-4">
                <h2 className={sectionHeading}><BadgeCheck size={20} /> Hiring Preference</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Field
                      name="hiringFor"
                      placeholder="Hiring For..."
                      className={
                        touched.hiringFor && errors.hiringFor
                          ? inputErrorClass
                          : inputClass
                      }
                    />
                    <ErrorMessage
                      name="hiringFor"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <Field as="select" name="jobLocationType" className={inputClass}>
                    <option value="">Location Type</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </Field>
                  <Field name="avgHiring" type="number" placeholder="Avg Hiring/Month" className={inputClass} />
                </div>
                <div className="mt-4">
                  <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={handleAddSkill} placeholder="Skills (Press Enter)" className={inputClass} />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill, index) => (
                      <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                        {skill} <X size={12} className="cursor-pointer" onClick={() => setSkills(skills.filter((s) => s !== skill))} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Legal Documentation Section */}
              <div className="border border-gray-200 rounded-2xl p-4">
                <h2 className={sectionHeading}><ImageIcon size={20} /> Legal Documentation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Legal Name</label>
                    <Field
                      name="legalName"
                      className={
                        touched.legalName && errors.legalName
                          ? inputErrorClass
                          : inputClass
                      }
                    />
                    <ErrorMessage
                      name="legalName"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Registration Number</label>
                    <Field
                      name="regNumber"
                      className={
                        touched.regNumber && errors.regNumber
                          ? inputErrorClass
                          : inputClass
                      }
                    />
                    <ErrorMessage
                      name="regNumber"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">GST Number</label>
                    <Field
                      name="gstNumber"
                      className={
                        touched.gstNumber && errors.gstNumber
                          ? inputErrorClass
                          : inputClass
                      }
                    />
                    <ErrorMessage
                      name="gstNumber"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">CIN Number</label>
                    <Field
                      name="cinNumber"
                      className={
                        touched.cinNumber && errors.cinNumber
                          ? inputErrorClass
                          : inputClass
                      }
                    />
                    <ErrorMessage
                      name="cinNumber"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-6 pt-4">
                <button type="button" onClick={() => navigate(-1)} className="px-12 py-2.5 rounded-lg bg-gray-100 font-bold">Cancel</button>
                <button type="submit" disabled={loading} className="px-12 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-900 text-white font-bold shadow-lg">
                  {loading ? "Updating..." : "Update Details"}
                </button>
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditEmployee;