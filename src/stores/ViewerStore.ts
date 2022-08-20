import create from "zustand";

export interface IMachineState {
  receivedTime: number;
  isConnected: null | boolean;
  altitude: number;
  velocity: number;

  setRecievedTime: (time: number) => void;
  setConnectionStatus: (isConnected: boolean) => void;
}

export const useMachineState = create<IMachineState>()((set) => ({
  receivedTime: 0,
  isConnected: null,
  altitude: 0,
  velocity: 0,

  setReceivedTime: (time: number) => set(() => ({ receivedTime: time })),
  setConnectionStatus: (isConnected: boolean) => set(() => ({ isConnected })),
}));
