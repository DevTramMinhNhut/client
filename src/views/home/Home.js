import classNames from 'classnames/bind';
import style from './Home.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

import Image from '../../components/Image';
import { Badge } from 'reactstrap';
import { Button } from 'reactstrap';
import { useState, useEffect } from 'react';

import product from '../../apifect/product.json';

const cx = classNames.bind(style);

function Home() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(product.products);
  }, []);

  const onAddCart = (product_id) => {
    let carts = [];
    const product = data.find((x) => x.product_id === product_id);

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
        product_price: Number(product.product_price),
        product_saleprice: Number(product.product_saleprice),
        provider: product.provider,
        qty: 1,
      });
    }
    localStorage.setItem('cart', JSON.stringify(carts));
  };

  return (
    <Container fluid="md">
      <Row className={cx('home-slider')}>
        <Col>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://cdn.tgdd.vn/bachhoaxanh/banners/2505/bhx-thich-qua-1407202281848.jpg"
                alt=""
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://cdn.tgdd.vn/bachhoaxanh/banners/2505/giat-xa-giam-den-30-120820221471.jpg"
                alt=""
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://cdn.tgdd.vn/bachhoaxanh/banners/2505/sua-gia-si-1208202214749.jpg"
                alt=""
              />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
      <Row className={cx('home-prodcut-like')}>
        <Col>
          <div className="namegroup">Nhóm hàng thường mua</div>
          <ListGroup horizontal>
            <ListGroup.Item>
              <Link to="/thit-heo" key="1">
                <Image
                  className={cx('home-prodcut-like-img')}
                  src="//cdn.tgdd.vn/Products/Images/8781/bhx/thit-heo-cac-loai-202206181001590412.png"
                  alt="loi"
                />
                <span>Thịt heo các loại</span>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/thit-heo" key="1">
                <Image
                  className={cx('home-prodcut-like-img')}
                  src="//cdn.tgdd.vn/Products/Images/8781/bhx/thit-heo-cac-loai-202206181001590412.png"
                  alt="loi"
                />
                <span>Thịt heo các loại</span>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/thit-heo" key="1">
                <Image
                  className={cx('home-prodcut-like-img')}
                  src="//cdn.tgdd.vn/Products/Images/8781/bhx/thit-heo-cac-loai-202206181001590412.png"
                  alt="loi"
                />
                <span>Thịt heo các loại</span>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/thit-heo" key="2">
                <Image
                  className={cx('home-prodcut-like-img')}
                  src="//cdn.tgdd.vn/Products/Images/8781/bhx/thit-heo-cac-loai-202206181001590412.png"
                  alt="loi"
                />
                <span>Thịt heo các loại</span>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/thit-heo" key="3">
                <Image
                  className={cx('home-prodcut-like-img')}
                  src="//cdn.tgdd.vn/Products/Images/8781/bhx/thit-heo-cac-loai-202206181001590412.png"
                  alt="loi"
                />
                <span>Thịt heo các loại</span>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/thit-heo" key="4">
                <Image
                  className={cx('home-prodcut-like-img')}
                  src="//cdn.tgdd.vn/Products/Images/8781/bhx/thit-heo-cac-loai-202206181001590412.png"
                  alt="loi"
                />
                <span>Thịt heo các loại</span>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/thit-heo" key="5">
                <Image
                  className={cx('home-prodcut-like-img')}
                  src="//cdn.tgdd.vn/Products/Images/8781/bhx/thit-heo-cac-loai-202206181001590412.png"
                  alt="loi"
                />
                <span>Thịt heo các loại</span>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/thit-heo" key="6">
                <Image
                  className={cx('home-prodcut-like-img')}
                  src="//cdn.tgdd.vn/Products/Images/8781/bhx/thit-heo-cac-loai-202206181001590412.png"
                  alt="loi"
                />
                <span>Thịt heo các loại</span>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/thit-heo" key="1">
                <Image
                  className={cx('home-prodcut-like-img')}
                  src="//cdn.tgdd.vn/Products/Images/8781/bhx/thit-heo-cac-loai-202206181001590412.png"
                  alt="loi"
                />
                <span>Thịt heo các loại</span>
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      <Row className={cx('home-prodcut-discount')}>
        <Col>
          <div className={cx('home-prodcut-discount-tile')}> SẢN PHẨM KHUYẾN MÃI </div>
          <div className={cx('home-prodcut-discount-content')}>
            <Container>
              <Row>
                <Col sm={3}>
                  <div className={cx('home-prodcut-discount-img')}>
                    <Image
                      className="d-block w-100"
                      src="https://cdn.tgdd.vn/Products/Images/7082/172180/bhx/suon-non-chay-an-nhien-goi-150g-202205231701390268_300x300.jpg"
                      alt=""
                    />
                  </div>
                  <div className={cx('home-prodcut-discount-name')}>
                    <span> tram minh nhuut </span>
                  </div>
                  <div className={cx('home-prodcut-discount-price')}>
                    <strong>51.000₫</strong>
                    <span className={cx('home-prodcut-discount-price-1')}>56.500₫</span>
                    <label>
                      <Badge pill className={cx('home-prodcut-discount-price-2')}>
                        -14%
                      </Badge>
                    </label>
                  </div>
                  <div className={cx('home-prodcut-discount-button')}>
                    <Button className={cx('home-prodcut-discount-button-1')}>Light</Button>
                  </div>
                </Col>
                <Col sm={3}>
                  <div className={cx('home-prodcut-discount-img')}>
                    <Image
                      className="d-block w-100"
                      src="https://cdn.tgdd.vn/Products/Images/7082/172180/bhx/suon-non-chay-an-nhien-goi-150g-202205231701390268_300x300.jpg"
                      alt=""
                    />
                  </div>
                  <div className={cx('home-prodcut-discount-name')}>
                    <span> tram minh nhuut </span>
                  </div>
                  <div className={cx('home-prodcut-discount-price')}>
                    <strong>51.000₫</strong>
                    <span className={cx('home-prodcut-discount-price-1')}>56.500₫</span>
                    <label>
                      <Badge pill className={cx('home-prodcut-discount-price-2')}>
                        -14%
                      </Badge>
                    </label>
                  </div>
                  <div className={cx('home-prodcut-discount-button')}>
                    <Button className={cx('home-prodcut-discount-button-1')}>Light</Button>
                  </div>
                </Col>
                <Col sm={3}>
                  <div className={cx('home-prodcut-discount-img')}>
                    <Image
                      className="d-block w-100"
                      src="https://cdn.tgdd.vn/Products/Images/7082/172180/bhx/suon-non-chay-an-nhien-goi-150g-202205231701390268_300x300.jpg"
                      alt=""
                    />
                  </div>
                  <div className={cx('home-prodcut-discount-name')}>
                    <span> tram minh nhuut </span>
                  </div>
                  <div className={cx('home-prodcut-discount-price')}>
                    <strong>51.000₫</strong>
                    <span className={cx('home-prodcut-discount-price-1')}>56.500₫</span>
                    <label>
                      <Badge pill className={cx('home-prodcut-discount-price-2')}>
                        -14%
                      </Badge>
                    </label>
                  </div>
                  <div className={cx('home-prodcut-discount-button')}>
                    <Button className={cx('home-prodcut-discount-button-1')}>Light</Button>
                  </div>
                </Col>
                <Col sm={3}>
                  <div className={cx('home-prodcut-discount-img')}>
                    <Image
                      className="d-block w-100"
                      src="https://cdn.tgdd.vn/Products/Images/7082/172180/bhx/suon-non-chay-an-nhien-goi-150g-202205231701390268_300x300.jpg"
                      alt=""
                    />
                  </div>
                  <div className={cx('home-prodcut-discount-name')}>
                    <span> tram minh nhuut </span>
                  </div>
                  <div className={cx('home-prodcut-discount-price')}>
                    <strong>51.000₫</strong>
                    <span className={cx('home-prodcut-discount-price-1')}>56.500₫</span>
                    <label>
                      <Badge pill className={cx('home-prodcut-discount-price-2')}>
                        -14%
                      </Badge>
                    </label>
                  </div>
                  <div className={cx('home-prodcut-discount-button')}>
                    <Button className={cx('home-prodcut-discount-button-1')}>Light</Button>
                  </div>
                </Col>
                <Col sm={3}>
                  <div className={cx('home-prodcut-discount-img')}>
                    <Image
                      className="d-block w-100"
                      src="https://cdn.tgdd.vn/Products/Images/7082/172180/bhx/suon-non-chay-an-nhien-goi-150g-202205231701390268_300x300.jpg"
                      alt=""
                    />
                  </div>
                  <div className={cx('home-prodcut-discount-name')}>
                    <span> tram minh nhuut </span>
                  </div>
                  <div className={cx('home-prodcut-discount-price')}>
                    <strong>51.000₫</strong>
                    <span className={cx('home-prodcut-discount-price-1')}>56.500₫</span>
                    <label>
                      <Badge pill className={cx('home-prodcut-discount-price-2')}>
                        -14%
                      </Badge>
                    </label>
                  </div>
                  <div className={cx('home-prodcut-discount-button')}>
                    <Button className={cx('home-prodcut-discount-button-1')}>Light</Button>
                  </div>
                </Col>
                <Col sm={3}>
                  <div className={cx('home-prodcut-discount-img')}>
                    <Image
                      className="d-block w-100"
                      src="https://cdn.tgdd.vn/Products/Images/7082/172180/bhx/suon-non-chay-an-nhien-goi-150g-202205231701390268_300x300.jpg"
                      alt=""
                    />
                  </div>
                  <div className={cx('home-prodcut-discount-name')}>
                    <span> tram minh nhuut </span>
                  </div>
                  <div className={cx('home-prodcut-discount-price')}>
                    <strong>51.000₫</strong>
                    <span className={cx('home-prodcut-discount-price-1')}>56.500₫</span>
                    <label>
                      <Badge pill className={cx('home-prodcut-discount-price-2')}>
                        -14%
                      </Badge>
                    </label>
                  </div>
                  <div className={cx('home-prodcut-discount-button')}>
                    <Button className={cx('home-prodcut-discount-button-1')}>Light</Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
      </Row>

      <Row className={cx('home-prodcut-all')}>
        <Col>
          <div className={cx('home-prodcut-discount-tile')}>SẢN PHẨM </div>
          <div className={cx('home-prodcut-discount-content')}>
            <Container>
              <Row>
                {data.map((product, index) => (
                  <Col sm={3} key={index}>
                    <div className={cx('home-prodcut-discount-img')}>
                      <Image
                        className="d-block w-100"
                        src="https://cdn.tgdd.vn/Products/Images/7082/172180/bhx/suon-non-chay-an-nhien-goi-150g-202205231701390268_300x300.jpg"
                        alt=""
                      />
                    </div>
                    <div className={cx('home-prodcut-discount-name')}>
                      <span> {product.product_name} </span>
                    </div>
                    <div className={cx('home-prodcut-discount-price')}>
                      <strong> {product.product_price}</strong>
                      <span className={cx('home-prodcut-discount-price-1')}>56.500₫</span>
                      <label>
                        <Badge pill className={cx('home-prodcut-discount-price-2')}>
                          -14%
                        </Badge>
                      </label>
                    </div>
                    <div className={cx('home-prodcut-discount-button')}>
                      <Button
                        onClick={() => onAddCart(product.product_id)}
                        className={cx('home-prodcut-discount-button-1')}
                      >
                        Mua
                      </Button>
                    </div>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
