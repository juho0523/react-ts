import UserChild from "./UserChild"
import { UserContext, type User } from "./UserContext"

const UserParent = () => {
    const user: User = {
        name: '엄준식',
        age: 123
    }

    return(
        <div>
            <h2>UserParent 컴포넌트입니다</h2>
            <UserContext.Provider value={user}>
                <UserChild />
            </UserContext.Provider>
        </div>
    )
}

export default UserParent