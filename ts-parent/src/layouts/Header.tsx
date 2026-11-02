import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  // useCart 커스텀 훅을 사용하여 totalCount를 가져옴
  const {totalCount} = useCart();

  return(
    <header className="header">
      <Link to='/'>SPACE SHOP</Link>
      <Link to='/'>상품 목록</Link>
      <Link to='/cart'>장바구니({totalCount})</Link>
    </header>
  )
}

export default Header;