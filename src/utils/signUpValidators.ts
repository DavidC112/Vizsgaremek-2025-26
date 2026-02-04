import type { UserDetailsType } from "../context/UserSignUpContext";

export type ValidationErrors<T> = Partial<Record<keyof T, string>>;

export const isNonEmpty = (v: string) => v.trim().length > 0;
export const isEmail = (v: string) =>
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v.trim());
export const isMinLength = (v: string, len = 6) => v.length >= len;
export const isValidIsoDate = (v: string) => {
  if (!v || v === "yyyy-mm-dd") return false;
  const t = Date.parse(v);
  return !Number.isNaN(t);
};
export const isStrongPassword = (v: string) => {
  return (
    /[A-Z]/.test(v) &&
    /[a-z]/.test(v) &&
    /[0-9]/.test(v) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(v)
  );
};

export function getPasswordIssues(v: string, minLength = 8): string[] {
  const issues: string[] = [];
  if (v.length < minLength) issues.push(`At least ${minLength} characters`);
  if (!/[A-Z]/.test(v)) issues.push("Include an uppercase letter");
  if (!/[a-z]/.test(v)) issues.push("Include a lowercase letter");
  if (!/[0-9]/.test(v)) issues.push("Include a number");
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(v))
    issues.push("Include a special character (e.g. !@#$%)");
  return issues;
}

export const validateUserDetails = (
  d: UserDetailsType,
): {
  isValid: boolean;
  errors: ValidationErrors<UserDetailsType>;
} => {
  const errors: ValidationErrors<UserDetailsType> = {};

  if (!isNonEmpty(d.firstName)) errors.firstName = "First name is required";
  if (!isNonEmpty(d.lastName)) errors.lastName = "Last name is required";
  if (!isEmail(d.email)) errors.email = "Enter a valid email address";
  const pwdIssues = getPasswordIssues(d.password, 8);
  if (pwdIssues.length > 0) errors.password = pwdIssues.join(", ");
  if (!d.gender) errors.gender = "Please select a gender";
  if (!isValidIsoDate(d.birthDate))
    errors.birthDate = "Please enter a valid birth date";

  return { isValid: Object.keys(errors).length === 0, errors };
};
