import { Controller, useForm } from "react-hook-form";
import LoadingButton from "../../common/Spinner/LoadingButton";
import { useLocation, useNavigate } from "react-router-dom";
import ResendCode from "./ResendCode";
import { AuthService } from "../../../services/auth.service";
import { roleData } from "../FormSignUp/roles-data";
import { useState } from "react";

export default function OTPForm() {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
      otp6: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const registerData = location.state;
  const otpFields = ["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"];
  const watchAllFields = watch(otpFields);

  const onSubmit = async (data) => {
    console.log(data);
    const otp = otpFields.map((field) => data[field]).join("");
    setLoading(true);
    const result = await AuthService.verifyAndRegister(otp, registerData);
    if (result.success) {
      if (result.data.role === roleData.Lecture.value) {
        navigate("/auth/create-lecture-profile");
      } else if (result.data.role === roleData.Student.value)
        navigate("/auth/create-student-profile");
    }
    setLoading(false);
  };

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      if (index < otpFields.length - 1) {
        const nextField = otpFields[index + 1];
        document.getElementById(nextField).focus();
      }
    } else {
      setValue(otpFields[index], "");
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !watchAllFields[index]) {
      // Focus on the previous field if empty
      if (index > 0) {
        const prevField = otpFields[index - 1];
        document.getElementById(prevField).focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("Text")
      .slice(0, otpFields.length);
    pasteData.split("").forEach((char, index) => {
      if (/^\d$/.test(char)) {
        setValue(otpFields[index], char);
        if (index < otpFields.length - 1) {
          document.getElementById(otpFields[index + 1]).focus();
        }
      }
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
      <div className="flex justify-center">
        <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
          <header className="mb-8">
            <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
            <p className="text-[15px] text-slate-500">
              Enter the 6-digit verification code that was sent to your email.
            </p>
          </header>
          <form id="otp-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-center gap-3">
              {otpFields.map((field, index) => (
                <Controller
                  key={field}
                  name={field}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <input
                      id={field}
                      type="text"
                      value={value}
                      className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      maxLength={1}
                      onChange={(e) => {
                        onChange(e.target.value);
                        handleInput(e, index);
                      }}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={handlePaste}
                    />
                  )}
                />
              ))}
            </div>
            <div className="max-w-[260px] mx-auto mt-4">
              <LoadingButton
                disabled={loading}
                loading={loading}
                type="submit"
                className="w-full"
              >
                Verify Account
              </LoadingButton>
            </div>
          </form>
          <ResendCode email={registerData.email} />
        </div>
      </div>
    </div>
  );
}
