import axios from 'axios';
import { useEffect, useState } from 'react';
import { Car } from '../types';





export const useFetchAllCars = (userId?:string ) => {
    const [cars, setCars] = useState<null | Car[]>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(userId);
                
                if (userId) {
                    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auction/cars/${userId}`);
                    console.log(response);
                    setCars(response.data);
                }
                else {
                    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auction/cars`);
                    console.log(response);
                    setCars(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return { cars, setCars };
};