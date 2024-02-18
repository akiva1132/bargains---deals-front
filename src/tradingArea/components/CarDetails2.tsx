import { useParams } from "react-router-dom"
import './CarDetails.css'
import { useFetchDetails } from "../customHooks/useFetchDetails";
import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";
import { BsSpeedometer2 } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegHandPaper } from "react-icons/fa";
import { SiTestcafe } from "react-icons/si";
import { CircularIndeterminate } from "./CircularIndeterminate";
import { Button, IconButton } from "@mui/material";
import { FaShekelSign } from "react-icons/fa";
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import { DeleteDialog } from "./DeleteDialog";





export const CarDetails2 = () => {
    const [open, setOpen] = useState(false);

    const { id } = useParams();
    const { car } = useFetchDetails(id || "")
    if (!car) {
        return (
            <div className="progress">
                <CircularIndeterminate />
            </div>
        )
    }


    const handleClickOpen = () => {
        setOpen(true);
      };

    const phoneNumber = '+972532467781'
    const messageText = `היי, אני פונה בקשר למודעה לגבי ה${car.manufacturer} ${car.name}`
    const whatsappLink = `whatsapp://send?phone=${phoneNumber}&text=${messageText}`;
    console.log(car.advertiser);
    const userId = JSON.parse(localStorage.getItem("userDetails") || "").userId
      
    return (
        <div>
            <div id="Car">
                <div id="CarDetails">
                <DeleteDialog open={open} setOpen={setOpen} carId={car._id}/>
                    <div id="details">
                        <Divider />
                        <span style={{ display: 'flex' }}>
                            <h1 style={{ marginLeft: '15px' }}>{car?.manufacturer}</h1>
                            <h1>{car?.name}</h1>
                        </span>
                        <Divider />
                        <div id="dtailsTop">
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
                        </div>
                        <Divider />
                        <div className="lineDetails">
                            <SiTestcafe className="iconLine" />
                            <p>{car.test}</p>
                        </div>
                        <div className="lineDetails">
                            <FaShekelSign className="iconLine" />
                            <p>{car.price}</p>
                        </div>
                        <h3>{"על הרכב: "}</h3>
                        <p>{car.note || "אין מידע נוסף"}</p>
                    </div>
                    <div id="images">
                        <SwipeableTextMobileStepper images={car.imageUrls} />
                    </div>
                </div>
            </div>
            <div id="sendMessage">
                {car.advertiser === userId && <>
                    <IconButton sx={{ height: "35px" }} color="secondary" aria-label="delete" onClick={handleClickOpen}>
                        <DeleteIcon />
                    </IconButton>

                    <IconButton sx={{ height: "35px" }} color="secondary">
                        <CiEdit />
                    </IconButton></>

                }
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Button sx={{ marginBottom: "60px" }} variant="contained">קישור ישיר לוואצפ</Button>
                </a>
            </div>
        </div>
    )
}