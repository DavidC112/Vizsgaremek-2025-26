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

export type EditProfilePayload = {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
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

  const editProfile = async (payload: EditProfilePayload): Promise<boolean> => {
    try {
      await api.patch("/users/me/edit", payload, { withCredentials: true });
      setSingleUser((prev) => (prev ? { ...prev, ...payload } : prev));
      return true;
    } catch (error) {
      console.log("EditProfile error", error);
      return false;
    }
  };

  const uploadProfilePicture = async (image: File): Promise<boolean> => {
    try {
      const formData = new FormData();
      formData.append("File", image);
      const res = await api.post("/users/me/upload-picture", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSingleUser((prev) =>
        prev
          ? {
              ...prev,
              profilePictureUrl:
                res.data.url ?? res.data.data?.url ?? prev.profilePictureUrl,
            }
          : prev,
      );
      return true;
    } catch (error) {
      console.log("UploadProfilePicture error", error);
      return false;
    }
  };

  const deleteProfilePicture = async (): Promise<boolean> => {
    try {
      await api.delete("/users/me/delete-picture", { withCredentials: true });
      await fetchUser();
      return true;
    } catch (error) {
      console.log("DeleteProfilePicture error", error);
      return false;
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
  ): Promise<boolean> => {
    try {
      await api.patch(
        "/users/me/change-password",
        { currentPassword, newPassword },
        { withCredentials: true },
      );
      return true;
    } catch (error) {
      console.log("ChangePassword error", error);
      return false;
    }
  };

  const deleteAccount = async (): Promise<boolean> => {
    try {
      await api.patch("/users/me/delete-account", null, {
        withCredentials: true,
      });
      return true;
    } catch (error) {
      console.log("DeleteAccount error", error);
      return false;
    }
  };

  const deleteUserRecipe = async (recipeId: number): Promise<boolean> => {
    try {
      await api.patch(`/recipe/community/${recipeId}/delete`, null, {
        withCredentials: true,
      });
      setSingleUser((prev) =>
        prev
          ? {
              ...prev,
              recipes: prev.recipes.filter((recipe) => recipe.id !== recipeId),
            }
          : prev,
      );
      return true;
    } catch (error) {
      console.log("DeleteUserRecipe error", error);
      return false;
    }
  };

  // Admin
  const fetchAllUser = useCallback(async () => {
    try {
      const res = await api.get("/admin/users/all", { withCredentials: true });
      setUserData(res.data.data);
    } catch (error) {
      console.log("FetchAllUser error", error);
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
      console.log("DeleteUser error", error);
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
      console.log("RestoreUser error", error);
    }
  };

  const getOneUser = async (userId: string) => {
    try {
      const res = await api.get(`/admin/users/${userId}`, {
        withCredentials: true,
      });
      setSingleUser(res.data.data);
    } catch (error) {
      console.log("SingleUser error", error);
    }
  };

  return {
    singleUser,
    userData,
    fetchUser,
    editProfile,
    uploadProfilePicture,
    deleteProfilePicture,
    changePassword,
    deleteAccount,
    fetchAllUser,
    getOneUser,
    deleteUser,
    restoreUser,
    deleteUserRecipe,
  };
};
