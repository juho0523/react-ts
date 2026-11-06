import { Link } from 'react-router-dom';
import type { Product } from '../types/product';
import { useCart } from '../context/CartContext';

interface ProductCard {
  product: Product;
}

const ProductCard = ({ product }: ProductCard) => {
  const {addToCart} = useCart()

  return(
    <div className="card">
      <span>{product.category}</span>
      <h3>
        <Link to={`/product/${product.id}`}>{product.pName}</Link>
      </h3>
      <p>{product.price.toLocaleString()}원</p>
      <button 
        onClick={() => {
          addToCart(product.id, 1)
          alert(`${product.pName} 상품이 장바구니에 담겼습니다`)
        }}
      >
        담기
      </button>
    </div>
  )
}

export default ProductCard;