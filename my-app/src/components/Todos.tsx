import { useEffect, useState } from "react"

export type Todo = {
    id: number
    text: string
    completed: boolean
}

const loadTodos = (): Todo[] => {
    try {
        const saved = localStorage.getItem("todos")
        return saved ? (JSON.parse(saved) as Todo[]) : []
    } catch {
        return []
    }
}

const Todos = () => {
    const [todos, setTodos] = useState<Todo[]>(loadTodos)
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    const addTodo = () => {
        if (!inputValue.trim()) return

        setTodos([...todos, {
            id: Date.now(),
            text: inputValue,
            completed: false
        }])
        setInputValue('')
    }


    return(
        <div>
            <h2>To-do List</h2>
            <input
                type="text"
                placeholder="할 일을 입력하세요"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={addTodo}>추가</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.text}</li>
                ))}
            </ul>
        </div>
    )

}
export default Todos