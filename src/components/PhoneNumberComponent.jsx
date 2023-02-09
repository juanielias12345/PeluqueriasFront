import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./PhoneNumberComponent.module.css";

const PhoneNumberComponent = (props) => {
  return (
    <PhoneInput
      containerClass={styles.container}
      inputClass={styles.input}
      buttonClass={styles.button}
      dropdownClass={styles.dropdown}
      inputProps={{ name: "phone", id: "inputPhone", autoComplete: "off"}}
      country='ar'
      onlyCountries={["ar", "es", "uy", "cl"]}
      value={props.userData.phone}
      onChange={props.setter}
    />
  );
};

export default PhoneNumberComponent;
