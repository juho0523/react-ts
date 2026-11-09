const phoneRegex = /^010-\d{3,4}-\d{4}$/;
console.log("1. 휴대폰 번호 검사");
console.log(phoneRegex.test("010-1234-5678")); // true
console.log(phoneRegex.test("02-123-4567")); // false

const userIdRegex = /^[a-z0-9]{4,12}$/
console.log("2. 아이디 검사");
console.log(userIdRegex.test("abc123")); // true
console.log(userIdRegex.test("abc")); // false (3자)

const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
console.log("3. 비밀번호 검사");
console.log(pwRegex.test("abc12345")); // true
console.log(pwRegex.test("abcdefgh")); // false (숫자 없음)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log("4. 이메일 검사");
console.log(emailRegex.test("hong@naver.com")); // true
console.log(emailRegex.test("hong@naver")); // false


const usernameRegex = /^(?=.*[a-z])(?=.*\d)[a-z0-9]{4,12}$/;
console.log("5. 아이디 검사 (소문자 + 숫자 필수)");
console.log(usernameRegex.test("abc123")); // true
console.log(usernameRegex.test("abcdef")); // false (숫자 없음)
console.log(usernameRegex.test("123456")); // false (소문자 없음)
console.log(usernameRegex.test("Abc123")); // false (대문자 포함)
console.log(usernameRegex.test("ab1")); // false (3자)