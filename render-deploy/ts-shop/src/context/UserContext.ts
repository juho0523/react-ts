import { createContext, useContext } from "react";
import type { LoginForm, NewUser, User } from "../types/user";

interface UserContextType{
    users: User[];  // 회원목록
    currentUser: User | null;  // 로그인한 회원 (로그아웃 상태면 null)
    signup: (newUser: NewUser) => void  // 회원가입
    login: (loginForm: LoginForm) => boolean  // 로그인 (성공 여부 반환)
    logout: () => void  // 로그아웃
}


// 회원 컨텍스트 생성
// null or undefined
export const UserContext = createContext<UserContextType | null>(null)

export const useUser = () => {
    const context = useContext(UserContext)
    if(!context) {
        throw new Error('useUser는 UserProvider 내부에서만 사용 가능합니다')
    }
    return context
}