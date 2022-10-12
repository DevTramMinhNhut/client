import style from './Register.css';
import classNames from 'classnames/bind';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaHandPointRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(style);

function Register() {
  let navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [againPassword, setAgainPassword] = useState();

  const [validated, setValidated] = useState(false);

  const userData = {
    username: '',
    password: '',
    timeout: '',
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (username && username.length < 8) {
      alert('Sai định dạng username !!');
      event.preventDefault();
      event.stopPropagation();
    }
    if (password && password.length < 8) {
      alert('Sai định dạng password !!');
      event.preventDefault();
      event.stopPropagation();
    }
    if (password !== againPassword) {
      alert('Nhập lại Mật khẩu không đúng !!');
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      let time = new Date();
      userData.username = username;
      userData.password = password;
      userData.time = time.setHours(time.getDate());
      event.preventDefault();
      axios
        .post(
          `http://localhost:3000/customer/`,
          {
            username: userData.username,
            password: userData.password,
            type: 'normal',
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          localStorage.setItem('author', JSON.stringify(userData));
          navigate('/');
        })
        .catch((err) => {
          alert('Hệ thống lỗi vui lòng F5 lại trang web');
        });
    }
  };

  return (
    <div className={cx('home-register')}>
      <div className={cx('home-register-1')}>
        <span className={cx('home-register-form-content')}>Đăng Ký Tài Khoản</span>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className={cx('home-register-form')}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className={cx('form-label-1')}>Tên đăng nhập</Form.Label>
            <Form.Control
              required
              className={cx('form-control-1')}
              type="text"
              name="username"
              placeholder="Tên đăng nhập"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <Form.Text style={{ marginLeft: '60px' }} className="text-muted">
              Tên đăng nhập phải đủ 8 ký tự
            </Form.Text>
          </Form.Group>

          <Form.Group className={cx('home-register-form-mk')} controlId="formBasicPassword">
            <Form.Label required className={cx('form-label-1')}>
              Mật khẩu
            </Form.Label>
            <Form.Control
              required
              className={cx('form-control-1')}
              type="password"
              name="password"
              placeholder="Mật khẩu"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Form.Text style={{ marginLeft: '60px' }} className="text-muted">
              Mật khẩu phải đủ 8 ký tự
            </Form.Text>
          </Form.Group>
          <Form.Group className="home-register-form-nhaplai-mk mb-4" controlId="validationCustom03">
            <Form.Label className={cx('form-label-1')}>Nhập lại mật khẩu</Form.Label>
            <Form.Control
              required
              name="password1"
              className={cx('form-control-1')}
              type="password"
              placeholder="Nhập lại mật khẩu"
              onChange={(e) => {
                setAgainPassword(e.target.value);
              }}
            />
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
