import classNames from 'classnames/bind';
import style from '../../styles/global.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavLink } from 'react-router-dom';

import Image from '../../components/Image';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import axios from 'axios';

import { AiOutlineHeart } from 'react-icons/ai';
import { Badge } from 'react-bootstrap';
import { useContext } from 'react';

import { onClickCheckCart } from '../Layout/DefaultLayout/index';
const cx = classNames.bind(style);

const FrameProduct = ({ data, discount }) => {
  const checkCartButton = useContext(onClickCheckCart);

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
        discount_percent: product.discount?.discount_percent ? product.discount?.discount_percent : 0,
        image: product.images[0]?.image_name,
        product_price: Number(product.product_price),
        provider: product.provider,
        qty: 1,
      });
    }
    localStorage.setItem('cart', JSON.stringify(carts));
    alert(`Bạn đã thêm sản phẩm ${product.product_name} vào giỏ hàng thành công`);
  };
  const onAddFavorite = (product_id) => {
    const product = data.find((x) => x.product_id === product_id);
    axios
      .post(`http://localhost:3000/favorite/`, {
        product_id: product.product_id,
        customer_id: 1,
      })
      .then((res) => {
        alert(`Bạn thêm sản phẩm ${product.product_name} vào trang yêu thích`);
      })
      .catch((err) => {
        alert('Bạn đã thêm vào trang yêu thích cá nhân!');
      });
  };
  return (
    <Container>
      <Row>
        {data.map((product, index) => (
          <Col sm={3} key={index} style={{ position: 'relative' }}>
            <div className={cx('home-product-discount-img')}>
              {discount === true ? (
                <div className={cx('home-discount')}>
                  <span className={cx('discount-content')}> {product.discount?.discount_name} </span>
                </div>
              ) : (
                <></>
              )}

              <NavLink to={`/detail/product/${product.product_id}`}>
                <Image
                  className="d-block w-100 mt-3"
                  src={`http://127.0.0.1:8887//${product.images[0]?.image_name}`}
                  alt="Lỗi hình ảnh"
                />
              </NavLink>
            </div>
            <div className={cx('home-product-discount-name')}>
              <NavLink to={`/detail/product/${product.product_id}`} style={{ textDecoration: 'none', color: 'black' }}>
                {product.product_name}
              </NavLink>
            </div>
            {discount === true ? (
              <div className={cx('home-product-discount-price')}>
                <strong>
                  {(
                    product.product_price -
                    (product.product_price * product.discount?.discount_percent) / 100
                  ).toLocaleString('vi', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </strong>
                <span className={cx('home-product-discount-price-1')}>
                  {product.product_price.toLocaleString('vi', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </span>
                <label>
                  <Badge pill className={cx('home-product-discount-price-2')}>
                    -{product.discount?.discount_percent}%
                  </Badge>
                </label>
              </div>
            ) : (
              <div className={cx('home-product-discount-price')}>
                <strong>
                  {' '}
                  {product.product_price.toLocaleString('vi', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </strong>
              </div>
            )}

            <div className={cx('home-product-discount-button')}>
              <Button
                style={{ width: '180px' }}
                variant="outline-dark"
                onClick={() => {
                  checkCartButton();
                  onAddCart(product.product_id);
                }}
              >
                Mua
              </Button>

              <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">Yêu thích sản phẩm</Tooltip>}>
                <span className="d-inline-block">
                  <AiOutlineHeart
                    onClick={() => onAddFavorite(product.product_id)}
                    size="30px"
                    className={cx('home-product-discount-button-icon')}
                  />
                </span>
              </OverlayTrigger>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FrameProduct;