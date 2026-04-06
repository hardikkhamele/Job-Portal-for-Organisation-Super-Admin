import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ArrowLeft, Eye, EyeOff, Upload, X, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);

  const validationSchema = Yup.object({
    companyName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Min 6 characters').required('Required'),
    mobile: Yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile').required('Required'),
    hiringFor: Yup.string().required('Select hiring type'),
    about: Yup.string().required('Required'),
  });

  const initialValues = {
    companyName: '', email: '', password: '', mobile: '',
    website: '', foundedIn: '', about: '', hiringFor: '',
    avgHiring: '', legalName: '', regNumber: '', gstNumber: '', cinNumber: ''
  };

  // Skill Handlers
  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const inputClass = "w-full mt-2 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all";

  return (
    <div className="w-full min-h-screen p-8">
      <div className="w-full bg-white rounded-xl p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center bg-white hover:bg-gray-50 transition">
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Add Employee / Company</h1>
        </div>

        <div className="border-b border-gray-500 mb-5"></div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const finalData = { ...values, logo, banner, skills, countryid, stateid };
            console.log("Final Data:", finalData);
          }}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-8">
              
              {/* --- 1. Logo & Banner Section --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-dashed border-purple-200 p-6 rounded-lg bg-purple-50/30">
                {/* Logo Upload */}
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white relative hover:border-purple-400 transition">
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setLogo(e.target.files[0])} />
                  {logo ? (
                    <img src={URL.createObjectURL(logo)} alt="logo" className="h-20 w-20 object-contain rounded" />
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto text-purple-600 mb-2" size={24} />
                      <p className="text-xs font-medium text-gray-600">Upload Company Logo</p>
                    </div>
                  )}
                </div>

                {/* Banner Upload */}
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white relative hover:border-purple-400 transition">
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setBanner(e.target.files[0])} />
                  {banner ? (
                    <img src={URL.createObjectURL(banner)} alt="banner" className="h-20 w-full object-cover rounded" />
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="mx-auto text-purple-600 mb-2" size={24} />
                      <p className="text-sm font-medium text-gray-600">Upload Company Banner</p>
                    </div>
                  )}
                </div>
              </div>

              {/* --- 2. Basic Info --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                <div>
                  <label className="text-sm text-gray-700 font-medium">Company Name</label>
                  <Field name="companyName" placeholder="Enter Company Name" className={inputClass} />
                  <ErrorMessage name="companyName" component="span" className="text-red-500 text-xs" />
                </div>
                <div>
                  <label className="text-sm text-gray-700 font-medium">Mobile Number</label>
                  <Field name="mobile" placeholder="10 Digit Mobile" className={inputClass} />
                </div>
                <div>
                  <label className="text-sm text-gray-700 font-medium">Email Address</label>
                  <Field name="email" type="email" placeholder="hr@company.com" className={inputClass} />
                </div>
                <div className="relative">
                  <label className="text-sm text-gray-700 font-medium">Password</label>
                  <Field name="password" type={showPassword ? "text" : "password"} placeholder="Set Password" className={inputClass} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-gray-500">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* --- 3. Location (Country, State, City) --- */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div>
                  <label className="text-sm font-medium text-gray-700 ">Country</label>
                  <CountrySelect
                    onChange={(e) => setCountryid(e.id)}
                    placeHolder="Select Country"
                    containerClassName="mt-2"
                    inputClassName="!text-sm !bg-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700  ">State</label>
                  <StateSelect
                    countryid={countryid}
                    onChange={(e) => setStateid(e.id)}
                    placeHolder="Select State"
                    containerClassName="mt-2"
                  />
                </div>
                <div>
                  <label className="text-ms font-medium text-gray-700  ">City</label>
                  <CitySelect
                    countryid={countryid}
                    stateid={stateid}
                    onChange={(e) => console.log(e)}
                    placeHolder="Select City"
                    containerClassName="mt-2"
                  />
                </div>
              </div>

              {/* --- 4. Hiring & Skills --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label className="text-sm text-gray-700 font-medium">Hiring For</label>
                  <Field as="select" name="hiringFor" className={inputClass}>
                    <option value="">Select Category</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Contract">Contract</option>
                  </Field>
                </div>
                <div>
                  <label className="text-sm text-gray-700 font-medium">Skills (Press Enter to add)</label>
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleAddSkill}
                    placeholder="Type skill & press enter"
                    className={inputClass}
                  />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {skills.map((skill, index) => (
                      <span key={index} className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold border border-purple-200">
                        {skill}
                        <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => removeSkill(skill)} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* --- 5. About & Company Type --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-700 font-medium">About Company</label>
                  <Field as="textarea" name="about" rows="3" className={inputClass} placeholder="Describe company culture..." />
                </div>
                <div className="space-y-4">
                    <label className="text-sm text-gray-700 font-medium">Company Website</label>
                    <Field name="website" placeholder="https://company.com" className={inputClass} />
                    <label className="text-sm text-gray-700 font-medium">Average Hiring Per Month</label>
                    <Field name="avgHiring" type="number" className={inputClass} />
                </div>
              </div>

              {/* --- 6. Verification Section --- */}
              <div className="bg-purple-50 px-6 py-10 rounded-lg border border-purple-100 shadow-inner">
                <h3 className="font-bold text-purple-800 mb-4 flex items-center gap-2  decoration-purple-300 decoration-2">
                  Legal Documentation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field name="legalName" placeholder="Company Legal Name" className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-sm focus:ring-1 focus:ring-purple-400 outline-none" />
                  <Field name="regNumber" placeholder="Registration Number" className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-sm focus:ring-1 focus:ring-purple-400 outline-none" />
                  <Field name="gstNumber" placeholder="GST Number" className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-sm focus:ring-1 focus:ring-purple-400 outline-none" />
                  <Field name="cinNumber" placeholder="CIN Number" className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-sm focus:ring-1 focus:ring-purple-400 outline-none" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-8 mt-10">
                <button type="button" onClick={() => navigate(-1)} className="px-16 py-2 rounded-md bg-purple-100 text-purple-700 font-semibold hover:bg-purple-200 transition">
                  Cancel
                </button>
                <button type="submit" className="px-16 py-2 rounded-md bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold shadow-lg hover:scale-105 transition-all">
                  Save Details
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