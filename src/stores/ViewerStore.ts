import create from "zustand";

export interface IMachineState {
  isConnected: boolean;
  altitude: number;
  velocity: number;
}

export const useMachineState = create<IMachineState>()(() => ({
  isConnected: false,
  altitude: 0,
  velocity: 0,
}));
