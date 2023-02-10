import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { MdOutlineQrCode2 } from "react-icons/md";
import styles from "./GenerateQRModal.module.css";

const GenerateQRModal = (props) => {
  const [QRGenerated, setQRGenerated] = useState(false);
  const [token, setToken] = useState();
  const [modalShow, setModalShow] = useState(false);

  const generateQR = async (el) => {
    try {
      const response = await axios.post("/generateToken", {
        id: el._id,
      });
      setQRGenerated(true);
      setToken(response.data.token);
      setModalShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <MdOutlineQrCode2
        className={styles.QRCodeButton}
        onClick={() => generateQR(props.client)}
      />
      <Modal
        show={modalShow}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header style={{ backgroundColor: "#2b2727" }}>
          <Modal.Title
            style={{ color: "white" }}
            id='contained-modal-title-vcenter'
          >
            Escanea el QR
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ margin: "auto" }}>
          {QRGenerated ? (
            <QRCodeCanvas
              style={{ width: "180px", height: "auto" }}
              value={`https://peluquerias-front.vercel.app/cortes/${token}`}
            />
          ) : null}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#cae5f0" }}>
          <button
            className={styles.buttonCancel}
            onClick={() => setModalShow(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GenerateQRModal;
