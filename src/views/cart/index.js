import classNames from 'classnames/bind';
import style from './Cart.css';

import { Breadcrumb, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Image from '../../components/Image';
import { FcShipped } from 'react-icons/fc';
import { useState } from 'react';

const cx = classNames.bind(style);

function Cart() {
  const [quantity, setQuantity] = useState(1);

  function addQuantity() {
    setQuantity((quantity) => quantity + 1);
  }
  function subtractQuantity() {
    if (quantity !== 1) {
      setQuantity((quantity) => quantity - 1);
    }
  }

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
          <div className={cx('home-cart-content-1')}>
            <div className={cx('home-cart-content-product')}>
              <Image
                className={cx('home-cart-content-product-img')}
                src="https://cdn.tgdd.vn/Products/Images/2464/210186/bhx/nuoc-giat-omo-matic-huong-comfort-tinh-dau-thom-tui-35-lit-202206140957520746_300x300.jpg"
                alt="loi"
              />
              <div className={cx('home-cart-content-product-title')}>
                Nước giặt OMO Matic cửa trên hương Comfort tinh dầu thơm giúp quần áo sạch bẩn thơm lâu túi 3.5 lít
              </div>
              <div className={cx('home-cart-content-product-price')}>
                {' '}
                <strong>49.000₫</strong> <br />
                <span className={cx('price-discount')}>99.000₫</span>
              </div>
            </div>
            <div className={cx('home-cart-content-quantity')}>
              <div className={cx('home-cart-content-quantitynum')}>
                <button onClick={subtractQuantity} className={cx('noselect')}>
                  -
                </button>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control type="type" min="0" max="50" value={quantity} placeholder="0" />
                </Form.Group>
                <button onClick={addQuantity} className={cx('noselect-1')}>
                  +
                </button>
              </div>

              <Link to="#" className={cx('delete')}>
                Xóa
              </Link>
            </div>
          </div>

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
