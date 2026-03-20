import { useCallback, useState } from "react";
import api from "../api/axios";

type Recipe = {
  id: number;
  name: string;
  imageUrl: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  profilePictureUrl: string;
  isDeleted: boolean;
  birthDate: string;
  recipes: Recipe[];
};

export const useUser = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [singleUser, setSingleUser] = useState<User>();

  const fetchUser = useCallback(async () => {
    try {
      const res = await api.get("/users/me", { withCredentials: true });

      setSingleUser(res.data);
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
    userData,
    fetchUser,
    fetchAllUser,
    getOneUser,
    deleteUser,
    restoreUser,
  };
};
