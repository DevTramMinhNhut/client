import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';

import { useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// api
import Information from './Information/index';
import UpdatePassword from './UpdatePassword';
import UpdateAddress from './UpdateAddress';
import Order from './Order';
import HistoryOrder from './HistoryOrder';
const ModalInformation = ({ setShowInfo, step }) => {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    setShowInfo(false);
  };
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [step5, setStep5] = useState(false);
  useEffect(() => {
    if (step) {
      if (step === '2') {
        setStep2(true);
        setStep1(false);
        setStep5(false);
      }
      if (step === '3') {
        setStep3(true);
        setStep1(false);
        setStep5(false);
      }
      if (step === '4') {
        setStep4(true);
        setStep1(false);
        setStep5(false);
      }
    }
  }, []);

  // call api

  return (
    <Modal show={show} fullscreen={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ width: '70%' }}>
          <Container>
            <Row>
              <Col key={1}>
                <Button
                  variant="success"
                  onClick={() => {
                    setStep1(true);
                    setStep2(false);
                    setStep3(false);
                    setStep4(false);
                    setStep5(false);
                  }}
                >
                  Cập nhật thông tin
                </Button>
              </Col>
              <Col key={2}>
                <Button
                  variant="primary"
                  onClick={() => {
                    setStep1(false);
                    setStep2(true);
                    setStep3(false);
                    setStep4(false);
                    setStep5(false);
                  }}
                >
                  Đơn hàng của bạn
                </Button>
              </Col>
              <Col key={2}>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setStep1(false);
                    setStep2(false);
                    setStep3(false);
                    setStep4(false);
                    setStep5(true);
                  }}
                >
                  Lịch sử mua hàng
                </Button>
              </Col>
              <Col key={3}>
                <Button
                  variant="info"
                  onClick={() => {
                    setStep1(false);
                    setStep2(false);
                    setStep3(true);
                    setStep4(false);
                    setStep5(false);
                  }}
                >
                  Cập nhật địa chỉ
                </Button>
              </Col>
              <Col key={4}>
                <Button
                  variant="warning"
                  onClick={() => {
                    setStep1(false);
                    setStep2(false);
                    setStep3(false);
                    setStep4(true);
                    setStep5(false);
                  }}
                >
                  Đổi mật khẩu
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step1 === true ? <Information /> : <></>}
        {step2 === true ? <Order /> : <></>}
        {step3 === true ? <UpdateAddress /> : <></>}
        {step4 === true ? <UpdatePassword /> : <></>}
        {step5 === true ? <HistoryOrder /> : <></>}
      </Modal.Body>
    </Modal>
  );
};
export default ModalInformation;
