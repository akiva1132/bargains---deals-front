import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const useAddCar = () => {
  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(false);

  const navigate = useNavigate();
  const fetchData = async (
    manufacturer: string,
    name: string,
    model: number,
    km: number,
    hand: number,
    test :string,
    note: string,
    imageUrls: string[],
    price:number
  ) => {
    try {
      // setWaiting(true);
      setError("");
      console.log(1);

      const data = JSON.stringify({
        manufacturer: manufacturer,
        name: name,
        model: model,
        km: km,
        hand: hand,
        test: test,
        imageUrls: imageUrls,
        note: note,
        price: price
      });
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auction/addCar`, data, {
        headers: {
          'Authorization': localStorage.getItem("token2"),
          'Content-Type': 'application/json'
        },
      });
      console.log(response.data);
      navigate("/tradingArea")
    } catch (error: any) {
      // setError(error.response.data);
      console.error('Error fetching data:', error);
    } finally {
      setWaiting(false);
    }
  };
  return { waiting, error, fetchData, setError, setWaiting }
}