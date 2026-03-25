import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useEditProfileForm } from "../../src/hooks/useEditProfileForm";
import type { User } from "../../src/hooks/useUser";

const mockUser: User = {
  id: "user-1",
  email: "jane@example.com",
  firstName: "Jane",
  lastName: "Doe",
  role: "User",
  profilePictureUrl: "https://example.com/avatar.jpg",
  isDeleted: false,
  birthDate: "1995-08-20T00:00:00.000Z",
  recipes: [],
};

describe("useEditProfileForm – initial state", () => {
  it("populates firstName from the provided user", () => {
    const { result } = renderHook(() => useEditProfileForm(mockUser));
    expect(result.current.state.firstName).toBe("Jane");
  });

  it("populates lastName from the provided user", () => {
    const { result } = renderHook(() => useEditProfileForm(mockUser));
    expect(result.current.state.lastName).toBe("Doe");
  });

  it("populates email from the provided user", () => {
    const { result } = renderHook(() => useEditProfileForm(mockUser));
    expect(result.current.state.email).toBe("jane@example.com");
  });

  it("slices birthDate to YYYY-MM-DD format", () => {
    const { result } = renderHook(() => useEditProfileForm(mockUser));
    expect(result.current.state.birthDate).toBe("1995-08-20");
  });

  it("initialises previewUrl as an empty string", () => {
    const { result } = renderHook(() => useEditProfileForm(mockUser));
    expect(result.current.state.previewUrl).toBe("");
  });

  it("initialises imageFile as null", () => {
    const { result } = renderHook(() => useEditProfileForm(mockUser));
    expect(result.current.state.imageFile).toBeNull();
  });

  it("initialises password fields as empty strings", () => {
    const { result } = renderHook(() => useEditProfileForm(mockUser));
    expect(result.current.state.currentPassword).toBe("");
    expect(result.current.state.newPassword).toBe("");
    expect(result.current.state.confirmPassword).toBe("");
  });

  it("initialises password visibility as false", () => {
    const { result } = renderHook(() => useEditProfileForm(mockUser));
    expect(result.current.state.showCurrent).toBe(false);
    expect(result.current.state.showNew).toBe(false);
    expect(result.current.state.showConfirm).toBe(false);
  });

  it("initialises deleteConfirm as empty string", () => {
    const { result } = renderHook(() => useEditProfileForm(mockUser));
    expect(result.current.state.deleteConfirm).toBe("");
  });
});

describe("useEditProfileForm – set", () => {
  it("updates a string field", () => {
    const { result } = renderHook(() => useEditProfileForm(mockUser));

    act(() => result.current.set("firstName", "Alice"));

    expect(result.current.state.firstName).toBe("Alice");
  });

  it("updates email field", () => {
    const { result } = renderHook(() => useEditProfileForm(mockUser));

    act(() => result.current.set("email", "alice@newdomain.com"));

    expect(result.current.state.email).toBe("alice@newdomain.com");
  });

  it("updates a boolean field (e.g. showNew)", () => {
    const { result } = renderHook(() => useEditProfileForm(mockUser));

    act(() => result.current.set("showNew", true));

    expect(result.current.state.showNew).toBe(true);
  });

  it("can set imageFile to a File object", () => {
    const { result } = renderHook(() => useEditProfileForm(mockUser));
    const file = new File(["img"], "avatar.png", { type: "image/png" });

    act(() => result.current.set("imageFile", file));

    expect(result.current.state.imageFile).toBe(file);
  });

  it("can set imageFile back to null", () => {
    const { result } = renderHook(() => useEditProfileForm(mockUser));
    const file = new File(["img"], "avatar.png", { type: "image/png" });

    act(() => result.current.set("imageFile", file));
    act(() => result.current.set("imageFile", null));

    expect(result.current.state.imageFile).toBeNull();
  });

  it("only changes the targeted field and leaves others untouched", () => {
    const { result } = renderHook(() => useEditProfileForm(mockUser));

    act(() => result.current.set("firstName", "Changed"));

    expect(result.current.state.lastName).toBe("Doe");
    expect(result.current.state.email).toBe("jane@example.com");
  });
});

describe("useEditProfileForm – reset", () => {
  it("restores firstName to the original user value", () => {
    const { result } = renderHook(() => useEditProfileForm(mockUser));

    act(() => result.current.set("firstName", "Completely Different"));
    act(() => result.current.reset());

    expect(result.current.state.firstName).toBe("Jane");
  });

  it("clears imageFile after reset", () => {
    const { result } = renderHook(() => useEditProfileForm(mockUser));
    const file = new File(["img"], "avatar.png", { type: "image/png" });

    act(() => result.current.set("imageFile", file));
    act(() => result.current.reset());

    expect(result.current.state.imageFile).toBeNull();
  });

  it("clears previewUrl after reset", () => {
    const { result } = renderHook(() => useEditProfileForm(mockUser));

    act(() => result.current.set("previewUrl", "blob:preview-url"));
    act(() => result.current.reset());

    expect(result.current.state.previewUrl).toBe("");
  });

  it("clears all password fields after reset", () => {
    const { result } = renderHook(() => useEditProfileForm(mockUser));

    act(() => {
      result.current.set("currentPassword", "oldPass");
      result.current.set("newPassword", "newPass");
      result.current.set("confirmPassword", "newPass");
    });
    act(() => result.current.reset());

    expect(result.current.state.currentPassword).toBe("");
    expect(result.current.state.newPassword).toBe("");
    expect(result.current.state.confirmPassword).toBe("");
  });

  it("resets deleteConfirm to empty string", () => {
    const { result } = renderHook(() => useEditProfileForm(mockUser));

    act(() => result.current.set("deleteConfirm", "jane@example.com"));
    act(() => result.current.reset());

    expect(result.current.state.deleteConfirm).toBe("");
  });

  it("resets boolean flags to false", () => {
    const { result } = renderHook(() => useEditProfileForm(mockUser));

    act(() => {
      result.current.set("showCurrent", true);
      result.current.set("showNew", true);
    });
    act(() => result.current.reset());

    expect(result.current.state.showCurrent).toBe(false);
    expect(result.current.state.showNew).toBe(false);
  });
});

describe("useEditProfileForm – user with missing optional fields", () => {
  const minimalUser: User = {
    ...mockUser,
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
  };

  it("handles empty string fields gracefully", () => {
    const { result } = renderHook(() => useEditProfileForm(minimalUser));
    expect(result.current.state.firstName).toBe("");
    expect(result.current.state.birthDate).toBe("");
  });
});
