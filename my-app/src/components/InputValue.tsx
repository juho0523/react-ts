import { useState } from "react"

const InputValue = () => {
    const [text, setText] = useState<string>("")

    const handleTextChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    return(
        <div>
            <h3>이름 입력</h3>
            <input 
                type="text"
                onChange={handleTextChange}
                placeholder="글자 입력"
            />
            <p>입력된 글자: {text}</p>
        </div>
    )
}
export default InputValue