import { useParams } from "react-router-dom"
import { useFetchAllCars } from "../customHooks/useFetchAllCars"
import { Car } from "../types"
import { CircularIndeterminate } from "./CircularIndeterminate"
import { MediaCard2 } from "./MediaCard2"




export const Lot = () => {
    let { userId } = useParams();
    if (!userId) return
    const { cars } = useFetchAllCars(userId)

    return(
        <div id="CarForSale">
        <div id='title'>
            <h1>
                {'מודעות מאת .... '}
                {/* {`מודעות מאת ${user.firstName} ${user.lastName}`} */}
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