import ProductCard from './ProductCard';
// import { products } from '../datas/products';
import { useProduct } from "../context/ProductContext"

const ProductList = () => {
  const {products} = useProduct()

  return(
    <div className='product-list'>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  )
}

export default ProductList;