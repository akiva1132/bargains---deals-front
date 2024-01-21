import axios from 'axios';
import { useEffect, useState } from 'react';
import { Car } from '../types';





export const useFetchDetails = (id:string) => {
    const [car, setCar] = useState<null | Car>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getCar/${id}`);
                console.log(response);
                setCar(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return { car, setCar };
};