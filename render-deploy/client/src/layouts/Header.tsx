import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const Header = () => {
  const {totalQuantity} = useCart()
  const {currentUser, logout} = useUser()

  const isAdmin = currentUser?.role === 'admin'

  const handleAddClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if(!isAdmin) {
      e.preventDefault()
      alert('상품 등록은 관리자만 가능합니다')
    }
  }

  return(
    <div className="header">
      <h1><Link to='/'>SPACE SHOP</Link></h1>
      <nav>
        <Link to='/'>상품 목록</Link>
        <Link to='/product/new' onClick={handleAddClick}>상품 등록</Link>
        <Link to='/cart'>장바구니 ({totalQuantity})</Link>
        {isAdmin && <Link to='/admin'>관리자</Link>}
        {currentUser ? (
          <>
            <Link to='/mypage'>{currentUser.name}님</Link>
            <button onClick={logout}>로그아웃</button>
          </>
      ) : (
        <Link to='/signin'>로그인</Link>
      )
        }
      </nav>
    </div>
  )
}

export default Header;