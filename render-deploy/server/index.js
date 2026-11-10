import express from 'express'
import pg from 'pg'
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 8000;

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

// 본문 요청 파싱
app.use(express.json())

// cors 요청 허가
app.use(cors());



// 기본 라우터
app.get("/", (req, res) => {
  res.send("<h2>REST API</h2>");
})

// 상품 목록
app.get("/api/products", async (req, res) => {
  const sql = "SELECT * FROM products";
  try {
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.log("상품 조회 오류!", err);
    res.status(500).send("상품 조회 중 오류가 발생했습니다.");
  }
});

// 상품 단건 조회
app.get("/api/products/:id", async (req, res) => {
  const pid = req.params.id;
  const sql = "SELECT * FROM products WHERE id = $1";
  try {
    const result = await db.query(sql, [pid]);
    res.json(result.rows[0]);
  } catch (err) {
    console.log("상품 조회 오류!", err);
    res.status(500).send("상품 조회 중 오류가 발생했습니다.");
  }
});

// 상품 입력
app.post("/api/products", async (req, res) => {
  const { pName, category, price, description, image } = req.body;
  const sql = "INSERT INTO products(p_name, category, price, description, image) "
        + "VALUES ($1, $2, $3, $4, $5)";
  try{
    // image를 보내지 않으면 undefined → null로 저장
    await db.query(sql, [pName, category, price, description, image ?? null]);
    res.send("상품 등록 완료!!");
  }catch(err){
    console.log("상품 등록 오류!", err);
    res.status(500).send("상품 등록 중 오류가 발생했습니다.");
  }
});

// 상품 삭제
app.delete("/api/products/:id", async (req, res) => {
  const pid = req.params.id;
  const sql = "DELETE FROM products WHERE id = $1";
  try {
    await db.query(sql, [pid]);
    res.send("상품 삭제 완료!!");
  } catch (err) {
    console.log("상품 삭제 오류!", err);
    res.status(500).send("상품 삭제 중 오류가 발생했습니다.");
  }
});

// 상품 수정
app.put("/api/products/:id", async (req, res) => {
  const pid = req.params.id;
  const { pName, category, price, description, image } = req.body;
  const sql = "UPDATE products SET p_name=$1, category=$2, price=$3, "
        + "description=$4, image=$5 WHERE id=$6";
  try{
    // image를 보내지 않으면 null로 저장되므로, 수정할 때는 기존 image도 함께 보냅니다.
    await db.query(sql, [pName, category, price, description, image ?? null, pid]);
    res.send("상품 수정 완료!!");
  }catch(err){
    console.log("상품 수정 오류!", err);
    res.status(500).send("상품 수정 중 오류가 발생했습니다.");
  }      
});

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
    const sql = 'INSERT INTO users(username, password, name, email)'
            + 'VALUES ($1, $2, $3, $4)'
    try {
        await db.query(sql, [username, password, name, email])
        res.send('회원 가입 완료')
    } catch(err) {
        console.log('회원 가입 오류', err)
        res.status(500).send('회원 가입 중 오류가 발생했습니다')
    }
})

// 로그인
app.post('/api/users/login', async (req, res) => {
    const { username, password} = req.body
    const sql = 'SELECT id, username, name, email, role, created_at FROM users'
            + 'WHERE username = $1 AND password = $2'
    try {
        const result = await db.query(sql, [username, password])
        if(result.rows.length === 0) {
            return res.status(401).send('아이디 또는 비밀번호가 올바르지 않습니다')
        }
        
        res.json({
            message: '로그인 성공',
            user: result.rows[0]
        })
    } catch (err) {
        console.log('회원 로그인 오류', err);
        res.status(500).send('로그인 중 오류가 발생했습니다')
    }
})

// 회원 정보 수정 (이름 · 이메일)
app.put("/api/users/:id", async (req, res) => {
  const uid = req.params.id;
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