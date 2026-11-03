import { useState } from "react"
import { ProductContext } from "./ProductContext"
import type { Product, NewProduct } from "../types/product"
import { initialProducts } from "../datas/products"


const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<Product[]>(initialProducts)

    const addProduct = (newPorduct: NewProduct) => {
        const product: Product = { ...newPorduct, id: Date.now() }
        setProducts([...products, product])
    }

    const removeProduct = (productId: number) => {
        setProducts(products.filter((product) => product.id !== productId))
    }

    const updateProduct = (updateProduct: Product) => {
        setProducts(products.map((product) =>
            product.id === updateProduct.id ? updateProduct : product
        ))
    }


    return (
        <ProductContext.Provider value={{products, addProduct, removeProduct, updateProduct}}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider