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
import { Formik, Form, Field } from "formik";
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
  const [countryid, setCountryid] = useState(0);
  const [stateData, setStateData] = useState({ id: 0, name: "" });
  const [cityData, setCityData] = useState({ id: 0, name: "" });

  const years = Array.from({ length: 2026 - 1950 + 1 }, (_, i) => 2026 - i);

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
    mobileNumber: employer?.mobileNumber || "", // Fixed field name
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
    formData.append("mobileNumber", values.mobileNumber); // Using mobileNumber key

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

        <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={handleSubmit}>
          {() => (
            <Form className="space-y-12">
              
              <div className="bg-white border border-gray-200 p-4 rounded-2xl">
                <h2 className={sectionHeading}><Building2 size={20} /> Basic Info</h2>
                
                {/* Logo & Banner Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-xl p-6 relative hover:border-purple-400 transition cursor-pointer">
                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setLogo(e.target.files[0])} />
                    {logo ? <img src={URL.createObjectURL(logo)} alt="logo" className="h-16 w-16 object-contain" /> : 
                     employer?.companyDetail?.companyLogo?.[0] ? <img src={employer.companyDetail.companyLogo[0]} alt="logo" className="h-16 w-16 object-contain" /> :
                     <div className="text-center"><Upload className="mx-auto text-purple-500 mb-1" size={20} /><p className="text-xs text-gray-500">Change Logo</p></div>}
                  </div>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-xl p-6 relative hover:border-purple-400 transition cursor-pointer">
                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setBanner(e.target.files[0])} />
                    {banner ? <img src={URL.createObjectURL(banner)} alt="banner" className="h-16 w-full object-cover rounded" /> : 
                     employer?.companyDetail?.companyBanner?.[0] ? <img src={employer.companyDetail.companyBanner[0]} alt="banner" className="h-16 w-full object-cover rounded" /> :
                     <div className="text-center"><ImageIcon className="mx-auto text-purple-500 mb-1" size={20} /><p className="text-xs text-gray-500">Change Banner</p></div>}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div><label className="text-sm font-semibold text-gray-700">Company Name</label><Field name="name" className={inputClass} /></div>
                  <div><label className="text-sm font-semibold text-gray-700">Email</label><Field name="email" type="email" className={inputClass} /></div>
                  <div><label className="text-sm font-semibold text-gray-700">Mobile Number</label><Field name="mobileNumber" className={inputClass} /></div>
                  <div className="relative">
                    <label className="text-sm font-semibold text-gray-700">New Password</label>
                    <Field name="password" type={showPassword ? "text" : "password"} className={inputClass} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-10 text-gray-400">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Location Selectors */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 p-4 bg-purple-50/30 rounded-lg">
                  <CountrySelect onChange={(e) => setCountryid(e.id)} placeHolder="Update Country" />
                  <StateSelect countryid={countryid} onChange={(e) => setStateData({ id: e.id, name: e.name })} placeHolder="Update State" />
                  <CitySelect countryid={countryid} stateid={stateData.id} onChange={(e) => setCityData({ id: e.id, name: e.name })} placeHolder="Update City" />
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
                  <Field name="hiringFor" placeholder="Hiring For..." className={inputClass} />
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
                  <div><label className="text-sm font-semibold text-gray-700">Legal Name</label><Field name="legalName" className={inputClass} /></div>
                  <div><label className="text-sm font-semibold text-gray-700">Registration Number</label><Field name="regNumber" className={inputClass} /></div>
                  <div><label className="text-sm font-semibold text-gray-700">GST Number</label><Field name="gstNumber" className={inputClass} /></div>
                  <div><label className="text-sm font-semibold text-gray-700">CIN Number</label><Field name="cinNumber" className={inputClass} /></div>
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