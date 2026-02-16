import { useCallback, useMemo, useState } from "react";
import api from "../api/axios";
import { useActivity } from "./useActivity";

export type DailyIntake = {
  calories: number;
  carbohydrate: number;
  protein: number;
  fat: number;
  date: string;
};

export const useCaliorie = () => {
  const [consumedCalorie, setConsumedCalorie] = useState<number>(0);
  const { burnedCalorie } = useActivity();

  const fetchDailyIntake = useCallback(async () => {
    try {
      const res = await api.get("/users/me/daily-intake", {
        withCredentials: true,
      });
      const todayDate = new Date().toISOString().split("T")[0];
      const todayIntake = res.data.find(
        (item: DailyIntake) => item.date === todayDate,
      );
      setConsumedCalorie(todayIntake?.calories ?? 0);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const netCalorie = useMemo(() => {
    return consumedCalorie - burnedCalorie;
  }, [consumedCalorie, burnedCalorie]);

  return {
    consumedCalorie,
    reFetchDailyIntake: fetchDailyIntake,
    netCalorie,
  };
};
