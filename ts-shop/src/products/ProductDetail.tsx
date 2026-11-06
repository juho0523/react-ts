import { Link, useParams } from "react-router-dom"
import { useProduct } from "../context/ProductContext"
import { useCart } from "../context/CartContext"

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>()
    const { products } = useProduct()
    const {addToCart} = useCart()

    const product = products.find((p) => p.id === Number(id))

    if (!product) {
        return (
            <section className="product-detail">
                <h2>상품을 찾을 수 없습니다.</h2>
                <Link to="/">상품 목록으로 돌아가기</Link>
            </section>
        )
    }

    return (
        <article className="product-detail">
            <Link to="/" className="product-detail_back">← 상품 목록</Link>
            <span className="product-detail_category">{product.category}</span>
            <h2>{product.pName}</h2>
            <p className="product-detail_price">{product.price.toLocaleString()}원</p>
            <p className="product-detail_desc">{product.description}</p>
            <button
                onClick={() => {
                    addToCart(product.id, 1)
                    alert(`${product.pName} 상품이 장바구니에 담겼습니다`)
                }}
            >
                장바구니
            </button>
        </article>
    )
}
export default ProductDetail