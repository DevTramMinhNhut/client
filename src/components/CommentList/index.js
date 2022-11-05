import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { MdDeleteForever } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';

function CommentList({ commentList }) {
  const [comments, setComments] = useState([]);
  const [deleteComment, setDeleteComment] = useState(false);

  useEffect(() => {
    setComments(commentList);
  }, [commentList, deleteComment]);

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
      setDeleteComment(true);
    }
    return 0;
  };

  return (
    <>
      <Table bordered>
        <thead>
          <tr>
            <th>Stt</th>
            <th style={{ width: '400px' }}>Nội dung</th>
            <th>Số Sao</th>
            <th>Ngày bình luận</th>
            <th style={{ width: '70px' }}></th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{comment.comment_content} </td>
                <td>
                  {comment.comment_star === 1 ? (
                    <>
                      <AiFillStar size={24} style={{ color: 'yellow' }} />
                    </>
                  ) : (
                    <></>
                  )}{' '}
                   {comment.comment_star === 2 ? (
                    <>
                      <AiFillStar size={24} style={{ color: 'yellow' }} />
                      <AiFillStar size={24} style={{ color: 'yellow' }} />
                    </>
                  ) : (
                    <></>
                  )}{' '}
                   {comment.comment_star === 3 ? (
                    <>
                      <AiFillStar size={24} style={{ color: 'yellow' }} />
                      <AiFillStar size={24} style={{ color: 'yellow' }} />
                      <AiFillStar size={24} style={{ color: 'yellow' }} />
                    </>
                  ) : (
                    <></>
                  )}{' '}
                   {comment.comment_star === 4 ? (
                    <>
                      <AiFillStar size={24} style={{ color: 'yellow' }} />
                      <AiFillStar size={24} style={{ color: 'yellow' }} />
                      <AiFillStar size={24} style={{ color: 'yellow' }} />
                      <AiFillStar size={24} style={{ color: 'yellow' }} />
                    </>
                  ) : (
                    <></>
                  )}{' '}
                   {comment.comment_star === 5 ? (
                    <>
                      <AiFillStar size={24} style={{ color: 'yellow' }} />
                      <AiFillStar size={24} style={{ color: 'yellow' }} />
                      <AiFillStar size={24} style={{ color: 'yellow' }} />
                      <AiFillStar size={24} style={{ color: 'yellow' }} />
                      <AiFillStar size={24} style={{ color: 'yellow' }} />
                    </>
                  ) : (
                    <></>
                  )}{' '}
                </td>
                <td> {moment(comment.createdAt).utc().format('DD-MM-YYYY')}</td>
                <td style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">Xoá</Tooltip>}>
                    <span className="d-inline-block">
                      <Button
                        onClick={() => updateStatus(comment.comment_id)}
                        style={{ float: 'right' }}
                        variant="outline-danger"
                      >
                        <MdDeleteForever />
                      </Button>
                    </span>
                  </OverlayTrigger>
                </td>
              </tr>
            );
          })}
          <ToastContainer />
        </tbody>
      </Table>
    </>
  );
}

export default CommentList;
