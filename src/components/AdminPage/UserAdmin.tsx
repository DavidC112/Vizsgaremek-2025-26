import { useEffect } from 'react'
import { useUser } from '../../hooks/useUser'

const UserAdmin = () => {

  const { userData, fetchAllUser, deleteUser } = useUser()

  useEffect(()=>{
        fetchAllUser();
    }, [fetchAllUser])
 return (
  <div className="grid col-span-9 gap-4 max-w-3xl mx-auto ">
    {userData.map((user) => (
      <li
        key={user.id}
        className={`flex items-center gap-4 rounded-lg p-4 shadow
          ${user.isDeleted ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-900"}
        `}
      >
        <img
          className="h-10 w-10 object-cover rounded-full border"
          src={user.profilePictureUrl}
          alt="profile picture"
        />


        <div className="flex-1">
          <p className="font-medium">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-gray-600">
            {user.email} • {user.role}
          </p>
        </div>


        <div className="flex gap-2">
          <button
            onClick={() => deleteUser(user.id)}
            disabled={user.isDeleted}
            className="rounded border px-3 py-1 text-sm
              disabled:opacity-50 disabled:cursor-not-allowed
              hover:bg-gray-100"
          >
            Delete
          </button>

          <button className="rounded border px-3 py-1 text-sm hover:bg-gray-100">
            Details
          </button>

          <button className="rounded border px-3 py-1 text-sm hover:bg-gray-100">
            Restore
          </button>
        </div>
      </li>
    ))}
  </div>
);
}

export default UserAdmin