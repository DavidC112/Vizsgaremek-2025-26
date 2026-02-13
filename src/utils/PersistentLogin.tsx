import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContextProvider";
import { Outlet } from "react-router-dom";

const PersistentLogin = () => {
  const { accessToken, refresh } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
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

  return <>{isLoading ? <p>Loading</p> : <Outlet />}</>;
};
export default PersistentLogin;
