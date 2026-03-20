import { useState } from "react";
import api from "../api/axios";
import { useNotification } from "../context/NotificationProvider";
import { validateRecipePayload } from "../utils/validateRecipePayload";
import type { CreateRecipePayload } from "../utils/AddRecipe.type";

export const useRecipeUpdate = () => {
  const { addNotification } = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = async (
    id: number,
    payload: CreateRecipePayload,
    image: File | null,
  ): Promise<boolean> => {
    const validationError = validateRecipePayload(payload, null, {
      requireImage: false,
    });
    if (validationError) {
      addNotification(validationError, "error");
      return false;
    }

    setIsSubmitting(true);
    try {
      await api.patch(`/recipe/community/${id}/edit`, payload, {
        withCredentials: true,
      });

      if (image) {
        const formData = new FormData();
        formData.append("File", image);
        try {
          await api.post(
            `/recipe/community/create/${id}/upload-image`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } },
          );
        } catch {
          addNotification(
            "Recipe saved, but image could not be uploaded.",
            "error",
          );
          return false;
        }
      }

      addNotification("Recipe updated successfully!", "success");
      return true;
    } catch {
      addNotification("Something went wrong.", "error");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { update, isSubmitting };
};
