import axios from 'axios';
import { useEffect, useState } from 'react';
import { Car } from './types';





export const useFetch = () => {
    const [cars, setCars] = useState<null | Car[]>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/cars`);
                console.log(response);
                setCars(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return { cars, setCars };
};