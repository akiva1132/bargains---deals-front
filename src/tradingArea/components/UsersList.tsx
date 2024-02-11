import { useUserList } from "../customHooks/useUserList"
import { CircularIndeterminate } from "./CircularIndeterminate"
import { UserCard } from "./userCard"





export const UserList = () => {
    const { users } = useUserList()
    return (
        <div id="CarForSale">
            <div id='title'>
                <h1>
                    {"סוחרים"}
                </h1>
            </div>
            <div id='cards'>
                {
                    users ? users.map((user) => <UserCard key={user.id} user={user}/>) :
                        <div className="progress">
                            <CircularIndeterminate />
                        </div>
                }
            </div>
        </div>
    )
}