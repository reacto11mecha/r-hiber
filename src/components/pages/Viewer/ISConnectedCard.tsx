import { useParams } from "react-router-dom";
import styles from "styles/pages/Viewer.module.css";
import { useMachineState } from "@/stores/ViewerStore";

export const ISConnectedCard = () => {
  const params = useParams();
  const isConnected = useMachineState((state) => state.isConnected);

  return (
    <article className={`card ${styles.cardStyle}`}>
      <footer className={styles.cardFooter}>
        <h3>Connected to Reciever</h3>
        <h4 className={styles.cardInfo}>
          {isConnected === null && <p>N/A</p>}
          {isConnected === true && <p>Connected</p>}
          {isConnected === false && (
            <>
              <p>Disconnected</p>
              <button
                onClick={() =>
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  window.telemetryAPI.connectToArduinoReciever(params.usbPath!)
                }
              >
                Reconnect
              </button>
            </>
          )}
        </h4>
      </footer>
    </article>
  );
};
