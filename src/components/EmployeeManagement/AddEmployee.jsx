import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ArrowLeft, Eye, EyeOff, Upload, X, Image as ImageIcon, Building2, Briefcase, BadgeCheck, Linkedin, Twitter, Facebook } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployer } from '../../redux/slice/employer/addEmployeeSlice';
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const AddEmployee = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.addEmployee);

  const [showPassword, setShowPassword] = useState(false);
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [countryid, setCountryid] = useState(0);
  const [stateData, setStateData] = useState({ id: 0, name: "" });
  const [cityData, setCityData] = useState({ id: 0, name: "" });

  const years = Array.from({ length: 2026 - 1952 + 1 }, (_, i) => 2026 - i);

  const validationSchema = Yup.object({
    name: Yup.string().required('Company Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Min 6 characters').required('Password is required'),
    mobile: Yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile').required('Mobile is required'),
  });

  const initialValues = {
    name: '', email: '', password: '', mobile: '',
    tagline: '', website: '', linkedin: '', twitter: '', facebook: '',
    foundedIn: '', companyType: '', companySize: '', about: '',
    hiringFor: '', jobLocationType: '', avgHiring: '',
    legalName: '', regNumber: '', gstNumber: '', cinNumber: '', area: ''
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleSubmit = (values) => {
    if (!stateData.name || !cityData.name) return alert("State and City are required");

    const formData = new FormData();
    
    // Flat fields
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('mobileNumber', values.mobile);
    formData.append('state', stateData.name);
    formData.append('city', cityData.name);

    // Nested Objects as Strings (Backend usually parses these or you append nested keys)
    // Structured according to your JSON:
    formData.append('companyDetail[companyTagline]', values.tagline);
    formData.append('companyDetail[companyWebsite]', values.website);
    formData.append('companyDetail[location][area]', values.area);
    if(logo) formData.append('companyLogo', logo); // Field name matches backend
    if(banner) formData.append('companyBanner', banner);

    formData.append('businessDetail[fundedIn]', values.foundedIn);
    formData.append('businessDetail[typeOfCompany]', values.companyType);
    formData.append('businessDetail[companySize]', values.companySize);
    formData.append('businessDetail[aboutCompany]', values.about);

    formData.append('hiringPreference[hiringFor]', values.hiringFor);
    formData.append('hiringPreference[jobLocation][type]', values.jobLocationType);
    formData.append('hiringPreference[topHiringSkill]', skills.join(', '));
    formData.append('hiringPreference[averageHiringPerMonth]', values.avgHiring);

    formData.append('verificationAndDocumentation[companyLegalName]', values.legalName);
    formData.append('verificationAndDocumentation[companyRegisterNumber]', values.regNumber);
    formData.append('verificationAndDocumentation[GSTNumber]', values.gstNumber);
    formData.append('verificationAndDocumentation[CINNumber]', values.cinNumber);

    formData.append('socialMediaLinks[linkedin]', values.linkedin);
    formData.append('socialMediaLinks[twitter]', values.twitter);

    dispatch(createEmployer(formData));
    navigate("/employee")
  };

  const inputClass = "w-full mt-2 bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all";
  const sectionHeading = "flex items-center gap-2 text-lg font-bold text-purple-800 mb-5 border-b border-purple-100 pb-2";

  return (
    <div className="w-full min-h-screen p-8 bg-gray-50">
      <div className="w-full bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-100 transition">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Add New Employee</h1>
        </div>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {() => (
            <Form className="space-y-12">
              {/* Section 1: Company Details */}
              <div className="bg-white border border-gray-200 p-4 rounded-2xl">
                <h2 className={sectionHeading}><Building2 size={20}/> Company Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-xl p-6 bg-purple-50/20 relative hover:border-purple-400 transition cursor-pointer">
                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setLogo(e.target.files[0])} />
                    {logo ? <img src={URL.createObjectURL(logo)} alt="logo" className="h-16 w-16 object-contain" /> : <div className="text-center"><Upload className="mx-auto text-purple-500 mb-1" size={20} /><p className="text-xs text-gray-500">Company Logo</p></div>}
                  </div>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-xl p-6 bg-purple-50/20 relative hover:border-purple-400 transition cursor-pointer">
                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setBanner(e.target.files[0])} />
                    {banner ? <img src={URL.createObjectURL(banner)} alt="banner" className="h-16 w-full object-cover rounded" /> : <div className="text-center"><ImageIcon className="mx-auto text-purple-500 mb-1" size={20} /><p className="text-xs text-gray-500">Company Banner</p></div>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div><label className="text-sm font-semibold text-gray-700">Company Name *</label><Field name="name" className={inputClass} /><ErrorMessage name="name" component="p" className="text-red-500 text-xs mt-1" /></div>
                  <div><label className="text-sm font-semibold text-gray-700">Email *</label><Field name="email" type="email" className={inputClass} /><ErrorMessage name="email" component="p" className="text-red-500 text-xs mt-1" /></div>
                  <div className="relative">
                    <label className="text-sm font-semibold text-gray-700">Password *</label>
                    <Field name="password" type={showPassword ? "text" : "password"} className={inputClass} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-10 text-gray-400">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                  </div>
                  <div><label className="text-sm font-semibold text-gray-700">Mobile *</label><Field name="mobile" className={inputClass} /></div>
                  <div><label className="text-sm font-semibold text-gray-700">Tagline</label><Field name="tagline" className={inputClass} /></div>
                  <div><label className="text-sm font-semibold text-gray-700">Website</label><Field name="website" className={inputClass} /></div>
                  <div><label className="text-sm font-semibold text-gray-700">Area/Street</label><Field name="area" className={inputClass} /></div>
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 border-t pt-6">
                  <div><label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><Linkedin size={16} className="text-blue-600"/> LinkedIn</label><Field name="linkedin" className={inputClass} /></div>
                  <div><label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><Twitter size={16} className="text-sky-400"/> Twitter</label><Field name="twitter" className={inputClass} /></div>
                  <div><label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><Facebook size={16} className="text-blue-800"/> Facebook</label><Field name="facebook" className={inputClass} /></div>
                </div>

                {/* Location */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 p-4 bg-purple-50/30 rounded-lg">
                  <CountrySelect onChange={(e) => setCountryid(e.id)} placeHolder="Select Country" />
                  <StateSelect countryid={countryid} onChange={(e) => setStateData({id: e.id, name: e.name})} placeHolder="Select State *" />
                  <CitySelect countryid={countryid} stateid={stateData.id} onChange={(e) => setCityData({id: e.id, name: e.name})} placeHolder="Select City *" />
                </div>
              </div>

              {/* Section 2: Business Details */}
              <div className='border border-gray-200 rounded-2xl p-4'>
                <h2 className={sectionHeading}><Briefcase size={20}/> Business Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Field as="select" name="foundedIn" className={inputClass}>
                    <option value="">Founded Year</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </Field>
                  <Field as="select" name="companyType" className={inputClass}>
                    <option value="">Company Type</option>
                    <option value="Startup">Startup</option>
                    <option value="Private Limited">Private Limited</option>
                  </Field>
                  <Field as="select" name="companySize" className={inputClass}>
                    <option value="">Company Size</option>
                    <option value="1-10">1-10</option>
                    <option value="50-100">50-100</option>
                  </Field>
                </div>
                <Field as="textarea" name="about" rows="4" className={`${inputClass} mt-4`} placeholder="About Company..." />
              </div>

              {/* Section 3: Hiring */}
              <div className='border border-gray-200 rounded-2xl p-4'>
                <h2 className={sectionHeading}><BadgeCheck size={20}/> Hiring Preference</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Field name="hiringFor" placeholder="Hiring For..." className={inputClass} />
                  <Field as="select" name="jobLocationType" className={inputClass}>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Online">Online</option>
                    <option value="Onsite">Onsite</option>
                  </Field>
                  <Field name="avgHiring" type="number" placeholder="Avg Hiring/Month" className={inputClass} />
                </div>
                <div className="mt-4">
                  <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={handleAddSkill} placeholder="Skills (Press Enter)" className={inputClass} />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((s, i) => <span key={i} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs flex items-center gap-1">{s}<X size={12} onClick={() => setSkills(skills.filter(x => x !== s))}/></span>)}
                  </div>
                </div>
              </div>

              {/* Section 4: Legal */}
              <div className="border border-gray-200 rounded-2xl px-4 py-8">
                <h3 className="font-bold text-purple-800 mb-5 italic">Legal Documentation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field name="legalName" placeholder="Legal Name" className={inputClass} />
                  <Field name="regNumber" placeholder="Reg Number" className={inputClass} />
                  <Field name="gstNumber" placeholder="GST Number" className={inputClass} />
                  <Field name="cinNumber" placeholder="CIN Number" className={inputClass} />
                </div>
              </div>

              <div className="flex justify-center gap-6 pt-4">
                <button type="button" onClick={() => navigate(-1)} className="px-12 py-2.5 rounded-lg bg-gray-100 font-bold">Cancel</button>
                <button type="submit" disabled={loading} className="px-12 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-900 text-white font-bold shadow-lg">
                  {loading ? 'Saving...' : 'Save Details'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddEmployee;