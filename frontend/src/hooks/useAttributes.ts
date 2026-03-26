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

export type AddAttributePayload = {
  weight: number;
  height: number;
  measuredAt: string;
};

export type AddGoalPayload = {
  targetWeight: number;
  deadLine: string;
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

  const addAttribute = async (payload: AddAttributePayload) => {
    const res = await api.post("/users/me/attributes/add", payload, {
      withCredentials: true,
    });
    setAttributesData((prev) => ({
      message: prev.message,
      data: [...prev.data, res.data.data],
    }));
  };

  const addGoal = async (payload: AddGoalPayload) => {
    await api.post("/users/me/goal/add", payload, {
      withCredentials: true,
    });
  };

  const lastAttribute = useMemo(() => {
    if (!attributesData) return;
    return attributesData.data.at(-1);
  }, [attributesData]);

  return {
    attributesData,
    fetchAttributes,
    lastAttribute,
    addAttribute,
    addGoal,
  };
};
