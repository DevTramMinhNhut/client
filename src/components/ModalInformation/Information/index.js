import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useEffect } from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

// api
import * as customerApi from '../../../api/customer';
export const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
export const validPhone = new RegExp('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$');

const Information = () => {
  // call api
  const [customer, setCustomer] = useState({});
  const [file, setFile] = useState('');

  useEffect(() => {
    const fetchAPI = async () => {
      const local = await localStorage.getItem('author');
      const localCustomer = JSON.parse(local);
      const data = await customerApi.get(`customer?customer_id=${localCustomer.id}`);
      setCustomer(data.customers[0]);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    if (customer.customer_avatar) {
      setFile(`http://127.0.0.1:8887//${customer.customer_avatar}`);
    }
  }, [customer]);

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
    const { customer_gmail, customer_phone } = form;
    const newErrors = {};

    if (!validEmail.test(customer_gmail)) {
      newErrors.customer_gmail = 'Gmail không đúng định dạng';
    }
    if (!validPhone.test(customer_phone)) {
      newErrors.customer_phone = 'Số điên thoại không đúng định dạng';
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    if (!form.customer_name) {
      setForm({
        ...form,
        customer_name: customer.customer_name,
      });
    }
    event.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      event.preventDefault();
      axios
        .put(
          `http://localhost:3000/customer/${customer.customer_id}`,
          {
            customer_name: form.customer_name,
            customer_gmail: form.customer_gmail,
            customer_dob: form.customer_dob,
            customer_phone: form.customer_phone,
            customer_avatar: form.customer_avatar,
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then((res) => {
          toast.success(`Bạn cập nhật thông tin thàng công`, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((err) => {
          toast.error(`Bạn cập nhật thông tin thất bại`, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  const checkFile = () => {
    customer.customer_avatar = undefined;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row style={{ marginLeft: '80px' }}>
        <Row className="mb-4">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Tên khách hàng</Form.Label>
            <Form.Control
              type="text"
              name="customer_name"
              onChange={(e) => setField('customer_name', e.target.value)}
              defaultValue={customer.customer_name}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Loại tài khoản</Form.Label>
            <Form.Control type="text" defaultValue={customer.type} disabled />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              name="customer_phone"
              onChange={(e) => setField('customer_phone', e.target.value)}
              required
              defaultValue={customer.customer_phone}
              isInvalid={!!errors.customer_phone}
            />
            <Form.Control.Feedback type="invalid">{errors.customer_phone}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Ngày Sinh</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setField('customer_dob', e.target.value)}
              name="customer_dob"
              value={moment(customer.customer_dob).utc().format('YYYY-MM-DD')}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Gmail</Form.Label>
            <Form.Control
              type="text"
              name="customer_gmail"
              onChange={(e) => setField('customer_gmail', e.target.value)}
              required
              defaultValue={customer.customer_gmail}
              isInvalid={!!errors.customer_gmail}
            />
            <Form.Control.Feedback type="invalid">{errors.customer_gmail}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              type="file"
              name="customer_avatar"
              onChange={(e) => {
                checkFile();
                setFile(e.target.files[0]);
                setField('customer_avatar', e.target.files[0]);
              }}
              required
            />
          </Form.Group>
        </Row>
      </Row>

      <Row>
        <Col sm={7}>
          <div style={{ marginLeft: '90px' }} className="mb-2 modal-Login">
            <Button type="submit" style={{ width: '200px' }} variant="success">
              Cập nhật
            </Button>
          </div>
        </Col>
        <Col>
          <div>
            <img
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                border: '1px solid darkgray',
                objectFit: 'cover',
                backgroundColor: 'darkgray',
              }}
              src={
                file
                  ? customer.customer_avatar
                    ? file
                    : URL.createObjectURL(file)
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT8-e9Jpr1AyNwkdf_iE_zQjknFwrn3kBbQQ&usqp=CAU'
              }
              alt=""
            />
          </div>
        </Col>
      </Row>
    </Form>
  );
};
export default Information;
