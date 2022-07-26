//Imports
import React, { Fragment, useState, useEffect } from "react";
import fraudStyles from "../styles/Fraud.module.css";
import homeStyles from "../styles/Home.module.css";
import YouTube from "react-youtube";

export default function IdFraud({ data }) {
  //State variables
  const [state, setState] = useState([]);
  const [notFraud, setNotFraud] = useState();
  //Check if fraud detected
  const isFraud = (status) => {
    if (status === true) {
      return "Fraude détectée";
    } else if (status === false) {
      return "Fraude non détectée";
    } else {
      return "Non jugée";
    }
  };
  //Change the state value of an article
  const handleNotFraud = (e) => {
    e.preventDefault();
    const formData = { notFraud };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    fetch(`/api/frauds/${data.id}`, options)
      .then((response) => response.json())
      .then((res) => {
        setNotFraud(res);
      })
      .catch((error) => console.log(error));
  };
  //Re render the object
  useEffect(() => {
    fetch(`/api/frauds/${data.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setState(res);
      })
      .catch((error) => console.log(error));
  }, [data.id]);

  const opts = {
    height: "256",
    width: "512",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <Fragment>
      <div className={homeStyles.container}>
        <main className={homeStyles.main}>
          <article className={homeStyles.card}>
            {data.fraud === true || null ? (
              <span className={fraudStyles.span}>
                A vérifier<button className={fraudStyles.pastille}></button>
              </span>
            ) : null}
            <div className={fraudStyles.cardContainer}>
              <div className={fraudStyles.cardContainerLeft}>
                <YouTube
                  className={fraudStyles.youtube}
                  videoId={data.video}
                  opts={opts}
                />
              </div>
              <div className={fraudStyles.cardContainerRight}>
                <h3 className={fraudStyles.titles}>Article concerné</h3>
                <p className={fraudStyles.p}>{data.productName}</p>
                <ul className={fraudStyles.ul}>
                  <li>Magasin : {data.storeId}</li>
                  <li>Panier : {data.cartId}</li>
                  <li>Status : {isFraud(data.fraud)}</li>
                </ul>
                <form onSubmit={handleNotFraud} className={fraudStyles.actions}>
                  <button
                    value={data.fraud}
                    onChange={(e) => setNotFraud(e.target.value)}
                    className={fraudStyles.successButton}
                  >
                    Non fraduleux
                  </button>
                  <button className={fraudStyles.dangerButton}>
                    A controler
                  </button>
                </form>
              </div>
            </div>
            <h3>Type d&apos;action : {data.fraudType}</h3>
          </article>
        </main>
      </div>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const response = await fetch(`http://localhost:3000/api/frauds/${id}`);
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch("http://localhost:3000/api/frauds");
  const data = await response.json();
  const paths = data.frauds.map((i) => ({
    params: { id: i.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}
