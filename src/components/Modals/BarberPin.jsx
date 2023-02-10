import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./BarberPin.module.css";

const BarberPin = (props) => {
  const [loadingCreating, setLoadingCreating] = useState();
  const [denied, setDenied] = useState();
  const [pinInput, setPinInput] = useState("");

  const createBarberPinSubmit = async () => {
    try {
      setLoadingCreating(true);
      await axios.put("/setBarberPin", { id: props.barber._id, pin: pinInput });
      setLoadingCreating(false);
      props.acceptedPin()
    } catch (err) {
      console.log(err);
    }
  };

  const pinVerificator = () => {
    if (parseInt(pinInput) === parseInt(props.barber.pin)) {
      props.acceptedPin();
    } else {
      setDenied(true);
    }
  };

  useEffect(() => {
    setDenied(false);
  }, [pinInput]);

  return (
    <Modal {...props} backdrop={"static"}>
      <Modal.Header style={{ backgroundColor: "#2b2727" }}>
        <Modal.Title style={{ color: "white" }}>
          {props.barber.pin ? "Ingresa el PIN" : "Crea un nuevo PIN"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.barber.pin ? (
          <div className={styles.container}>
            <input
              className={denied ? styles.inputPinDenied : styles.inputPin}
              type='number'
              onChange={(e) => setPinInput(e.target.value)}
            />
            {denied ? <p className={styles.pDeniedInput}>PIN invalido</p> : null}
          </div>
        ) : (
          <div className={styles.container}>
            <input
              className={styles.inputPin}
              type='number'
              onChange={(e) => setPinInput(e.target.value)}
            />
            <p className={styles.pInfoInput}>El pin debe contener al menos cuatro digitos</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#cae5f0" }}>
        {props.barber.pin ? (
          <button className={styles.buttonSubmit} onClick={pinVerificator}>
            Acceder
          </button>
        ) : (
          <button
            className={styles.buttonSubmit}
            disabled={pinInput.length < 4 || loadingCreating}
            onClick={createBarberPinSubmit}
          >
            Crear PIN
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default BarberPin;
