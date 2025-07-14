import { useEffect, useState } from "react";
import AdminContainer from "../../components/containers/AdminContainer";
import { supabase } from "../../utils/supabaseClient";
import { toast } from "react-toastify";

type InviteCode = {
  id: string;
  code: string;
  created_at: string;
  used_by?: string | null;
};

const InvitationCodes = () => {
  const [codes, setCodes] = useState<InviteCode[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInviteCodes = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("inviteCodes").select("*");

    if (error) {
      toast.error("Failed to fetch invite codes");
      setLoading(false);
      return;
    }

    setCodes(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchInviteCodes();
  }, []);

  return (
    <AdminContainer>
      <h1 className="text-white text-2xl font-semibold mb-6">
        Invitation Codes
      </h1>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : codes.length === 0 ? (
        <p className="text-white">No invitation codes found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-white bg-[#1B1B2F] rounded-lg overflow-hidden">
            <thead className="bg-[#2C2F48] text-[#aaa]">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Used By</th>
                <th className="px-4 py-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {codes.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t border-[#333] hover:bg-[#262A40]"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 font-mono text-green-400">
                    {item.code}
                  </td>
                  <td className="px-4 py-2">
                    {item.used_by ? item.used_by : "—"}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminContainer>
  );
};

export default InvitationCodes;
