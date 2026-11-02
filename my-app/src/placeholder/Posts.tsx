import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const Posts = () => {
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response =
                    await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
                setPosts(response.data)
            } catch (error) {
                alert('게시글 목록을 가져오는 중 오류가 발생했습니다')
            }
        }
        fetchPosts()
    }, [])

    return(
        <div>
            <h2>게시글 목록</h2>
            <Link to='/posts/add'>글쓰기</Link>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>
                            {post.id}. {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Posts