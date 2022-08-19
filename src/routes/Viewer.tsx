import { useEffect } from "react";
import shallow from "zustand/shallow";
import { useParams } from "react-router-dom";

import { useMachineState } from "@/stores/ViewerStore";

import { Flex, Stack, HStack, VStack, useToast } from "@chakra-ui/react";

import { TemplateTimeClock } from "@/components/pages/Viewer/TemplateTimeClock";
import { ISConnectedCard } from "@/components/pages/Viewer/ISConnectedCard";
import { ReceivedTimeUNIX } from "@/components/pages/Viewer/ReceivedTimeUNIX";
import { FlightState } from "@/components/pages/Viewer/FlightState";

export const Viewer = () => {
  const params = useParams();
  const toast = useToast();

  const isConnected = useMachineState((state) => state.isConnected);
  const { setConnectionStatus, setRecievedTime } = useMachineState(
    ({ setConnectionStatus, setRecievedTime }) => ({
      setConnectionStatus,
      setRecievedTime,
    }),
    shallow
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!isConnected)
      window.telemetryAPI.connectToArduinoReciever(params.usbPath!);

    window.telemetryAPI.arduinoOnData((ev, data) => {
      setRecievedTime(data.time);
    });

    window.telemetryAPI.arduinoOnConnection((ev, status) => {
      setConnectionStatus(status.connected);

      if (status.connected)
        toast({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: `Connected to ${params.usbPath!} successfully`,
          position: "bottom-right",
          status: "success",
        });
    });

    window.telemetryAPI.arduinoOnError((ev, error) => {
      toast({
        title: error.message,
        position: "bottom-right",
        status: "error",
      });
    });

    return () => {
      if (isConnected) window.telemetryAPI.closeArduinoReceiver();
    };
  }, []);

  return (
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
        {/* <FlightState /> */}
      </VStack>
      <VStack w="55%"></VStack>
    </Stack>
  );
};
