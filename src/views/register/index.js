import style from './Register.css';
import classNames from 'classnames/bind';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaHandPointRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function Register() {
  return (
    <div className={cx('home-register')}>
      <div className={cx('home-register-1')}>
        <span className={cx('home-register-form-content')}>Đăng Ký Tài Khoản</span>
        <Form className={cx('home-register-form')}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className={cx('form-label-1')}>Tên đăng nhập</Form.Label>
            <Form.Control className={cx('form-control-1')} type="text" placeholder="Tên đăng nhập" />
          </Form.Group>

          <Form.Group className={cx('home-register-form-mk')} controlId="formBasicPassword">
            <Form.Label className={cx('form-label-1')}>Mật khẩu</Form.Label>
            <Form.Control className={cx('form-control-1')} type="password" placeholder="Mật khẩu" />
          </Form.Group>
          <Form.Group className="home-register-form-nhaplai-mk mb-4" controlId="formBasicPassword">
            <Form.Label className={cx('form-label-1')}>Nhập lại mật khẩu</Form.Label>
            <Form.Control className={cx('form-control-1')} type="password" placeholder="Nhập lại mật khẩu" />
          </Form.Group>

          <Button type="submit" className={cx('btn-register')} variant="outline-dark">
            Đăng ký
          </Button>
        </Form>
        <div>
          <span className={cx('register-or')}>OR</span>

          <p className={cx('register-login-1')}>
            Bạn đã có tài khoản đăng nhập
            <FaHandPointRight className={cx('register-click')} />
            <Link className={cx('register-her')} to="/login">
              Tại đây
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
