import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Post } from "./Posts"
import axios from "axios"

const AddPost = () => {
    const [title, setTitle] = useState<string>('')
    const [body, setBody] = useState<string>('')
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(!title.trim() || !body.trim()) {
            alert("제목과 내용을 입력하세요")
            return
        }
        setIsLoading(true)

        try {
            const newPost: Omit<Post, 'id'> = {userId: 1, title, body}
            const response =
                await axios.post<Post>('https://jsonplaceholder.typicode.com/posts', newPost)
            console.log('게시글 생성됨', response.data)
            setTitle('')
            setBody('')
            alert('게시글이 성공적으로 등록되었습니다')
            navigate('/')
        } catch (error) {
            alert('게시글 등록 중 오류가 발생했습니다')
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <div>
            <h2>게시글 작성</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력하세요"
                />
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="내용을 입력하세요"
                    rows={4}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? '등록 중...' : '등록'}
                </button>
            </form>
        </div>
    )
}
export default AddPost