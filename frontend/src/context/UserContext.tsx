import { createContext, useContext, useEffect } from "react";
import { type User, type EditProfilePayload, useUser } from "../hooks/useUser";

type UserContextType = {
  singleUser: User | undefined;
  fetchUser: () => Promise<void>;
  editProfile: (payload: EditProfilePayload) => Promise<boolean>;
  uploadProfilePicture: (image: File) => Promise<boolean>;
  deleteProfilePicture: () => Promise<boolean>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  deleteUserRecipe: (recipeId: number) => Promise<boolean>;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    singleUser,
    fetchUser,
    editProfile,
    uploadProfilePicture,
    deleteProfilePicture,
    changePassword,
    deleteAccount,
    deleteUserRecipe,
  } = useUser();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider
      value={{
        singleUser,
        fetchUser,
        editProfile,
        uploadProfilePicture,
        deleteProfilePicture,
        changePassword,
        deleteAccount,
        deleteUserRecipe,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx)
    throw new Error("useUserContext must be used within a UserProvider");
  return ctx;
};
