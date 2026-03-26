import { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Loader2 } from "lucide-react";
import { useNotification } from "../../context/NotificationProvider";
import { useEditProfileForm } from "../../hooks/useEditProfileForm";
import ProfileTab from "./ProfileTab";
import PasswordTab from "./PasswordTab";
import DangerTab from "./DangerTab";
import type { User } from "../../hooks/useUser";
import { useUserContext } from "../../context/UserContext";

type Tab = "profile" | "password" | "danger";

type Props = {
  isOpen: boolean;
  user: User;
  onClose: () => void;
  onSuccess: () => void;
};

const TABS: { key: Tab; label: string }[] = [
  { key: "profile", label: "Profile" },
  { key: "password", label: "Password" },
  { key: "danger", label: "Danger zone" },
];

const EditProfileModal = ({ isOpen, user, onClose, onSuccess }: Props) => {
  const {
    editProfile,
    uploadProfilePicture,
    deleteProfilePicture,
    changePassword,
    deleteAccount,
  } = useUserContext();
  const { addNotification } = useNotification();
  const { state, set, reset } = useEditProfileForm(user);

  const [tab, setTab] = useState<Tab>("profile");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      reset();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTab("profile");
    }
  }, [isOpen, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const withSubmit = async (
    fn: () => Promise<boolean>,
    successMsg: string,
    errorMsg: string,
  ) => {
    setIsSubmitting(true);
    const ok = await fn();
    setIsSubmitting(false);
    if (ok) {
      addNotification(successMsg, "success");
      return true;
    }
    addNotification(errorMsg, "error");
    return false;
  };

  const handleProfileSave = async () => {
    if (
      !state.firstName.trim() ||
      !state.lastName.trim() ||
      !state.email.trim()
    ) {
      addNotification("All fields are required.", "error");
      return;
    }
    if (state.imageFile) {
      const ok = await withSubmit(
        () => uploadProfilePicture(state.imageFile as File),
        "Profile picture updated successfully!",
        "Profile picture upload failed.",
      );
      if (!ok) return;
    }
    const ok = await withSubmit(
      () =>
        editProfile({
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          birthDate: state.birthDate,
        }),
      "Profile updated successfully!",
      "Failed to update profile.",
    );
    if (ok) {
      onSuccess();
      onClose();
    }
  };

  const handleDeletePicture = async () => {
    const ok = await withSubmit(
      deleteProfilePicture,
      "Profile picture removed.",
      "Failed to remove picture.",
    );
    if (ok) onSuccess();
  };

  const handlePasswordSave = async () => {
    if (
      !state.currentPassword ||
      !state.newPassword ||
      !state.confirmPassword
    ) {
      addNotification("All password fields are required.", "error");
      return;
    }
    if (state.newPassword !== state.confirmPassword) {
      addNotification("New passwords do not match.", "error");
      return;
    }
    if (state.newPassword.length < 8) {
      addNotification("Password must be at least 8 characters.", "error");
      return;
    }
    const ok = await withSubmit(
      () => changePassword(state.currentPassword, state.newPassword),
      "Password changed successfully!",
      "Failed to change password. Check your current password.",
    );
    if (ok) reset();
  };

  const handleDeleteAccount = async () => {
    if (state.deleteConfirm !== user.email) {
      addNotification("Email does not match.", "error");
      return;
    }
    const ok = await withSubmit(
      deleteAccount,
      "Account deleted.",
      "Failed to delete account.",
    );
    if (ok) onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          key={isOpen ? user.id : "closed"}
          className="flex max-h-[90dvh] w-full max-w-lg flex-col rounded-2xl border border-gray-200 bg-white shadow-xl"
        >
          <div className="border-b border-gray-100 p-6 text-center">
            <DialogTitle className="text-xl font-bold">
              Edit Profile
            </DialogTitle>
          </div>

          <div className="flex border-b border-gray-100">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex-1 py-3 text-sm font-medium transition ${
                  tab === key
                    ? "border-b-2 border-neutral-800 text-neutral-900"
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-6">
            {tab === "profile" && (
              <ProfileTab
                state={state}
                set={set}
                isSubmitting={isSubmitting}
                hasExistingPicture={!!user.profilePictureUrl}
                onDeletePicture={handleDeletePicture}
              />
            )}
            {tab === "password" && <PasswordTab state={state} set={set} />}
            {tab === "danger" && (
              <DangerTab
                email={user.email}
                deleteConfirm={state.deleteConfirm}
                isSubmitting={isSubmitting}
                onChange={(v) => set("deleteConfirm", v)}
                onDelete={handleDeleteAccount}
              />
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 p-6">
            <button
              onClick={handleClose}
              className="rounded-full border border-neutral-300 px-6 py-1.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-50"
            >
              Cancel
            </button>
            {tab !== "danger" && (
              <button
                onClick={
                  tab === "profile" ? handleProfileSave : handlePasswordSave
                }
                disabled={isSubmitting}
                className="bg-primary-green-400 hover:bg-primary-green-500 active:bg-primary-green-600 rounded-full px-8 py-1.5 text-sm font-medium text-white transition disabled:opacity-60"
              >
                {isSubmitting ? (
                  <Loader2 className="mx-auto size-4 animate-spin" />
                ) : tab === "profile" ? (
                  "Save changes"
                ) : (
                  "Change password"
                )}
              </button>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default EditProfileModal;
