import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Greet from './components/Greet'
import Player from './components/Player'
import InputValue from './components/InputValue'
import DrinkList from './components/DrinkList'
import Box from './props/Box'
import Card from './props/Card'
import Memo from './storage/Memo'
import Todos from './components/Todos'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Posts from './placeholder/Posts'
import PostDetail from './placeholder/PostDetail'
import AddPost from './placeholder/AddPost'

function App() {
  const [count, setCount] = useState(0)

  const playerObj = {
    name: '이상혁',
    age: 30
  }

  const clickHandler = () => {
    alert('버튼이 클릭되었습니다')
  }

  return (
    <>
      <section className="app">
        {/* <h2>리액트 기초 문법</h2>
        <Greet name="최주호" />
        <Player player={playerObj} clickHandler={clickHandler} />
        <InputValue />
        <DrinkList /> */}
        {/* <Box>
          <h3>박스 안의 내용</h3>
        </Box>
        <Card title="공지사항">
          <p>내일은 별 거 없습니다</p>
        </Card>
        <Memo />
        <Todos /> */}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Posts />}/>
            <Route path='/posts/:id' element={<PostDetail />} />
            <Route path='/posts/add' element={<AddPost />} />
          </Routes>
        </BrowserRouter>
      </section>
    </>
  )
}

export default App
