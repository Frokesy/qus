import { useState, useEffect } from "react";
import { User } from "lucide-react";
import MainContainer from "../../../components/containers/MainContainer";
import { useAuthStore } from "../../../stores/useAuthStore";
import Spinner from "../../../components/defaults/Spinner";
import { supabase } from "../../../utils/supabaseClient";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user, loading } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    address: "",
    phone: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const { error } = await supabase
      .from("users")
      .update({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
      })
      .eq("user_id", user?.user_id);

    setSubmitting(false);

    if (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      toast.success("Profile updated successfully!", {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: "#333",
          color: "#fff",
        },
        onClose: () => {
          navigate("/profile");
        },
      });
    }
  };

  if (loading || !user) return <Spinner />;

  return (
    <MainContainer>
      <ToastContainer />
      <div className="h-[80vh] overflow-y-auto lg:pb-0 pb-20">
        <h1 className="lg:text-[30px] text-[20px] font-semibold">
          Edit Profile
        </h1>

        <div className="flex lg:space-x-10 lg:space-y-0 space-y-6 lg:flex-row flex-col lg:w-[60%] mt-10">
          <div className="flex lg:items-start items-center justify-center">
            <div className="border border-[#ccc] p-3 rounded-full">
              <User size={100} color="#ccc" />
            </div>
          </div>

          <div className="space-y-6 w-[100%]">
            {/* Name & Username */}
            <div className="flex lg:flex-row flex-col justify-between lg:space-x-10 lg:space-y-0 space-y-6 w-full">
              <div className="flex flex-col space-y-2 lg:w-[50%]">
                <label htmlFor="name" className="text-[14px] text-[#232323]">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="outline-none bg-[#ececec] rounded-md p-4 w-full"
                />
              </div>
              <div className="flex flex-col space-y-2 lg:w-[50%]">
                <label
                  htmlFor="username"
                  className="text-[14px] text-[#232323]"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="outline-none bg-[#ececec] rounded-md p-4 w-full"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-2 w-full">
              <label htmlFor="email" className="text-[14px] text-[#232323]">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="outline-none bg-[#ececec] rounded-md p-4 w-full"
              />
            </div>

            {/* Address & Phone */}
            <div className="flex lg:flex-row flex-col justify-between lg:space-x-10 lg:space-y-0 space-y-6 w-full">
              <div className="flex flex-col space-y-2 lg:w-[50%]">
                <label htmlFor="address" className="text-[14px] text-[#232323]">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="outline-none bg-[#ececec] rounded-md p-4 w-full"
                />
              </div>
              <div className="flex flex-col space-y-2 lg:w-[50%]">
                <label htmlFor="phone" className="text-[14px] text-[#232323]">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="outline-none bg-[#ececec] rounded-md p-4 w-full"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className={`${
                  submitting ? "bg-gray-500" : "bg-[#007bff]"
                } text-white px-6 py-3 font-semibold rounded-lg`}
              >
                {submitting ? "Updating..." : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default EditProfile;
