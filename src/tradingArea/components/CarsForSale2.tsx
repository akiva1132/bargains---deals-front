
import { Car } from '../types'
import { useFetchAllCars } from '../customHooks/useFetchAllCars'
import './CarsForSale.css'
import { MediaCard2 } from './MediaCard2'
import { CircularIndeterminate } from './CircularIndeterminate'


export const CarsForSale2 = () => {
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