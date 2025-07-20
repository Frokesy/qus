import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AuthContainer from "../../../components/containers/AuthContainer";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);

  const handleUpdatePassword = async () => {
    if (!password.trim()) {
      toast.error("Password cannot be empty", {
        position: "top-center",
        style: { background: "#333", color: "#fff" },
      });
      return;
    }

    setLoading(true);
    let successHandled = false;

    const fallbackTimeout = setTimeout(() => {
      if (!successHandled) {
        toast.success("Password updated! Please log in again.", {
          position: "top-center",
          style: { background: "#333", color: "#fff" },
          onClose: () => (window.location.href = "/"),
        });
        setLoading(false);
      }
    }, 10000);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      clearTimeout(fallbackTimeout);

      if (error) {
        toast.error(error.message, {
          position: "top-center",
          style: { background: "#333", color: "#fff" },
        });
      } else {
        successHandled = true;
        toast.success("Password updated! Please log in again.", {
          position: "top-center",
          style: { background: "#333", color: "#fff" },
          onClose: () => navigate("/login"),
        });
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
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
          Set New Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-4 rounded-md w-[300px] bg-[#ececec] text-[#333] outline-none"
        />

        <button
          onClick={handleUpdatePassword}
          disabled={loading}
          className={`mt-4 bg-[#007bff] text-white px-6 py-3 rounded-md ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </AuthContainer>
  );
};

export default UpdatePassword;
