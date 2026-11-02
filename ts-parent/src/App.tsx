import './App.css'
import Header from './layouts/Header'
import ProductList from './products/ProductList'
import CartProvider from './context/CartProvider'
import Cart from './cart/Cart'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <section className="app">
        <CartProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path='/' element={<ProductList />} />
              <Route path='/cart' element={<Cart />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </section>
    </>
  )
}
export default App