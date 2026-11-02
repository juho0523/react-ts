const Player = ({player, clickHandler}: {
    player: {name:string; age:number},
    clickHandler: () => void}) => {
    return(
        <div>
            <h2>운동 선수</h2>
            <p>이름: {player.name}</p>
            <p>이름: {player.age}</p>
            <button onClick={clickHandler}>클릭</button>
        </div>
    )
}
export default Player