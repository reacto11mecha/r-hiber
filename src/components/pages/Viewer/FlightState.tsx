import styles from "styles/pages/Viewer.module.css";

export const FlightState = () => (
  <article className={`card ${styles.cardStyle}`}>
    <footer className={styles.cardFooter}>
      <h3>Flight State</h3>
      <h4 className={styles.cardInfo}>
        <pre style={{ textAlign: "center" }}>Ground Idle</pre>
      </h4>
    </footer>
  </article>
);
