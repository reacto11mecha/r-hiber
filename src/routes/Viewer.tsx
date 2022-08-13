import { DateTime } from "luxon";

import { useTime } from "@/hooks/useTime";

import styles from "styles/pages/Viewer.module.css";

const UTCTimeClock = () => {
  const { hours, minutes, seconds } = useTime("utc");

  return (
    <article className={`card ${styles.cardStyle}`}>
      <footer className={styles.cardFooter}>
        <h3>UTC Time</h3>
        <h4 className={styles.cardInfo}>
          <span>{hours}</span>
          <span>:</span>
          <span>{minutes}</span>
          <span>:</span>
          <span>{seconds}</span>
        </h4>
      </footer>
    </article>
  );
};

const CapeCanaveralTimeClock = () => {
  const { hours, minutes, seconds } = useTime("America/Chicago");

  return (
    <article className={`card ${styles.cardStyle}`}>
      <footer className={styles.cardFooter}>
        <h3>Time at Cape Canaveral</h3>
        <h4 className={styles.cardInfo}>
          <span>{hours}</span>
          <span>:</span>
          <span>{minutes}</span>
          <span>:</span>
          <span>{seconds}</span>
        </h4>
      </footer>
    </article>
  );
};

const LocalTimeClock = () => {
  const { hours, minutes, seconds } = useTime();

  return (
    <article className={`card ${styles.cardStyle}`}>
      <footer className={styles.cardFooter}>
        <h3>Local Time</h3>
        <h4 className={styles.cardInfo}>
          <span>{hours}</span>
          <span>:</span>
          <span>{minutes}</span>
          <span>:</span>
          <span>{seconds}</span>
        </h4>
      </footer>
    </article>
  );
};

const LocalTimeDate = () => {
  return (
    <article className={`card ${styles.cardStyle}`}>
      <footer className={styles.cardFooter}>
        <h3>Local Date</h3>
        <h4 className={styles.cardInfo}>
          {DateTime.now().toLocaleString(DateTime.DATE_FULL)}
        </h4>
      </footer>
    </article>
  );
};

export const Viewer = () => {
  return (
    <div className={`flex four ${styles.mainFlexContainer}`}>
      <div className={`flex one ${styles.flexMaximizer}`}>
        <div className={styles.cardContainer}>
          <UTCTimeClock />
        </div>

        <div className={styles.cardContainer}>
          <CapeCanaveralTimeClock />
        </div>

        <div className={styles.cardContainer}>
          <LocalTimeClock />
        </div>

        <div className={styles.cardContainer}>
          <LocalTimeDate />
        </div>
      </div>
    </div>
  );
};
