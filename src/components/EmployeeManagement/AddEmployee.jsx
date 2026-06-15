import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Upload,
  X,
  Image as ImageIcon,
  Building2,
  Briefcase,
  BadgeCheck,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createEmployer } from "../../redux/slice/employer/addEmployeeSlice";
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from "react-country-state-city";
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

  const [locationTouched, setLocationTouched] = useState({
    state: false,
    city: false,
  });

  const years = Array.from({ length: 2026 - 1952 + 1 }, (_, i) => 2026 - i);

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, "Name must contain only alphabetic characters and proper spacing")
      .required("Company Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
    mobile: Yup.string()
      .matches(/^(?!00)[0-9]{10}$/, "Mobile number must be exactly 10 digits and cannot start with '00'")
      .required("Mobile is required"),
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
  const initialValues = {
    name: "",
    email: "",
    password: "",
    mobile: "",
    tagline: "",
    website: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    foundedIn: "",
    companyType: "",
    companySize: "",
    about: "",
    hiringFor: "",
    jobLocationType: "",
    avgHiring: "",
    legalName: "",
    regNumber: "",
    gstNumber: "",
    cinNumber: "",
    area: "",
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
    let missingFields = [];

    if (!values.name) missingFields.push("Company Name");
    if (!values.email) missingFields.push("Email");
    if (!values.password) missingFields.push("Password");
    if (!values.mobile) missingFields.push("Mobile Number");
    if (!stateData.name) missingFields.push("State");
    if (!cityData.name) missingFields.push("City");

    setLocationTouched({ state: true, city: true });

    if (missingFields.length > 0) {
      missingFields.forEach((field) => {
        toast.error(`${field} is required`);
      });
      return;
    }

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("mobileNumber", values.mobile);
    formData.append("state", stateData.name);
    formData.append("city", cityData.name);

    formData.append("companyDetail[companyTagline]", values.tagline);
    formData.append("companyDetail[companyWebsite]", values.website);
    formData.append("companyDetail[location][area]", values.area);
    if (logo) formData.append("companyLogo", logo);
    if (banner) formData.append("companyBanner", banner);

    formData.append("businessDetail[fundedIn]", values.foundedIn);
    formData.append("businessDetail[typeOfCompany]", values.companyType);
    formData.append("businessDetail[companySize]", values.companySize);
    formData.append("businessDetail[aboutCompany]", values.about);

    formData.append("hiringPreference[hiringFor]", values.hiringFor);
    formData.append(
      "hiringPreference[jobLocation][type]",
      values.jobLocationType,
    );
    formData.append("hiringPreference[topHiringSkill]", skills.join(", "));
    formData.append(
      "hiringPreference[averageHiringPerMonth]",
      values.avgHiring,
    );

    formData.append(
      "verificationAndDocumentation[companyLegalName]",
      values.legalName,
    );
    formData.append(
      "verificationAndDocumentation[companyRegisterNumber]",
      values.regNumber,
    );
    formData.append(
      "verificationAndDocumentation[GSTNumber]",
      values.gstNumber,
    );
    formData.append(
      "verificationAndDocumentation[CINNumber]",
      values.cinNumber,
    );

    formData.append("socialMediaLinks[linkedin]", values.linkedin);
    formData.append("socialMediaLinks[twitter]", values.twitter);

    try {
      await dispatch(createEmployer(formData)).unwrap();

      toast.success("Employer added successfully!");
      navigate("/employee");
    } catch (error) {
      console.error("Failed to add employer:", error);
      // toast.error(error || "Something went wrong");
    }
  };

  const inputClass =
    "w-full mt-2 bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all";
  const inputErrorClass =
    "w-full mt-2 bg-gray-50 border border-red-400 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-400 transition-all";
  const sectionHeading =
    "flex items-center gap-2 text-lg font-bold text-purple-800 mb-5 border-b border-purple-100 pb-2";

  return (
    <div className="w-full min-h-screen p-3 bg-gray-50">
      <div className="w-full bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-100 transition"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Add New Employee
          </h1>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {/* setFieldValue add here for only number validation  */}
          {({ errors, touched, setFieldValue }) => (
            <Form className="space-y-12">
              {/* Section 1: Company Details */}
              <div className="bg-white border border-gray-200 p-4 rounded-2xl">
                <h2 className={sectionHeading}>
                  <Building2 size={20} /> Company Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-xl p-6 bg-purple-50/20 relative hover:border-purple-400 transition cursor-pointer">
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
                        <img
                          src={URL.createObjectURL(logo)}
                          alt="logo"
                          className="h-16 w-16 object-contain"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition rounded-xl">
                          <p className="text-white text-xs font-semibold">Change Logo</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-4">
                        <Upload
                          className="mx-auto text-purple-500 mb-2"
                          size={24}
                        />
                        <p className="text-sm font-semibold text-gray-700">Company Logo</p>
                        <p className="text-[11px] text-gray-400 mt-1">PNG, JPG, JPEG (Max 2MB)</p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-xl p-6 bg-purple-50/20 relative hover:border-purple-400 transition cursor-pointer">
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
                        <img
                          src={URL.createObjectURL(banner)}
                          alt="banner"
                          className="h-16 w-full object-cover rounded"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition rounded-xl">
                          <p className="text-white text-xs font-semibold">Change Banner</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-4">
                        <ImageIcon
                          className="mx-auto text-purple-500 mb-2"
                          size={24}
                        />
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* ✅ Company Name - error border + message */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Company Name *
                    </label>
                    <Field
                      name="name"
                      className={
                        touched.name && errors.name
                          ? inputErrorClass
                          : inputClass
                      }
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  {/* ✅ Email - error border + message */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Email *
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className={
                        touched.email && errors.email
                          ? inputErrorClass
                          : inputClass
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  {/* ✅ Password - error border + message */}
                  <div className="relative">
                    <label className="text-sm font-semibold text-gray-700">
                      Password *
                    </label>
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className={
                        touched.password && errors.password
                          ? inputErrorClass
                          : inputClass
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-10 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Must be at least 8 characters, containing 1 uppercase, 1 lowercase, 1 number, and 1 special character (e.g. @$!%*?&).
                    </p>
                  </div>

                  {/* ✅ Mobile - error border + message */}
                  {/* <div>
                    <label className="text-sm font-semibold text-gray-700">Mobile *</label>
                    <Field name="mobile" className={touched.mobile && errors.mobile ? inputErrorClass : inputClass} />
                    <ErrorMessage name="mobile" component="p" className="text-red-500 text-xs mt-1" />
                  </div> */}

                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Mobile *
                    </label>
                    <Field
                      name="mobile"
                      type="text"
                      inputMode="numeric" // Mobile par number pad dikhayega
                      className={
                        touched.mobile && errors.mobile
                          ? inputErrorClass
                          : inputClass
                      }
                      // Is logic ko add karein:
                      onChange={(e) => {
                        const val = e.target.value;
                        // Sirf numbers allow karein (Regex: \D matlab non-digits ko remove karo)
                        const onlyNums = val.replace(/\D/g, "");

                        // Max 10 digits ki limit set karein
                        if (onlyNums.length <= 10) {
                          setFieldValue("mobile", onlyNums);
                        }
                      }}
                    />
                    <ErrorMessage
                      name="mobile"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Tagline
                    </label>
                    <Field name="tagline" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Website
                    </label>
                    <Field name="website" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Area/Street
                    </label>
                    <Field name="area" className={inputClass} />
                  </div>
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 border-t pt-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Linkedin size={16} className="text-blue-600" /> LinkedIn
                    </label>
                    <Field name="linkedin" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Twitter size={16} className="text-sky-400" /> Twitter
                    </label>
                    <Field name="twitter" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Facebook size={16} className="text-blue-800" /> Facebook
                    </label>
                    <Field name="facebook" className={inputClass} />
                  </div>
                </div>

                {/* ✅ Location - State & City inline error message */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 p-4 bg-purple-50/30 rounded-lg">
                  <CountrySelect
                    onChange={(e) => setCountryid(e.id)}
                    placeHolder="Select Country"
                  />

                  <div>
                    <StateSelect
                      countryid={countryid}
                      onChange={(e) => {
                        setStateData({ id: e.id, name: e.name });
                        setLocationTouched((prev) => ({
                          ...prev,
                          state: true,
                        }));
                      }}
                      placeHolder="Select State *"
                    />
                    {locationTouched.state && !stateData.name && (
                      <p className="text-red-500 text-xs mt-1">
                        State is required
                      </p>
                    )}
                  </div>

                  <div>
                    <CitySelect
                      countryid={countryid}
                      stateid={stateData.id}
                      onChange={(e) => {
                        setCityData({ id: e.id, name: e.name });
                        setLocationTouched((prev) => ({ ...prev, city: true }));
                      }}
                      placeHolder="Select City *"
                    />
                    {locationTouched.city && !cityData.name && (
                      <p className="text-red-500 text-xs mt-1">
                        City is required
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2: Business Details */}
              <div className="border border-gray-200 rounded-2xl p-4">
                <h2 className={sectionHeading}>
                  <Briefcase size={20} /> Business Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Field as="select" name="foundedIn" className={inputClass}>
                    <option value="">Founded Year</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
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
                <Field
                  as="textarea"
                  name="about"
                  rows="4"
                  className={`${inputClass} mt-4`}
                  placeholder="About Company..."
                />
              </div>

              {/* Section 3: Hiring */}
              <div className="border border-gray-200 rounded-2xl p-4">
                <h2 className={sectionHeading}>
                  <BadgeCheck size={20} /> Hiring Preference
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  <Field
                    as="select"
                    name="jobLocationType"
                    className={inputClass}
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Online">Online</option>
                    <option value="Onsite">Onsite</option>
                  </Field>
                  <Field
                    name="avgHiring"
                    type="number"
                    placeholder="Avg Hiring/Month"
                    className={inputClass}
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleAddSkill}
                    placeholder="Skills (Press Enter)"
                    className={inputClass}
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((s, i) => (
                      <span
                        key={i}
                        className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs flex items-center gap-1"
                      >
                        {s}
                        <X
                          size={12}
                          onClick={() =>
                            setSkills(skills.filter((x) => x !== s))
                          }
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 4: Legal */}
              <div className="border border-gray-200 rounded-2xl px-4 py-8">
                <h3 className="font-bold text-purple-800 mb-5 italic">
                  Legal Documentation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Field
                      name="legalName"
                      placeholder="Legal Name"
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
                    <Field
                      name="regNumber"
                      placeholder="Reg Number"
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
                    <Field
                      name="gstNumber"
                      placeholder="GST Number"
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
                    <Field
                      name="cinNumber"
                      placeholder="CIN Number"
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

              <div className="flex justify-center gap-6 pt-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-12 py-2.5 rounded-lg bg-gray-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-12 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 cursor-pointer to-purple-900 text-white font-bold shadow-lg"
                >
                  {loading ? "Saving..." : "Save Details"}
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
