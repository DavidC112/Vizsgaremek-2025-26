import { useCallback, useState } from "react";
import api from "../api/axios";

export type User = {
  id:string, 
  email:string
  firstName:string,
  lastName:string,
  role:string,
  profilePictureUrl:string,
  isDeleted: boolean
};



export const useUser = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [userData, setUserData] = useState<User[]>([])



  const fetchUser = useCallback(async () => {
    try {
      const res = await api.get("/users/me", { withCredentials: true });

      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setProfilePictureUrl(res.data.profilePictureUrl);
      setRole(res.data.role);
    } catch (error) {
      console.log(error);
    }
  }, []);
  //admin
  const fetchAllUser = useCallback(async () =>{
    try{
      const res = await api.get("/admin/users/all", {withCredentials: true});
      setUserData(res.data.data)
    } catch(error) {
      console.log(error)
    }
  }, []);

  const deleteUser = async (userId:string) => {
    try{
      await api.patch(`/admin/users/${userId}/delete-user`, {withCredentials: true})
      setUserData(prev => prev.filter(u => u.id != userId))
    } catch (error){
      console.log(error)
    }
  }

  return {
    firstName,
    lastName,
    profilePictureUrl,
    role,
    userData,
    fetchUser,
    fetchAllUser,
    deleteUser,
  };
};
