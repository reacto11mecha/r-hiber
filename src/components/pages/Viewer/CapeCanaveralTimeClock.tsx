import styles from "styles/pages/Viewer.module.css";
import { useTime } from "@/hooks/useTime";

export const CapeCanaveralTimeClock = () => {
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
