export interface PortInfo {
  path: string;
  manufacturer: string | undefined;
  serialNumber: string | undefined;
  pnpId: string | undefined;
  locationId: string | undefined;
  productId: string | undefined;
  vendorId: string | undefined;
}
export interface ArduinoList {
  list: PortInfo[];
}
export type ArduinoListError = Error;

export interface ReceiverOnData {
  time: number;
  raw: string;
}
export interface ReceiverOnConnection {
  connected: boolean;
}
export type ReceiverOnError = Error;

type TLMType = {
  sendListArduinoReceiver: () => void;

  connectToArduinoReceiver: (path: string) => void;
  closeArduinoReceiver: () => void;
};

declare global {
  interface Window {
    telemetryAPI: TLMType;
  }

  interface WindowEventMap {
    "telemetry:on-arduino-list": CustomEvent<ArduinoList>;
    "telemetry:on-arduino-list-error": CustomEvent<ArduinoListError>;

    "telemetry:receiver-on-data": CustomEvent<ReceiverOnData>;
    "telemetry:receiver-connection-status": CustomEvent<ReceiverOnConnection>;
    "telemetry:receiver-on-error": CustomEvent<ReceiverOnError>;
  }
}
