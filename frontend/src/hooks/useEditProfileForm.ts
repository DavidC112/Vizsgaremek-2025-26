import { useCallback, useReducer } from "react";
import type { User } from "./useUser";

export type ProfileState = {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  previewUrl: string;
  imageFile: File | null;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  showCurrent: boolean;
  showNew: boolean;
  showConfirm: boolean;
  deleteConfirm: string;
};

type Action =
  | {
      type: "SET_FIELD";
      field: keyof ProfileState;
      value: string | boolean | File | null;
    }
  | { type: "RESET"; user: User };

const initialState = (user: User): ProfileState => ({
  firstName: user.firstName ?? "",
  lastName: user.lastName ?? "",
  email: user.email ?? "",
  birthDate: user.birthDate?.slice(0, 10) ?? "",
  // Always start as an empty string (not null) so the || fallback chain in
  // ProfileTab works predictably: "" is falsy → falls through to the saved URL.
  previewUrl: "",
  imageFile: null,
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  showCurrent: false,
  showNew: false,
  showConfirm: false,
  deleteConfirm: "",
});

const reducer = (state: ProfileState, action: Action): ProfileState => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState(action.user);
    default:
      return state;
  }
};

export const useEditProfileForm = (user: User) => {
  const [state, dispatch] = useReducer(reducer, user, initialState);

  const set = useCallback(
    (field: keyof ProfileState, value: string | boolean | File | null) =>
      dispatch({ type: "SET_FIELD", field, value }),
    [],
  );

  const reset = useCallback(() => dispatch({ type: "RESET", user }), [user]);

  return { state, set, reset };
};
