import { Link } from "react-router-dom"
import { useProduct } from "../context/ProductContext"
import { useUser } from "../context/UserContext"

const AdminPage = () => {
    const { products } = useProduct()
    const { users, currentUser } = useUser()

    if (currentUser?.role !== 'admin') {
        return (
            <div className="admin-page">
                <p>관리자만 접근할 수 있습니다</p>
                <Link to='/signup'>로그인</Link>
            </div>
        )
    }

    const adminCount = users.filter((user) => user.role === 'admin').length

    const totalPrice = products.reduce((sum, product) => sum + product.price, 0)

    const avgPrice = products.length > 0 ? Math.round(totalPrice / products.length) : 0

    const recentProducts = [...products]
        .sort((a, b) => b.id - a.id)
        .slice(0, 5)


    return (
        <div className="admin-page">
            <div className="admin-header">
                <h2>관리자 대시보드</h2>
                {/* 빠른 메뉴 */}
                <div className="admin-menu">
                    <Link to='/product/new' className="admin-btn admin-btn_primary">상품 등록</Link>
                    <Link to='/' className="admin-btn">상품 목록</Link>
                </div>
            </div>
            {/* 요약 카드 */}
            <div className="admin-cards">
                <div className="admin-card">
                    <p>전체 상품</p>
                    <strong>{products.length}개</strong>
                </div>
                <div className="admin-card">
                    <p>전체 회원</p>
                    <strong>{users.length}명</strong>
                </div>
                <div className="admin-card">
                    <p>관리자</p>
                    <strong>{adminCount}명</strong>
                </div>
                <div className="admin-card">
                    <p>평균 상품 가격</p>
                    <strong>{avgPrice.toLocaleString()}원</strong>
                </div>
            </div>

            <h3>최근 등록 상품</h3>
            <div className="admin-table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>상품명</th>
                            <th>카테고리</th>
                            <th className="admin-num">가격</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentProducts.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.pName}</td>
                                <td>{product.category}</td>
                                <td className="admin-num">{product.price.toLocaleString()}원</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h3>회원 목록</h3>
            <div className="admin-table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>아이디</th>
                            <th>이름</th>
                            <th>이메일</th>
                            <th>권한</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === "admin" ? "관리자" : "일반회원"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default AdminPage