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

export type ReceiverOnData = {
  time: number;
  data: {
    flightState: number | undefined;
    temperature: number | undefined;
    pressure: number | undefined;
    altitude: number | undefined;
    seaLevelPressure: number | undefined;
    realAltitude: number | undefined;
    AccX: number | undefined;
    AccY: number | undefined;
    AccZ: number | undefined;
    roll: number | undefined;
    pitch: number | undefined;
    yaw: number | undefined;
  };
  isPartial: boolean;
};
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
