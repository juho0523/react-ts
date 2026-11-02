import { useState } from "react"

const Counter = () => {
    const [count, setCount] = useState<number>(0)

    const handleIncrese = () => {
        setCount(count + 1)
    }

    const handleDecrese = () => {
        setCount(count - 1)
    }

    const handleSet = () => {
        setCount(0)
    }

    return(
        <div>
            <h3>Counter</h3>
            <p>현재 카운트: {count}</p>
            <button onClick={handleIncrese}>증가</button>
            <button onClick={handleDecrese}>감소</button>
            <button onClick={handleSet}>초기화</button>
        </div>
    )
}
export default Counter