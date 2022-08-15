import styles from "styles/pages/Viewer.module.css";
import { DateTime } from "luxon";

export const LocalTimeDate = () => (
  <article className={`card ${styles.cardStyle}`}>
    <footer className={styles.cardFooter}>
      <h3>Local Date</h3>
      <h4 className={styles.cardInfo}>
        {DateTime.now().toLocaleString(DateTime.DATE_FULL)}
      </h4>
    </footer>
  </article>
);
