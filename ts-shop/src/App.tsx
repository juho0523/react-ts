import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './layouts/Header';
import ProductList from './products/ProductList';
import ProductProvider from './context/ProductProvider';
import ProductDetail from './products/ProductDetail';
import AddProduct from './products/AddProduct';
import CartProvider from './context/CartProvider';
import Cart from './products/Cart';
import UserProvider from './context/UserProvider';
import SignUp from './users/SignUp';
import SignIn from './users/SignIn';
import AdminPage from './admin/AdminPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <UserProvider>
    <ProductProvider>
      <CartProvider>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<ProductList />} />
            <Route path='/product/new' element={<AddProduct />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/admin' element={<AdminPage />} />
          </Routes>
        </main>
      </BrowserRouter>
      </CartProvider>
    </ProductProvider>
    </UserProvider>
  )
}

export default App
