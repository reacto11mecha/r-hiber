import type {
  ReceiverOnData,
} from "@/types/global.d";
import { Box, Heading, Text } from "@chakra-ui/react";

import { useMachineState } from "@/stores/ViewerStore";

export const BottomBox = (props: { heading: string, item: keyof ReceiverOnData["data"] }) => {
  const dynamicallySelected = useMachineState((state) => state.telemetryData[props.item]);
  
  return (
    <Box
      h="100%"
      w="100%"
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Heading as="h5" size="sm">
        {props.heading}
      </Heading>
      <Text fontSize="sm">{dynamicallySelected ?? "N/A"}</Text>
    </Box>
  );
};
