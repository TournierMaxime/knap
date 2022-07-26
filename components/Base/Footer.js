//Imports
import React, { Fragment } from "react";
import styles from "../../styles/Home.module.css";

export default function Footer({ children }) {
  const newDate = new Date();
  const currentDate = newDate.getFullYear();
  return (
    <Fragment>
      <footer className={styles.footer}>
        <p className="content has-text-centered">Kanp &copy; {currentDate}</p>
      </footer>

      {children}
    </Fragment>
  );
}
