import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useProduct } from "../context/ProductContext"

const Cart = () => {
    const {
        cartItems,
        updateQuantity,
        removeFromCart,
        totalQuantity,
        totalPrice,
        clearCart
    } = useCart()
    const { products } = useProduct()

    const handleClearCart = () => {
        if (window.confirm('정말로 장바구니를 비우시겠습니까')) {
            clearCart()
        }
    }

    const handleOrder = () => {
        console.log(cartItems)
    }

    return (
        <section className="cart">
            <h2>장바구니</h2>
            {cartItems.length === 0 ? (
                <p className="cart_empty">장바구니가 비어 있습니다</p>
            ) : (
                <div>
                    <ul className="cart_list">
                        {cartItems.map((item) => {
                            const product = products.find((p) => p.id === item.productId)
                            return (
                                <li key={item.productId} className="cart_item">
                                    <div className="cart_info">
                                        <span className="cart_category">{product?.category}</span>
                                        <Link to={`/product/${product?.id}`}>{product?.pName}</Link>
                                    </div>
                                    <div className="cart_quantity">
                                        <button
                                            onClick={() => updateQuantity(item.productId, item.qty - 1)}
                                            disabled={item.qty <= 1}>
                                            -
                                        </button>
                                        <span>{item.qty}</span>
                                        <button
                                            onClick={() => updateQuantity(item.productId, item.qty + 1)}
                                            disabled={item.qty <= 1}>
                                            +
                                        </button>
                                    </div>
                                    <strong className="cart_subtotal">
                                        {product ? (product.price * item.qty).toLocaleString() : 0}원
                                    </strong>
                                    <button
                                        className="cart_remove"
                                        onClick={() => removeFromCart(item.productId)}>
                                        삭제
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                    <div className="cart_summary">
                        <span>총 {totalQuantity}개</span>
                        <strong>{totalPrice.toLocaleString()}원</strong>
                    </div>
                    <div className="cart_buttons">
                        <button className="cart_clear" onClick={handleClearCart}>전체 비우기</button>
                        <Link to='/' className="cart_link">쇼핑 계속하기</Link>
                    </div>
                    <button
                        className="cart_order"
                        onClick={handleOrder}>
                        주문하기
                    </button>
                </div>
            )}
        </section>
    )
}
export default Cart