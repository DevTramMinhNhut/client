import React, { useState, useEffect } from 'react';
import { Container, Row, Col, OverlayTrigger, Tooltip, Button, Image } from 'react-bootstrap';
import './Like.css';
import Table from 'react-bootstrap/Table';
import { AiTwotoneDelete } from 'react-icons/ai';
import * as favoriteApi from '../../api/favorite';
import moment from 'moment';
import axios from 'axios';

function ProductLike() {
  const [favorites, setFavorites] = useState([]);
  const [checkFavorites, setCheckFavorites] = useState(false);
  useEffect(() => {
    let local = JSON.parse(localStorage.getItem('author'));
    const fetchAPI = async () => {
      if (local) {
        const data = await favoriteApi.get(`favorite?customer_id=${local.id}`);
        setFavorites(data.favorites);
        setCheckFavorites(true);
      }
    };
    fetchAPI();
  }, [checkFavorites]);

  const deleteFavorite = (id_favorite) => {
    const agreeDelete = window.confirm(`Bạn có muốn huỷ yêu thích phẩm không ??`);
    if (agreeDelete) {
      axios.delete(`http://localhost:3000/favorite/${id_favorite}`);
      setCheckFavorites(false);
    }
    return 0;
  };

  return (
    <Container fluid="md">
      <Row className="like">
        <Col sm={12} className="mt-2">
          <h5>Sản phẩm yêu thích của bạn</h5>
        </Col>
        <Col sm={12} className="mt-2">
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Nhà cung cấp</th>
                <th>Ngày yêu thích</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((favorite, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td style={{ width: '100px', height: '80px' }}>
                      <Image
                        style={{ width: '100%', height: '100%' }}
                        src={`http://127.0.0.1:8887//${favorite.product?.images[0].image_name}`}
                        alt="First slide"
                      />
                    </td>
                    <td style={{ width: '420px' }}>{favorite.product?.product_name}</td>
                    <td>{favorite.product?.provider}</td>
                    <td>{moment(favorite.createdAt).utc().format('DD-MM-YYYY H:mm:ss')} </td>
                    <td>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip id="tooltip-disabled">Huỷ yêu thích</Tooltip>}
                      >
                        <span className="d-inline-block">
                          <Button
                            onClick={() => deleteFavorite(favorite.favorite_id)}
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
        </Col>
      </Row>
    </Container>
  );
}

export default ProductLike;
