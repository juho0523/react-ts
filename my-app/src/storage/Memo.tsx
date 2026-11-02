import { useEffect, useState } from "react"

const Memo = () => {
    const [memo, setMemo] = useState<string>(() => {
        return localStorage.getItem("memo") ?? ""
    })

    useEffect(() => {
        localStorage.setItem("memo", memo)
    }, [memo])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMemo(e.target.value)
    }

    return(
        <div>
            <h2>메모장</h2>
            <textarea 
                value={memo}
                onChange={handleChange}
                placeholder="메모를 입력하세요"
                rows={4}
                cols={40}
            />
            <p>글자 수 : {memo.length}</p>
            <button onClick={() => setMemo("")}>메모 초기화</button>
        </div>
    )
}
export default Memo