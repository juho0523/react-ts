import { useState } from "react"
import { type CartItem } from "../types/cart"
import { useProduct } from "./ProductContext"
import { CartContext } from "./CartContext"

const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const { products } = useProduct()

    const addToCart = (productId: number, qty: number) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.productId === productId)
            if (existingItem) {
                return prevItems.map((item) =>
                    item.productId === productId
                        ? { ...item, qty: item.qty + qty }
                        : item
                )
            } else {
                return [...prevItems, { productId, qty }]
            }
        })
    }

    const updateQuantity = (productId: number, qty: number) => {
        setCartItems((prevItems) => 
        prevItems.map((item) =>
        item.productId === productId ? {...item, qty} : item))
    }

    const removeFromCart = (productId: number) => {
        setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId))
    }

    const totalQuantity = cartItems.reduce((sum, item) => sum + item.qty, 0)

    const totalPrice = cartItems.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.productId)
        return sum + (product ? product.price * item.qty : 0)
    }, 0)

    const clearCart = () => {
        setCartItems([])
    }


    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            updateQuantity,
            removeFromCart,
            totalPrice,
            totalQuantity,
            clearCart}
        }>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider