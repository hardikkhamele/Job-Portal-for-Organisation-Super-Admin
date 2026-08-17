import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addNotification } from "../../utils/notificationHelper";
import {
  updateCredits,
  clearUpdateStatus,
} from "../../redux/slice/creditManagement/creditSlice";
import {
  Database,
  Briefcase,
  UserCheck,
  FileSpreadsheet,
  Star,
  Zap,
  Trophy,
  Save,
  Loader2,
  X,
  Settings,
} from "lucide-react";

const CreditSchema = Yup.object().shape({
  databaseCredit: Yup.object().shape({
    profileUnlock: Yup.number()
      .min(1, "Credit value must be greater than 0")
      .integer("Whole number only")
      .required("Required"),
    excelDownload: Yup.number()
      .min(1, "Credit value must be greater than 0")
      .integer("Whole number only")
      .required("Required"),
  }),
  jobPostCredit: Yup.object().shape({
    classicJobPost: Yup.number()
      .min(1, "Credit value must be greater than 0")
      .integer("Whole number only")
      .required("Required"),
    premiumJobPost: Yup.number()
      .min(1, "Credit value must be greater than 0")
      .integer("Whole number only")
      .required("Required"),
    superPremiumJobPost: Yup.number()
      .min(1, "Credit value must be greater than 0")
      .integer("Whole number only")
      .required("Required"),
  }),
});

const InputField = ({ name, label, icon: Icon, iconColor }) => (
  <div className="space-y-1.5">
    <label className={`flex items-center gap-1.5 text-xs font-semibold  ${iconColor}`}>
      <Icon size={12} />
      {label}
    </label>
    <Field name={name}>
      {({ field, meta }) => (
        <input
          {...field}
          type="number"
          min="0"
          className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold text-gray-800
            bg-white outline-none transition-all duration-200
            focus:ring-2 focus:ring-purple-300 focus:border-purple-400
            ${meta.touched && meta.error
              ? "border-red-300 bg-red-50"
              : "border-gray-200 hover:border-purple-300"
            }`}
        />
      )}
    </Field>
    <ErrorMessage
      name={name}
      render={(msg) => (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <X size={10} /> {msg}
        </p>
      )}
    />
  </div>
);

const EditCreditModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { credits, updateLoading, updateSuccess, updateError } = useSelector(
    (state) => state.creditManagement
  );

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Credits updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      addNotification(
        "Credit Settings Updated",
        "System-wide credit settings and thresholds were updated successfully.",
        "success"
      );
      dispatch(clearUpdateStatus());
      onClose();
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (updateError) {
      toast.error(updateError || "Failed to update credits", {
        position: "top-right",
        autoClose: 4000,
        theme: "colored",
      });
      dispatch(clearUpdateStatus());
    }
  }, [updateError]);

  const initialValues = {
    databaseCredit: {
      profileUnlock: credits?.databaseCredit?.profileUnlock ?? 0,
      excelDownload: credits?.databaseCredit?.excelDownload ?? 0,
    },
    jobPostCredit: {
      classicJobPost: credits?.jobPostCredit?.classicJobPost ?? 0,
      premiumJobPost: credits?.jobPostCredit?.premiumJobPost ?? 0,
      superPremiumJobPost: credits?.jobPostCredit?.superPremiumJobPost ?? 0,
    },
  };

  const handleSubmit = (values) => {
    dispatch(
      updateCredits({
        databaseCredit: {
          profileUnlock: Number(values.databaseCredit.profileUnlock),
          excelDownload: Number(values.databaseCredit.excelDownload),
        },
        jobPostCredit: {
          classicJobPost: Number(values.jobPostCredit.classicJobPost),
          premiumJobPost: Number(values.jobPostCredit.premiumJobPost),
          superPremiumJobPost: Number(values.jobPostCredit.superPremiumJobPost),
        },
      })
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-purple-600 to-violet-600">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl">
              <Settings size={16} className="text-white" />
            </div>
            <h2 className="text-base font-bold text-white">Edit Credits</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={CreditSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ dirty, isValid }) => (
            <Form className="p-6 space-y-5">

              {/* Database Credits */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-purple-100 rounded-lg">
                    <Database size={14} className="text-purple-600" />
                  </div>
                  <span className="text-xs font-bold text-purple-600  ">
                    Database Credits
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InputField
                    name="databaseCredit.profileUnlock"
                    label="Profile Unlock"
                    icon={UserCheck}
                    iconColor="text-purple-500"
                  />
                  <InputField
                    name="databaseCredit.excelDownload"
                    label="Excel Download"
                    icon={FileSpreadsheet}
                    iconColor="text-violet-500"
                  />
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Job Post Credits */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-fuchsia-100 rounded-lg">
                    <Briefcase size={14} className="text-fuchsia-600" />
                  </div>
                  <span className="text-xs font-bold text-fuchsia-600  ">
                    Job Post Credits
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <InputField
                    name="jobPostCredit.classicJobPost"
                    label="Classic"
                    icon={Star}
                    iconColor="text-indigo-500"
                  />
                  <InputField
                    name="jobPostCredit.premiumJobPost"
                    label="Premium"
                    icon={Zap}
                    iconColor="text-purple-600"
                  />
                  <InputField
                    name="jobPostCredit.superPremiumJobPost"
                    label="Super"
                    icon={Trophy}
                    iconColor="text-fuchsia-600"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-gray-600
                    border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateLoading || !dirty || !isValid}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl
                    text-sm font-semibold text-white transition-all duration-200
                    ${updateLoading || !dirty || !isValid
                      ? "bg-purple-300 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 active:scale-95 shadow-sm hover:shadow-md"
                    }`}
                >
                  {updateLoading ? (
                    <><Loader2 size={16} className="animate-spin" /> Saving...</>
                  ) : (
                    <><Save size={16} /> Save Changes</>
                  )}
                </button>
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditCreditModal;