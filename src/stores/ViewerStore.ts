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
    temperature: undefined,
    pressure: undefined,
    altitude: undefined,
    seaLevelPressure: undefined,
    realAltitude: undefined,
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
