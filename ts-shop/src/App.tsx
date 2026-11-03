import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './layouts/Header';
import ProductList from './products/ProductList';
import ProductProvider from './context/ProductProvider';
import ProductDetail from './products/ProductDetail';
import AddProduct from './products/AddProduct';

function App() {
  const [count, setCount] = useState(0)

  return (
    <ProductProvider>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<ProductList />} />
            <Route path='/product/new' element={<AddProduct />} />
            {/* :id 자리에 상품 번호가 들어가고, useParams()로 꺼냅니다. */}
            <Route path='/product/:id' element={<ProductDetail />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ProductProvider>
  )
}

export default App
