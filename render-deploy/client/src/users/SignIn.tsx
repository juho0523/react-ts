import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { LoginForm } from "../types/user";
import { useUser } from "../context/UserContext";

// 로그인 폼 초기화
const initialForm: LoginForm = {
    username: "",
    password: ""
};

const SignIn = () => {
    const [form, setForm] = useState<LoginForm>(initialForm);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { login } = useUser();
    const navigate = useNavigate();

    // 폼에 입력된 데이터 가져오기
    const { username, password } = form;

    // 입력값 변경 핸들러
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });

        setError(null);
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) return;

        setError(null);

        // 유효성 검사
        if (!username.trim()) {
            setError("아이디를 입력해주세요");
            return;
        }

        if (!password) {
            setError("비밀번호를 입력해주세요");
            return;
        }

        try {
            setLoading(true);

            // 로그인 함수 호출
            const success = await login({
                username: username.trim(),
                password
            });

            if (!success) {
                setError("아이디 또는 비밀번호가 올바르지 않습니다");
                return;
            }

            alert("로그인되었습니다.");
            navigate("/");

        } catch (error) {
            console.error("로그인 오류:", error);
            setError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sign-in">
            <h2>로그인</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">아이디</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleInputChange}
                        placeholder="아이디를 입력하세요"
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
                        placeholder="비밀번호를 입력하세요"
                        autoComplete="current-password"
                    />
                </div>

                {error && (
                    <p className="sign-in_error">
                        {error}
                    </p>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? "로그인 중..." : "로그인"}
                </button>
            </form>

            {/* 회원 가입 링크 */}
            <p className="signup-link">
                아직 계정이 없으신가요? <Link to="/signup">회원가입</Link>
            </p>
        </div>
    );
};

export default SignIn;