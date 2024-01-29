import { CarsForSale2 } from "./CarsForSale2"
import { LogIn2 } from "./LogIn2"



export const UserReferral = () => {
    const token = localStorage.getItem("token2")
    if (token) return (<CarsForSale2/>)
    else return (<LogIn2/>)

}
