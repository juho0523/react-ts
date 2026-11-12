
import { createContext, useContext } from "react"
import type {
    LoginForm,
    NewUser,
    User,
    UserUpdateForm
} from "../types/user"

interface UserContextType {
    users: User[]
    currentUser: User | null

    // 세션
    isAuthLoading: boolean

    signup: (newUser: NewUser) => Promise<void>
    login: (loginForm: LoginForm) => Promise<boolean>
    updateUser: (form: UserUpdateForm) => Promise<void>
    logout: () => void
}

export const UserContext = createContext<UserContextType | null>(null)

export const useUser = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error("useUser는 UserProvider 내부에서만 사용 가능합니다")
    }

    return context
}
