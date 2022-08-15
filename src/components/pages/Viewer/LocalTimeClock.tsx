import styles from "styles/pages/Viewer.module.css";
import { useTime } from "@/hooks/useTime";

export const LocalTimeClock = () => {
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
