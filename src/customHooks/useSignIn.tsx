import axios from "axios";
import { useState } from "react";



export const useSignIn = () =>{
    const [error, setError] = useState("");
    const [waiting, setWaiting] = useState(false);
    const [token, setToken] = useState("");


    if (token){
      localStorage.setItem("token", token)
      location.reload();
  }

    const fetchData = async (userName: string, password: string) => {
        try {
        setWaiting(true)
        setError("")
          const data = {
            userName,
            password,
          };
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/logIn`, data);
          setToken(response.data);
          console.log(response.data);
        } catch (error: any) {
          setError(error.response.data);
          console.error('Error fetching data:', error);
        } finally {
          setWaiting(false);
        }
      };
        return {waiting, error, token, fetchData }
}