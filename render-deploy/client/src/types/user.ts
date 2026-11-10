export type Role = 'user' | 'admin'

export interface User {
    id: number,
    username: string,
    password: string,
    name: string,
    email: string,
    role: Role
}

export type NewUser = Omit<User, 'id'>


/* 회원가입 폼 타입 정의
   User에서 id(자동 부여)와 role(일반 회원으로 고정)을 빼고,
   화면에서만 쓰는 비밀번호 확인(passwordConfirm)을 추가합니다. */
export interface SignUpForm extends Omit<User, 'id' | 'role'>{
    passwordConfirm: string;
}


/* 로그인 폼 타입 정의
   Pick은 지정한 속성만 남깁니다.
   LoginForm은 username과 password만 가집니다. */
export type LoginForm = Pick<User, 'username' | 'password'>