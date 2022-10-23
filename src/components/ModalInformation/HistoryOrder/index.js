import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BiDetail } from 'react-icons/bi';
import { FcCancel } from 'react-icons/fc';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import * as orderApi from '../../../api/order';
import moment from 'moment';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Col, Image, Row } from 'react-bootstrap';

function HistoryOrder() {
  const [orders, setOrders] = useState([]);
  const [deleteOrder, setDeleteOrder] = useState(false);
  const [detail, setDetail] = useState(false);
  const [orderDetail, setOrderDetail] = useState();
  const [orderDetailProduct, setOrderDetailProduct] = useState();

  useEffect(() => {
    let local = JSON.parse(localStorage.getItem('author'));
    const fetchAPI = async () => {
      if (local) {
        const data = await orderApi.get(`order?customer_id=${local.id}&&soft_Delete=1`);
        setOrders(data.orders);
        setDeleteOrder(false);
      }
    };
    fetchAPI();
  }, [deleteOrder]);

  const changDetail = (order_id) => {
    setDetail(!detail);
    const detailOrder = orders.filter((order) => order.order_id === order_id);
    if (detailOrder) {
      setOrderDetail(detailOrder);
      setOrderDetailProduct(detailOrder[0].order_details);
    }
  };

  const updateStatus = (order_id) => {
    const agreeDelete = window.confirm(`Bạn có muốn huỷ đơn ${order_id} không ??`);
    if (agreeDelete) {
      axios
        .put(
          `http://localhost:3000/order/status/${order_id}`,
          {
            status: 'Huỷ đơn',
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          if (res) {
            toast.success(`Huỷ đơn thành công`, {
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
            toast.error(`Huỷ đơn không thành công`, {
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
      setDeleteOrder(true);
    }
    return 0;
  };

  return (
    <>
      {!detail ? (
        <Table bordered>
          <thead>
            <tr>
              <th>Mã hoá đơn</th>
              <th>Tổng đơn hàng</th>
              <th>Trạng thái</th>
              <th>Thanh toán</th>
              <th style={{ width: '400px' }}>Địa chỉ thanh toán</th>
              <th>Ngày đặt hàng</th>
              <th style={{ width: '50px' }}></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              return (
                <tr key={index}>
                  <td>{order.order_id}</td>
                  <td>
                    {order.order_total.toLocaleString('vi', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </td>
                  <td>{order.order_status?.status} </td>
                  <td>{order.order_payment} </td>
                  <td>{order.address} </td>
                  <td> {moment(order.createdAt).utc().format('DD-MM-YYYY')}</td>
                  <td style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">Xem chi tiết</Tooltip>}>
                      <span className="d-inline-block">
                        <Button onClick={() => changDetail(order.order_id)} variant="outline-success">
                          <BiDetail />
                        </Button>
                      </span>
                    </OverlayTrigger>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <>
          <Row>
            <Col sm={8}></Col>
            <Col sm={4}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '18px', fontWeight: '600' }}>Thông tin đơn hàng </div>
                <div>
                  <Button variant="primary" onClick={() => setDetail(!detail)}>
                    Quay lại trang trước
                  </Button>{' '}
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              {orderDetailProduct.map((product, index) => (
                <div key={index} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <Image
                      style={{ width: '150px', height: '100px' }}
                      src={`http://127.0.0.1:8887//${product.product.images[0].image_name}`}
                      alt="loi"
                    />
                  </div>
                  <div style={{ marginRight: '100px' }}>{product.product.product_name}</div>
                  <div>
                    <strong>
                      {product.detail_price.toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </strong>
                    <br />
                    <strong>{product.detail_quantity}</strong> sản phẩm
                  </div>
                </div>
              ))}
            </Col>
            <Col sm={4} style={{ borderLeft: '1px solid black ' }}>
              <br />
              <div>
                {' '}
                <span style={{ fontSize: '16px', fontWeight: '600' }}> Địa chỉ giao hàng: </span>{' '}
                {orderDetail[0]?.address}
              </div>
              <br />
              <div>
                {' '}
                <span style={{ fontSize: '16px', fontWeight: '600' }}>Hình thức thanh toán: </span>{' '}
                {orderDetail[0]?.order_payment}
              </div>
              <br />
              <div>
                {' '}
                <span style={{ fontSize: '16px', fontWeight: '600' }}>Trạng thái đơn hàng: </span>{' '}
                {orderDetail[0]?.order_status.status}
              </div>
              <br />
              <div>
                {' '}
                <span style={{ fontSize: '16px', fontWeight: '600' }}>Ngày cập nhật đơn hàng: </span>{' '}
                {moment(orderDetail[0]?.order_status.updatedAt).utc().format('DD-MM-YYYY HH:mm:ss')}
              </div>
              <br />
              <div>
                {' '}
                <span style={{ fontSize: '16px', fontWeight: '600' }}>Tổng đơn hàng: </span>{' '}
                {orderDetail[0]?.order_total.toLocaleString('vi', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default HistoryOrder;
