import api from './api';
import type { LoginForm, NewUser, User, UserUpdateForm } from '../types/user';

interface LoginResponse {
  message: string;
  user: User;
}

// 회원 목록 조회
export const getUsers = async () => {
  const response = await api.get<User[]>('/users');
  return response.data;
}

// 로그인: 성공하면 회원 정보를 돌려주고, 실패(401)하면 오류가 납니다.
export const requestLogin = async (loginForm: LoginForm) => {
  const response = await api.post<LoginResponse>('/users/login', loginForm);
  return response.data.user;
}

// 회원 가입: role은 보내지 않습니다. 서버(DB)의 기본값 'user'가 들어갑니다.
export const createUser = async (newUser: NewUser) => {
  const { username, password, name, email } = newUser;
  await api.post('/users', { username, password, name, email });
}



// 회원 정보 수정: 바뀐 회원 정보(비밀번호 제외)를 돌려받습니다.
export const modifyUser = async (id: number, form: UserUpdateForm) => {
  const response = await api.put<User>(`/users/${id}`, form);
  return response.data;
}


// 로그인 상태 확인
export const getMe = async (): Promise<User> => {
  const response = await api.get<User>('/users/me')
  return response.data
}


// 로그아웃 요청
export const requestLogout = async (): Promise<void> => {
  await api.post('/users/logout')
}