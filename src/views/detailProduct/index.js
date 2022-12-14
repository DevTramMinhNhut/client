import { Badge, Button, Container, Image } from 'react-bootstrap';
import classNames from 'classnames/bind';
import style from './detailProduct.css';

import { Col, Row } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Carousel from 'react-bootstrap/Carousel';
import { IoReloadCircleOutline } from 'react-icons/io5';
import { FcAlarmClock } from 'react-icons/fc';
import { AiFillDelete, AiFillLike, AiFillStar } from 'react-icons/ai';
import { FcCheckmark } from 'react-icons/fc';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { NavLink, useParams } from 'react-router-dom';
import * as productApi from '../../api/product';
import * as commentApi from '../../api/comment';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { IoStorefrontOutline } from 'react-icons/io5';
import { onClickCheckCart } from '../../components/Layout/DefaultLayout/index';

const cx = classNames.bind(style);

function DetailProduct() {
  const checkCartButton = useContext(onClickCheckCart);
  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState();
  const [idAccount, setIdAccount] = useState();
  const [checkComment, setCheckComment] = useState(false);
  const [starComment, setStarComment] = useState(1);

  const images = [];

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
      const data = await commentApi.get(`comment?product_id=${product_id}`);
      setComments(data.comments);
    };
    fetchAPI();
  }, [product_id, checkComment]);

  useEffect(() => {
    const local = async () => {
      const data = await localStorage.getItem('author');
      if (data) {
        setIdAccount(JSON.parse(data));
      }
    };
    local();
  }, []);

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
        customer_id: idAccount?.id,
        comment_star: starComment,
      })
      .then((res) => {
        if (res) {
          toast.success('B???n ???? b??nh lu??n s???n ph???m th??nh c??ng', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          setCheckComment(!checkComment);
        }
      })
      .catch((err) => {
        if (err) {
          toast.error('Vui l??ng ????ng nh???p ????? b??nh lu???n', {
            position: 'top-right',
            autoClose: 1000,
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
        storage: Number(product.storage.product_quantity - product.storage.product_sold),
        qty: 1,
      });
    }
    localStorage.setItem('cart', JSON.stringify(carts));
    toast.success(`B???n ???? th??m s???n ph???m ${product.product_name} v??o gi??? h??ng th??nh c??ng`, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  const deleteComment = (comment_id) => {
    const arrayComments = [];
    comments.forEach((item) => {
      if (item.comment_id === comment_id && item.customer_id === idAccount.id) {
        arrayComments.push(item);
      }
    });
    if (arrayComments.length > 0) {
      const agreeDelete = window.confirm(`B???n c?? mu???n x??a b??nh lu???n n??y kh??ng ??`);
      if (agreeDelete) {
        axios.delete(`http://localhost:3000/comment/${comment_id}`);
        setCheckComment(!checkComment);
      }
    } else {
      toast.error('B???n c???n ????ng nh???p ho???c c?? quy???n ????? xo?? b??nh lu???n n??y', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Container fluid="md">
      <div className={cx('detail-product-breadcrumbs')}>
        {' '}
        <Breadcrumb>
          <Breadcrumb.Item>
            {' '}
            <NavLink as="li" to="/">
              Trang ch???{' '}
            </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#">Chi ti???t s???n ph???m</Breadcrumb.Item>
          <Breadcrumb.Item>{product.product_name}</Breadcrumb.Item>
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
                : 'L???i h??nh ???nh'}
            </Carousel>
          </div>
          <div className={cx('detail-product-fullimg')}> </div>
        </Col>
        <Col className={cx('detail-product-name')} sm={5}>
          <h1 className={cx('detail-product-name-title')}>{product.product_name}</h1>
          <div className={cx('detail-product-name-price')}>
            {product.discount ? (
              <>
                <strong>
                  {' '}
                  {(
                    product.product_price -
                    (product.product_price * product.discount?.discount_percent) / 100
                  ).toLocaleString('vi', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </strong>
                <span className="strike">
                  {product.product_price.toLocaleString('vi', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </span>
                <label> {product.discount.discount_percent}%</label>
              </>
            ) : (
              <>
                <strong>
                  {parseInt(product.product_price).toLocaleString('vi', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </strong>
              </>
            )}

            <span style={{ float: 'right' }}>
              <IoStorefrontOutline size={22} /> {product.storage?.product_quantity} s???n ph???m
            </span>
          </div>
          <div className={cx('detail-product-name-kho')}>
            <span>???? b??n: {product.storage?.product_sold} s???n ph???m</span>
            <br />
            {product.storage?.product_quantity - product.storage?.product_sold !== 0 ? (
              <span>C??n l???i: {product.storage?.product_quantity - product.storage?.product_sold} s???n ph???m</span>
            ) : (
              <span> H???t s???n ph???m </span>
            )}
          </div>
          <div className={cx('detail-product-name-mua')}>
            {product.storage?.product_quantity - product.storage?.product_sold !== 0 ? (
              <Button
                variant="success"
                onClick={() => {
                  checkCartButton();
                  onAddCart(product.product_id);
                }}
              >
                Mua s???n ph???m
              </Button>
            ) : (
              <Button variant="success" disabled>
                Mua s???n ph???m
              </Button>
            )}
          </div>

          <div className={cx('detail-product-name-content')}>
            <div className={cx('detail-product-name-content-1 mb-3')}>
              <FcAlarmClock className={cx('detail-product-name-icon')} /> &ensp;
              <span>?????t online giao t???n nh?? ????NG GI??? </span> &ensp;
              <FcCheckmark className={cx('detail-product-name-icon-1')} />
            </div>
            <div className={cx('detail-product-name-content-1  mb-3')}>
              <IoReloadCircleOutline className={cx('detail-product-name-icon')} /> &ensp;
              <span>?????i, tr??? s???n ph???m trong 7 ng??y</span> &ensp;
              <FcCheckmark className={cx('detail-product-name-icon-1')} />
            </div>
            <div className={cx('detail-product-name-content-1  mb-3')}>
              <AiFillLike className={cx('detail-product-name-icon')} /> &ensp;
              <span>Bao s???n ph???m ch??nh h??ng</span> &ensp;
              <FcCheckmark className={cx('detail-product-name-icon-1')} />
            </div>
          </div>
        </Col>
      </Row>
      <Row className={cx('detail-product-cungloai')}>
        <Col sm={12} className="mt-2 mb-3">
          <div className={cx('detail-product-cungloai-title')}>S???n ph???m li??n quan</div>
          <div className={cx('detail-product-cungloai-content')}>
            <Container>
              <Row>
                {products
                  ? products.map((listProduct, index) => (
                      <Col key={index}>
                        <div className={cx('home-product-discount-img')}>
                          <NavLink as="li" to={`/detail/product/${listProduct.product_id}`}>
                            <Image
                              className="d-block w-100 "
                              src={`http://127.0.0.1:8887//${listProduct.images[0]?.image_name}`}
                              alt=""
                            />
                          </NavLink>
                        </div>
                        <div className={cx('home-product-discount-name')}>
                          <NavLink
                            as="li"
                            to={`/detail/product/${listProduct.product_id}`}
                            style={{ textDecoration: 'none', color: 'black' }}
                          >
                            {listProduct.product_name}
                          </NavLink>
                        </div>
                        <div className={cx('home-product-discount-price')}>
                          {listProduct.discount ? (
                            <>
                              <strong>
                                {' '}
                                {(
                                  listProduct.product_price -
                                  (listProduct.product_price * listProduct.discount?.discount_percent) / 100
                                ).toLocaleString('vi', {
                                  style: 'currency',
                                  currency: 'VND',
                                })}
                              </strong>
                              <span className={cx('home-product-discount-price-1')}>
                                {' '}
                                {parseInt(listProduct.product_price).toLocaleString('vi', {
                                  style: 'currency',
                                  currency: 'VND',
                                })}
                              </span>
                              <label>
                                <Badge pill className={cx('home-product-discount-price-2')}>
                                  {listProduct.discount?.discount_percent}%
                                </Badge>
                              </label>
                            </>
                          ) : (
                            <>
                              <strong>
                                {' '}
                                {parseInt(listProduct.product_price).toLocaleString('vi', {
                                  style: 'currency',
                                  currency: 'VND',
                                })}
                              </strong>
                            </>
                          )}
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
        <Col sm={12} className="mt-2 mb-3">
          <div className={cx('detail-product-thongtin-title')}>
            <span> Th??ng tin s???n ph???m </span>
            <span style={{ float: 'right' }}> Nh?? cung c???p {product.provider} </span>
          </div>
          <div className={cx('detail-product-thongtin-content')}>{product.product_describe}</div>
        </Col>
      </Row>

      <Row className={cx('detail-product-comment')}>
        <Col sm={12}>
          <div className={cx('detail-product-comment-title')}>????nh gi?? s???n ph???m</div>
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
                      <div style={{ color: 'Yellow', fontSize: '20px' }}>
                        {comment.comment_star === 1 ? <AiFillStar /> : ''}
                        {comment.comment_star === 2 ? (
                          <>
                            {' '}
                            <AiFillStar /> <AiFillStar />{' '}
                          </>
                        ) : (
                          ''
                        )}
                        {comment.comment_star === 3 ? (
                          <>
                            {' '}
                            <AiFillStar /> <AiFillStar /> <AiFillStar />{' '}
                          </>
                        ) : (
                          ''
                        )}

                        {comment.comment_star === 4 ? (
                          <>
                            {' '}
                            <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar />{' '}
                          </>
                        ) : (
                          ''
                        )}
                        {comment.comment_star === 5 ? (
                          <>
                            {' '}
                            <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar />{' '}
                          </>
                        ) : (
                          ''
                        )}
                      </div>
                      <span style={{ fontSize: '16px', fontWeight: '600 ' }}>
                        {' '}
                        {comment.customer?.customer_name ? comment.customer?.customer_name.toUpperCase() : 'Kh??ng t??n'}
                      </span>{' '}
                      {comment.comment_content}
                    </div>
                    <div>
                      {moment(comment.createdAt).utc().format('DD-MM-YYYY H:mm:ss')}{' '}
                      <div className="delete-detail" onClick={() => deleteComment(comment.comment_id)}>
                        <AiFillDelete size={22} color="red" />
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Container>
            <FloatingLabel className="mb-2 mt-3" controlId="floatingTextarea2" label="B??nh lu???n s???n ph???m">
              <Form.Control
                onChange={(e) => setContent(e.target.value)}
                as="textarea"
                placeholder="Leave a comment here"
                cols="50"
                style={{ height: '100px' }}
              />
            </FloatingLabel>
            <span> ????nh gi?? s??? sao s???n ph???m </span>
            <div>
              <Form.Control
                style={{ width: '200px' }}
                className="mb-2 mt-2"
                size="sm"
                type="number"
                min="1"
                max="5"
                value={starComment}
                onChange={(e) => setStarComment(e.target.value)}
                placeholder="????nh gi?? s??? sao"
              />

              <ProgressBar style={{ width: '200px' }}>
                <ProgressBar
                  style={{ alignItems: 'center', width: '40px' }}
                  label={<AiFillStar />}
                  now={starComment * 10 * 2}
                  key={starComment}
                />
                {starComment > 1 ? (
                  <ProgressBar
                    style={{ alignItems: 'center', width: '40px' }}
                    label={<AiFillStar />}
                    now={starComment * 10 * 2}
                  />
                ) : (
                  <></>
                )}
                {starComment > 2 ? (
                  <ProgressBar
                    style={{ alignItems: 'center', width: '40px' }}
                    label={<AiFillStar />}
                    now={starComment * 10 * 2}
                  />
                ) : (
                  <></>
                )}
                {starComment > 3 ? (
                  <ProgressBar
                    style={{ alignItems: 'center', width: '50px' }}
                    label={<AiFillStar />}
                    now={starComment * 10 * 2}
                  />
                ) : (
                  <></>
                )}
                {starComment > 4 ? (
                  <ProgressBar
                    style={{ alignItems: 'center', width: '40px' }}
                    label={<AiFillStar />}
                    now={starComment * 10 * 2}
                  />
                ) : (
                  <></>
                )}
                {starComment > 5 ? (
                  <ProgressBar
                    style={{ alignItems: 'center', width: '40px' }}
                    label={<AiFillStar />}
                    now={starComment * 10 * 2}
                  />
                ) : (
                  <></>
                )}
              </ProgressBar>
            </div>

            <Button className="mb-4 mt-2" variant="success" onClick={() => comment()}>
              B??nh lu???n s???n ph???m
            </Button>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default DetailProduct;
