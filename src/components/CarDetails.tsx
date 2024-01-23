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
import axios from "axios";
import { useNavigate } from "react-router-dom";





export const CarDetails = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const { car } = useFetchDetails(id || "")
    if (!car) {
        return (
            <div className="progress">
                <CircularIndeterminate />
            </div>
        )
    }
    const token = localStorage.getItem("token")
    const handleDelete = () => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BASE_URL}/${car._id}`,
            headers: {
                'Authorization': token
            }
        };
        axios.request(config)
            .then((response) => {
                navigate("/")
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const phoneNumber = '+972532467781'
    const messageText = `היי, אני פונה בקשר למודעה לגבי ה${car.manufacturer} ${car.model}`
    const whatsappLink = `whatsapp://send?phone=${phoneNumber}&text=${messageText}`;
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
                    <div className="lineDetails">
                        <FaShekelSign className="iconLine" />
                        <p>{car.price}</p>
                    </div>
                    <h3>{"על הרכב: "}</h3>
                    <p>{car.note}</p>
                    <div id="sendMessage">
                        {token && <IconButton sx={{ height: "35px" }} color="secondary" aria-label="delete" onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>}
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                            <Button sx={{ marginBottom: "60px" }} variant="contained">שלח לנו הודעה</Button>
                        </a>
                    </div>
                </div>
                <div id="images">
                    <SwipeableTextMobileStepper images={car.imageUrls} />
                </div>
            </div>
        </div>
    )
}