import { useCart } from "../context/CartContext"

const Cart = () => {
    const {cart, dispatch, totalPrice} = useCart()

    if(cart.length === 0) return <p>장바구니가 비어 있습니다</p>


    return (
        <div>
            <h3>장바구니</h3>
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>
                        {item.name} × {item.qty}
                        <button onClick={() => dispatch({ type: "REMOVE", id: item.id})}>삭제</button>
                    </li>
                ))}
            </ul>
            <p>총액: {totalPrice.toLocaleString()}원</p>
        </div>
    )
}
export default Cart