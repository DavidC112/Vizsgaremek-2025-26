import { useCallback, useMemo, useState } from "react";
import api from "../api/axios";

export type ActivityType = {
  id: number;
  name: string;
  caloriesBurnedPerHour: number;
  isDeleted: boolean;
};

export type UserActivityType = {
  id: number;
  activityName: string;
  duration: number;
  caloriesBurned: number;
  date: string;
};

export type ActivityResponse = {
  message: string;
  data: UserActivityType[];
};
export const useActivity = () => {
  const [userActivityData, setUserActivityData] = useState<ActivityResponse>();
  const [activityData, setActivityData] = useState<ActivityType[]>([]);

  const today = new Date().toISOString().split("T")[0];

  const fetchUserActivities = useCallback(async () => {
    const res = await api.get("/users/me/activities", {
      withCredentials: true,
    });

    setUserActivityData(res.data);
  }, []);

  const fetchActivities = useCallback(async () => {
    const res = await api.get("/activity/all", { withCredentials: true });
    setActivityData(res.data.data);
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

  const todayUserActivityData = useMemo(() => {
    if (!userActivityData) return [];

    return userActivityData?.data.filter((data) => data.date.startsWith(today));
  }, [userActivityData, today]);

  const burnedCalorie = useMemo(() => {
    if (!todayUserActivityData) return 0;

    return todayUserActivityData.reduce(
      (total, activity) => total + activity.caloriesBurned,
      0,
    );
  }, [todayUserActivityData]);


  //admin

  const fetchAdminActivities = useCallback(async () => {
    try {
      const res = await api.get("/admin/activities/all", {
        withCredentials: true,
      });
      setActivityData(res.data.data);
    } catch (error) {
      console.log("FetchAdminActivitiesError" + error);
    }
  }, []);

  const deleteActivity = async (activityId: number) => {
    try {
      await api.patch(`/admin/activities/${activityId}/delete`, null, {
        withCredentials: true,
      });
      setActivityData((prev) =>
        prev.map((activity) =>
          activity.id === activityId
            ? { ...activity, isDeleted: true }
            : activity,
        ),
      );
    } catch (error) {
      console.error("DeleteActivityError" + error);
    }
  };

  const restoreActivity = async (activityId: number) => {
    try {
      await api.patch(`/admin/activities/${activityId}/restore`, null, {
        withCredentials: true,
      });
      setActivityData((prev) =>
        prev.map((activity) =>
          activity.id === activityId
            ? { ...activity, isDeleted: false }
            : activity,
        ),
      );
    } catch (error) {
      console.log("RestoreActivityError" + error);
    }
  };

  const editActivity = async (
    activityId: number,
    updatedFields: Partial<ActivityType>,
  ) => {
    try {
      await api.patch(`/admin/activities/${activityId}/edit`, updatedFields, {
        withCredentials: true,
      });

      setActivityData((prev) =>
        prev.map((activity) =>
          activity.id === activityId
            ? { ...activity, ...updatedFields }
            : activity,
        ),
      );
    } catch (error) {
      console.log("EditActivityError" + error);
    }
  };

  const addActivity = async (data: {
    name: string;
    caloriesBurnedPerHour: number;
  }) => {
    try {
      const res = await api.post("admin/activities/add", data, {
        withCredentials: true,
      });
      setActivityData((prev) => prev.concat(res.data.data));
    } catch (error) {
      console.log("addActivityError" + error);
    }
  };
  return {
    userActivityData,
    fetchUserActivities,
    fetchActivities,
    activityData,
    burnedCalorie,
    addUserActivity,
    todayUserActivityData,
    deleteActivity,
    restoreActivity,
    fetchAdminActivities,
    editActivity,
    addActivity,
  };
};
