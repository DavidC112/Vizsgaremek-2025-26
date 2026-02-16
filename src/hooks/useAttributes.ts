import { useCallback, useMemo, useState } from "react";
import api from "../api/axios";

export type AttributeType = {
  id: number;
  weight: number;
  height: number;
  measuredAt: string;
  bmi: number;
  bmr: number;
};

export const useAttributes = () => {
  const [attributesData, setAttributesData] = useState<AttributeType[]>([]);

  const fetchAttributes = useCallback(async () => {
    const res = await api.get("/users/me/attributes", {
      withCredentials: true,
    });

    setAttributesData(res.data);
  }, []);

  const lastAttribute = useMemo(() => {
    if (!attributesData) return;
    return attributesData.at(-1);
  }, [attributesData]);

  return {
    attributesData,
    fetchAttributes,
    lastAttribute,
  };
};
