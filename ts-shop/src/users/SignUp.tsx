import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { SignUpForm } from "../types/user";
import { useUser } from "../context/UserContext";

// 회원가입 폼 초기화
const initialForm: SignUpForm = {
  username: "",
  password: "",
  passwordConfirm: "",
  name: "",
  email: ""
}

// 유효성 검사용 정규식
const USERNAME_REGEX = /^[a-z0-9]{4,16}$/;        // 영문 소문자, 숫자 4~16자
// 간단한 이메일 형식 - 아이디@도메인이름.확장자
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

const SignUp = () => {
  const [form, setForm] = useState<SignUpForm>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const { users, signup } = useUser();
  const navigate = useNavigate();

  // 폼에 입력된 데이터 가져오기
  const { username, password, passwordConfirm, name, email } = form;

  // 입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })  // 입력 데이터 저장
  }

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 유효성 검사
    // test() - 문자열이 정규식과 맞으면 true, 맞지 않으면 false를 반환
    if(!USERNAME_REGEX.test(username)){
      setError("아이디는 영문 소문자, 숫자 4~16자로 입력해주세요");
      return;
    }
    // some() - 배열 요소 중 하나라도 조건을 만족하는지 검사하는 메서드
    if(users.some(user => user.username === username)){
      setError("이미 사용 중인 아이디입니다");
      return;
    }
    if(password.length < 8){
      setError("비밀번호는 8자 이상 입력해주세요");
      return;
    }
    if(password !== passwordConfirm){
      setError("비밀번호가 일치하지 않습니다");
      return;
    }
    if(!name.trim()){
      setError("이름을 입력해주세요");
      return;
    }
    if(!EMAIL_REGEX.test(email.trim())){
      setError("이메일 형식이 올바르지 않습니다");
      return;
    }

    // 회원가입 함수 호출 (passwordConfirm은 제외, 권한은 일반 회원)
    signup({
      username,
      password,
      name: name.trim(),
      email: email.trim(),
      role: "user"
    });
    alert("회원가입이 완료되었습니다. 로그인해주세요.");
    navigate('/signin');  // 로그인 화면으로 이동
  }

  return(
    <div className="sign-up">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleInputChange}
            placeholder="영문 소문자, 숫자 4~16자"
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            placeholder="8자 이상"
            autoComplete="new-password"
          />
        </div>
        <div>
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handleInputChange}
            placeholder="비밀번호를 한 번 더 입력하세요"
            autoComplete="new-password"
          />
        </div>
        <div>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInputChange}
            placeholder="이름을 입력하세요"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="example@email.com"
            autoComplete="email"
          />
        </div>
        {error && <p className="sign-up_error">{error}</p>}
        <button type="submit">회원가입</button>
      </form>

      <p className="signup-link">
        이미 계정이 있으신가요? <Link to="/signin">로그인</Link>
      </p>
    </div>
  )
}

export default SignUp;
