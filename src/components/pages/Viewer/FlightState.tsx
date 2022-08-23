import { useMemo } from "react";
import { Box, VStack, Heading, Text } from "@chakra-ui/react";

import { useMachineState } from "@/stores/ViewerStore";

const getState = (state: number | undefined) => {
  switch (state) {
    case 0:
      return "GROUND IDLE";
    case 1:
      return "POWERED FLIGHT";
    case 2:
      return "UNPOWERED FLIGHT";
    case 3:
      return "BALLISTIC DECENT";
    case 4:
      return "CHUTE DECENT";
    case 5:
      return "LANDING";

    default:
      return "N/A";
  }
};
export const FlightState = () => {
  const flightState = useMachineState(
    (state) => state.telemetryData.flightState
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const state = useMemo(() => getState(flightState), [flightState]);

  return (
    <Box h="33%" w="100%" backgroundColor="tomato" p={5}>
      <VStack h="100%" alignItems="center" justifyContent="center">
        <Heading as="h3" size="lg">
          Flight State
        </Heading>

        <Text fontSize="xl" align="center" as="kbd">
          {state}
        </Text>
      </VStack>
    </Box>
  );
};
