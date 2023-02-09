import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  createClientReducer,
  getUsersReducer,
} from "../../features/users/usersGetSlice";
import PhoneNumberComponent from "../PhoneNumberComponent";
import { toast } from "react-toastify";
import styles from "./CreateUser.module.css";
import { BsPersonCircle } from "react-icons/bs";

const CreateUser = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const createClientLoading = useSelector(
    (state) => state.usersStore.createClientLoading
  );
  const reduxUserError = useSelector((state) => state.usersStore.error);
  const [newClient, setNewClient] = useState({
    name: "",
    phone: ""
  });

  const handleChangeNewClient = (e) => {
    setNewClient({
      ...newClient,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeClientPhone = (e) => {
    setNewClient({
      ...newClient,
      phone: e,
    });
  };

  const handleSubmitNewClient = async (e) => {
    e.preventDefault();
    await dispatch(createClientReducer(newClient));
    if (!createClientLoading && reduxUserError === undefined) {
      toast("Se ha creado el cliente con exito");
      setNewClient({
        name: "",
        phone: ""
      });
      setModalShow(false);
      dispatch(getUsersReducer());
    } else {
      toast("Ha ocurrido un error al crear el cliente, intenta de nuevo");
    }
  };

  const handleClickButtonAddClient = () => {
    setModalShow(true);
  };

  return (
    <div>
      <button className={styles.buttonAdd} onClick={handleClickButtonAddClient}>
        Agregar cliente
        <BsPersonCircle style={{ marginLeft: "5px" }} />
      </button>
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
            Agrega un nuevo cliente
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.formContainer}>
            <div className={styles.formSide}>
              <label htmlFor='inputName'>Nombre</label>
              <input
                onChange={handleChangeNewClient}
                id='inputName'
                name='name'
                type='text'
                value={newClient.name}
                autoComplete='off'
              />
            </div>
            <div className={styles.formSide}>
              <label htmlFor='inputPhone'>Celular</label>
              <PhoneNumberComponent
                userData={newClient}
                setter={handleChangeClientPhone}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#cae5f0" }}>
          <button
            className={styles.buttonSubmit}
            onClick={handleSubmitNewClient}
            disabled={
              createClientLoading || !newClient.name || !newClient.phone
            }
          >
            {!createClientLoading ? "Guardar" : "Guardando..."}
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

export default CreateUser;
