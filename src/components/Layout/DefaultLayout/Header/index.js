import classNames from 'classnames/bind';
import style from './Header.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Badge from 'react-bootstrap/Badge';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { useEffect, useState, useRef } from 'react';
import Image from '../../../Image';
import { Link } from 'react-router-dom';
import useDebounce from '../../../../hooks/useDebounce';

//icon
import { BsCart2 } from 'react-icons/bs';
import { CgSearchFound } from 'react-icons/cg';
import { IoMicOutline } from 'react-icons/io5';

import * as search from '../../../../api/search';

//
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button } from 'react-bootstrap';

const cx = classNames.bind(style);

function Header() {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [speech, setSpeech] = useState(false);

  const checkSpeechOn = () => {
    setSpeech(true);
  };
  const checkSpeechOff = () => {
    resetTranscript();
    setSpeech(false);
  };
  const [content, setContent] = useState(null);

  useEffect(() => {
    setContent(transcript);
  }, [transcript]);

  console.log(content);
  // user
  const [isUser, setIsUser] = useState({});
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('author'));
    if (user) {
      setIsUser(user);
      setCurrentUser(true);
    }
  }, []);

  const [kqtimkiem, setKqtimkiem] = useState([]);
  const [showKq, setShowKq] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const inputRef = useRef();
  const debounced = useDebounce(searchValue, 400);

  useEffect(() => {
    if (!debounced.trim()) {
      setKqtimkiem([]);
      return;
    }

    const fetchApi = async () => {
      const result = await search.search(debounced);
      setKqtimkiem(result);
    };
    fetchApi();
  }, [debounced]);

  const handleHidenKq = () => {
    setShowKq(false);
  };

  //Cart

  const [cartItemSumQty, setCartItemSumQty] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  const [cartItemTotal, setCartItemTotal] = useState();

  useEffect(() => {
    setInterval(() => {
      const cartItem = JSON.parse(localStorage.getItem('cart'));
      setCartItem(cartItem);
    }, 100);
  }, []);
  useEffect(() => {
    let total = 0;
    if (cartItem) {
      setCartItemSumQty(cartItem.length);
      cartItem.map((item) => (total += item.product_price));
      console.log(total);
      setCartItemTotal(total);
    } else {
      setCartItemSumQty(0);
      setCartItemTotal(total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItem]);

  return (
    <header className={cx('default-header-wrapper')}>
      <Navbar style={{ width: '100%' }}>
        <Container fluid>
          <Navbar.Brand className={cx('default-header-wrapper-tile')} href="#">
            Siêu Thị Mini
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0">
              <Nav.Link className={cx('header-link')} href="">
                Trang Chủ
              </Nav.Link>
              <Nav.Link className={cx('header-link')} href="">
                Giới Thiệu
              </Nav.Link>
              <Nav.Link className={cx('header-link')} href="">
                Liên Hệ
              </Nav.Link>
              <Nav.Link className={cx('header-link')} href="">
                Hổ Trợ
              </Nav.Link>
              <Nav.Link>
                <HeadlessTippy
                  visible={showKq && kqtimkiem.length > 0}
                  interactive
                  render={(attrs) => (
                    <div className={cx('timkiem-ketqua')} tabIndex="-1" {...attrs}>
                      {kqtimkiem.map((result) => (
                        <Link to={`/@${result.nickname}`} key={result.id} className={cx('timkiem-ketqua-content')}>
                          <Image className={cx('timkiem-ketqua-img')} src={result.avatar} alt="loi" />
                          <div className={cx('timkiem-ketqua-name')}>
                            <h6 className={cx('timkiem-ketqua-name-product')}> {result.full_name} </h6>
                          </div>
                        </Link>
                      ))}
                      <div className={cx('timkiem-ketqua-content')}>
                        <Image
                          className={cx('timkiem-ketqua-img')}
                          src="https://cdn.tgdd.vn/Products/Images/8788/245528/bhx/dua-hau-giong-my-tui-2kg-202107101612531155.jpg"
                          alt="loi"
                        />
                        <div className={cx('timkiem-ketqua-name')}>
                          <h6 className={cx('timkiem-ketqua-name-product')}> Dưa hấu </h6>
                        </div>
                      </div>
                    </div>
                  )}
                  onClickOutside={handleHidenKq}
                >
                  <Form className="d-flex">
                    <Form.Control
                      className={cx('default-header-wrapper-search me-2')}
                      ref={inputRef}
                      type="search"
                      defaultValue={transcript}
                      placeholder="Tìm kiếm sản phẩm"
                      aria-label="Search"
                      onChange={(e) => setSearchValue(e.target.value)}
                      onFocus={() => setShowKq(true)}
                    />
                    <Tippy content="Tìm kiếm">
                      <div className={cx('div-icon-tim-kiem')}>
                        <CgSearchFound className={cx('icon-tim-kiem')} />
                      </div>
                    </Tippy>
                  </Form>
                </HeadlessTippy>
              </Nav.Link>
              <Nav.Link className={cx('icon-mic')}>
                {speech === false ? (
                  <Button
                    size="sm"
                    variant="outline-dark"
                    onClick={() => {
                      SpeechRecognition.startListening();
                      checkSpeechOn();
                    }}
                  >
                    <Tippy content="Mic">
                      <div>
                        <IoMicOutline size={35} color={'white'} />
                      </div>
                    </Tippy>
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => {
                      checkSpeechOff();
                      SpeechRecognition.stopListening();
                    }}
                  >
                    <Tippy content="Mic">
                      <div>
                        <IoMicOutline size={35} color={'white'} />
                      </div>
                    </Tippy>
                  </Button>
                )}
              </Nav.Link>

              <Nav.Link>
                <Link to="/cart">
                  <Tippy content="Giỏ Hàng">
                    <div className={cx('header-cart')}>
                      <BsCart2 size={38} color={'white'} />
                      <span className={cx('header-cart-number')}>{cartItemSumQty}</span>
                      <Badge bg="danger">{cartItemTotal} đ</Badge>
                    </div>
                  </Tippy>
                </Link>
              </Nav.Link>
            </Nav>
            {currentUser ? (
              <Nav>
                <NavDropdown
                  id="header-nav-dropdown"
                  title={`Xin chào ${isUser.username}`}
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
            ) : (
              <Nav className={cx('register-login')}>
                <Nav.Link className={cx('register-login-dk')} href="./register" eventKey={2}>
                  Đăng Ký
                </Nav.Link>
                <Nav className="gachngang"> | </Nav>
                <Nav.Link className={cx('register-login-login')} href="./login">
                  Đăng Nhập
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
