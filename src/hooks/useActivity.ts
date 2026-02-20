import { useCallback, useMemo, useState } from "react";
import api from "../api/axios";

export type ActivityType = {
  id: number;
  name: string;
  caloriesBurnedPerHour: number;
};

export type UserActivityType = {
  id: number;
  activityName: string;
  duration: number;
  caloriesBurned: number;
};

export type ActivityResponse = {
  message: string;
  data: UserActivityType[];
};
export const useActivity = () => {
  const [userActivityData, setUserActivityData] = useState<ActivityResponse>();
  const [activityData, setActivityData] = useState<ActivityType[]>([]);

  const fetchUserActivities = useCallback(async () => {
    const res = await api.get("/users/me/activities", {
      withCredentials: true,
    });

    setUserActivityData(res.data);
  }, []);

  const fetchActivities = useCallback(async () => {
    const res = await api.get("/activity/all", { withCredentials: true });
    setActivityData(res.data);
  }, []);

  const addUserActivity = async (activityId: number, duration: number) => {
    console.log(`activity id: ${activityId} duration: ${duration}`);
    const res = await api.post(
      "/users/me/activities/add",
      { activityId, duration },
      { withCredentials: true },
    );
    setUserActivityData((prev) => ({
      message: prev?.message ?? "",
      data: [...(prev?.data ?? []), res.data.data],
    }));
  };



  const burnedCalorie = useMemo(() => {
    if (!userActivityData) return 0;
    return userActivityData?.data.reduce(
      (total, activity) => total + activity.caloriesBurned,
      0,
    );
  }, [userActivityData]);

   //admin
  const deleteActivity = async(activityId: number) => {
    try {
      await api.patch(`/admin/activities/${activityId}/delete`);
      setActivityData(prev => prev.filter(a => a.id !== activityId)); //valalmi nemjo
    } catch (err) {
    console.error("Delete activity failed", err);
    };
  };


  return {
    userActivityData,
    fetchUserActivities,
    fetchActivities,
    activityData,
    burnedCalorie,
    addUserActivity,
    deleteActivity,
  };

};
