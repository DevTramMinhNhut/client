import { Badge, Button, Container, Image } from 'react-bootstrap';
import classNames from 'classnames/bind';
import style from './detailProduct.css';

import { Col, Row } from 'reactstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Carousel from 'react-bootstrap/Carousel';
import { IoReloadCircleOutline } from 'react-icons/io5';
import { FcAlarmClock } from 'react-icons/fc';
import { AiFillLike } from 'react-icons/ai';
import { FcCheckmark } from 'react-icons/fc';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { NavLink, useParams } from 'react-router-dom';
import * as productApi from '../../api/product';
import * as commentApi from '../../api/comment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(style);

function DetailProduct() {
  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState();
  const images = [];
  let navigate = useNavigate();

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await productApi.get(`product?product_id=${product_id}`);
      setProduct(data.products[0]);
    };
    fetchAPI();
  }, [product_id]);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await commentApi.get(`comment`);
      setComments(data.comments);
    };
    fetchAPI();
  }, [product_id]);

  if (product.images) {
    product.images.map((item) => images.push(item.image_name));
  }

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await productApi.get(`product?limit=4&&category_id=${product.category?.category_id}`);
      setProducts(data.products);
    };
    fetchAPI();
  }, [product]);

  const [content, setContent] = useState('');
  const comment = () => {
    axios
      .post(`http://localhost:3000/comment/`, {
        comment_content: content,
        product_id: product_id,
        customer_id: 1,
      })
      .then((res) => {
        if (res) {
          toast.success('Comment success', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        if (err) {
          toast.error('Comment failed', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  const onAddCart = (product_id) => {
    let carts = [];
    const getCart = localStorage.getItem('cart');

    if (getCart) {
      carts = JSON.parse(getCart);
    }
    let exits = carts.find((x) => {
      return x.product_id === product_id;
    });
    if (exits) {
      exits.qty = exits.qty + 1;
    } else {
      carts.push({
        product_id: product.product_id,
        category_id: product.category_id,
        product_describe: product.product_describe,
        product_name: product.product_name,
        image: product.images[0]?.image_name,
        product_price: Number(product.product_price),
        provider: product.provider,
        qty: 1,
      });
    }
    localStorage.setItem('cart', JSON.stringify(carts));
    alert(`Bạn đã thêm sản phẩm ${product.product_name} vào giỏ hàng thành công`);
    navigate('/cart');
  };

  return (
    <Container fluid="md">
      <div className={cx('detail-product-breadcrumbs')}>
        {' '}
        <Breadcrumb>
          <Breadcrumb.Item href="#">Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Chi tiết sản phẩm</Breadcrumb.Item>
          <Breadcrumb.Item active>{product.product_name}</Breadcrumb.Item>
        </Breadcrumb>{' '}
      </div>
      <Row className={cx('detail-product')}>
        <Col className={cx('detail-product-image')} sm={7}>
          <div className={cx('detail-product-image-slider')}>
            <Carousel>
              {images !== []
                ? images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <Image
                        className="d-block w-100"
                        src={`http://127.0.0.1:8887//${images[index]}`}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  ))
                : 'Lỗi hình ảnh'}
            </Carousel>
          </div>
          <div className={cx('detail-product-fullimg')}> </div>
        </Col>
        <Col className={cx('detail-product-name')} sm={5}>
          <h1 className={cx('detail-product-name-title')}>{product.product_name}</h1>
          <div className={cx('detail-product-name-price')}>
            <strong>
              {' '}
              {parseInt(product.product_price).toLocaleString('vi', {
                style: 'currency',
                currency: 'VND',
              })}
            </strong>
            <span class="strike">220.000₫</span>
            <label>-19%</label>
            <span style={{ float: 'right' }}>Kho: {product.storage?.product_quantity} sản phẩm</span>
          </div>
          <div className={cx('detail-product-name-kho')}>
            <span>Đã bán: {product.storage?.product_sold} sản phẩm</span>
            <br />
            {product.storage?.product_quantity - product.storage?.product_sold !== 0 ? (
              <span>Còn lại: {product.storage?.product_quantity - product.storage?.product_sold} sản phẩm</span>
            ) : (
              <span> Hết sản phẩm </span>
            )}
          </div>
          <div className={cx('detail-product-name-mua')}>
            {product.storage?.product_quantity - product.storage?.product_sold !== 0 ? (
              <Button variant="success" onClick={() => onAddCart(product.product_id)}>
                Mua sản phẩm
              </Button>
            ) : (
              <Button variant="success" disabled>
                Mua sản phẩm
              </Button>
            )}
          </div>

          <div className={cx('detail-product-name-content')}>
            <div className={cx('detail-product-name-content-1 mb-3')}>
              <FcAlarmClock className={cx('detail-product-name-icon')} /> &ensp;
              <span>Đặt online giao tận nhà ĐÚNG GIỜ </span> &ensp;
              <FcCheckmark className={cx('detail-product-name-icon-1')} />
            </div>
            <div className={cx('detail-product-name-content-1  mb-3')}>
              <IoReloadCircleOutline className={cx('detail-product-name-icon')} /> &ensp;
              <span>Đổi, trả sản phẩm trong 7 ngày</span> &ensp;
              <FcCheckmark className={cx('detail-product-name-icon-1')} />
            </div>
            <div className={cx('detail-product-name-content-1  mb-3')}>
              <AiFillLike className={cx('detail-product-name-icon')} /> &ensp;
              <span>Bao sản phẩm chính hãng</span> &ensp;
              <FcCheckmark className={cx('detail-product-name-icon-1')} />
            </div>
          </div>
        </Col>
      </Row>
      <Row className={cx('detail-product-cungloai')}>
        <Col sm={12}>
          <div className={cx('detail-product-cungloai-title')}>Sản phẩm liên quan</div>
          <div className={cx('detail-product-cungloai-content')}>
            <Container>
              <Row>
                {products
                  ? products.map((listProduct, index) => (
                      <Col key={index}>
                        <div className={cx('home-product-discount-img')}>
                          <NavLink to={`/detail/product/${listProduct.product_id}`}>
                            <Image
                              className="d-block w-100 "
                              src={`http://127.0.0.1:8887//${listProduct.images[0]?.image_name}`}
                              alt=""
                            />
                          </NavLink>
                        </div>
                        <div className={cx('home-product-discount-name')}>
                          <NavLink
                            to={`/detail/product/${listProduct.product_id}`}
                            style={{ textDecoration: 'none', color: 'black' }}
                          >
                            {listProduct.product_name}
                          </NavLink>
                        </div>
                        <div className={cx('home-product-discount-price')}>
                          <strong>
                            {' '}
                            {parseInt(listProduct.product_price).toLocaleString('vi', {
                              style: 'currency',
                              currency: 'VND',
                            })}
                          </strong>
                          <span className={cx('home-product-discount-price-1')}>56.500₫</span>
                          <label>
                            <Badge pill className={cx('home-product-discount-price-2')}>
                              -14%
                            </Badge>
                          </label>
                        </div>
                      </Col>
                    ))
                  : ''}
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
      <Row className={cx('detail-product-thongtin')}>
        <Col sm={12}>
          <div className={cx('detail-product-thongtin-title')}>
            <span> Thông tin sản phẩm </span>
            <span style={{ float: 'right' }}> Nhà cung cấp {product.provider} </span>
          </div>
          <div className={cx('detail-product-thongtin-content')}>{product.product_describe}</div>
        </Col>
      </Row>

      <Row className={cx('detail-product-comment')}>
        <Col sm={12}>
          <div className={cx('detail-product-comment-title')}>Đánh giá sản phẩm</div>
          <div className={cx('detail-product-comment-content')}>
            <Container fluid>
              <Row>
                {comments.map((comment, index) => (
                  <Col
                    className="mb-2"
                    sm={12}
                    key={index}
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div>
                      - {comment.customer?.customer_name}: {comment.comment_content}
                    </div>
                    <div>
                      {comment.createdAt} <Button variant="danger">Xoá</Button>
                    </div>
                  </Col>
                ))}
              </Row>
            </Container>
            <FloatingLabel className="mb-2 mt-3" controlId="floatingTextarea2" label="Bình luận sản phẩm">
              <Form.Control
                onChange={(e) => setContent(e.target.value)}
                as="textarea"
                placeholder="Leave a comment here"
                cols="50"
                style={{ height: '100px' }}
              />
            </FloatingLabel>
            <Button variant="success" onClick={() => comment()}>
              Bình luận sản phẩm
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
            <ToastContainer />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DetailProduct;
