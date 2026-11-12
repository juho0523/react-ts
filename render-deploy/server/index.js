import express from 'express'
import pg from 'pg'
import cors from 'cors'
import bcrypt from 'bcrypt'
import session from 'express-session'

const app = express();
const PORT = process.env.PORT || 8000;

// 배포(Render)인지 확인: Render 환경변수에 NODE_ENV=production을 넣습니다.
const isProduction = process.env.NODE_ENV === 'production'

// postgreSQL 연결 설정
const db = process.env.DATABASE_URL
  ? new pg.Client({ connectionString: process.env.DATABASE_URL })
  : new pg.Client({
  host: "localhost",
  user: "tsuser",
  password: "1234",
  database: "tsdb"
});

// postgreSQL 연결 확인
try {
  await db.connect();
  console.log("postgreSQL 연결 성공");
} catch (err) {
  console.error("postgreSQL 연결 실패:", err.message);
}

// Render는 앞단 프록시(https)를 거쳐 요청이 들어오므로, 프록시를 믿어야 secure 쿠키가 동작합니다.
if (isProduction) {
  app.set("trust proxy", 1);
}

// CORS 허용 주소: 내 컴퓨터(React 개발 서버) + CLIENT_URL(배포된 React 주소)
// CLIENT_URL에 여러 주소를 쉼표로 넣을 수 있음 (앞뒤 공백 · 끝의 / 는 제거)
const allowedOrigins = [
  'http://localhost:5173',
  ...(process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',').map((s) => s.trim().replace(/\/$/, ""))
    : [])
]


// 해당 미들웨어들은 app.api들보다는 위에 있어야 함
// 본문 요청 파싱
app.use(express.json())
// cors 요청 허가
app.use(cors({
  // 목록에 있는 주소만 허용
  origin: allowedOrigins,

  // 프론트엔드와 백엔드 사이에서 쿠키를 주고받기 위함
  credentials: true
}));
// 세션
app.use(session({
  secret: process.env.SESSION_SECRET || 'space-shop-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    // React(shop-client)와 서버(shop-server)가 다른 사이트라
    // 배포에서는 sameSite: "none" + secure(https 전용)가 있어야 쿠키가 오갑니다.
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction
  }
}))

// 로그인 여부 확인용 미들웨어
const isAuthenticated = (req, res, next) => {
  if(!req.session.user) {
    return res.status(401).send('로그인이 필요합니다')
  }
  next() // 통과
}

// 관리자 권한 확인용 미들웨어
const isAdmin = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).send("로그인이 필요합니다.");
  }
  if (req.session.user.role !== "admin") {
    return res.status(403).send("관리자 권한이 없습니다.");
  }
  next(); // 관리자일 때만 통과
}


// 기본 라우터
app.get("/", (req, res) => {
  res.send("<h2>REST API</h2>");
})

// 상품 목록 조회
app.get("/api/products", async (req, res) => {
    const sql = "SELECT * FROM products";
    try{
        const result = await db.query(sql); //db에서 꺼내온 데이터
        res.json(result.rows);  //요청한 곳에 반환
    }catch(err){
        // 500: 코드 오류
        console.error("상품 목록 조회 오류!!", err);
        res.status(500).send("상품 목록 조회 오류!!")
    }
});

// 상품 1건 조회
app.get("/api/products/:id", async (req, res) => {
    const pid = req.params.id;  //id 받아오기
    const sql = "SELECT * FROM products WHERE id = $1";
    try{
        const result = await db.query(sql, [pid]); //db에서 꺼내온 데이터
        res.json(result.rows[0]);  //요청한 곳에 반환
    }catch(err){
        console.error("상품 조회 오류!!", err);
        res.status(500).send("상품 조회 오류!!")
    }
});

// 상품 등록
app.post("/api/products", isAdmin, async (req, res) => {
    const { pName, category, price, description, image} = req.body;
    const sql = "INSERT INTO products(p_name, category, price, description, "
       + " image) VALUES ($1, $2, $3, $4, $5)";
    try{
        await db.query(sql, [pName, category, price, description, image ?? null]);
        res.send("상품 등록 완료!");
    }catch(err){
         console.error("상품 등록 오류!!", err);
        res.status(500).send("상품 등록 오류!!")
    }
})

