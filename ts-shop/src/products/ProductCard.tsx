import { Link } from 'react-router-dom';
import type { Product } from '../types/product';

interface ProductCard {
  product: Product;
}

const ProductCard = ({ product }: ProductCard) => {

  return(
    <div className="card">
      <span>{product.category}</span>
      <h3>
        <Link to={`/product/${product.id}`}>{product.pName}</Link>
      </h3>
      <p>{product.price.toLocaleString()}원</p>
    </div>
  )
}

export default ProductCard;