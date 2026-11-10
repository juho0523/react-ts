// 카테고리 타입 정의
export type Category = "마우스" | "키보드" | "모니터" | "주변기기";

// 상품 타입 정의
export interface Product {
  id: number;
  pName: string;
  category: Category;
  price: number;
  description: string;
  image?: string;  // 상품 이미지 경로 (없을 수도 있으므로 ? 선택 속성)
}

// 상품 등록 시 입력받는 값
// id는 자동으로 부여되므로 제외
export type NewProduct = Omit<Product, "id">;

// 상품 등록 폼 입력값 타입
export interface ProductForm{
    pName: string,
    category: Category,
    price: number,
    description: string
}