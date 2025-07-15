import { useEffect, useState } from "react";
import AdminContainer from "../../components/containers/AdminContainer";
import { supabase } from "../../utils/supabaseClient";
import { toast, ToastContainer } from "react-toastify";

const Spins = () => {
  const [spinValues, setSpinValues] = useState<Record<string, string>>({});
  const [spinId, setSpinId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSpinValues = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("spins").select("*").single();

    if (error || !data) {
      toast.error("Failed to fetch spin values");
      setLoading(false);
      return;
    }

    const { id, ...spinCols } = data;
    setSpinId(id);
    setSpinValues(spinCols);
    setLoading(false);
  };

  const handleChange = (key: string, value: string) => {
    setSpinValues((prev) => ({ ...prev, [key]: value }));
  };

  const updateSpinValues = async () => {
    if (!spinId) return;
    setSaving(true);

    const { error } = await supabase
      .from("spins")
      .update(spinValues)
      .eq("id", spinId);

    if (error) {
      toast.error("Failed to update spin values");
      setSaving(false);
      return;
    }

    toast.success("Spin values updated successfully");
    setSaving(false);
  };

  useEffect(() => {
    fetchSpinValues();
  }, []);

  return (
    <AdminContainer>
      <ToastContainer />
      <h1 className="text-white text-3xl font-bold mb-8">Spin Settings</h1>

      {loading ? (
        <p className="text-white text-lg">Loading spin values...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {Object.keys(spinValues).map((key) => (
            <div
              key={key}
              className="bg-[#111827] text-white p-5 rounded-xl border border-[#333] hover:shadow-lg transition-all"
            >
              <label className="block mb-2 text-sm text-gray-300 capitalize">
                {key.replace(/_/g, " ")} ($)
              </label>
              <input
                type="text"
                value={spinValues[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full px-4 py-2 rounded bg-[#1F2937] text-white border border-[#555] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      )}

      {!loading && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={updateSpinValues}
            disabled={saving}
            className={`${
              saving
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white py-3 px-8 rounded-lg font-semibold flex items-center gap-2 transition-all duration-150`}
          >
            {saving && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            )}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}
    </AdminContainer>
  );
};

export default Spins;
