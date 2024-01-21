
import { Car } from '../types'
import { useFetchAllCars } from '../customHooks/useFetchAllCars'
import './CarsForSale.css'
import { MediaCard } from './MediaCard'
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
                {cars?.map((car: Car) => (
                    <MediaCard key={car._id} detsils={car}/>
                ))}
            </div>
        </div>
    )
}