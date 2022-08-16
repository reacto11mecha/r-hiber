import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import type { PortInfo } from "@/types/global.d";

import styles from "styles/pages/Home.module.css";

export const Home = () => {
  const [arduinos, setArduinos] = useState<null | PortInfo[]>(null);

  useEffect(() => {
    window.telemetryAPI.listenListArduinoReciever((event, data) => {
      if (!data.error && data.data) setArduinos(data.data);
    });

    window.telemetryAPI.arduinoGetListOnError((ev, error) => {
      console.log(error);
    });

    window.telemetryAPI.sendListArduinoReciever();
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <article className={`card ${styles.cardStyle}`}>
          <footer>
            <h1>List Arduino</h1>
            {!arduinos && <p>Sedang mengambil data...</p>}
            {arduinos && arduinos.length < 1 && (
              <>
                <p>Tidak ditemukan adanya arduino penerima telemetri</p>
                <button
                  onClick={() => {
                    setArduinos(null);
                    window.telemetryAPI.sendListArduinoReciever();
                  }}
                >
                  Ambil data ulang
                </button>
              </>
            )}
            {arduinos && arduinos.length > 0 && (
              <ul>
                {arduinos.map((arduino) => (
                  <li key={arduino.path}>
                    {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
                    <Link to={`viewer/${encodeURIComponent(arduino.path!)}`}>
                      {arduino.path}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </footer>
        </article>
      </div>
    </div>
  );
};
