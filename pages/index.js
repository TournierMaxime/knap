import styles from "../styles/Home.module.css";
import Link from "next/link";
import moment from "moment";
export default function Home({ data }) {
  const isFraud = (status) => {
    if (status === true) {
      return "Fraude détectée";
    } else if (status === false) {
      return "Fraude non détectée";
    } else {
      return "Non jugée";
    }
  };

  return data.frauds
    .sort(function (a, b) {
      if (a.timestamp) {
        return new Date(b.timestamp) - new Date(a.timestamp);
      }
    })
    .map((i, index) => {
      return (
        <div className={styles.container} key={index}>
          <main className={styles.main}>
            <article className={styles.card}>
              <h1>{i.productName}</h1>
              Status : {isFraud(i.fraud)}
              <br />
              <small>Date {moment(i.timestamp).format("DD/MM/YYYY")}</small>
              <div>
                <button className={styles.button}>
                  <Link href={`/${i.id.toString()}`}>
                    <a className={styles.link}>Consulter</a>
                  </Link>
                </button>
              </div>
            </article>
          </main>
        </div>
      );
    });
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:3000/api/frauds");
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
}
