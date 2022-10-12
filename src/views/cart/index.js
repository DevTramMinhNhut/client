import classNames from 'classnames/bind';
import style from './Cart.css';

import { Breadcrumb, Button, Col, Container, Form, Row } from 'react-bootstrap';
import Image from '../../components/Image';
import { FcShipped } from 'react-icons/fc';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onClickCheckCart } from '../../components/Layout/DefaultLayout/index';
const cx = classNames.bind(style);

function Cart() {
  const checkCartButton = useContext(onClickCheckCart);
  const [cartItem, setCartItem] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cartItem) {
      let local = localStorage.getItem('cart');
      setCartItem(JSON.parse(local));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let sumCart = 0;
    cartItem.map(
      (item) =>
        (sumCart += (item.product_price - (item.discount_percent / 100) * item.product_price) * item.qty + 15000),
    );
    if (sumCart !== 0) {
      setTotal(sumCart);
    }
  }, [total, cartItem]);

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

  let detailCart = [];

  const addCartApi = () => {
    const agreeDelete = window.confirm(`Bạn có muốn mua sản phẩm không ??`);
    if (agreeDelete) {
      // for (let i = 0; i <= cartItem.length - 1; i++) {
      // eslint-disable-next-line array-callback-return
      cartItem.map((item) => {
        detailCart = [
          ...detailCart,
          {
            product_id: item.product_id,
            detail_quantity: item.qty,
            detail_price: item.discount_percent > 0 ? item.product_price * item.discount_percent : item.product_price,
          },
        ];
      });
      // }
    }
    console.log(detailCart);
    // axios
    //   .post(`http://localhost:3000/order/`, {
    //     customer_id: 1,
    //     order_total: total,
    //     order_payment: 'Trực Tiếp',
    //     detail_quantity: item.qty,
    //     detail_price: item.discount_percent > 0 ? item.product_price * item.discount_percent : item.product_price,
    //     product_id: item.product_id,
    //   })
    //   .then((res) => {
    //     toast('Create orders success', {
    //       position: 'top-right',
    //       autoClose: 2000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: false,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //     setTimeout(() => {
    //       // navigate('/categories/');
    //     }, 3000);
    //   })
    //   .catch((err) => {
    //     toast.error('Create order failed');
    //   });
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
                  src={`http://127.0.0.1:8887//${product.image}`}
                  alt="loi"
                />
                <div className={cx('home-cart-content-product-title')}>{product.product_name}</div>
                <div className={cx('home-cart-content-product-price')}>
                  {product.discount_percent > 0 ? (
                    <>
                      <strong>
                        {(
                          (product.product_price - (product.discount_percent * product.product_price) / 100) *
                          product.qty
                        ).toLocaleString('vi', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </strong>
                      <br />
                      <span className={cx('price-discount')}>
                        {' '}
                        {(product.product_price * product.qty).toLocaleString('vi', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </span>
                    </>
                  ) : (
                    <>
                      <strong>
                        {(product.product_price * product.qty).toLocaleString('vi', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </strong>
                      <br />
                    </>
                  )}
                </div>
              </div>
              <div className={cx('home-cart-content-quantity')}>
                <div className={cx('home-cart-content-quantitynum')}>
                  <button onClick={() => subtractQuantity(product.product_id)} className={cx('noselect')}>
                    -
                  </button>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" value={product.qty} readOnly />
                  </Form.Group>
                  <button onClick={() => addQuantity(product.product_id)} className={cx('noselect-1')}>
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    onClickDelete(product.product_id);
                    checkCartButton();
                  }}
                  className={cx('delete')}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}

          <div className={cx('home-cart-content-2')}>
            <div className={cx('home-cart-content-2-price')}>
              <div className={cx('home-cart-content-2-price-3 mb-2')}>
                <span style={{ color: '#0081bd' }}>
                  {' '}
                  Phí giao hàng: <FcShipped className={cx('icon')} />
                </span>
                <label> 15.000₫ </label>
              </div>
              <div className={cx('home-cart-content-2-price-3')}>
                <span> Tổng đơn hàng:</span>
                <label>
                  {' '}
                  {total.toLocaleString('vi', {
                    style: 'currency',
                    currency: 'VND',
                  })}{' '}
                </label>
              </div>
            </div>
            <Button variant="outline-dark" onClick={addCartApi}>
              Mua sản phẩm
            </Button>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover={false}
            />
          </div>
        </Col>
        <Col sm={4}></Col>
      </Row>
    </Container>
  );
}

export default Cart;
