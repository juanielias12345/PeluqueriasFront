import React, { useState } from "react";
import PhoneNumberComponent from "../components/PhoneNumberComponent";
import { useDispatch, useSelector } from "react-redux";
import { createBarberReducer } from "../features/barber/barberGetSlice";
import { useEffect } from "react";
import styles from "./CreateBarber.module.css";

const CreateBarber = () => {
  const dispatch = useDispatch();
  const [barberData, setBarberData] = useState({
    name: "",
    phone: "",
    freeAt: 1,
  });
  const [error, setError] = useState({});
  const createBarberLoading = useSelector(
    (state) => state.barberStore.createBarberLoading
  );

  useEffect(() => {
    handleError();
  }, [barberData]);

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
    } else if (barberData.name.length < 2) {
      setError({ name: "El nombre debe contener al menos 2 caracteres" });
    } else if (barberData.phone.length === 0) {
      setError({ phone: "Escribe un numero de telefono" });
    } else if (barberData.phone.length < 10) {
      setError({ phone: "Escribe un numero de telefono valido" });
    } else {
      setError({});
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createBarberReducer(barberData));
  };

  return (
    <div className={styles.createBarberContainer}>
      <div className={styles.cardForm}>
        <h1>Crear barberia</h1>
        <p style={{ marginBottom: "10px" }}>(completa los datos)</p>
        <div className={styles.formContainer}>
          <div className={styles.formSide}>
            <label htmlFor='inputName'>Nombre</label>
            <input
            autoComplete="off"
              id='inputName'
              name='name'
              type='text'
              onChange={handleChangeBarberData}
            />
            {error.name ? <p className={styles.errorP}>{error.name}</p> : null}
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
        <div className={styles.buttonContainer}>
          <button
            className={styles.buttonSubmit}
            disabled={createBarberLoading || error.name || error.phone}
            onClick={onSubmit}
          >
            {createBarberLoading ? "Creando..." : "Completar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBarber;
