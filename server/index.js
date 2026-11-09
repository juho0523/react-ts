import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('<h2>Hello, World!</h2>')
})

const PORT = 8000
app.listen(PORT, () => {
    console.log(`서버 실행중... http://localhost:${PORT}`)
})