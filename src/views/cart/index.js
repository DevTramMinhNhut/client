import classNames from 'classnames/bind';
import style from './Cart.css';

import { Breadcrumb, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Image from '../../components/Image';
import { FcShipped } from 'react-icons/fc';
import { useState, useEffect } from 'react';

const cx = classNames.bind(style);

function Cart() {
  const [cartItem, setCartItem] = useState([]);

  // const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (cartItem) {
      let local = localStorage.getItem('cart');
      setCartItem(JSON.parse(local));
    }
  }, []);

  const addQuantity = (product_id) => {
    const exits = cartItem.find((x) => x.product_id === product_id);
    if (exits) {
      let listCart = cartItem.map((item) => {
        return item.product_id === product_id ? { ...item, qty: exits.qty + 1 } : item;
      });
      setCartItem(listCart);
      localStorage.setItem('cart', JSON.stringify(listCart));
    }
  };
  const subtractQuantity = (product_id) => {
    const exits = cartItem.find((x) => x.product_id === product_id);
    if (exits.qty !== 1) {
      let listCart = cartItem.map((item) => {
        return item.product_id === product_id ? { ...item, qty: exits.qty - 1 } : item;
      });
      setCartItem(listCart);
      localStorage.setItem('cart', JSON.stringify(listCart));
    }
  };
  const onClickDelete = (product_id) => {
    const listItemOther = cartItem.filter((item) => {
      return item.product_id !== product_id;
    });
    setCartItem(listItemOther);
    localStorage.setItem('cart', JSON.stringify(listItemOther));
  };

  return (
    <Container fluid="md">
      <div>
        <div className={cx('detail-product-breadcrumbs')}>
          <Breadcrumb>
            <Breadcrumb.Item href="#">Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Giỏ hàng</Breadcrumb.Item>
            <Breadcrumb.Item active>trầm minh nhựt</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Row className={cx('home-cart')}>
        <Col sm={8}>Giỏ hàng của bạn</Col>
        <Col sm={4}>Sản phẩm được mua nhiều nhất</Col>
      </Row>
      <Row className={cx('home-cart-content')}>
        <Col sm={8}>
          {cartItem.map((product, index) => (
            <div key={index} className={cx('home-cart-content-1')}>
              <div className={cx('home-cart-content-product')}>
                <Image
                  className={cx('home-cart-content-product-img')}
                  src="https://cdn.tgdd.vn/Products/Images/2464/210186/bhx/nuoc-giat-omo-matic-huong-comfort-tinh-dau-thom-tui-35-lit-202206140957520746_300x300.jpg"
                  alt="loi"
                />
                <div className={cx('home-cart-content-product-title')}>{product.product_name}</div>
                <div className={cx('home-cart-content-product-price')}>
                  {' '}
                  <strong>{product.product_price}</strong> <br />
                  <span className={cx('price-discount')}>99.000₫</span>
                </div>
              </div>
              <div className={cx('home-cart-content-quantity')}>
                <div className={cx('home-cart-content-quantitynum')}>
                  <button onClick={() => subtractQuantity(product.product_id)} className={cx('noselect')}>
                    -
                  </button>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" value={product.qty} />
                  </Form.Group>
                  <button onClick={() => addQuantity(product.product_id)} className={cx('noselect-1')}>
                    +
                  </button>
                </div>

                <button onClick={() => onClickDelete(product.product_id)} className={cx('delete')}>
                  Xóa
                </button>
              </div>
            </div>
          ))}

          <div className={cx('home-cart-content-2')}>
            <div className={cx('home-cart-content-2-price')}>
              <div className={cx('home-cart-content-2-price-1 mb-2')}>
                <span> Tiền hàng:</span>
                <label> 188.000₫ </label>
              </div>
              <div className={cx('home-cart-content-2-price-2 mb-2')}>
                <span> Hàng khuyến mãi:</span>
                <label> 49.000₫ </label>
              </div>
              <div className={cx('home-cart-content-2-price-3 mb-2')}>
                <span style={{ color: '#0081bd' }}>
                  {' '}
                  Phí giao hàng: <FcShipped className={cx('icon')} />
                </span>
                <label> 15.000₫ </label>
              </div>
              <div className={cx('home-cart-content-2-price-3')}>
                <span> Tổng đơn hàng:</span>
                <label> 252.000₫ </label>
              </div>
            </div>
            <Button variant="outline-dark">Mua sản phẩm</Button>
          </div>
        </Col>
        <Col sm={4}></Col>
      </Row>
    </Container>
  );
}

export default Cart;
