import React, { useState } from "react";
import PhoneNumberComponent from "../PhoneNumberComponent";
import { useDispatch, useSelector } from "react-redux";
import { editBarberReducer } from "../../features/barber/barberGetSlice";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { FiEdit } from "react-icons/fi";
import styles from "./EditBarberData.module.css";

const EditBarberData = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const barber = useSelector((state) => state.barberStore.barber);
  const [barberData, setBarberData] = useState({
    id: barber._id,
    name: barber.name,
    phone: barber.phone,
    freeAt: barber.freeAt,
  });
  const [error, setError] = useState({ equals: true });
  const editLoading = useSelector(
    (state) => state.barberStore.editBarberLoading
  );

  const handleChangeBarberData = (e) => {
    setBarberData({
      ...barberData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeBarberPhone = (e) => {
    setBarberData({
      ...barberData,
      phone: e,
    });
  };

  const handleError = () => {
    if (barberData.name.length === 0) {
      setError({ name: "Escribe un nombre" });
    } else if (barberData.phone.length === 0) {
      setError({ phone: "Escribe un numero de telefono" });
    } else if (barberData.phone.length < 10) {
      setError({ phone: "Escribe un numero de telefono valido" });
    } else if (
      barberData.name === barber.name &&
      barberData.phone === barber.phone &&
      barberData.freeAt === barber.freeAt
    ) {
      setError({ equals: true });
    } else {
      setError({});
    }
  };

  useEffect(() => {
    handleError();
  }, [barberData]);

  const onSubmit = (e) => {
    dispatch(editBarberReducer(barberData));
    if (!editLoading) {
      setModalShow(false);
    }
  };

  return (
    <div>
      <FiEdit
      className={styles.buttonOpenEditModal}
        onClick={() => setModalShow(true)}
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
            Editar datos de la barberia
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.formContainer}>
            <div className={styles.formSide}>
              <label htmlFor='inputName'>Nombre</label>
              <input
                id='inputName'
                name='name'
                type='text'
                onChange={handleChangeBarberData}
                value={barberData.name}
              />
              {error.name ? (
                <p className={styles.errorP}>{error.name}</p>
              ) : null}
            </div>
            <div className={styles.formSide}>
              <label htmlFor='inputPhone'>Celular</label>
              <PhoneNumberComponent
                userData={barberData}
                setter={handleChangeBarberPhone}
                error={error}
                onSubmit={onSubmit}
              />
              {error.phone ? (
                <p className={styles.errorP}>{error.phone}</p>
              ) : null}
            </div>
            <div className={styles.formSideFreeAt}>
              <label htmlFor='inputFreeAt'>
                Indica cada cuantos cortes viene uno gratis
              </label>
              <input
                min={1}
                value={barberData.freeAt}
                id='inputFreeAt'
                name='freeAt'
                type='number'
                onChange={handleChangeBarberData}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#cae5f0" }}>
          <button
            className={styles.buttonSubmit}
            onClick={onSubmit}
            disabled={error.name || error.phone || error.equals}
          >
            {editLoading ? "Guardando" : "Guardar"}
          </button>
          <button
            className={styles.buttonCancel}
            onClick={() => setModalShow(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditBarberData;
