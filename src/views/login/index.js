import style from './Login.css';
import classNames from 'classnames/bind';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(style);

function Login() {
  return (
    <div className={cx('home-login')}>
      <div className={cx('home-login-form')}>
        <Form>
          <Form.Group className={cx('text-center mb-1')} controlId="formBasicEmail">
            <Form.Label className={cx('login-form-label')}>Tên đăng nhập</Form.Label>
            <Form.Control className={cx('form-control-login')} type="text" placeholder="Tên đăng nhập" />
          </Form.Group>

          <Form.Group className={cx('text-center mb-2')} controlId="formBasicPassword">
            <Form.Label className={cx('login-form-label mat-khau')}>Mật khẩu</Form.Label>
            <Form.Control className={cx('form-control-login')} type="password" placeholder="Mật khẩu" />
          </Form.Group>
          <Form.Group className={cx('text-center')} controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Ghi nhớ tài khoản" />
            <span className={cx('login-dang-ky')}>
              <NavLink to="/login"> Đăng ký tài khoản </NavLink>
            </span>
          </Form.Group>
          <Button type="submit" className={cx('btn-login')} variant="outline-light">
            Đăng nhập
          </Button>
        </Form>
        <span className={cx('or')}> OR </span>

        <div className={cx('login-fbOrgoogle btn-login')}>
          <NavLink to="/fb">
            <Button className={cx('login-fb')} variant="outline-primary">
              FaceBook
            </Button>
          </NavLink>
          <NavLink to="/google">
            <Button className={cx('login-google')} variant="outline-danger">
              Goole
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Login;
