import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import style from './Login.css';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiUser } from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';

// fb
import FacebookLogin from 'react-facebook-login';

//google
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

// api
import * as customerApi from '../../api/customer';
import ReCAPTCHA from 'react-google-recaptcha';
const cx = classNames.bind(style);

const ModalLogin = ({ setShowModal }) => {
  const [show, setShow] = useState(true);
  const recaptchaRef = React.useRef();
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
            newErrors.password = 'M???t kh???u kh??ng ????ng vui l??ng nh???p l???i';
          }
        }
      }
    }
    if (checkUsername.includes(username) === false) {
      newErrors.username = 'T??n ????ng nh???p kh??ng t???n t???i';
    }

    return newErrors;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      authLogin.username = form.username;
      event.preventDefault();
      localStorage.setItem('author', JSON.stringify(authLogin));
      setShowModal(false);
      toast.success('????ng nh???p th??nh c??ng', {
        position: 'top-right',
        autoClose: 1000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
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
          toast.success('????ng nh???p FaceBook th??nh c??ng', {
            position: 'top-right',
            autoClose: 1000,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((err) => {
          toast.error('????ng nh???p FaceBook th???t b???i', {
            position: 'top-right',
            autoClose: 1000,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
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
          toast.success('????ng nh???p Google th??nh c??ng', {
            position: 'top-right',
            autoClose: 1000,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          setShowModal(false);
        })
        .catch((err) => {
          toast.error('????ng nh???p Google th???t b???i', {
            position: 'top-right',
            autoClose: 1000,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          setShowModal(true);
        });
    }
    setShowModal(false);
  };
  const onFailure = (err) => {
    toast.error('????ng nh???p th???t b???i vui l??ng nh???p l???i !!!', {
      position: 'top-right',
      autoClose: 1000,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    setShowModal(true);
  };

  const changeCapCha = async () => {
    // eslint-disable-next-line no-unused-vars
    const token = await recaptchaRef.current.executeAsync();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>????ng Nh???p</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>T??n ????ng nh???p <BiUser /> </Form.Label>
            <Form.Control
              type="text"
              placeholder="T??n ????ng nh???p"
              name="username"
              onChange={(e) => setField('username', e.target.value)}
              required
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>M???t kh???u <RiLockPasswordLine size='22' /></Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setField('password', e.target.value)}
              name="password"
              placeholder="M???t kh???u"
              required
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
          <ReCAPTCHA ref={recaptchaRef} onChange={changeCapCha} sitekey="6LdNR9ciAAAAAHX13MF67ewO3X9hyPLophMI6rd1" />
          <div className="mb-2 modal-Login center">
            <Button type="submit" style={{ width: '200px', marginLeft: '30%' }} variant="success">
              ????ng nh???p
            </Button>
          </div>
        </Form>
        <span className={cx('or')}>Ho???c</span>

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
