import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import type { PortInfo } from "@/types/global.d";

import {
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

export const Home = () => {
  const [arduinos, setArduinos] = useState<null | PortInfo[]>(null);

  useEffect(() => {
    window.telemetryAPI.listenListArduinoReciever((event, data) => {
      if (!data.error && data.data) setArduinos(data.data);
    });

    window.telemetryAPI.arduinoGetListOnError((ev, error) => {
      console.log(error);
    });

    window.telemetryAPI.sendListArduinoReciever();
  }, []);

  return (
    <Flex align="center" justify="center" width="100vw" height="100vh">
      <Stack spacing={10}>
        <Heading
          as="h2"
          size="3xl"
          style={{ display: "inline-flex", justifyContent: "space-around" }}
        >
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
                      window.telemetryAPI.sendListArduinoReciever();
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
                          <MdArrowRightAlt style={{ fontSize: "2.05em" }} />
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
