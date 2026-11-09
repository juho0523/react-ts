import type { Category } from "../types/product";
import { useProduct } from "../context/ProductContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 상품 등록 폼 데이터 타입 정의
interface ProductForm {
  pName: string;
  category: Category;
  price: number;
  description: string;
}

// 초기 폼 데이터
const initialForm: ProductForm = {
  pName: "",
  category: "마우스",
  price: 0,
  description: "",
};

const AddProduct = () => {
  const {addProduct} = useProduct();
  const [form, setForm] = useState<ProductForm>(initialForm);
  const [error, setError] = useState<string | null>(null);

  // 폼 데이터 구조 분해 할당
  const {pName, category, price, description} = form;
  const navigate = useNavigate();

  // 입력값 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 유효성 검사
    if(!pName.trim()){
      setError("상품명을 입력해주세요.");
      return;
    }
    if(!price || price <= 0){
      setError("가격을 올바르게 입력해주세요.");
      return;
    }
    if(!description.trim()){
      setError("설명을 입력해주세요.");
      return;
    }

    // 상품 추가
    addProduct({
      pName, 
      category, 
      price: Number(price), 
      description
    });
    alert("상품이 등록되었습니다.");
    // 상품 목록 페이지로 이동
    navigate('/');
  }

  // 폼 초기화 핸들러
  const handleCancel = () => {
    setForm(initialForm);
    setError(null);
  };

  return (
    <div className="product-add"> 
      <h2>상품 등록</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pName">상품명:</label>
          <input
            type="text"
            id="pName"
            name="pName"
            value={pName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">카테고리:</label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleChange}
          >
            <option value="마우스">마우스</option>
            <option value="키보드">키보드</option>
            <option value="모니터">모니터</option>
            <option value="주변기기">주변기기</option>
          </select>
        </div>
        <div>
          <label htmlFor="price">가격:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">설명:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </div>
        {error && <p className="product-add_error">{error}</p>}
        <div className="product-add_buttons">
          <button type="submit">등록</button>
          <button type="button" onClick={handleCancel}>취소</button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct