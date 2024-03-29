import { useEffect } from "react";
import shallow from "zustand/shallow";
import { useParams } from "react-router-dom";

import {
  useMachineState,
  useMachineStateForPlotly,
} from "@/stores/ViewerStore";

import { useToast, Stack, VStack, HStack, Box } from "@chakra-ui/react";

import styles from "@/styles/pages/Viewer.module.css";

import { TemplateTimeClock } from "@/components/pages/Viewer/TemplateTimeClock";
import { ISConnectedCard } from "@/components/pages/Viewer/ISConnectedCard";
import { ReceivedTimeUNIX } from "@/components/pages/Viewer/ReceivedTimeUNIX";
import { FlightState } from "@/components/pages/Viewer/FlightState";
import { BottomBox } from "@/components/pages/Viewer/BottomBox";

import type {
  ReceiverOnData,
  ReceiverOnConnection,
  ReceiverOnError,
} from "@/types/global.d";

// const Plotter = () => {
//   const telemetryData = useMachineStateForPlotly(
//     (state) => state.telemetryData
//   );

//   const time = useMemo(() => telemetryData.map((data) => data.time));
//   const altitude = useMemo(() => telemetryData.map((data) => data.altitude));

//   return <></>;
// };

export const Viewer = () => {
  const params = useParams();
  const toast = useToast();

  const isConnected = useMachineState((state) => state.isConnected);
  const pushDataToPlotter = useMachineStateForPlotly((state) => state.pushData);

  const { setConnectionStatus, setReceivedTime, setTelemetryData } =
    useMachineState(
      ({ setConnectionStatus, setReceivedTime, setTelemetryData }) => ({
        setConnectionStatus,
        setReceivedTime,
        setTelemetryData,
      }),
      shallow
    );

  useEffect(() => {
    if (!isConnected)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      window.telemetryAPI.connectToArduinoReceiver(params.usbPath!);

    const RcvrOnData = (event: CustomEvent<ReceiverOnData>) => {
      pushDataToPlotter(event.detail.data);
      setReceivedTime(event.detail.time);
      setTelemetryData(event.detail.data);
    };
    const RcvrConnectionStatus = (event: CustomEvent<ReceiverOnConnection>) => {
      setConnectionStatus(event.detail.connected);

      if (event.detail.connected)
        toast({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: `Connected to ${params.usbPath!} successfully`,
          position: "bottom-right",
          status: "success",
        });
    };
    const RcvrOnError = (event: CustomEvent<ReceiverOnError>) => {
      toast({
        title: event.detail.message,
        position: "bottom-right",
        status: "error",
      });
    };

    window.addEventListener("telemetry:receiver-on-data", RcvrOnData);
    window.addEventListener(
      "telemetry:receiver-connection-status",
      RcvrConnectionStatus
    );
    window.addEventListener("telemetry:receiver-on-error", RcvrOnError);

    return () => {
      window.removeEventListener("telemetry:receiver-on-data", RcvrOnData);
      window.removeEventListener(
        "telemetry:receiver-connection-status",
        RcvrConnectionStatus
      );
      window.addEventListener("telemetry:receiver-on-error", RcvrOnError);

      if (isConnected) window.telemetryAPI.closeArduinoReceiver();
    };
  }, []);

  return (
    <div className={styles.container}>
      <Stack
        direction={"row"}
        spacing={5}
        h="90vh"
        className={styles.subContainer}
      >
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
        <VStack w="55%">
          <Box w="100%" h="100%" bg="grey">
            {/* <Plotter /> */}
          </Box>
        </VStack>
      </Stack>
      <HStack
        h={10}
        height="calc(8vh + 0.1px)"
        w="100%"
        className={styles.footerWrapper}
      >
        <Box w="50%" h="100%" bg="tomato">
          <HStack
            w="100%"
            align="center"
            justifyContent="center"
            h="100%"
            spacing={6}
          >
            <BottomBox heading="Altitude" item="altitude" />
            <BottomBox heading="AccX" item="AccX" />
            <BottomBox heading="AccY" item="AccY" />
            <BottomBox heading="AccZ" item="AccZ" />
          </HStack>
        </Box>

        <Box w="50%" h="100%" bg="tomato">
          <HStack
            w="100%"
            align="center"
            justifyContent="center"
            h="100%"
            spacing={6}
          >
            <BottomBox heading="Roll" item="roll" />
            <BottomBox heading="Pitch" item="pitch" />
            <BottomBox heading="Yaw" item="yaw" />
          </HStack>
        </Box>
      </HStack>
    </div>
  );
};
