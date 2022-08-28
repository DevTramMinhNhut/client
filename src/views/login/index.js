import style from './Login.css';
import classNames from 'classnames/bind';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

const cx = classNames.bind(style);

function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  let navigate = useNavigate();

  const renderErrorMessage = (name) =>
    name === errorMessages.name && <div className="error">{errorMessages.message}</div>;

  const database = [
    {
      username: 'user1',
      password: '1',
    },
    {
      username: 'user2',
      password: 'pass2',
    },
  ];

  const errors = {
    uname: 'invalid username',
    pass: 'invalid password',
  };

  const handleCheck = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    if (value === true) setIsCheck(true);
    else setIsCheck(false);
  };

  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();
    var { uname, pass } = document.forms[0];
    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: 'pass', message: errors.pass });
      } else {
        setIsSubmitted(true);
        let time = new Date();
        userData.time = time.setHours(time.getDate() + 7);
        if (isCheck === true) {
          userData.time = time.setHours(time.getDate() + 7);
        } else {
          userData.time = time.setHours(time.getDate());
        }

        localStorage.setItem('author', JSON.stringify(userData));

        navigate('/');
      }
    } else {
      // Username not found
      setErrorMessages({ name: 'uname', message: errors.uname });
    }
  };

  return (
    <div className={cx('home-login')}>
      <div className={cx('home-login-form')}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className={cx('text-center mb-1')} controlId="formBasicEmail">
            <Form.Label className={cx('login-form-label')}>Tên đăng nhập</Form.Label>
            <Form.Control
              className={cx('form-control-login')}
              type="text"
              placeholder="Tên đăng nhập"
              name="uname"
              required
            />
            {renderErrorMessage('uname')}
          </Form.Group>

          <Form.Group className={cx('text-center mb-2')} controlId="formBasicPassword">
            <Form.Label className={cx('login-form-label mat-khau')}>Mật khẩu</Form.Label>
            <Form.Control
              className={cx('form-control-login')}
              type="password"
              name="pass"
              placeholder="Mật khẩu"
              required
            />
            {renderErrorMessage('pass')}
          </Form.Group>
          <Form.Group className={cx('text-center')} controlId="formBasicCheckbox">
            <Form.Check onChange={handleCheck} type="checkbox" label="Ghi nhớ tài khoản" />
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
