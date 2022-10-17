import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import style from './Login.css';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

// fb
import FacebookLogin from 'react-facebook-login';

//google
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

// api
import * as customerApi from '../../api/customer';
const cx = classNames.bind(style);

const ModalLogin = ({ setShowModal }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    setShowModal(false);
  };

  // call api
  const [customer, setCustomer] = useState([]);

  const customerUsername = [];
  useEffect(() => {
    const fetchAPI = async () => {
      const data = await customerApi.get('customer?limit=10000');
      setCustomer(data.customers);
    };
    fetchAPI();
  }, []);

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

  const authLogin = {
    id: '',
    username: '',
  };
  // const [checkId, setCheckId] = useState(false);
  const findFormErrors = () => {
    const { username, password } = form;
    const newErrors = {};
    // name errors
    // Find user login info
    var checkUsername = [];
    for (let i = 0; i <= customer.length; i++) {
      checkUsername.push(customer[i]?.account.username);
      const check = customer[i]?.account;
      const checkId = customer[i]?.customer_id;
      if (check) {
        if (checkUsername.includes(username) === true) {
          if (check.username === username) {
            authLogin.id = checkId;
          }
          const checkPassword = bcrypt.compareSync(password, check.password);
          if (checkPassword === false) {
            newErrors.password = 'Mật khẩu không đúng vui lòng nhập lại';
          }
        }
      }
    }
    if (checkUsername.includes(username) === false) {
      newErrors.username = 'Tên đăng nhập không tồn tại';
    }

    return newErrors;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      authLogin.username = form.username;
      event.preventDefault();
      localStorage.setItem('author', JSON.stringify(authLogin));
      setShowModal(false);
    }
  };
  // fb
  const responseFacebook = (response) => {
    authLogin.id = response.userID;
    authLogin.username = response.name;
    localStorage.setItem('author', JSON.stringify(authLogin));
    for (let i = 0; i <= customer.length; i++) {
      const check = customer[i]?.account;
      if (check) {
        customerUsername.push(check.username);
      }
    }
    const checkUsername = customerUsername.includes(response.userID);
    if (checkUsername === false) {
      axios
        .post(
          `http://localhost:3000/customer/`,
          {
            username: response.userID,
            password: '99999',
            customer_name: response.username,
            type: 'FacebookLogin',
            customer_avatar: response.picture.url,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          setShowModal(false);
        })
        .catch((err) => {
          alert('Đăng nhập thất bại vui lòng nhập lại !!!');
          setShowModal(true);
        });
    }
    setShowModal(false);
  };

  //google
  const clientId = '97039270207-qq1mmr8n3hk41va78brkhhej0jeqikrr.apps.googleusercontent.com';
  // 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

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const onSuccess = (res) => {
    authLogin.id = res.profileObj.googleId;
    authLogin.username = res.profileObj.name;
    localStorage.setItem('author', JSON.stringify(authLogin));
    for (let i = 0; i <= customer.length; i++) {
      const check = customer[i]?.account;
      if (check) {
        customerUsername.push(check.username);
      }
    }
    const checkUsername = customerUsername.includes(res.profileObj.googleId);
    if (checkUsername === false) {
      axios
        .post(
          `http://localhost:3000/customer/`,
          {
            username: authLogin.userID,
            customer_name: authLogin.username,
            password: '99999',
            type: 'GoogleLogin',
            customer_avatar: authLogin.picture,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          setShowModal(false);
        })
        .catch((err) => {
          alert('Đăng nhập thất bại vui lòng nhập lại !!!');
          setShowModal(true);
        });
    }
    setShowModal(false);
  };
  const onFailure = (err) => {
    alert('Đăng nhập thất bại vui lòng nhập lại !!!');
    setShowModal(true);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Đăng Nhập</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên đăng nhập"
              name="username"
              onChange={(e) => setField('username', e.target.value)}
              required
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setField('password', e.target.value)}
              name="password"
              placeholder="Mật khẩu"
              required
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
          <div className="mb-2 modal-Login">
            <Button type="submit" style={{ width: '200px' }} variant="success">
              Đăng nhập
            </Button>
            <span>
              Đăng ký tài khoản&nbsp;
              <Link to="/register">Tại Đây.</Link>
            </span>
          </div>
        </Form>
        <span className={cx('or')}>Hoặc</span>

        <div className={cx('btn-login')}>
          <FacebookLogin
            appId="940619409929205"
            autoLoad={false}
            fields="name,email,picture"
            scope="public_profile,user_friends"
            callback={responseFacebook}
            icon="fa-facebook"
          />
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={false}
            className={cx('btn-login-google')}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default ModalLogin;
