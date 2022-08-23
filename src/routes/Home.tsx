import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import type { PortInfo, ArduinoList, ArduinoListError } from "@/types/global.d";

import {
  useToast,
  Flex,
  Stack,
  Box,
  Heading,
  Text,
  Button,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { IoRocketOutline } from "react-icons/io5";
import { MdUsb, MdArrowRightAlt } from "react-icons/md";

import styles from "@/styles/pages/Home.module.css";

export const Home = () => {
  const toast = useToast();
  const [arduinos, setArduinos] = useState<null | PortInfo[]>(null);

  useEffect(() => {
    const onTLMArduList = (event: CustomEvent<ArduinoList>) =>
      setArduinos(event.detail.list);
    const onTLMArduListError = (event: CustomEvent<ArduinoListError>) => {
      toast({
        title: event.detail.message,
        position: "bottom-right",
        status: "error",
      });
    };

    window.addEventListener("telemetry:on-arduino-list", onTLMArduList);
    window.addEventListener(
      "telemetry:on-arduino-list-error",
      onTLMArduListError
    );

    window.telemetryAPI.sendListArduinoReceiver();

    return () => {
      window.removeEventListener("telemetry:on-arduino-list", onTLMArduList);
      window.removeEventListener(
        "telemetry:on-arduino-list-error",
        onTLMArduListError
      );
    };
  }, []);

  return (
    <Flex align="center" justify="center" width="100vw" height="100vh">
      <Stack spacing={10}>
        <Heading as="h2" size="3xl" className={styles.cardContainer}>
          Roket Hiber <IoRocketOutline />
        </Heading>
        <Box
          p={5}
          minH="300px"
          minW="488px"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Stack spacing={5} height="100%">
            <Heading as="h3" size="lg">
              List Arduino
            </Heading>
            <Box>
              {!arduinos && <Text fontSize="lg">Sedang mengambil data...</Text>}
              {arduinos && arduinos.length < 1 && (
                <>
                  <Text fontSize="lg">
                    Tidak ditemukan adanya arduino penerima telemetri
                  </Text>
                  <Button
                    colorScheme="blue"
                    marginTop="2"
                    onClick={() => {
                      setArduinos(null);
                      window.telemetryAPI.sendListArduinoReceiver();
                    }}
                  >
                    List Ulang
                  </Button>
                </>
              )}
              {arduinos && arduinos.length > 0 && (
                <List spacing={4}>
                  {arduinos.map((arduino) => (
                    <ListItem fontSize="lg" key={arduino.path}>
                      <ListIcon as={MdUsb} color="green.500" />
                      {arduino.path}

                      <Button
                        colorScheme="blue"
                        marginLeft="179px"
                        rightIcon={
                          <MdArrowRightAlt className={styles.iconStyle} />
                        }
                        as={Link}
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        to={`viewer/${encodeURIComponent(arduino.path!)}`}
                      >
                        Pantau
                      </Button>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
