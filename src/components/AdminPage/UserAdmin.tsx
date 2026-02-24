import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";

const UserAdmin = () => {
  const { userData, fetchAllUser, deleteUser, restoreUser } = useUser();

  useEffect(() => {
    fetchAllUser();
  }, [fetchAllUser]);

  return (
    <div className="col-span-9 mx-auto grid max-w-5xl gap-4 px-2">
      {userData.map((user) => (
        <li
          key={user.id}
          className={`flex items-start gap-4 rounded-lg p-4 shadow ${
            user.isDeleted
              ? "bg-red-100 text-red-800"
              : "bg-emerald-100 text-emerald-900"
          } `}
        >
          <img
            className="h-10 w-10 rounded-full border object-cover"
            src={user.profilePictureUrl}
            alt="profile picture"
          />

          <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p
                className={`font-medium ${user.isDeleted ? "line-through" : ""}`}
              >
                {user.firstName} {user.lastName}
              </p>
              <p
                className={`inline-block text-sm font-semibold ${
                  user.isDeleted ? "text-red-600" : "text-emerald-600"
                }`}
              >
                {user.email} • {user.role}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => deleteUser(user.id)}
                disabled={user.isDeleted}
                className="w-20 rounded border px-2 py-1 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-red-200 disabled:opacity-50"
              >
                Delete
              </button>

              <button
                disabled={user.isDeleted}
                className="w-20 rounded border px-2 py-1 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-red-200 disabled:opacity-50"
              >
                Details
              </button>

              <button
                onClick={() => restoreUser(user.id)}
                disabled={!user.isDeleted}
                className="w-20 rounded border px-2 py-1 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-emerald-200 disabled:opacity-50"
              >
                Restore
              </button>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
};

export default UserAdmin;
