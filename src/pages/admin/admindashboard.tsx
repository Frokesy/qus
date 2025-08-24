import { useEffect, useState } from "react";
import AdminContainer from "../../components/containers/AdminContainer";
import { supabase } from "../../utils/supabaseClient";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";
import type { CustomUser } from "../../stores/useAuthStore";

const AdminDashboard = () => {
  const [users, setUsers] = useState<CustomUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [savingUserId, setSavingUserId] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      toast.error("Failed to fetch users");
      setLoading(false);
      return;
    }
    setUsers(data || []);
    setLoading(false);
  };

  const deleteUser = async (userId: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirm) return;

    const { error } = await supabase.from("users").delete().eq("id", userId);
    if (error) {
      toast.error("Failed to delete user");
      return;
    }
    toast.success("User deleted");
    fetchUsers();
  };

  const handleInputChange = (
    userId: string,
    field: keyof CustomUser,
    value: string
  ) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, [field]: value } : user
      )
    );
  };

  const updateUser = async (user: CustomUser) => {
    setSavingUserId(user.id);
    const { error } = await supabase
      .from("users")
      .update(user)
      .eq("id", user.id);
    setSavingUserId(null);

    if (error) {
      toast.error("Update failed");
      return;
    }

    toast.success("User updated successfully");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AdminContainer>
      <div className="flex justify-between">
        <h1 className="text-white text-3xl font-bold mb-8">Admin Dashboard</h1>
        <p className="text-[#fff]">Total Users: {users.length}</p>
      </div>

      {loading ? (
        <p className="text-white text-lg">Loading users...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-[#111827] text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 space-y-4 border border-[#333]"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{user.username}</h2>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="text-red-400 hover:text-red-600"
                  title="Delete user"
                >
                  <Trash size={18} />
                </button>
              </div>

              <div className="grid gap-3">
                {[
                  ["Email", "email"],
                  ["Phone", "phone"],
                  ["Address", "address"],
                  ["Rank", "rank"],
                ].map(([label, field]) => (
                  <div key={field}>
                    <label className="text-sm text-gray-400">{label}</label>
                    <input
                      value={user[field as keyof CustomUser] as string}
                      onChange={(e) =>
                        handleInputChange(
                          user.id,
                          field as keyof CustomUser,
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 rounded bg-[#1F2937] text-white border border-[#555] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}

                <div className="text-sm text-gray-400">
                  Last Login:{" "}
                  <span className="text-white">
                    {user.last_spin_at || "N/A"}
                  </span>
                </div>

                <div>
                  <label className="text-sm text-gray-400">
                    Tasks Completed
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={user.tasks?.length || 0}
                    onChange={(e) =>
                      handleInputChange(user.id, "tasks", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded bg-[#1F2937] text-white border border-[#555]"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">
                    Task Earnings ($)
                  </label>
                  <input
                    value={user.total_earnings}
                    onChange={(e) =>
                      handleInputChange(
                        user.id,
                        "total_earnings",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 rounded bg-[#1F2937] text-white border border-[#555]"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">
                    Special Bonus ($)
                  </label>
                  <input
                    value={user.special_bonus}
                    onChange={(e) =>
                      handleInputChange(
                        user.id,
                        "special_bonus",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 rounded bg-[#1F2937] text-white border border-[#555]"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">
                    Frozen Balance ($)
                  </label>
                  <input
                    value={user.frozen_balance}
                    onChange={(e) =>
                      handleInputChange(
                        user.id,
                        "frozen_balance",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 rounded bg-[#1F2937] text-white border border-[#555]"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Free Spins </label>
                  <input
                    value={user.free_spins}
                    onChange={(e) =>
                      handleInputChange(user.id, "free_spins", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded bg-[#1F2937] text-white border border-[#555]"
                  />
                </div>
              </div>

              <button
                onClick={() => updateUser(user)}
                className={`mt-4 w-full flex justify-center items-center py-2 rounded font-semibold transition-colors ${
                  savingUserId === user.id
                    ? "bg-blue-700 opacity-80 cursor-wait"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={savingUserId === user.id}
              >
                {savingUserId === user.id ? (
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
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </AdminContainer>
  );
};

export default AdminDashboard;
