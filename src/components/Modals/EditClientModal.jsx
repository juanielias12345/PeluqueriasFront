import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteClientReducer,
  getUsersReducer,
  updateClientReducer,
} from "../../features/users/usersGetSlice";
import PhoneNumberComponent from "../../components/PhoneNumberComponent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "./EditClientModal.module.css";

const EditClientModal = (props) => {
  const dispatch = useDispatch();
  const editClientLoading = useSelector(
    (state) => state.usersStore.editClientLoading
  );
  const deleteClientLoading = useSelector(
    (state) => state.usersStore.deleteClientLoading
  );
  const errorRedux = useSelector((state) => state.usersStore.error);
  const [modalShow, setModalShow] = useState(false);
  const [clientSelected, setClientSelected] = useState({
    id: props.client._id,
    name: props.client.name,
    phone: props.client.phone,
    cuts: props.client.cuts,
  });

  const handleChangeSelectedClientData = (e) => {
    setClientSelected({
      ...clientSelected,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeClientPhone = (e) => {
    setClientSelected({
      ...clientSelected,
      phone: e,
    });
  };

  const deleteFromResultsDeletedClient = () => {
    const results = props.resultsSearch;
    const filterResults = results.filter((el) => el._id !== props.client._id);
    return filterResults;
  };

  const saveClientNewData = async () => {
    await dispatch(updateClientReducer(clientSelected));
    if (!editClientLoading && errorRedux === undefined) {
      toast("Se ha editado el cliente con exito");
      setModalShow(false);
      if (props.inputSearchFocus) {
        props.getClientByNameOrPhone();
      } else {
        await dispatch(getUsersReducer());
      }
    } else {
      toast("Ha ocurrido un error al editar el cliente, intenta de nuevo");
    }
  };

  const deleteClient = async () => {
    await dispatch(deleteClientReducer({ id: props.client._id }));
    if (!deleteClientLoading && errorRedux === undefined) {
      toast("Se ha eliminado el cliente con exito");
      setModalShow(false);
      if (props.inputSearchFocus) {
        props.handleChangeResultsState(deleteFromResultsDeletedClient());
      } else {
        await dispatch(getUsersReducer());
      }
    } else {
      toast("Ha ocurrido un error al eliminar el cliente, intenta de nuevo");
    }
  };

  return (
    <>
      <BsPencilSquare
        className={styles.editButton}
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
            Editar cliente
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.formContainer}>
            <AiOutlineDelete
              className={styles.buttonDelete}
              onClick={deleteClient}
            />
            <div className={styles.formSide}>
              <label htmlFor='inputName'>Nombre</label>
              <input
                onChange={handleChangeSelectedClientData}
                id='inputName'
                name='name'
                type='text'
                value={clientSelected.name}
              />
            </div>
            <div className={styles.formSide}>
              <label htmlFor='inputPhone'>Celular</label>
              <PhoneNumberComponent
                userData={props.client}
                setter={handleChangeClientPhone}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#cae5f0" }}>
          <button
            className={styles.buttonSubmit}
            disabled={
              editClientLoading || !props.client.name || !props.client.phone
            }
            onClick={saveClientNewData}
          >
            {!editClientLoading ? "Guardar" : "Guardando..."}
          </button>
          <button
            onClick={() => setModalShow(false)}
            className={styles.buttonCancel}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditClientModal;
