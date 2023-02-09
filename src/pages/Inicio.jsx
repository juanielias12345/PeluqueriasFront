import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import EditBarberData from "../components/Barber/EditBarberData";
import { ToastContainer } from "react-toastify";
import styles from "./Inicio.module.css";
import logo from "../images/logoTempestad.png";

const Inicio = () => {
  const barber = useSelector((state) => state.barberStore.barber);

  return (
    <div>
      <ToastContainer />
      <div className={styles.navBar}>
        <div className={styles.navBarLeft}>
          <h1>{barber.name}</h1>
        </div>
        <div className={styles.navBarRight}>
          <img src={logo} alt='' />
          <EditBarberData />
        </div>
      </div>
      <div className={styles.body}>
        <SearchBar />
      </div>
    </div>
  );
};

export default Inicio;
