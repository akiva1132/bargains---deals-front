import { useParams } from "react-router-dom"
import './CarDetails.css'
import { useFetchDetails } from "../customHooks/useFetchDetails";
import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";
import { BsSpeedometer2 } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegHandPaper } from "react-icons/fa";
import { SiTestcafe } from "react-icons/si";
import { CircularIndeterminate } from "./CircularIndeterminate";
import { Button } from "@mui/material";




export const CarDetails = () => {
    let { id } = useParams();
    const { car } = useFetchDetails(id || "")
    if (!car) {
        return (
            <div className="progress">
                <CircularIndeterminate />
            </div>
        )
    }
    return (
        <div id="Car">
            <div id="CarDetails">
                <div id="details">
                    <span style={{ display: 'flex' }}>
                        <h1 style={{ marginLeft: '15px' }}>{car?.manufacturer}</h1>
                        <h1>{car?.name}</h1>
                    </span>
                    <div className="lineDetails">
                        <BsSpeedometer2 className="iconLine" />
                        <p>{car.km}</p>
                    </div>
                    <div className="lineDetails">
                        <FaRegCalendarAlt className="iconLine" />
                        <p>{car.model}</p>
                    </div>
                    <div className="lineDetails">
                        <FaRegHandPaper className="iconLine" />
                        <p>{car.hand}</p>
                    </div>
                    <div className="lineDetails">
                        <SiTestcafe className="iconLine" />
                        <p>{car.test}</p>
                    </div>
                    <h3>{"על הרכב: "}</h3>
                    <p>{car.note}</p>
                    <Button>{"שלח לנו וואצפ"}</Button >
                </div>
                <div id="images">
                    <SwipeableTextMobileStepper images={car.imageUrls} />
                </div>
            </div>
        </div>
    )
}