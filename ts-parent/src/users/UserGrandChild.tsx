import { useContext } from "react"
import { UserContext } from "./UserContext"

const UserGrandChild = () => {
    const user = useContext(UserContext)
    return(
        <div>
            <h4>UserGrandChild 컴포넌트</h4>
            <p>이름: {user.name}</p>
            <p>나이: {user.age}</p>
        </div>
    )
}

export default UserGrandChild