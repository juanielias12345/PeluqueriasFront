import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { acceptCutReducer } from "../features/users/usersGetSlice";
import { getBarberReducer } from "../features/barber/barberGetSlice";
import styles from "./AddCutPage.module.css";
import noTokenGif from "../images/noTokenGif.gif";
import logo from "../images/logoTempestad.png";

const AddCutPage = () => {
  const dispatch = useDispatch();
  const token = useParams();
  const barber = useSelector((state) => state.barberStore.barber);
  const userCuts = useSelector((state) => state.usersStore.clientCuts.cut);
  const [validationLoading, setValidationLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState("");
  const acceptCutLoading = useSelector(
    (state) => state.usersStore.acceptCutLoading
  );
  const [accepted, setAccepted] = useState(false);

  const tokenValidation = async () => {
    const response = await axios.put("/tokenValidation", token);
    if (response.data === "El token no pertenece a ningun usuario") {
      setVerificationStatus("denied");
      setValidationLoading(false);
    } else if (response.data === "Usuario verificado") {
      setVerificationStatus("accepted");
      setValidationLoading(false);
    } else {
      setVerificationStatus("error");
      setValidationLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getBarberReducer());
    tokenValidation();
  }, [dispatch]);

  const acceptCut = () => {
    dispatch(acceptCutReducer(token));
    setAccepted(true);
  };

  if (validationLoading) {
    return <h1>Cargando...</h1>;
  } else {
    return (
      <div>
        {verificationStatus === "accepted" ? (
          <div className={styles.acceptContainer}>
            <img src={logo} alt='' />
            <button
              className={styles.acceptButton}
              disabled={accepted}
              onClick={acceptCut}
            >
              {acceptCutLoading ? "Cargando..." : "Aceptar corte"}
            </button>
            {accepted ? (
              userCuts === barber.freeAt ? (
                <p>Este es tu corte numero {userCuts}, y es gratis!</p>
              ) : (
                <p>
                  Este es tu corte numero {userCuts}/{barber.freeAt}
                </p>
              )
            ) : null}
          </div>
        ) : verificationStatus === "denied" || !token ? (
          <div className={styles.containerGif}>
            <h1 style={{ textTransform: "uppercase", color: "red" }}>Error</h1>
            <img
              style={{ width: "300px" }}
              src={noTokenGif}
              alt='No se detecto un token'
            />
            <p style={{ color: "red", fontSize: "1.5rem" }}>
              Debes escanear un QR valido
            </p>
          </div>
        ) : (
          <p>Error</p>
        )}
      </div>
    );
  }
};

export default AddCutPage;
