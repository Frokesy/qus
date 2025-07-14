import { useEffect, useState } from "react";
import AdminContainer from "../../components/containers/AdminContainer";
import { supabase } from "../../utils/supabaseClient";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";
import type { CustomUser } from "../../stores/useAuthStore";

const AdminDashboard = () => {
  const [users, setUsers] = useState<CustomUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
      "Are you sure you want to delete this user?",
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
    value: string,
  ) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, [field]: value } : user,
      ),
    );
  };

  const updateUser = async (user: CustomUser) => {
    const { error } = await supabase
      .from("users")
      .update(user)
      .eq("id", user.id);
    if (error) {
      toast.error("Update failed");
      return;
    }
    toast.success("User updated");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AdminContainer>
      <h1 className="text-white text-2xl font-semibold mb-6">
        Admin Dashboard
      </h1>

      {loading ? (
        <p className="text-white">Loading users...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-[#1B1B2F] text-white p-4 rounded-lg shadow-md space-y-3"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">{user.username}</h2>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="text-red-400 hover:text-red-600"
                  title="Delete user"
                >
                  <Trash size={18} />
                </button>
              </div>

              <div className="space-y-2">
                <div>
                  <label>Email:</label>
                  <input
                    value={user.email}
                    onChange={(e) =>
                      handleInputChange(user.id, "email", e.target.value)
                    }
                    className="w-full px-3 py-1 rounded bg-[#333] text-white"
                  />
                </div>
                <div>
                  <label>Phone:</label>
                  <input
                    value={user.phone}
                    onChange={(e) =>
                      handleInputChange(user.id, "phone", e.target.value)
                    }
                    className="w-full px-3 py-1 rounded bg-[#333] text-white"
                  />
                </div>
                <div>
                  <label>Address:</label>
                  <input
                    value={user.address}
                    onChange={(e) =>
                      handleInputChange(user.id, "address", e.target.value)
                    }
                    className="w-full px-3 py-1 rounded bg-[#333] text-white"
                  />
                </div>
                <div>
                  <label>Rank:</label>
                  <input
                    value={user.rank}
                    onChange={(e) =>
                      handleInputChange(user.id, "rank", e.target.value)
                    }
                    className="w-full px-3 py-1 rounded bg-[#333] text-white"
                  />
                </div>

                <p>Last Login: {user.last_spin_at || "N/A"}</p>

                <div>
                  <label>Tasks Completed:</label>
                  <input
                    value={user.tasks?.length || 0}
                    onChange={(e) =>
                      handleInputChange(user.id, "tasks", e.target.value)
                    }
                    className="w-full px-3 py-1 rounded bg-[#333] text-white"
                    type="number"
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label>Total Earnings ($)</label>
                <input
                  value={user.total_earnings}
                  onChange={(e) =>
                    handleInputChange(user.id, "total_earnings", e.target.value)
                  }
                  className="w-full px-3 py-1 rounded bg-[#333] text-white"
                />

                <label>Frozen Balance ($)</label>
                <input
                  value={user.frozen_balance}
                  onChange={(e) =>
                    handleInputChange(user.id, "frozen_balance", e.target.value)
                  }
                  className="w-full px-3 py-1 rounded bg-[#333] text-white"
                />
              </div>

              <button
                onClick={() => updateUser(user)}
                className="mt-3 bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          ))}
        </div>
      )}
    </AdminContainer>
  );
};

export default AdminDashboard;
