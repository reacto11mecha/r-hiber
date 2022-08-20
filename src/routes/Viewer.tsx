import { useEffect } from "react";
import shallow from "zustand/shallow";
import { useParams } from "react-router-dom";

import { useMachineState } from "@/stores/ViewerStore";

import {
  Flex,
  Stack,
  HStack,
  VStack,
  useToast,
  useColorMode,
} from "@chakra-ui/react";

import { TemplateTimeClock } from "@/components/pages/Viewer/TemplateTimeClock";
import { ISConnectedCard } from "@/components/pages/Viewer/ISConnectedCard";
import { ReceivedTimeUNIX } from "@/components/pages/Viewer/ReceivedTimeUNIX";
import { FlightState } from "@/components/pages/Viewer/FlightState";

import type { ReceiverOnData, ReceiverOnConnection, ReceiverOnError } from "@/types/global.d";

export const Viewer = () => {
  const params = useParams();
  const toast = useToast();

  const { colorMode, toggleColorMode } = useColorMode();
  const isConnected = useMachineState((state) => state.isConnected);
  const { setConnectionStatus, setReceivedTime } = useMachineState(
    ({ setConnectionStatus, setReceivedTime }) => ({
      setConnectionStatus,
      setReceivedTime,
    }),
    shallow
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!isConnected)
      window.telemetryAPI.connectToArduinoReceiver(params.usbPath!);

    const RcvrOnData = (event: CustomEvent<ReceiverOnData>) => {
      setReceivedTime(event.detail.time)
    }
    const RcvrConnectionStatus = (event: CustomEvent<ReceiverOnConnection>) => {
      setConnectionStatus(event.detail.connected);

      if (event.detail.connected)
        toast({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: `Connected to ${params.usbPath!} successfully`,
          position: "bottom-right",
          status: "success",
        });
    }
    const RcvrOnError = (event: CustomEvent<ReceiverOnError>) => {
      toast({
        title: event.detail.message,
        position: "bottom-right",
        status: "error",
      });
    }

    window.addEventListener("telemetry:receiver-on-data", RcvrOnData)
    window.addEventListener("telemetry:receiver-connection-status", RcvrConnectionStatus)
    window.addEventListener("telemetry:receiver-on-error", RcvrOnError);

    return () => {
      window.removeEventListener("telemetry:receiver-on-data", RcvrOnData)
      window.removeEventListener("telemetry:receiver-connection-status", RcvrConnectionStatus)
      window.addEventListener("telemetry:receiver-on-error", RcvrOnError);
      
      if (isConnected) window.telemetryAPI.closeArduinoReceiver();
    };
  }, []);

  return (
    <>
      <Stack direction={"row"} spacing={5} h="90vh">
        <VStack w="22.5%" spacing={5}>
          <TemplateTimeClock timeZone="utc" headingText="UTC Time" />
          <TemplateTimeClock timeZone="Asia/Jakarta" headingText="WIB Time" />
          <TemplateTimeClock timeZone="Asia/Makassar" headingText="WITA Time" />
          <TemplateTimeClock timeZone="Asia/Jayapura" headingText="WIT Time" />
        </VStack>
        <VStack w="22.5%" spacing={5}>
          <ISConnectedCard />
          <ReceivedTimeUNIX />
          <FlightState />
        </VStack>
        <VStack w="55%"></VStack>
      </Stack>
      <Flex h="10vh" w="100%">
      </Flex>
    </>
  );
};
