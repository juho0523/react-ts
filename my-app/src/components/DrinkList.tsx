import { useState } from "react"
import DrinkL from "./DrinkL"

const DrinkList = () => {
    const [drinks, setDrinks] = useState<string[]>([])
    const [newDrink, setNewDrink] = useState("")
    const addDrink = () => {
        if (newDrink.trim()) {
            setDrinks([...drinks, newDrink])
            setNewDrink("")
        }
    }
    

    return (
        <div>
            <h3>음료 목록</h3>
            <DrinkL drinks={drinks}/>

            <input
                type="text"
                value={newDrink}
                onChange={(e) => setNewDrink(e.target.value)}
                placeholder="추가할 음료 입력"
            />

            <button onClick={addDrink}>음료 추가</button>
        </div>
    )
}

export default DrinkList