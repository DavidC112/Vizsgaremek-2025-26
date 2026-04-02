import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import Modal from "../ui/Modal";
import { useNotification } from "../../context/NotificationProvider";
import useAdminFilter from "../../hooks/useAdminFilter";
import AdminSearchBar from "../ui/Admin/AdminSearchBar";

const UserAdmin = () => {
  const {
    userData,
    singleUser,
    fetchAllUser,
    deleteUser,
    restoreUser,
    getOneUser,
  } = useUser();

  const { search, setSearch, filters, setFilters, filtered } = useAdminFilter(
    userData,
    (user, search) => user.email.toLowerCase().includes(search.toLowerCase()),
    (user, filters) => {
      if (filters.deleted !== user.isDeleted) return false;
      return true;
    },
    { deleted: false },
  );
  useEffect(() => {
    fetchAllUser();
  }, [fetchAllUser]);

  const { addNotification } = useNotification();

  return (
    <div className="mx-auto max-w-5xl p-5">
      <div className="flex justify-end px-5 lg:px-0">
        <AdminSearchBar
          type="User"
          value={search}
          onChange={setSearch}
          placeholder="Search email..."
          isDeleted={filters.deleted}
          onDeletedChange={(val) => setFilters((f) => ({ ...f, deleted: val }))}
        />
      </div>
      <div className="col-span-9 mx-auto grid max-w-5xl gap-4 p-5">
        {filtered.map((user) => (
          <li
            key={user.id}
            className={`flex items-start gap-4 rounded-lg border-2 bg-white p-4 text-gray-600 shadow-md ${
              user.isDeleted
                ? "border-red-700"
                : "border-primary-green-400 border"
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
                  className={`text-lg font-medium ${user.isDeleted ? "line-through" : ""}`}
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
                <Modal
                  onClose={() => {}}
                  trigger={
                    <button
                      disabled={user.isDeleted || user.role === "Admin"}
                      className="brder-red-500 w-20 rounded border bg-red-100 px-2 py-1 text-sm font-medium text-red-600 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:bg-red-200 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  }
                  title="Delete user?"
                  description={`Are you sure you want to delete ${user.firstName} ${user.lastName}`}
                  actions={(close) => (
                    <>
                      <button
                        onClick={() => {
                          close();
                        }}
                        className="w-20 rounded border border-gray-200 bg-white px-2 py-1 text-sm font-medium transition hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={async () => {
                          await deleteUser(user.id);
                          close();
                          addNotification(
                            `${user.firstName} ${user.lastName} deleted succesfully`,
                          );
                        }}
                        className="w-20 rounded border border-red-200 bg-red-100 px-2 py-1 text-sm font-medium text-red-600/90 transition hover:bg-red-200 active:bg-red-100"
                      >
                        Delete
                      </button>
                    </>
                  )}
                />
                <Modal
                  onClose={() => {}}
                  trigger={
                    <button
                      onClick={() => getOneUser(user.id)}
                      disabled={user.isDeleted}
                      className="bg-pr w-20 rounded border border-gray-200 px-2 py-1 text-sm font-medium transition hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100 disabled:cursor-not-allowed disabled:border-red-500 disabled:bg-red-200 disabled:text-red-600 disabled:opacity-50"
                    >
                      Details
                    </button>
                  }
                  title={`${user.firstName} ${user.lastName}'s details`}
                  actions={(close) => (
                    <button
                      onClick={() => {
                        close();
                      }}
                      className="w-20 rounded border border-gray-200 bg-white px-2 py-1 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100"
                    >
                      Cancel
                    </button>
                  )}
                >
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between border-b pb-2">
                      <span className="block text-sm font-medium">Name</span>
                      <span>
                        {singleUser?.firstName} {singleUser?.lastName}
                      </span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                      <span className="block text-sm font-medium">Email</span>
                      <span>{singleUser?.email}</span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                      <span className="block text-sm font-medium">
                        Birth date
                      </span>
                      <span>
                        {singleUser?.birthDate
                          ? new Date(singleUser.birthDate).toLocaleDateString()
                          : "-"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="block text-sm font-medium">Age</span>
                      <span>
                        {singleUser?.birthDate
                          ? Math.floor(
                              (Date.now() -
                                new Date(singleUser.birthDate).getTime()) /
                                (1000 * 60 * 60 * 24 * 365.25),
                            )
                          : "-"}
                      </span>
                    </div>
                  </div>
                </Modal>
                <button
                  onClick={async () => {
                    await restoreUser(user.id);
                    addNotification(
                      `${user.firstName} ${user.lastName} restored successfully`,
                    );
                  }}
                  disabled={!user.isDeleted}
                  className="w-20 rounded border border-gray-200 bg-white px-2 py-1 text-sm font-medium transition hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-50"
                >
                  Restore
                </button>
              </div>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default UserAdmin;
