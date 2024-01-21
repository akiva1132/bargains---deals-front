
import { Car } from '../types'
import { useFetch } from '../useFetch'
import './CarForSale.css'
import { MediaCard } from './MediaCard'
const a = ["ds"]
export const CarForSale = () => {


    const { cars, setCars } = useFetch()
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