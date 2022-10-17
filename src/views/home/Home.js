import classNames from 'classnames/bind';
import style from '../../styles/global.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

import Image from '../../components/Image';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';

import * as productApi from '../../api/product';
import FrameProduct from '../../components/FrameProduct';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(style);

function Home() {
  const [data, setData] = useState([]);
  const [numberProductList, setNumberProductList] = useState(12);
  useEffect(() => {
    const fetchAPI = async () => {
      const data = await productApi.get(`product?limit=${numberProductList}`);
      setData(data.products);
    };
    fetchAPI();
  }, [numberProductList]);

  const number = () => {
    setNumberProductList(numberProductList + 4);
  };

  const [dataNew, setDataNew] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const data = await productApi.get(`product?limit=6&&orderCheck=DESC`);
      setDataNew(data.products);
    };
    fetchAPI();
  }, []);

  const [dataDiscount, setDataDiscount] = useState([]);
  const checkDiscount = [];
  useEffect(() => {
    const fetchAPI = async () => {
      const data = await productApi.get(`product?limit=8`);
      setDataDiscount(data.products);
    };
    fetchAPI();
  }, []);
  if (dataDiscount) {
    dataDiscount.forEach((product, index) => {
      if (product.discount !== null) {
        checkDiscount.push(product);
      }
    });
  }
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
      <Row className={cx('home-product-new')}>
        <Col>
          <div className={cx('home-product-new-title')}>Sản phẩm mới nhất</div>
          <Container>
            <Row>
              {dataNew.map((product, index) => (
                <Col md={2} sm={1} key={index}>
                  <Link style={{ textDecoration: 'none' }} to={`/detail/product/${product.product_id}`} key={index}>
                    <Image
                      style={{ width: '80px', Height: '40px', display: 'block', margin: '0 auto' }}
                      src={`http://127.0.0.1:8887//${product.images[0]?.image_name}`}
                      alt="loi"
                    />
                    <span style={{ color: 'black' }}>{product.product_name}</span>
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
        </Col>
      </Row>

      <Row className={cx('home-product-discount')}>
        <Col>
          <div className={cx('home-product-discount-tile')}> SẢN PHẨM KHUYẾN MÃI </div>
          <div className={cx('home-product-discount-content')}>
            <Container>
              <Row>
                <FrameProduct data={checkDiscount} discount={true} />
              </Row>
            </Container>
          </div>
        </Col>
      </Row>

      <Row className={cx('home-product-all')}>
        <Col>
          <div className={cx('home-product-discount-tile')}>SẢN PHẨM </div>
          <div className={cx('home-product-discount-content')}>
            <FrameProduct data={data} discount={false} />
            <div style={{ textAlign: 'center', marginTop: '15px', marginBottom: '15px' }}>
              <Button onClick={() => number()}>
                <h5> Xem thêm sản phẩm </h5>
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
