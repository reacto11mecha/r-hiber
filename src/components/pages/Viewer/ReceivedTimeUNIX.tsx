import shallow from "zustand/shallow";
import { useMachineState } from "@/stores/ViewerStore";
import { Box, VStack, Heading, Text } from "@chakra-ui/react";

export const ReceivedTimeUNIX = () => {
  const { isConnected, receivedTime } = useMachineState(
    ({ isConnected, receivedTime }) => ({ isConnected, receivedTime }),
    shallow
  );

  return (
    <Box h="33%" w="100%" backgroundColor="tomato" p={5}>
      <VStack h="100%" alignItems="center" justifyContent="center">
        <Heading as="h3" size="lg" align="center">
          Received data in UNIX Timestamp
        </Heading>

        {!isConnected && receivedTime <= 0 && (
          <Text fontSize="xl" align="center">
            N/A
          </Text>
        )}
        {(isConnected || receivedTime > 0) && (
          <Text fontSize="xl" align="center">
            {receivedTime}
          </Text>
        )}
      </VStack>
    </Box>
  );
};
