import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthService } from "../../../services/auth.service";
import PropTypes from "prop-types";

const ResendCode = ({ email }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const { handleSubmit } = useForm();
  const handleResend = () => {
    setIsDisabled(true);
    setTimer(60);

    console.log("Resending OTP...");
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setIsDisabled(false);
    }
  }, [timer]);

  const onSubmit = async () => {
    await AuthService.resendOTP(email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-sm text-slate-500 mt-4">
        Didn&apos;t receive code?{" "}
        {isDisabled ? (
          <span className="font-medium text-gray-400">Resend in {timer}s</span>
        ) : (
          <a
            className="font-medium text-indigo-500 hover:text-indigo-600 cursor-pointer"
            onClick={handleResend}
          >
            Resend
          </a>
        )}
      </div>
    </form>
  );
};

ResendCode.propTypes = {
  email: PropTypes.string.isRequired,
};

export default ResendCode;
