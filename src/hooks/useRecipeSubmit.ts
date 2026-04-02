import { useState } from "react";
import type {
  CreateRecipePayload,
  CreateRecipeResponse,
} from "../utils/AddRecipe.type";
import api from "../api/axios";
import { useNotification } from "../context/NotificationProvider";
import { validateRecipePayload } from "../utils/validateRecipePayload";

export const useRecipeSubmit = () => {
  const { addNotification } = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submit = async (
    payload: CreateRecipePayload,
    image: File | null,
  ): Promise<void> => {
    const validationError = validateRecipePayload(payload, image);
    if (validationError) {
      addNotification(validationError, "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data } = await api.post<CreateRecipeResponse>(
        "/recipe/community/create",
        payload,
        { withCredentials: true },
      );

      if (image && data.data.id) {
        const formData = new FormData();
        formData.append("File", image);

        try {
          await api.post(
            `/recipe/community/create/${data.data.id}/upload-image`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } },
          );
        } catch {
          addNotification(
            "Recipe saved, but the image could not be uploaded. You can try again later.",
            "error",
          );
          return;
        }
      }

      // TODO: navigate to success page
      setIsSubmitted(true);
    } catch {
      addNotification("Something went wrong.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submit, isSubmitting, isSubmitted };
};
