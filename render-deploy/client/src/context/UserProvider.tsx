
import { useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import type {
    LoginForm,
    NewUser,
    User,
    UserUpdateForm
} from "../types/user"

import {
    createUser,
    getMe,
    getUsers,
    modifyUser,
    requestLogin,
    requestLogout
} from "../api/users"

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [users, setUsers] = useState<User[]>([])
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    // 로그인 상태 확인 관리
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true)

    // 최초 실행 시 회원 목록 조회, 세션에 로그인 정보 있는지 확인
    useEffect(() => {
        // 세션에 로그인 정보 있는지 확인
        getMe()
            .then(setCurrentUser)
            .catch(() => setCurrentUser(null))
            .finally(() => setIsAuthLoading(false))

        // 회원 목록 조회
        const fetchUsers = async () => {
            try {
                const data = await getUsers()
                setUsers(data)
            } catch (error) {
                console.error("회원 목록 조회 실패:", error)
            }
        }

        fetchUsers()
    }, [])

    // 회원가입
    const signup = async (newUser: NewUser) => {
        await createUser(newUser)

        // 회원가입 후 목록 갱신
        const data = await getUsers()
        setUsers(data)
    }

    // 로그인
    const login = async (loginForm: LoginForm) => {
        try {
            const user = await requestLogin(loginForm)
            setCurrentUser(user)
            return true
        } catch (error) {
            console.error("로그인 실패:", error)
            return false
        }
    }

    // 회원 정보 수정
    const updateUser = async (form: UserUpdateForm) => {
        if (!currentUser) return

        const updatedUser = await modifyUser(currentUser.id, form)

        setCurrentUser(updatedUser)

        // 회원 목록 갱신
        const data = await getUsers()
        setUsers(data)
    }

    // 로그아웃
    const logout = async () => {
        await requestLogout()
        setCurrentUser(null)
    }

    return (
        <UserContext.Provider value={{
            users,
            currentUser,
            isAuthLoading,
            signup,
            login,
            updateUser,
            logout
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
