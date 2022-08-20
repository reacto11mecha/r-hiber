import { useParams } from "react-router-dom";
import { useMachineState } from "@/stores/ViewerStore";
import { Box, VStack, Button, Heading, Text } from "@chakra-ui/react";

export const ISConnectedCard = () => {
  const params = useParams();
  const isConnected = useMachineState((state) => state.isConnected);

  return (
    <Box h="33%" w="100%" backgroundColor="tomato" p={5}>
      <VStack h="100%" alignItems="center" justifyContent="center">
        <Heading as="h3" size="lg" align="center">
          Connection Status
        </Heading>

        {isConnected === null && (
          <Text fontSize="xl" align="center">
            N/A
          </Text>
        )}
        {isConnected === true && (
          <Text fontSize="xl" align="center">
            Connected
          </Text>
        )}
        {isConnected === false && (
          <>
            <Text fontSize="xl" align="center">
              Disconnected
            </Text>
            <Button
              onClick={() =>
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                window.telemetryAPI.connectToArduinoReceiver(params.usbPath!)
              }
              colorScheme="red"
              minH={6}
            >
              Reconnect
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
};
