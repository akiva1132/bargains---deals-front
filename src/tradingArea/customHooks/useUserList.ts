import axios from 'axios';
import { useEffect, useState } from 'react';
import { User } from '../types';





export const useUserList = () => {
    const [users, setUsers] = useState<null | User[]>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auction/users`);
                console.log(response.data);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return { users, setUsers };
};