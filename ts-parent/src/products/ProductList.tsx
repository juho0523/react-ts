import { useCart, type Product } from "../context/CartContext"

const ProductList = () => {
    const products: Product[] = [
        { id: 1, name: "무선마우스", price: 32000 },
        { id: 2, name: "키보드", price: 40000 },
        { id: 3, name: "모니터", price: 120000 },
    ]

    const {dispatch} = useCart()

    return (
        <div>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - {product.price.toLocaleString()}원
                        <button onClick={() => dispatch({ type: "ADD", product })}>담기</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default ProductList