import { IpcRendererEvent } from "electron";

export interface PortInfo {
  path: string;
  manufacturer: string | undefined;
  serialNumber: string | undefined;
  pnpId: string | undefined;
  locationId: string | undefined;
  productId: string | undefined;
  vendorId: string | undefined;
}

type TLMType = {
  sendListArduinoReciever: () => void;
  listenListArduinoReciever: (
    cb: (
      event: IpcRendererEvent,
      data: { error: boolean; data?: PortInfo[]; message?: string }
    ) => void
  ) => void;

  connectToArduinoReciever: (path: string) => void;
  arduinoOnData: (
    cb: (event: IpcRendererEvent, data: { time: number; raw: string }) => void
  ) => void;
  arduinoOnConnection: (
    cb: (event: IpcRendererEvent, data: { connected: boolean }) => void
  ) => void;

  closeArduinoReceiver: () => void;
};

declare global {
  interface Window {
    telemetryAPI: TLMType;
  }
}
