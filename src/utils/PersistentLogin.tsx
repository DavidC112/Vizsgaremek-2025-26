import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContextProvider";
import { Outlet } from "react-router-dom";
import { Loader } from "lucide-react";

const PersistentLogin = () => {
  const { accessToken, refresh } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const verifyRefreshToken = async () => {
    try {
      await refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("PersistentLogin mount, accessToken:", accessToken);
    if (!accessToken) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("PersistenetLogin loading:" + isLoading);
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div className="flex min-h-screen flex-col items-center justify-center gap-2">
          Loading... <Loader className="size-5 animate-spin" />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};
export default PersistentLogin;
