import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const GetUsername = () => {
  const { userData } = useContext(AuthContext);
  return userData ? userData.username : null;
};

export default GetUsername;
