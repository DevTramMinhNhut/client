import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BiDetail } from 'react-icons/bi';
import { FcCancel } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import * as orderApi from '../../../api/order';
import moment from 'moment';

function Order() {
  const [orders, setOrders] = useState([]);
  const [deleteOrder, setDeleteOrder] = useState(false);

  useEffect(() => {
    let local = JSON.parse(localStorage.getItem('author'));
    const fetchAPI = async () => {
      if (local) {
        const data = await orderApi.get(`order?customer_id=${local.id}`);
        setOrders(data.orders);
        setDeleteOrder(false);
      }
    };
    fetchAPI();
  }, []);

  return (
    <Table bordered>
      <thead>
        <tr>
          <th>Mã hoá đơn</th>
          <th>Tổng đơn hàng</th>
          <th>Trạng thái</th>
          <th>Thanh toán</th>
          <th style={{ width: '400px' }}>Địa chỉ thanh toán</th>
          <th>Ngày đặt hàng</th>
          <th style={{ width: '120px' }}></th>
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
                    <Button variant="outline-success">
                      <BiDetail />
                    </Button>
                  </span>
                </OverlayTrigger>

                <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">Huỷ đơn</Tooltip>}>
                  <span className="d-inline-block">
                    <Link to="/">
                      <Button style={{ float: 'right' }} variant="outline-danger">
                        <FcCancel />
                      </Button>
                    </Link>
                  </span>
                </OverlayTrigger>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default Order;
