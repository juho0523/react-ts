import type { Category, Product } from "../types/product";
import api from "./api";
interface ProductRow {
  id: number;
  p_name: string;
  category: Category;
  price: number;
  description: string;
  image?: string;  // 상품 이미지 경로 (없을 수도 있으므로 ? 선택 속성)
}

const toProduct = (row: ProductRow): Product => ({
    id: row.id,
    pName: row.p_name,
    category: row.category,
    price: row.price,
    description: row.description,
    image: row.image
})

export const getProducts = async () => {
    const response = await api.get<ProductRow[]>('/products')
    return response.data.map(toProduct)
}