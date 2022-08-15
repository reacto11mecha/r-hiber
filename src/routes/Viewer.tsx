import { useEffect } from "react";
import shallow from "zustand/shallow";
import { useParams } from "react-router-dom";

import { useMachineState } from "@/stores/ViewerStore";

import styles from "styles/pages/Viewer.module.css";

import { UTCTimeClock } from "@/components/pages/Viewer/UTCTimeClock";
import { CapeCanaveralTimeClock } from "@/components/pages/Viewer/CapeCanaveralTimeClock";
import { LocalTimeClock } from "@/components/pages/Viewer/LocalTimeClock";
import { LocalTimeDate } from "@/components/pages/Viewer/LocalTimeDate";
import { ISConnectedCard } from "@/components/pages/Viewer/ISConnectedCard";
import { ReceivedTimeUNIX } from "@/components/pages/Viewer/ReceivedTimeUNIX";

export const Viewer = () => {
  const params = useParams();
  const { setConnectionStatus, setRecievedTime } = useMachineState(
    ({ setConnectionStatus, setRecievedTime }) => ({
      setConnectionStatus,
      setRecievedTime,
    }),
    shallow
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    window.telemetryAPI.connectToArduinoReciever(params.usbPath!);

    window.telemetryAPI.arduinoOnData((ev, data) => {
      setRecievedTime(data.time);
    });

    window.telemetryAPI.arduinoOnConnection((ev, status) =>
      setConnectionStatus(status.connected)
    );

    return () => {
      window.telemetryAPI.closeArduinoReceiver();
    };
  }, []);

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

      <div className={`flex one ${styles.flexMaximizer}`}>
        <div className={styles.cardContainer}>
          <ISConnectedCard />
        </div>

        <div className={styles.cardContainer}>
          <ReceivedTimeUNIX />
        </div>

        <div className={styles.cardContainer}></div>

        <div className={styles.cardContainer}></div>
      </div>

      <div className={`flex one ${styles.flexMaximizer}`}></div>

      <div className={`flex one ${styles.flexMaximizer}`}></div>

      <div className={`flex one ${styles.flexMaximizer}`}></div>
    </div>
  );
};
