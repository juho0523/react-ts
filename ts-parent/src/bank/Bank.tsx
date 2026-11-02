import { useReducer, useState } from "react"
import { bankReducer, initialState } from "./bankReducer"

const Bank = () => {
    const [state, dispatch] = useReducer(bankReducer, initialState);
    const [amount, setAmount] = useState<number>(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value) || 0);
    }

    const handleWithdraw = () => {
        if (amount > state.balance) {
            alert("잔액이 부족합니다.");
            return;
        }
        dispatch({ type: "WITHDRAW", amount });
    }

    return (
        <div>
            <h2>TypeScript 은행</h2>
            <h3>잔액: {state.balance.toLocaleString()}원</h3>

            <input type="number" value={amount} step={1000} onChange={handleChange} />
            <button onClick={() => dispatch({ type: "DEPOSIT", amount })}>입금</button>
            <button onClick={handleWithdraw}>출금</button>
            <button onClick={() => dispatch({ type: "RESET" })}>초기화</button>

            {/* dispatch({ type: "DEPOSIT" })       → amount 누락 오류
          dispatch({ type: "TRANSFER", ... }) → 없는 액션 오류 */}

            <ul>
                {state.history.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default Bank