import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import Modal from "../ui/Modal";
import { useNotification } from "../../context/NotificationProvider";

const UserAdmin = () => {
  const {
    userData,
    singleUser,
    fetchAllUser,
    deleteUser,
    restoreUser,
    getOneUser,
  } = useUser();

  useEffect(() => {
    fetchAllUser();
  }, [fetchAllUser]);

  const { addNotification } = useNotification();

  return (
    <div className="col-span-9 mx-auto grid max-w-5xl gap-4 p-5">
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
                      className="w-20 rounded border border-emerald-200 bg-white px-2 py-1 text-sm font-medium text-emerald-600/90 transition hover:border-emerald-300 hover:bg-emerald-50 active:bg-emerald-100"
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
                    className="w-20 rounded border border-emerald-200 bg-white px-2 py-1 text-sm font-medium text-emerald-600/90 transition hover:border-emerald-300 hover:bg-emerald-50 active:bg-emerald-100 disabled:cursor-not-allowed disabled:border-red-500 disabled:bg-red-200 disabled:text-red-600 disabled:opacity-50"
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
                    className="w-20 rounded border border-emerald-200 bg-white px-2 py-1 text-sm font-medium text-emerald-600/90 transition hover:border-emerald-300 hover:bg-emerald-50 active:bg-emerald-100"
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
                        : "—"}
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
                        : "—"}
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
                className="w-20 rounded border border-emerald-200 bg-white px-2 py-1 text-sm font-medium text-emerald-600/90 transition hover:border-emerald-300 hover:bg-emerald-50 active:bg-emerald-100 disabled:cursor-not-allowed disabled:bg-emerald-200 disabled:opacity-50"
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
