import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import jwt from "jsonwebtoken";

export const useSignUp = () => {
  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(false);
//   const [token, setToken] = useState("");


//   if (token){
//     localStorage.setItem("token2", token)
//     location.reload();
// }

  const navigate = useNavigate();
  const fetchData = async (
    userName: string,
    password: string,
    phone: string,
    fullName: string,
    profileImage: string,
  ) => {
    try {
      setError("");
      console.log(1223);
      
      const data = {
        userName: userName,
        password: password,
        phone: phone,
        fullName: fullName,
        profileImage: profileImage,
        numberAds: 0
      }
      console.log(data);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auction/register/`, data, {
      });
      console.log(response.data);
      localStorage.setItem("token2", response.data)
      navigate("/tradingArea")
    } catch (error: any) {
      console.log(error);
      
        setError(error.response.data)
      console.error('Error fetching data:', error);
    } finally {
      setWaiting(false);
    }
  };
  return { waiting, error, fetchData, setError, setWaiting }
}
