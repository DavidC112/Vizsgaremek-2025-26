import { useCallback, useState } from "react";
import api from "../api/axios";
import type { Recipe } from "./useRecipe";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  profilePictureUrl: string;
  isDeleted: boolean;
};
// user should return birthdate as well?

export type SingleUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  profilePictureUrl: string;
  isDeleted: boolean;
  birthDate: string;
};

export const useUser = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [userData, setUserData] = useState<User[]>([]);
  const [singleUser, setSingleUser] = useState<SingleUser>();

  const fetchUser = useCallback(async () => {
    try {
      const res = await api.get("/users/me", { withCredentials: true });

      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setProfilePictureUrl(res.data.profilePictureUrl);
      setRole(res.data.role);
    } catch (error) {
      console.log(error);
    }
  }, []);
  //admin
  const fetchAllUser = useCallback(async () => {
    try {
      const res = await api.get("/admin/users/all", { withCredentials: true });
      setUserData(res.data.data);
    } catch (error) {
      console.log("FetchAllUser error" + error);
    }
  }, []);

  const deleteUser = async (userId: string) => {
    try {
      await api.patch(`/admin/users/${userId}/delete`, null, {
        withCredentials: true,
      });
      setUserData((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, isDeleted: true } : user,
        ),
      );
    } catch (error) {
      console.log("DeleteUser error" + error);
    }
  };

  const restoreUser = async (userId: string) => {
    try {
      await api.patch(`/admin/users/${userId}/restore`, null, {
        withCredentials: true,
      });
      setUserData((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, isDeleted: false } : user,
        ),
      );
    } catch (error) {
      console.log("RestoreUser error" + error);
    }
  };

  const getOneUser = async (userId: string) => {
    try {
      const res = await api.get(`/admin/users/${userId}`, {
        withCredentials: true,
      });
      setSingleUser(res.data.data);
    } catch (error) {
      console.log("SingleUser error" + error);
    }
  };
  return {
    singleUser,
    firstName,
    lastName,
    profilePictureUrl,
    role,
    userData,
    fetchUser,
    fetchAllUser,
    getOneUser,
    deleteUser,
    restoreUser,
  };
};
