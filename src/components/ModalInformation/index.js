import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';

import { useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// api
import Information from './Information/index';
import PasswordRetrieval from './PasswordRetrieval';
import UpdateAddress from './UpdateAddress';
import Order from './Order';
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
  useEffect(() => {
    if (step) {
      if (step === '2') {
        setStep2(true);
        setStep1(false);
      }
      if (step === '3') {
        setStep3(true);
        setStep1(false);
      }
      if (step === '4') {
        setStep4(true);
        setStep1(false);
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
                  }}
                  // (step2 ? 'disabled' : '')
                >
                  Đơn hàng
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
                  }}
                >
                  Lấy lại mật khẩu
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
        {step4 === true ? <PasswordRetrieval /> : <></>}
      </Modal.Body>
    </Modal>
  );
};
export default ModalInformation;
