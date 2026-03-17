import { useCallback, useMemo, useState } from "react";
import api from "../api/axios";

export type AttributeType = {
  id: number;
  weight: number;
  height: number;
  measuredAt: string;
  goalType: string;
  bmi: number;
  calories: number;
};

export type UserAttributeResponse = {
  message: string;
  data: AttributeType[];
};

export const useAttributes = () => {
  const [attributesData, setAttributesData] = useState<UserAttributeResponse>({
    message: "",
    data: [],
  });

  const fetchAttributes = useCallback(async () => {
    const res = await api.get("/users/me/attributes", {
      withCredentials: true,
    });

    setAttributesData(res.data);
  }, []);

  const lastAttribute = useMemo(() => {
    if (!attributesData) return;
    return attributesData.data.at(-1);
  }, [attributesData]);

  return {
    attributesData,
    fetchAttributes,
    lastAttribute,
  };
};
