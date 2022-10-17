import { Button, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { GrUpdate } from 'react-icons/gr';
import { AiTwotoneDelete } from 'react-icons/ai';

import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import * as customerApi from '../../../api/customer';
import * as addressApi from '../../../api/address';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateAddress() {
  const [customer, setCustomer] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [idAuthor, setIdAuthor] = useState();
  const [checkAddress, setCheckAddress] = useState(false);

  useEffect(() => {
    let local = JSON.parse(localStorage.getItem('author'));
    const fetchAPI = async () => {
      if (local) {
        setIdAuthor(local.id);
        const data = await customerApi.get(`customer?customer_id=${local.id}`);
        setCustomer(data.customers);
        setCheckAddress(false);
      }
    };
    fetchAPI();
  }, [checkAddress]);

  useEffect(() => {
    if (customer.length > 0) {
      setAddresses(customer[0].addresses);
    }
  }, [customer]);

  //api address
  const [cities, setCities] = useState([]);
  const [address, setAddress] = useState();
  const [district, setDistrict] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await addressApi.get(`https://provinces.open-api.vn/api/`);
      setCities(data);
    };
    fetchAPI();
  }, []);

  const changCity = (city_id) => {
    const fetchAPI = async () => {
      const data = await addressApi.get(`https://provinces.open-api.vn/api/p/${city_id}?depth=2`);
      setAddress(data.name);
      setDistrict(data.districts);
    };
    fetchAPI();
  };
  const changDistrict = (district_id) => {
    const fetchAPI = async () => {
      const data = await addressApi.get(`https://provinces.open-api.vn/api/d/${district_id}?depth=2`);
      setAddress(address + ', ' + data.name);
      setWards(data.wards);
    };
    fetchAPI();
  };

  const changWards = (ward_id) => {
    const fetchAPI = async () => {
      const data = await addressApi.get(`https://provinces.open-api.vn/api/w/${ward_id}?depth=2`);
      setAddress(address + ', ' + data.name);
    };
    fetchAPI();
  };

  const checkText = (value) => {
    setAddress(address + ', ' + value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        `http://localhost:3000/customer/address/`,
        {
          address: address,
          customer_id: idAuthor,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        if (res) {
          toast.success(`Bạn thêm địa chỉ thành công`, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        if (err) {
          toast.error(`Bạn thêm địa chỉ không thành công`, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  const deleteAddress = (id_address) => {
    const agreeDelete = window.confirm(`Bạn có muốn xóa địa chỉ này không ??`);
    if (agreeDelete) {
      axios.delete(`http://localhost:3000/customer/address/${id_address}`);
      toast.info('Xoá địa chỉ thành công', {
        position: 'top-right',
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setCheckAddress(true);
    }
    return 0;
  };

  return (
    <>
      <Row>
        <Col sm={4}>
          <h6>Tạo địa chỉ </h6>
        </Col>
        <Col sm={7}>
          <h6> Địa chỉ của bạn </h6>
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Select
              required="required"
              onChange={(e) => changCity(e.target.value)}
              aria-label="Default select example"
            >
              <option value="0">Tỉnh</option>
              {cities.map((city, index) => {
                return (
                  <>
                    <option key={index} value={city.code}>
                      {city.name}
                    </option>
                  </>
                );
              })}
            </Form.Select>
            <Form.Select
              onChange={(e) => {
                changDistrict(e.target.value);
              }}
              className={'mt-3'}
              aria-label="Default select example"
            >
              <option value="0">Huyện</option>
              {district.map((district, index) => {
                return (
                  <>
                    <option key={index} value={district.code}>
                      {district.name}
                    </option>
                  </>
                );
              })}
            </Form.Select>
            <Form.Select
              onChange={(e) => {
                changWards(e.target.value);
              }}
              required
              className={'mt-3'}
              aria-label="Default select example"
            >
              <option value="0">Xã</option>
              {wards.map((ward, index) => {
                return (
                  <>
                    <option key={index} value={ward.code}>
                      {ward.name}
                    </option>
                  </>
                );
              })}
            </Form.Select>

            <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Ấp - Tên đường - Số nhà</Form.Label>
              <Form.Control
                onBlur={(e) => {
                  checkText(e.target.value);
                }}
                as="textarea"
                required
                rows={3}
              />
            </Form.Group>
            <Button
              type="submit"
              onClick={() => {
                setCheckAddress(true);
              }}
              variant="info"
            >
              Cập nhật địa chỉ
            </Button>
          </Form>
        </Col>
        <Col sm={8}>
          <Table bordered>
            <thead>
              <tr>
                <th>Stt</th>
                <th style={{ width: '600px' }}>Địa chỉ</th>
                <th>Ngày tạo</th>
                <th style={{ width: '110px' }}></th>
              </tr>
            </thead>
            <tbody>
              {addresses?.map((address, stt) => {
                return (
                  <tr key={stt}>
                    <td>{stt + 1}</td>
                    <td>{address.address}</td>

                    <td> {moment(address.createdAt).utc().format('DD-MM-YYYY')}</td>
                    <td style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip id="tooltip-disabled">Cập nhật địa chỉ</Tooltip>}
                      >
                        <span className="d-inline-block">
                          <Button variant="outline-success">
                            <GrUpdate />
                          </Button>
                        </span>
                      </OverlayTrigger>

                      <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">Xoá địa chỉ</Tooltip>}>
                        <span className="d-inline-block">
                          <Button
                            onClick={() => deleteAddress(address.address_id)}
                            style={{ float: 'right' }}
                            variant="outline-danger"
                          >
                            <AiTwotoneDelete />
                          </Button>
                        </span>
                      </OverlayTrigger>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {/* <ToastContainer /> */}
        </Col>
      </Row>
    </>
  );
}

export default UpdateAddress;
