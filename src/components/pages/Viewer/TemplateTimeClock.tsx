// import styles from "styles/pages/Viewer.module.css";
import { Box, VStack, Heading, Text } from "@chakra-ui/react";
import { useTime } from "@/hooks/useTime";

interface IProps {
  headingText: string;
  timeZone: string;
}

export const TemplateTimeClock = (props: IProps) => {
  const { hours, minutes, seconds } = useTime(props.timeZone);

  return (
    <Box h="25%" w="100%" backgroundColor="tomato">
      <VStack h="100%" alignItems="center" justifyContent="center" spacing={5}>
        <Heading as="h3" size="lg" align="center">
          {props.headingText}
        </Heading>
        <Text fontSize="xl" align="center">
          {hours}:{minutes}:{seconds}
        </Text>
      </VStack>
    </Box>
  );
};
