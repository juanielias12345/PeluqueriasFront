import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./ClientDetailsModal.module.css";
import { useSelector } from "react-redux";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const ClientDetailsModal = (props) => {
  const barber = useSelector((state) => state.barberStore.barber);
  const userTurnsRedux = useSelector((state) => state.usersStore.clientTurns);
  const turnsLoading = useSelector((state) => state.usersStore.turnsLoading);
  const [turnPerPage, setTurnPerPage] = useState(8);
  const [userTurns, setUserTurns] = useState(
    userTurnsRedux.slice(0, turnPerPage)
  );

  useEffect(() => {
    setUserTurns(userTurnsRedux.slice(0, turnPerPage));
  }, [userTurnsRedux, turnPerPage]);

  return (
    <>
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header style={{ backgroundColor: "#2b2727" }}>
          <Modal.Title
            style={{ color: "white" }}
            id='contained-modal-title-vcenter'
          >
            Detalles del cliente
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {turnsLoading ? (
            <h1>Cargando</h1>
          ) : (
            <div className={styles.allDataContainer}>
              <div className={styles.dataContainer}>
                <div className={styles.data}>
                  <p className={styles.dataName}>Nombre</p>
                  <p className={styles.dataValue}>{props.client.name}</p>
                </div>
                <div className={styles.data}>
                  <p className={styles.dataName}>Celular</p>
                  <p className={styles.dataValue}>{props.client.phone}</p>
                </div>
              </div>
              <div className={styles.dataContainer}>
                <div className={styles.data}>
                  <p className={styles.dataName}>Cortes</p>
                  <p className={styles.dataValue}>
                    {props.client.cuts}/{barber.freeAt}
                  </p>
                </div>
                <div className={styles.data}>
                  <p className={styles.dataName}>Cortes en total</p>
                  <p className={styles.dataValue}>{props.client.totalCuts}</p>
                </div>
                <div className={styles.data}>
                  <p className={styles.dataName}>Ultimo corte</p>
                  <p className={styles.dataValue}>
                    {userTurnsRedux.length > 0
                      ? userTurnsRedux[userTurnsRedux.length - 1].date
                      : "No hay cortes"}
                  </p>
                </div>
              </div>
              <hr />
              {userTurnsRedux.length > 0 ? (
                <div className={styles.dataHistoryContainer}>
                  <h4>Registro</h4>
                  <div className={styles.dataHistoryContainer}>
                    {userTurns.map((turn, index) => {
                      return (
                        <div key={index}>
                          <p>{turn.date}</p>
                        </div>
                      );
                    })}
                  </div>
                  {userTurnsRedux.length > 8 ? (
                    turnPerPage > userTurnsRedux.length ||
                    turnPerPage === userTurnsRedux.length ? (
                      <MdOutlineKeyboardArrowUp
                        onClick={() => setTurnPerPage(8)}
                      />
                    ) : (
                      <MdOutlineKeyboardArrowDown
                        onClick={() => setTurnPerPage(turnPerPage + 8)}
                      />
                    )
                  ) : null}
                </div>
              ) : null}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#cae5f0" }}>
          <button className={styles.buttonCancel} onClick={props.onHide}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ClientDetailsModal;
