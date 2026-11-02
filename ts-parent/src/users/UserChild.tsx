import UserGrandChild from "./UserGrandChild"

const UserChild = () => {
    return(
        <div>
            <h3>UserChild 컴포넌트</h3>
            <p>(user 데이터를 전달하지 않음)</p>
            <UserGrandChild />
        </div>
    )
}
export default UserChild