import { useEffect, useRef, useState } from "react";
import Plotly from "plotly.js-dist-min";
import shallow from "zustand/shallow";

const getPlotlyData = () => {
  const [AccXDatas, setterAccX] = useState({
    x: [],
    y: [],
    type: "scatter",
  });
  const [AccYDatas, setterAccY] = useState({
    x: [],
    y: [],
    type: "scatter",
  });
  const [AccZDatas, setterAccZ] = useState({
    x: [],
    y: [],
    type: "scatter",
  });

  useEffect(() => {
    const RcvrOnData = (event) => {
      setterAccX((prev) => ({
        x: [...prev.x, event.detail.time],
        y: [...prev.y, event.detail.data.AccX],
        type: "scatter",
      }));
      setterAccY((prev) => ({
        x: [...prev.x, event.detail.time],
        y: [...prev.y, event.detail.data.AccY],
        type: "scatter",
      }));
      setterAccZ((prev) => ({
        x: [...prev.x, event.detail.time],
        y: [...prev.y, event.detail.data.AccZ],
        type: "scatter",
      }));
    };

    window.addEventListener("telemetry:receiver-on-data", RcvrOnData);

    return () => {
      window.removeEventListener("telemetry:receiver-on-data", RcvrOnData);
    };
  }, []);

  return [AccXDatas, AccYDatas, AccZDatas];
};

export const Plotter = () => {
  const [AccXDatas, AccYDatas, AccZDatas] = getPlotlyData();
  const plotterRef = useRef(null!);

  useEffect(() => {
    Plotly.newPlot(plotterRef.current, [
      { x: [0], y: [0] },
      { x: [0], y: [0] },
      { x: [0], y: [0] },
    ]);
  }, []);

  useEffect(() => {
    Plotly.newPlot(plotterRef.current, [AccXDatas, AccYDatas, AccZDatas]);
  }, [AccXDatas, AccYDatas, AccZDatas]);

  return <div style={{ height: "100%" }} ref={plotterRef}></div>;
};
