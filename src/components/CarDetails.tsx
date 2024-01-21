import { useParams } from "react-router-dom"
import './CarDetails.css'
import { useFetchDetails } from "../customHooks/useFetchDetails";

export const CarDetails = () => {
    let { id } = useParams();
    const { car } = useFetchDetails(id || "")

    return (
        <div id="Car">
            <div id="CarDetails">
                <div id="details">
                    <h1>{car?.manufacturer}</h1>
                    <p>{car?.note}</p>
                </div>
                <div id="images">
                    <img style={{ maxWidth: "100%",  maxHeight: "100%" }} src={car?.imageUrl} alt="" />
                </div>
            </div>
        </div>
    )
}