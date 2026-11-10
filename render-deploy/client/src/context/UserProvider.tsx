import { useState } from "react"
import { UserContext } from "./UserContext"
import { initialUsers } from "../datas/users"
import type { LoginForm, NewUser, User } from "../types/user"

const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [users, setUsers] = useState<User[]>(initialUsers)
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    const signup = (newUser: NewUser) => {
        const user: User = {...newUser, id:Date.now()}
        setUsers([...users, user])
    }

    const login = (loginForm: LoginForm) => {
        const found = users.find(
            (user) => user.username === loginForm.username && user.password === loginForm.password
        )
        if(!found) return false
        setCurrentUser(found)
        return true
    }

    const logout = () => {
        setCurrentUser(null)
    }

    return(
        <UserContext.Provider value={{
            users,
            currentUser,
            signup,
            login,
            logout
        }}>
            {children}
        </UserContext.Provider>

    )
}
export default UserProvider