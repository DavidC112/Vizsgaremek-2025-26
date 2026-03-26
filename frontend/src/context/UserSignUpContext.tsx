import { createContext, useContext, useState } from "react";

export type UserDetailsType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: "male" | "female" | "other" | "";
  birthDate: string;
};
export type UserAttributesType = {
  weight: number;
  height: number;
  measuredAt: string;
};
export type UserGoalsType = {
  targetweight: number;
  deadline: string;
};

export type SignUpContextType = {
  userDetails: UserDetailsType;
  userAttributes: UserAttributesType;
  userGoals: UserGoalsType;
  updateUserDetails: <K extends keyof UserDetailsType>(
    field: K,
    value: UserDetailsType[K],
  ) => void;
  updateUserAttributes: <K extends keyof UserAttributesType>(
    field: K,
    value: UserAttributesType[K],
  ) => void;
  updateUserGoals: <K extends keyof UserGoalsType>(
    field: K,
    value: UserGoalsType[K],
  ) => void;
};

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

const UserSignUpContext = ({ children }: { children: React.ReactNode }) => {
  const [userDetails, setUserDetails] = useState<UserDetailsType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    birthDate: "yyyy-mm-dd",
  });
  const [userAttributes, setUserAttributes] = useState<UserAttributesType>({
    weight: 0,
    height: 0,
    measuredAt: "yyyy-mm-dd",
  });
  const [userGoals, setUserGoals] = useState<UserGoalsType>({
    targetweight: 0,
    deadline: "yyyy-mm-dd",
  });

  const updateUserDetails = <K extends keyof UserDetailsType>(
    field: K,
    value: UserDetailsType[K],
  ) => {
    setUserDetails((prev) => ({ ...prev, [field]: value }));
    const updatedDetails = { ...userDetails, [field]: value };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeDetails } = updatedDetails;
    localStorage.setItem("signupUserDetails", JSON.stringify(safeDetails));
  };

  const updateUserAttributes = <K extends keyof UserAttributesType>(
    field: K,
    value: UserAttributesType[K],
  ) => {
    setUserAttributes((prev) => ({ ...prev, [field]: value }));
    const updatedAttributes = { ...userAttributes, [field]: value };
    localStorage.setItem(
      "signupUserAttributes",
      JSON.stringify(updatedAttributes),
    );
  };

  const updateUserGoals = <K extends keyof UserGoalsType>(
    field: K,
    value: UserGoalsType[K],
  ) => {
    setUserGoals((prev) => ({ ...prev, [field]: value }));
    localStorage.setItem("signupUserGoals", JSON.stringify(userGoals));
  };

  return (
    <SignUpContext.Provider
      value={{
        userDetails,
        userAttributes,
        userGoals,
        updateUserDetails,
        updateUserAttributes,
        updateUserGoals,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};
export default UserSignUpContext;

// eslint-disable-next-line react-refresh/only-export-components
export const useSignUpContext = () => {
  const ctx = useContext(SignUpContext);
  if (!ctx)
    throw new Error("useSignUpContext must be used within SignUpProvider");
  return ctx;
};
