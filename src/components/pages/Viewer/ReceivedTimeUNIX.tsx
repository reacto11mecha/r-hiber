import shallow from "zustand/shallow";
import styles from "styles/pages/Viewer.module.css";
import { useMachineState } from "@/stores/ViewerStore";

export const ReceivedTimeUNIX = () => {
  const { isConnected, receivedTime } = useMachineState(
    ({ isConnected, receivedTime }) => ({ isConnected, receivedTime }),
    shallow
  );

  return (
    <article className={`card ${styles.cardStyle}`}>
      <footer className={styles.cardFooter}>
        <h3>Received data in UNIX Timestamp</h3>
        <h4 className={styles.cardInfo}>
          {!isConnected && "N/A"}
          {isConnected && receivedTime && `${receivedTime}`}
        </h4>
      </footer>
    </article>
  );
};
