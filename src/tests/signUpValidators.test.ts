import { describe, it, expect } from "vitest";
import {
  isNonEmpty,
  isEmail,
  isMinLength,
  isValidIsoDate,
  isStrongPassword,
  getPasswordIssues,
  validateUserDetails,
  validateUserAttributes,
  validateUserGoals,
} from "../../src/utils/signUpValidators";
import type {
  UserDetailsType,
  UserAttributesType,
  UserGoalsType,
} from "../../src/context/UserSignUpContext";

describe("isNonEmpty", () => {
  it("returns true for a regular string", () => {
    expect(isNonEmpty("hello")).toBe(true);
  });

  it("returns false for an empty string", () => {
    expect(isNonEmpty("")).toBe(false);
  });

  it("returns false for a whitespace-only string", () => {
    expect(isNonEmpty("   ")).toBe(false);
  });

  it("returns true for a string with surrounding spaces but content", () => {
    expect(isNonEmpty("  hi  ")).toBe(true);
  });
});

describe("isEmail", () => {
  it("accepts a standard email address", () => {
    expect(isEmail("user@example.com")).toBe(true);
  });

  it("accepts email with sub-domain", () => {
    expect(isEmail("user@mail.example.co.uk")).toBe(true);
  });

  it("rejects a string without @", () => {
    expect(isEmail("userexample.com")).toBe(false);
  });

  it("rejects a string without domain extension", () => {
    expect(isEmail("user@example")).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(isEmail("")).toBe(false);
  });

  it("rejects email with spaces", () => {
    expect(isEmail("user @example.com")).toBe(false);
  });

  it("trims surrounding whitespace before checking", () => {
    expect(isEmail("  user@example.com  ")).toBe(true);
  });
});

describe("isMinLength", () => {
  it("returns true when length exactly equals minimum", () => {
    expect(isMinLength("abcdef", 6)).toBe(true);
  });

  it("returns true when length exceeds minimum", () => {
    expect(isMinLength("abcdefgh", 6)).toBe(true);
  });

  it("returns false when length is below minimum", () => {
    expect(isMinLength("abc", 6)).toBe(false);
  });

  it("uses default minimum of 6", () => {
    expect(isMinLength("12345")).toBe(false);
    expect(isMinLength("123456")).toBe(true);
  });
});

describe("isValidIsoDate", () => {
  it("returns true for a valid ISO date string", () => {
    expect(isValidIsoDate("2024-06-15")).toBe(true);
  });

  it("returns false for the placeholder value", () => {
    expect(isValidIsoDate("yyyy-mm-dd")).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(isValidIsoDate("")).toBe(false);
  });

  it("returns false for an obviously invalid date", () => {
    expect(isValidIsoDate("not-a-date")).toBe(false);
  });

  it("returns true for a date-time ISO string", () => {
    expect(isValidIsoDate("2024-01-01T00:00:00.000Z")).toBe(true);
  });
});

describe("isStrongPassword", () => {
  it("returns true for a password meeting all criteria", () => {
    expect(isStrongPassword("Password1!")).toBe(true);
  });

  it("returns false when missing uppercase letter", () => {
    expect(isStrongPassword("password1!")).toBe(false);
  });

  it("returns false when missing lowercase letter", () => {
    expect(isStrongPassword("PASSWORD1!")).toBe(false);
  });

  it("returns false when missing digit", () => {
    expect(isStrongPassword("Password!")).toBe(false);
  });

  it("returns false when missing special character", () => {
    expect(isStrongPassword("Password1")).toBe(false);
  });
});

describe("getPasswordIssues", () => {
  it("returns empty array for a fully valid password", () => {
    expect(getPasswordIssues("StrongP@ss1", 8)).toHaveLength(0);
  });

  it("reports length issue when password is too short", () => {
    const issues = getPasswordIssues("Ab1!", 8);
    expect(issues.some((i) => i.includes("8"))).toBe(true);
  });

  it("reports missing uppercase", () => {
    const issues = getPasswordIssues("password1!");
    expect(issues.some((i) => i.toLowerCase().includes("uppercase"))).toBe(
      true,
    );
  });

  it("reports missing lowercase", () => {
    const issues = getPasswordIssues("PASSWORD1!");
    expect(issues.some((i) => i.toLowerCase().includes("lowercase"))).toBe(
      true,
    );
  });

  it("reports missing number", () => {
    const issues = getPasswordIssues("Password!");
    expect(issues.some((i) => i.toLowerCase().includes("number"))).toBe(true);
  });

  it("reports missing special character", () => {
    const issues = getPasswordIssues("Password1");
    expect(issues.some((i) => i.toLowerCase().includes("special"))).toBe(true);
  });

  it("can report multiple issues at once", () => {
    const issues = getPasswordIssues("abc");
    expect(issues.length).toBeGreaterThan(1);
  });
});

