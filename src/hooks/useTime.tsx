import { DateTime } from "luxon";
import { useState, useEffect } from "react";

export const useTime = (timeZone?: string) => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  useEffect(() => {
    const update = () => {
      const now = DateTime.now();

      const zoneAgnostic = timeZone ? now.setZone(timeZone) : now;

      const [hours, minutes, seconds]: string[] = zoneAgnostic
        .toLocaleString(DateTime.TIME_24_WITH_SECONDS)
        .split(":");

      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    };

    let interval = setInterval(() => update(), 500);

    return () => clearInterval(interval);
  }, []);

  return { hours, minutes, seconds };
};
