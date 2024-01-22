import { useEffect } from "react"
import { SignIn } from "./LogIn"
import { AddCar } from "./AddCar"




export const AdministrationArea = () => {
    const token = localStorage.getItem("token")
    useEffect(() => {
        
    }, [])

    
    return (
        <div>
            {token?<AddCar/>:<SignIn />}
        </div>
    )
}