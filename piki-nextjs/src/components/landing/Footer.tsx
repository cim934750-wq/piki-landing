export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <a href="#" className="logo">PIKI<span className="logo-dot">.</span></a>
            <p>광고비 낭비를 줄이는 전환 시스템 전문</p>
          </div>
          <div className="footer-links">
            <a href="#system">시스템</a>
            <a href="#services">서비스</a>
            <a href="#metrics">데이터</a>
            <a href="#pricing">가격</a>
            <a href="#contact">문의</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 PIKI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
