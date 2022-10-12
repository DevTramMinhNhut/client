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
import { useEffect, useState, useRef, useContext } from 'react';
import Image from '../../../Image';
import { Link, useNavigate } from 'react-router-dom';
import useDebounce from '../../../../hooks/useDebounce';

//icon
import { BsCart2 } from 'react-icons/bs';
import { CgSearchFound } from 'react-icons/cg';
import { IoMicOutline } from 'react-icons/io5';

import * as search from '../../../../api/search';

//
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button } from 'react-bootstrap';

//components
import ModalLogin from '../../../ModalLogin/index.js';
import { checkCart } from '../index';

const cx = classNames.bind(style);

function Header() {
  const checkCartButton = useContext(checkCart);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [speech, setSpeech] = useState(false);

  const [kqtimkiem, setKqtimkiem] = useState([]);
  const [showKq, setShowKq] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const [showModal, setShowModal] = useState(false);

  const checkSpeechOn = () => {
    setSpeech(true);
  };
  const checkSpeechOff = () => {
    resetTranscript();
    setSpeech(false);
  };
  // eslint-disable-next-line
  const [content, setContent] = useState(null);

  useEffect(() => {
    setContent(transcript);
  }, [transcript]);

  // user
  const [isUser, setIsUser] = useState({});
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    let author = JSON.parse(localStorage.getItem('author'));
    let userFb = JSON.parse(localStorage.getItem('authorFb'));
    let userGoogle = JSON.parse(localStorage.getItem('authorGoogle'));
    if (author) {
      setIsUser(author);
      setCurrentUser(true);
    }
    if (userFb) {
      setIsUser(userFb);
      setCurrentUser(true);
    }
    if (userGoogle) {
      setIsUser(userGoogle);
      setCurrentUser(true);
    }
    // eslint-disable-next-line no-use-before-define
  }, [currentUser, showModal]);

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
  // eslint-disable-next-line no-unused-vars
  const [cartItem, setCartItem] = useState([]);
  const [cartItemTotal, setCartItemTotal] = useState(0);

  let total = 0;
  useEffect(() => {
    const checkCart = async () => {
      const cartItemCheck = await JSON.parse(localStorage.getItem('cart'));
      setCartItem(cartItemCheck);
      setCartItemSumQty(cartItemCheck.length);
      // eslint-disable-next-line array-callback-return
      cartItemCheck.map((item) => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        total += item.product_price;
      });
      setCartItemTotal(total);
    };
    checkCart();
  }, [checkCartButton]);

  const handleShow = () => setShowModal(true);

  const navigate = useNavigate();
  const goToPosts = async (event) => {
    event.preventDefault();
    navigate({
      pathname: '/search/product/',
      search: `name=${searchValue ? searchValue : transcript}`,
    });
  };

  const logOut = () => {
    localStorage.removeItem('author');
    localStorage.removeItem('authorFb');
    localStorage.removeItem('authorGoogle');
  };

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
              <HeadlessTippy
                visible={showKq && kqtimkiem.length > 0}
                interactive
                render={(attrs) => (
                  <div className={cx('timkiem-ketqua')} tabIndex="-1" {...attrs}>
                    {kqtimkiem.map((result, index) => (
                      <Link
                        onClick={() => setShowKq(false)}
                        to={`/detail/product/${result.product_id}`}
                        key={index}
                        className={cx('timkiem-ketqua-content')}
                      >
                        <Image
                          className={cx('timkiem-ketqua-img')}
                          src={`http://127.0.0.1:8887//${result.images[0]?.image_name}`}
                          alt="loi"
                        />
                        <div className={cx('timkiem-ketqua-name')}>
                          <h6 className={cx('timkiem-ketqua-name-product')}> {result.product_name} </h6>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                onClickOutside={handleHidenKq}
              >
                <Form className="d-flex" onSubmit={goToPosts}>
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

                  <div type="submit" onClick={goToPosts} className={cx('div-icon-tim-kiem')}>
                    <CgSearchFound className={cx('icon-tim-kiem')} />
                  </div>
                </Form>
              </HeadlessTippy>
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
                      <Badge bg="danger">
                        {cartItemTotal.toLocaleString('vi', {
                          style: 'currency',
                          currency: 'VND',
                        })}{' '}
                      </Badge>
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
                  active="true"
                  enable-caret="true"
                >
                  <NavDropdown.Item href="#action/3.1">Thông tin cá nhân</NavDropdown.Item>
                  <NavDropdown.Item href="/cart">Giỏ hàng</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Đơn hàng</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/" onClick={logOut}>
                    Thoát
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav className={cx('register-login')}>
                <Nav.Link className={cx('register-login-dk')} href="./register" eventKey={2}>
                  Đăng Ký
                </Nav.Link>
                <Nav className="gachngang"> | </Nav>
                <Nav.Link onClick={handleShow} className={cx('register-login-login')}>
                  {' '}
                  Đăng Nhập
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showModal ? <ModalLogin setShowModal={setShowModal} /> : <></>}
    </header>
  );
}
export default Header;
