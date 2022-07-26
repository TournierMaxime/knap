//Imports
import React, { Fragment } from "react";
import Logo from "../../public/assets/images/logo-knap-title.dc9dee31.svg";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
export default function Nav({ children }) {
  return (
    <Fragment>
      <nav>
        <Link href="/">
          <a>
            <Image
              width={128}
              height={128}
              src={Logo}
              alt="Knap Logo"
              className={styles.logo}
            />
          </a>
        </Link>
      </nav>

      {children}
    </Fragment>
  );
}
