import { useParams } from "react-router-dom"
import { useFetchAllCars } from "../customHooks/useFetchAllCars"
import { Car } from "../types"
import { CircularIndeterminate } from "./CircularIndeterminate"
import { MediaCard2 } from "./MediaCard2"
import { useEffect, useState } from "react"
import axios from "axios"




export const Lot = () => {
    let { userId } = useParams();
    if (!userId) return
    const { cars } = useFetchAllCars(userId)
    const [name, setName] = useState<string | null>(null);

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BASE_URL}/auction/getName/${userId}`,
            headers: {
                'Authorization': localStorage.getItem("token2"),
                'Content-Type': 'application/json'
            },
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setName(response.data)
            })
            .catch((error) => {
                setName(null)
                console.error('Error fetching data:', error)
            });
    }, [])
    
    return (
        <div id="CarForSale">
            <div id='title'>
                <h1>
                    {name && `מודעות מאת ${name}`}
                </h1>
            </div>
            <div id='cards'>
                {cars ? cars.map((car: Car) => (
                    <MediaCard2 key={car._id} detsils={car} />
                )) :
                    <div className="progress">
                        <CircularIndeterminate />
                    </div>
                }
            </div>
        </div>
    )
}