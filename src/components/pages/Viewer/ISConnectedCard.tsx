import { useParams } from "react-router-dom";
import { useMachineState } from "@/stores/ViewerStore";
import { Box, VStack, Heading, Text } from "@chakra-ui/react";

export const ISConnectedCard = () => {
  const params = useParams();
  const isConnected = useMachineState((state) => state.isConnected);

  // return (
  {
    /* <article className={`card ${styles.cardStyle}`}>
      <footer className={styles.cardFooter}>
        <h3>Connected to Reciever</h3>
        <h4 className={styles.cardInfo}>
          {isConnected === null && <p>N/A</p>}
          {isConnected === true && <p>Connected</p>}
          {isConnected === false && (
            <>
              <p>Disconnected</p>
              <button
                onClick={() =>
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  window.telemetryAPI.connectToArduinoReciever(params.usbPath!)
                }
              >
                Reconnect
              </button>
            </>
          )}
        </h4>
      </footer>
    </article> */
  }
  // );

  return (
    <Box h="25%" w="100%" backgroundColor="tomato">
      <VStack h="100%" alignItems="center" justifyContent="center" spacing={5}>
        <Heading as="h3" size="lg" align="center">
          Connection Status
        </Heading>
        <Text fontSize="xl" align="center"></Text>
      </VStack>
    </Box>
  );
};
