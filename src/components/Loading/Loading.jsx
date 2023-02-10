import React from "react";
import styles from "./Loading.module.css";
import spinner from "../../images/loadingSpinner.svg";

const Loading = (props) => {
  const reloadPage = () => {
    window.location.reload();
  };

  if (props.screen === "fScreen") {
    return (
      <div className={styles.containerSpinner}>
        <p className={styles.loadingP}>Cargando</p>
        <img src={spinner} alt='Cargando' />
        {props.msg ? <p className={styles.msgFScreem}>{props.msg}</p> : null}
        <p className={styles.handleErrorP} onClick={reloadPage}>
          Algo ha salido mal? Pulsa aqui
        </p>
      </div>
    );
  } else if (props.screen === "table") {
    return (
      <div className={styles.containerSpinnerInTable}>
        <img className={styles.spinnerInTable} src={spinner} alt='Cargando' />
        {props.msg ? <p className={styles.msgTable}>{props.msg}</p> : null}
      </div>
    );
  }
};

export default Loading;
