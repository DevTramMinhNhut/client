import style from './Login.css';
import classNames from 'classnames/bind';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

// fb
import FacebookLogin from 'react-facebook-login';

//google
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

// api
import * as customerApi from '../../api/customer';
const cx = classNames.bind(style);

function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  let navigate = useNavigate();

  // call api
  const [customer, setCustomer] = useState([]);
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
    for (let i = 0; i <= customer.length; i++) {
      const check = customer[i]?.account;
      // Compare user info
      if (check) {
        console.log(check.username);
        if (check.username === uname.value) {
          if (check.password !== pass.value) {
            // Invalid password
            setErrorMessages({ name: 'pass', message: errors.pass });
          } else {
            setIsSubmitted(true);
            let time = new Date();
            check.time = time.setHours(time.getDate() + 7);
            if (isCheck === true) {
              check.time = time.setHours(time.getDate() + 7);
            } else {
              check.time = time.setHours(time.getDate());
            }
            localStorage.removeItem('authorGoogle');
            localStorage.removeItem('authorFb');
            localStorage.setItem('author', JSON.stringify(check));

            // navigate('/');
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
    name: '',
    picture: '',
  };
  // fb
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const responseFacebook = (response) => {
    setData(response);
    if (response.accessToken) {
      setLogin(true);
      authLogin.userID = data.userID;
      authLogin.name = data.name;
      authLogin.picture = data.picture.data.url;
      localStorage.removeItem('authorGoogle');
      localStorage.setItem('authorFb', JSON.stringify(authLogin));
      if (localStorage.getItem('authorFb')) {
        navigate('/');
      }
    } else {
      setLogin(false);
    }
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
    console.log('success:', res);
    authLogin.userID = res.profileObj.googleId;
    authLogin.name = res.profileObj.name;
    authLogin.picture = res.profileObj.imageUrl;
    localStorage.removeItem('authorFb');
    localStorage.setItem('authorGoogle', JSON.stringify(authLogin));
    if (localStorage.getItem('authorGoogle')) {
      navigate('/');
    }
    console.log('success:', res);
  };
  const onFailure = (err) => {
    console.log('failed:', err);
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
          <FacebookLogin
            appId="940619409929205"
            autoLoad={false}
            fields="name,email,picture"
            scope="public_profile,user_friends"
            callback={responseFacebook}
            cssClass="my-facebook-button-class"
            icon="fa-facebook"
          />
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={false}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
