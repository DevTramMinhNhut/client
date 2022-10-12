import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import style from './Login.css';
import classNames from 'classnames/bind';
import { useNavigate, NavLink } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import axios from 'axios';

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

  //login
  const [errorMessages, setErrorMessages] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [isSubmitted, setIsSubmitted] = useState(false);
  let navigate = useNavigate();

  // call api
  const [customer, setCustomer] = useState([]);
  const customerUsername = [];
  useEffect(() => {
    const fetchAPI = async () => {
      const data = await customerApi.get('customer');
      setCustomer(data.customers);
    };
    fetchAPI();
  }, []);
  const renderErrorMessage = (name) =>
    name === errorMessages.name && <div className="error">{errorMessages.message}</div>;

  const errors = {
    uname: 'invalid username',
    pass: 'invalid password',
  };

  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();
    var { uname, pass } = document.forms[0];
    // Find user login info
    for (let i = 0; i <= customer.length; i++) {
      const check = customer[i]?.account;
      // Compare user info
      if (check) {
        if (check.username === uname.value) {
          if (check.password !== pass.value) {
            // Invalid password
            setErrorMessages({ name: 'pass', message: errors.pass });
          } else {
            setIsSubmitted(true);
            localStorage.removeItem('authorGoogle');
            localStorage.removeItem('authorFb');
            localStorage.setItem('author', JSON.stringify(check));
            if (localStorage.getItem('author')) {
              navigate('/');
            }
          }
        } else {
          // Username not found
          setErrorMessages({ name: 'uname', message: errors.uname });
        }
      }
    }
  };

  const authLogin = {
    userID: '',
    username: '',
    picture: '',
  };
  // fb
  const responseFacebook = (response) => {
    authLogin.userID = response.userID;
    authLogin.username = response.name;
    authLogin.picture = response.picture.url;
    localStorage.removeItem('authorGoogle');
    localStorage.setItem('authorFb', JSON.stringify(authLogin));
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
    authLogin.userID = res.profileObj.googleId;
    authLogin.username = res.profileObj.name;
    authLogin.picture = res.profileObj.imageUrl;
    localStorage.removeItem('authorFb');
    localStorage.setItem('authorGoogle', JSON.stringify(authLogin));
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
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control type="text" placeholder="Tên đăng nhập" name="uname" required />
            {renderErrorMessage('uname')}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control type="password" name="pass" placeholder="Mật khẩu" required />
            {renderErrorMessage('pass')}
          </Form.Group>
          <div className="mb-2 modal-Login">
            <Button type="submit" variant="success">
              Đăng nhập
            </Button>
            <span>
              Đăng ký tài khoản&nbsp;
              <NavLink to="/register">Tại Đây.</NavLink>
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
