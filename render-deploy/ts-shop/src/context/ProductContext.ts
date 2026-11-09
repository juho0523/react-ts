import type { Product, NewProduct } from '../types/product'
import { createContext, useContext } from 'react'

interface ProductContextType {
    products: Product[];
    addProduct: (newProduct: NewProduct) => void;
    removeProduct: (productId: number) => void;
    updateProduct: (updateProduct: Product) => void;
}

export const ProductContext = createContext<ProductContextType | null>(null)

export const useProduct = () => {
    const context = useContext(ProductContext)
    if (!context) {
        throw new Error('useProduct는 ProductProvider 내부에서만 사용 가능합니다')
    }
    return context
}