import { LogIn2 } from "./LogIn2"
import { UserList } from "./UsersList"



export const UserReferral = () => {
    const token = localStorage.getItem("token2")
    if (token) return (<UserList/>)
    else return (<LogIn2/>)

}