// 상품 삭제
app.delete("/api/products/:id", isAdmin, async (req, res) => {
    const pid = req.params.id;  //id 받아오기
    const sql = "DELETE FROM products WHERE id = $1";
    try{
        await db.query(sql, [pid]); //db에서 꺼내온 데이터
        res.send("상품 삭제 완료!")  //요청한 곳에 반환
    }catch(err){
        console.error("상품 삭제 오류!!", err);
        res.status(500).send("상품 삭제 오류!!")
    }
});

// 상품 수정
app.put("/api/products/:id", isAdmin, async (req, res) => {
    const pid = req.params.id;
    const { pName, category, price, description, image} = req.body;
    const sql = "UPDATE products SET p_name=$1, category=$2, price=$3, "
         + " description=$4, image=$5 WHERE id = $6";
    try{
        await db.query(sql, [pName, category, price, description, image ?? null, pid]);
        res.send("상품 수정 완료!");
    }catch(err){
        console.error("상품 수정 오류!!", err);
        res.status(500).send("상품 수정 오류!!")
    }
})

// 회원
// 회원 목록
app.get('/api/users', async (req, res) => {
    const sql = 'SELECT id, username, name, email, role, created_at FROM users'
    try {
        const result = await db.query(sql)
        res.json(result.rows)
    } catch (err) {
        console.log('회원 조회 오류', err)
        res.status(500).send('회원 조회 중 오류가 발생했습니다')
    }
})

// 회원 가입
app.post('/api/users', async (req, res) => {
    const {username, password, name, email} = req.body
    const sql = 'INSERT INTO users(username, password, name, email) VALUES ($1, $2, $3, $4)'
    try {
        // 비밀번호 암호화해서 10번 암호화 반복
        const hashedPassword = await bcrypt.hash(password, 10)
        await db.query(sql, [username, hashedPassword, name, email])
        res.send('회원 가입 완료')
    } catch(err) {
        console.log('회원 가입 오류', err)
        res.status(500).send('회원 가입 중 오류가 발생했습니다')
    }
})

// 로그인
app.post("/api/users/login", async (req, res) => {
  const { username, password } = req.body;
  // 1. 아이디로만 회원을 찾습니다. (암호화된 비밀번호는 SQL로 비교할 수 없음)
  const sql = "SELECT * FROM users WHERE username = $1";
  try {
    const result = await db.query(sql, [username]);
    const user = result.rows[0];

    // 2. 회원이 없거나, 입력한 비밀번호와 저장된 해시가 맞지 않으면 실패
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("아이디 또는 비밀번호가 올바르지 않습니다.");
    }

    // 3. 응답에서 비밀번호를 빼고 나머지만 보냅니다.
    const { password: _, ...userInfo } = user;

    req.session.user = userInfo

    res.json({
      message: "로그인 성공",
      user: userInfo
    });
  } catch (err) {
    console.log("회원 로그인 오류!", err);
    res.status(500).send("로그인 중 오류가 발생했습니다.");
  }
});

// 현재 로그인 사용자 확인
app.get('/api/users/me', (req, res) => {
  if(!req.session.user) {
    return res.json(null)
  }
  res.json(req.session.user)
})

// 로그아웃
app.post('/api/users/logout', (req, res) => {
  req.session.destroy(err => {
    if(err) {
      console.log('로그아웃 오류', err)
      return res.status(500).send('로그아웃 중 오류가 발생했습니다')
    }
    res.clearCookie('connect.sid')
    res.send('로그아웃 완료')
  })
})

// 회원 정보 수정 (이름 · 이메일)
app.put("/api/users/:id", isAuthenticated, async (req, res) => {
  const uid = req.params.id;

  // 본인 여부 확인
  if(req.session.user.id !== uid) {
    return res.status(403).send('본인의 회원 정보만 수정할 수 있습니다')
  }

  const { name, email } = req.body;
  // RETURNING: 바꾼 뒤의 회원 정보를 바로 돌려받습니다. (password는 빼고)
  const sql = "UPDATE users SET name = $1, email = $2 WHERE id = $3 "
        + "RETURNING id, username, name, email, role, created_at";
  try {
    const result = await db.query(sql, [name, email, uid]);
    if (result.rows.length === 0) {
      return res.status(404).send("회원을 찾을 수 없습니다.");
    }
    res.json(result.rows[0]);
  } catch (err) {
    // 23505: UNIQUE 위반 (다른 회원이 쓰는 이메일)
    if (err.code === "23505") {
      return res.status(409).send("이미 사용 중인 이메일입니다.");
    }
    console.log("회원 수정 오류!", err);
    res.status(500).send("회원 정보 수정 중 오류가 발생했습니다.");
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버 실행중... http://localhost:${PORT}`);
})