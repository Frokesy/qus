import { useEffect, useState } from "react";
import AdminContainer from "../../components/containers/AdminContainer";
import { toast, ToastContainer } from "react-toastify";
import { supabase } from "../../utils/supabaseClient";
import { NavLink } from "react-router-dom";
import { CaretDown, TaskIcon } from "../../components/svgs/Icons";

const AdminSettings = () => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLink = async () => {
      const { data, error } = await supabase
        .from("admin")
        .select("live_support_link")
        .single();

      if (error) {
        console.error(error);
        toast.error("Failed to fetch support link");
      } else if (data) {
        setLink(data.live_support_link || "");
      }
    };

    fetchLink();
  }, []);

  const updateLink = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("admin")
      .update({ live_support_link: link })
      .eq("id", 1);

    if (error) {
      console.error(error);
      toast.error("Error updating support link");
    } else {
      toast.success("Live support link updated successfully!");
    }
    setLoading(false);
  };

  return (
    <AdminContainer>
      <ToastContainer />
      <div className="text-[#fff]">
        <h1 className="text-white text-3xl font-bold mb-8">Admin Settings</h1>
        <div className="flex items-center justify-between mb-8">
          <NavLink
            to="/admin/inviteCodes"
            className="flex flex-row lg:items-start items-center space-x-3 space-y-1 lg:space-y-0 cursor-pointer px-2 text-xl"
          >
            <TaskIcon />
            <span>Invite Codes</span>
          </NavLink>

          <div className="rotate-270">
            <CaretDown />
          </div>
        </div>
        <h1 className="text-white text-xl font-bold">Live Support Link</h1>
        <div className="flex flex-col space-y-3 lg:w-[30%]">
          <input
            type="text"
            id="support"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="outline-none bg-[#ececec] rounded-md p-4 mt-4 text-[#333]"
          />
          <div className="flex justify-end">
            <button
              onClick={updateLink}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </AdminContainer>
  );
};

export default AdminSettings;
