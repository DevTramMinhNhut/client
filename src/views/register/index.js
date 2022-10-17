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

  const userData = {
    username: '',
    password: '',
  };

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };
  const findFormErrors = () => {
    const { username, password, againPassword } = form;
    const newErrors = {};
    // name errors
    if (username.length < 8) newErrors.username = 'Tên tài khoản phải đủ 8 ký tự';
    if (password.length < 8) newErrors.password = 'Mật khẩu phải đủ 8 ký tự';
    if (password !== againPassword) newErrors.againPassword = 'Mật khẩu nhập lại bị sai';
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      userData.username = username;
      userData.password = password;
      event.preventDefault();
      axios
        .post(
          `http://localhost:3000/customer/`,
          {
            username: userData.username,
            password: userData.password,
            type: 'Normal',
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          userData.id = res.data;
          if (res.status) {
            localStorage.setItem('author', JSON.stringify(userData));
            navigate('/');
          }
        })
        .catch((err) => {
          console.log(err);
          if (err) {
            alert('Tên đăng nhập của bạn đã bị trùng vui lòng nhập lại tên đăng nhập khác');
          }
        });
    }
  };

  return (
    <div className={cx('home-register')}>
      <div className={cx('home-register-1')}>
        <span className={cx('home-register-form-content')}>Đăng Ký Tài Khoản</span>
        <Form onSubmit={handleSubmit} className={cx('home-register-form')}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className={cx('form-label-1')}>Tên đăng nhập *</Form.Label>
            <Form.Control
              required
              className={cx('form-control-1')}
              type="text"
              name="username"
              placeholder="Tên đăng nhập"
              onChange={(e) => {
                setUsername(e.target.value);
                setField('username', e.target.value);
              }}
              isInvalid={!!errors.username}
            />
            {errors.username ? (
              <Form.Control.Feedback style={{ marginLeft: '60px' }} type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            ) : (
              <Form.Text style={{ marginLeft: '60px' }} className="text-muted">
                Tên đăng nhập phải đủ 8 ký tự
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className={cx('home-register-form-mk')} controlId="formBasicPassword">
            <Form.Label required className={cx('form-label-1')}>
              Mật khẩu *
            </Form.Label>
            <Form.Control
              required
              className={cx('form-control-1')}
              type="password"
              name="password"
              placeholder="Mật khẩu"
              onChange={(e) => {
                setField('password', e.target.value);
                setPassword(e.target.value);
              }}
              isInvalid={!!errors.password}
            />
            {errors.username ? (
              <Form.Text style={{ marginLeft: '60px' }} className="text-muted">
                Mật khẩu phải đủ 8 ký tự
              </Form.Text>
            ) : (
              <Form.Control.Feedback style={{ marginLeft: '60px' }} type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="home-register-form-nhaplai-mk mb-4" controlId="validationCustom03">
            <Form.Label className={cx('form-label-1')}>Nhập lại mật khẩu</Form.Label>
            <Form.Control
              required
              name="againPassword"
              className={cx('form-control-1')}
              type="password"
              placeholder="Nhập lại mật khẩu *"
              onChange={(e) => {
                setField('againPassword', e.target.value);
              }}
              isInvalid={!!errors.againPassword}
            />
            <Form.Control.Feedback style={{ marginLeft: '60px' }} type="invalid">
              {errors.againPassword}
            </Form.Control.Feedback>
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
