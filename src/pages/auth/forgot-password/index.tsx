import { useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import AuthContainer from "../../../components/containers/AuthContainer";
import { toast, ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      toast.error("Enter your email.", {
        position: "top-center",
        autoClose: 2000,
        style: { background: "#333", color: "#fff" },
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        style: { background: "#333", color: "#fff" },
      });
    } else {
      toast.success("Password reset email sent!", {
        position: "top-center",
        autoClose: 2000,
        style: { background: "#333", color: "#fff" },
      });
    }

    setLoading(false);
  };

  return (
    <AuthContainer>
      <ToastContainer />
      <div className="flex flex-col items-center pt-12 min-h-screen">
        <h2 className="text-2xl font-semibold text-white text-center mb-4">
          Forgot Password
        </h2>
        <p className="text-gray-300 mb-6 text-center">
          Enter your email to receive a password reset link.
        </p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-4 rounded-md w-[300px] bg-[#ececec] text-[#333] outline-none"
        />

        <button
          onClick={handleResetPassword}
          disabled={loading}
          className="mt-4 bg-[#007bff] text-white px-6 py-3 rounded-md"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </div>
    </AuthContainer>
  );
};

export default ForgotPassword;
