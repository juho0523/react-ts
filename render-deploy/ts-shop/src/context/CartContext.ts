import type { CartItem } from '../types/cart'
import { createContext, useContext } from 'react'

// 장바구니 컨텍스트 타입 정의
interface CartContextType {
    cartItems: CartItem[];
    addToCart: (productId: number, qty: number) => void;
    updateQuantity: (productId: number, qty: number) => void;
    removeFromCart: (productId: number) => void;
    totalQuantity: number;
    totalPrice: number;
    clearCart: () => void;
}

// 장바구니 컨텍스트 생성
export const CartContext = createContext<CartContextType | null>(null)

// 장바구니 컨텍스트 커스텀 훅
export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart는 CartProvider 내부에서만 사용 가능합니다')
    }
    return context
}