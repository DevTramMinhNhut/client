import classNames from 'classnames/bind';
import style from './Header.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { CgSearchFound } from 'react-icons/cg';
import { BsCart2 } from 'react-icons/bs';
import Badge from 'react-bootstrap/Badge';

const cx = classNames.bind(style);

function Header() {
  return (
    <header className={cx('default-header-wrapper')}>
      {
        <div className={cx('default-header-content')}>
          <Navbar>
            <Container fluid>
              <Navbar.Brand href="#">Siêu Thị Mini</Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                  <Nav.Link href="">Trang Chủ</Nav.Link>
                  <Nav.Link href="">Liên Hệ</Nav.Link>
                  <Form className="d-flex">
                    <Form.Control type="search" placeholder="tìm kiếm sản phẩm" className="me-2" aria-label="Search" />
                    <CgSearchFound className={cx('icon-tim-kiem')} />
                  </Form>
                  <div className={cx('header-cart')}>
                    <BsCart2 className={cx('cart')} />
                    <span className={cx('header-cart-number')}>1</span>
                    <Badge bg="danger">500.000 đ</Badge>
                  </div>
                </Nav>
                <Nav>
                  <NavDropdown
                    id="header-nav-dropdown"
                    title="Xin Chào tram minh nhut"
                    menuVariant="light"
                    autoClose="outside"
                    drop="start"
                    enable-caret="true"
                  >
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                {/* <Nav className={cx('register-login')}>
                  <Nav.Link href="#deets" eventKey={2}>
                    Đăng Ký
                  </Nav.Link>
                  <Nav className="gachngang"> | </Nav>
                  <Nav.Link href="#memes">Đăng Nhập</Nav.Link>
                </Nav> */}
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      }
    </header>
  );
}

export default Header;
