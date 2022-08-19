import { useEffect } from "react";
import shallow from "zustand/shallow";
import { useParams } from "react-router-dom";

import { useMachineState } from "@/stores/ViewerStore";

import { Flex, HStack, VStack } from "@chakra-ui/react";

import { TemplateTimeClock } from "@/components/pages/Viewer/TemplateTimeClock";
import { ISConnectedCard } from "@/components/pages/Viewer/ISConnectedCard";
import { ReceivedTimeUNIX } from "@/components/pages/Viewer/ReceivedTimeUNIX";
import { FlightState } from "@/components/pages/Viewer/FlightState";

export const Viewer = () => {
  const params = useParams();
  const { setConnectionStatus, setRecievedTime } = useMachineState(
    ({ setConnectionStatus, setRecievedTime }) => ({
      setConnectionStatus,
      setRecievedTime,
    }),
    shallow
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    window.telemetryAPI.connectToArduinoReciever(params.usbPath!);

    window.telemetryAPI.arduinoOnData((ev, data) => {
      setRecievedTime(data.time);
    });

    window.telemetryAPI.arduinoOnConnection((ev, status) =>
      setConnectionStatus(status.connected)
    );

    window.telemetryAPI.arduinoOnError((ev, error) => {
      console.error(error.message);
    });

    return () => {
      window.telemetryAPI.closeArduinoReceiver();
    };
  }, []);

  return (
    <Flex w="100vw" h="90vh">
      <Flex w="20%">
        <VStack w="100%" spacing={5}>
          <TemplateTimeClock timeZone="utc" headingText="UTC Time" />
          <TemplateTimeClock timeZone="Asia/Jakarta" headingText="WIB Time" />
          <TemplateTimeClock timeZone="Asia/Makassar" headingText="WITA Time" />
          <TemplateTimeClock timeZone="Asia/Jayapura" headingText="WIT Time" />
        </VStack>
      </Flex>

      <Flex w="20%">
        <VStack w="100%" spacing={5}>
          <ISConnectedCard />
          {/* <ReceivedTimeUNIX />
          <FlightState /> */}
        </VStack>
      </Flex>

      <Flex w="auto">
        <VStack w="100%"></VStack>
      </Flex>
    </Flex>
  );
};