const validDetails: UserDetailsType = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@example.com",
  password: "Secure123!",
  gender: "female",
  birthDate: "1995-08-20",
};

describe("validateUserDetails", () => {
  it("returns isValid true for fully valid input", () => {
    const { isValid, errors } = validateUserDetails(validDetails);
    expect(isValid).toBe(true);
    expect(errors).toEqual({});
  });

  it("reports error when firstName is empty", () => {
    const { isValid, errors } = validateUserDetails({
      ...validDetails,
      firstName: "",
    });
    expect(isValid).toBe(false);
    expect(errors.firstName).toBeDefined();
  });

  it("reports error when lastName is empty", () => {
    const { isValid, errors } = validateUserDetails({
      ...validDetails,
      lastName: "  ",
    });
    expect(isValid).toBe(false);
    expect(errors.lastName).toBeDefined();
  });

  it("reports error for an invalid email", () => {
    const { isValid, errors } = validateUserDetails({
      ...validDetails,
      email: "not-an-email",
    });
    expect(isValid).toBe(false);
    expect(errors.email).toBeDefined();
  });

  it("reports error for a weak password", () => {
    const { isValid, errors } = validateUserDetails({
      ...validDetails,
      password: "weak",
    });
    expect(isValid).toBe(false);
    expect(errors.password).toBeDefined();
  });

  it("reports error when gender is not selected", () => {
    const { isValid, errors } = validateUserDetails({
      ...validDetails,
      gender: "",
    });
    expect(isValid).toBe(false);
    expect(errors.gender).toBeDefined();
  });

  it("reports error for placeholder birthDate", () => {
    const { isValid, errors } = validateUserDetails({
      ...validDetails,
      birthDate: "yyyy-mm-dd",
    });
    expect(isValid).toBe(false);
    expect(errors.birthDate).toBeDefined();
  });

  it("can report multiple errors simultaneously", () => {
    const { isValid, errors } = validateUserDetails({
      firstName: "",
      lastName: "",
      email: "bad",
      password: "x",
      gender: "",
      birthDate: "yyyy-mm-dd",
    });
    expect(isValid).toBe(false);
    expect(Object.keys(errors).length).toBeGreaterThan(1);
  });
});

const validAttributes: UserAttributesType = {
  weight: 70,
  height: 175,
  measuredAt: "2024-01-10",
};

describe("validateUserAttributes", () => {
  it("returns isValid true for valid attributes", () => {
    const { isValid } = validateUserAttributes(validAttributes);
    expect(isValid).toBe(true);
  });

  it("reports error when height is zero", () => {
    const { isValid, errors } = validateUserAttributes({
      ...validAttributes,
      height: 0,
    });
    expect(isValid).toBe(false);
    expect(errors.height).toBeDefined();
  });

  it("reports error when weight is negative", () => {
    const { isValid, errors } = validateUserAttributes({
      ...validAttributes,
      weight: -5,
    });
    expect(isValid).toBe(false);
    expect(errors.weight).toBeDefined();
  });

  it("reports error for placeholder measuredAt", () => {
    const { isValid, errors } = validateUserAttributes({
      ...validAttributes,
      measuredAt: "yyyy-mm-dd",
    });
    expect(isValid).toBe(false);
    expect(errors.measuredAt).toBeDefined();
  });
});

describe("validateUserGoals", () => {
  const futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const validGoals: UserGoalsType = {
    targetweight: 65,
    deadline: futureDate,
  };

  it("returns isValid true for valid goals", () => {
    const { isValid } = validateUserGoals(validGoals);
    expect(isValid).toBe(true);
  });

  it("reports error when targetweight is zero", () => {
    const { isValid, errors } = validateUserGoals({
      ...validGoals,
      targetweight: 0,
    });
    expect(isValid).toBe(false);
    expect(errors.targetweight).toBeDefined();
  });

  it("reports error when deadline is in the past", () => {
    const { isValid, errors } = validateUserGoals({
      ...validGoals,
      deadline: "2000-01-01",
    });
    expect(isValid).toBe(false);
    expect(errors.deadline).toBeDefined();
  });

  it("reports error for placeholder deadline", () => {
    const { isValid, errors } = validateUserGoals({
      ...validGoals,
      deadline: "yyyy-mm-dd",
    });
    expect(isValid).toBe(false);
    expect(errors.deadline).toBeDefined();
  });
});
