import styles from "styles/pages/Viewer.module.css";
import { useMachineState } from "@/stores/ViewerStore";

export const ISConnectedCard = () => {
  const isConnected = useMachineState((state) => state.isConnected);

  return (
    <article className={`card ${styles.cardStyle}`}>
      <footer className={styles.cardFooter}>
        <h3>Connected to Reciever</h3>
        <h4 className={styles.cardInfo}>
          {isConnected === null && "N/A"}
          {isConnected === true && "Connected"}
          {isConnected === false && "Disconnected"}
        </h4>
      </footer>
    </article>
  );
};
