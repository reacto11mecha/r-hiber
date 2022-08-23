import create from "zustand";
import { ReceiverOnData } from "@/types/global.d";

export interface IMachineState {
  receivedTime: number;
  isConnected: null | boolean;
  telemetryData: ReceiverOnData["data"];

  setTelemetryData: (telemetryData: ReceiverOnData["data"]) => void;
  setReceivedTime: (time: number) => void;
  setConnectionStatus: (isConnected: boolean) => void;
}

export const useMachineState = create<IMachineState>()((set) => ({
  receivedTime: 0,
  isConnected: null,

  telemetryData: {
    flightState: undefined,
    altitude: undefined,
    AccX: undefined,
    AccY: undefined,
    AccZ: undefined,
    roll: undefined,
    pitch: undefined,
    yaw: undefined,
  },

  setTelemetryData: (telemetryData: ReceiverOnData["data"]) =>
    set(() => ({ telemetryData })),
  setReceivedTime: (time: number) => set(() => ({ receivedTime: time })),
  setConnectionStatus: (isConnected: boolean) => set(() => ({ isConnected })),
}));

export interface PlotterStateData {
  time: number;
  flightState: number;
  altitude: number;
  AccX: number;
  AccY: number;
  AccZ: number;
  roll: number;
  pitch: number;
  yaw: number;
}

export interface IMachineStateForPlotly {
  telemetryData: IMachineState["telemetryData"][];
  pushData: (data: IMachineState["telemetryData"]) => void;
}

export const useMachineStateForPlotly = create<IMachineStateForPlotly>()(
  (set) => ({
    telemetryData: [],
    pushData: (data: IMachineState["telemetryData"]) =>
      set((items) => ({
        telemetryData: [...items.telemetryData, data],
      })),
  })
);
