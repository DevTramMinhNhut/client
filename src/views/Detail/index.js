import { Badge, Button, Container, Image } from 'react-bootstrap';
import classNames from 'classnames/bind';
import style from './Detail.css';

import { Col, Row } from 'reactstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Carousel from 'react-bootstrap/Carousel';
import { IoReloadCircleOutline } from 'react-icons/io5';
import { FcAlarmClock } from 'react-icons/fc';
import { AiFillLike } from 'react-icons/ai';
import { FcCheckmark } from 'react-icons/fc';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const cx = classNames.bind(style);

function Detail() {
  return (
    <Container fluid="md">
      <div className={cx('detail-product-breadcrumbs')}>
        {' '}
        <Breadcrumb>
          <Breadcrumb.Item href="#">Trang Chủ</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Chi tiết sản phẩm</Breadcrumb.Item>
          <Breadcrumb.Item active>Thịch Heo</Breadcrumb.Item>
        </Breadcrumb>{' '}
      </div>
      <Row className={cx('detail-product')}>
        <Col className={cx('detail-product-image')} sm={7}>
          <div className={cx('detail-product-image-slider')}>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://cdn.tgdd.vn/Products/Images/2464/210186/bhx/nuoc-giat-omo-matic-huong-comfort-tinh-dau-thom-tui-35-lit-202202110832126715.jpg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://cdn.tgdd.vn/Products/Images/2464/210186/bhx/nuoc-giat-omo-matic-huong-comfort-tinh-dau-thom-tui-35-lit-202204191445231086.png"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://cdn.tgdd.vn/Products/Images/2464/210186/bhx/nuoc-giat-omo-matic-huong-comfort-tinh-dau-thom-tui-35-lit-202204191445235165.png"
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
          <div className={cx('detail-product-fullimg')}> </div>
        </Col>
        <Col className={cx('detail-product-name')} sm={5}>
          <h1 className={cx('detail-product-name-title')}>
            Nước giặt OMO Matic cửa trên hương Comfort tinh dầu thơm giúp quần áo sạch bẩn thơm lâu túi 3.5 lít
          </h1>
          <div className={cx('detail-product-name-price')}>
            <strong>188.000₫</strong>
            <span class="strike">220.000₫</span>
            <label>-19%</label>
          </div>
          <div className={cx('detail-product-name-kho')}>
            <span>Kho: 52 sản phẩm</span>
          </div>
          <div className={cx('detail-product-name-mua')}>
            <Button variant="success">Mua sản phẩm</Button>
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
                <Col>
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
                <Col>
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
                <Col>
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
                <Col>
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
      <Row className={cx('detail-product-thongtin')}>
        <Col sm={12}>
          <div className={cx('detail-product-thongtin-title')}>Thông tin sản phẩm</div>
          <div className={cx('detail-product-thongtin-content')}>
            Nước giặt với nhiều công nghệ giặt tẩy nên người sử dụng không cần ngâm quần áo lâu. Nước giặt OMO với màng
            chắn kháng khuẩn Xanh, đánh bật các loại vết bẩn khô cứng chỉ trong 1 lần giặt. Nước giặt OMO Matic Comfort
            tinh dầu thơm túi 3.5 lít mang hương dầu thơm Comfort lưu giữ trên quần áo cả ngày. Hạn sử dụng Còn 2 năm
            Thương hiệu OMO (Anh & Hà Lan) Sản xuất tại Việt Nam Công dụng Giặt sạch quần áo và các vết bẩn cứng đầu.
            Lưu lại hương thơm bền lâu trên áo quần Mùi hương Comfort tinh dầu thơm Sử dụng Giặt máy cửa trên Khối lượng
            3.5 lít Hướng dẫn sử dụng Sử dụng 1 nắp đầy 60ml cho 1 lần giặt thông thường. Điều chỉnh lượng nước giặt
            tương ứng với lượng quần áo và vết bẩn. Thoa một lượng nhỏ nước giặt trực tiếp lên vết bẩn. Đổ phần nước
            giặt còn lại trong nắp vào máy giặt cùng với quần áo Lưu ý Kiểm tra độ bền màu trước khi sử dụng. Để xa tầm
            tay trẻ em. Không được uống. Tránh để tiếp xúc với mắt. Nếu sản phẩm dính vào mắt hãy rửa kỹ với nước. Rửa
            sạch và lau tay khô sau khi sử dụng. Bảo quản Nơi khô ráo thoáng mát. Tránh tiếp xúc trực tiếp với ánh nắng
            mặt trời
          </div>
        </Col>
      </Row>

      <Row className={cx('detail-product-comment')}>
        <Col sm={12}>
          <div className={cx('detail-product-comment-title')}>Đánh giá sản phẩm</div>
          <div className={cx('detail-product-comment-content')}>
            <FloatingLabel controlId="floatingTextarea2" label="Bình luận sản phẩm">
              <Form.Control as="textarea" placeholder="Leave a comment here" style={{ height: '150px' }} />
            </FloatingLabel>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Detail;
