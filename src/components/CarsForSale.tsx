
import { Car } from '../types'
import { useFetchAllCars } from '../customHooks/useFetchAllCars'
import './CarsForSale.css'
import { MediaCard } from './MediaCard'
import { CircularIndeterminate } from './CircularIndeterminate'
export const CarForSale = () => {


    const { cars } = useFetchAllCars()

    return (
        <div id="CarForSale">
            <div id='title'>
                <h1>
                    {"רכבים למכירה"}
                </h1>
            </div>
            <div id='cards'>
                {cars ? cars.map((car: Car) => (
                    <MediaCard key={car._id} detsils={car} />
                )) :
                    <div className="progress">
                        <CircularIndeterminate />
                    </div>
                }
            </div>
        </div>
    )
}