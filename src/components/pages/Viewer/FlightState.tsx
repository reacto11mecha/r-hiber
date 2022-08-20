import { Box, VStack, Heading, Text } from "@chakra-ui/react";

export const FlightState = () => (
  <Box h="33%" w="100%" backgroundColor="tomato" p={5}>
    <VStack h="100%" alignItems="center" justifyContent="center">
      <Heading as="h3" size="lg" style={{ textAlign: "center" }}>
        Flight State
      </Heading>

      <Text fontSize="xl" align="center" as="kbd">
        Ground Idle
      </Text>
    </VStack>
  </Box>
);
