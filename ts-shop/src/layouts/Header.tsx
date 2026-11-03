import { Link } from "react-router-dom";

const Header = () => {

  return(
    <div className="header">
      <h1><Link to='/'>SPACE SHOP</Link></h1>
      <nav>
        <Link to='/'>상품 목록</Link>
        <Link to='/product/new'>상품 등록</Link>
      </nav>
    </div>
  )
}

export default Header;