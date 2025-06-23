// src/components/FleetCard.tsx

import {
  Box,
  Text,
  Flex,
  HStack,
  VStack,
  Icon,
  Badge,
  Progress,
  useColorModeValue,
} from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon, WarningIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

type FleetCardProps = {
  location: string;
  status: string;
  power: string;
  soc: string;
  performance: string;
  availability: string;
};

export default function FleetCard({
  location,
  status,
  power,
  soc,
  performance,
  availability,
}: FleetCardProps) {
  const navigate = useNavigate();
  const isPositive = power.startsWith("+");
  const isNegative = power.startsWith("-");
  const socValue = parseFloat(soc.replace("%", ""));

  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const mutedText = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("#E2E8F0", "gray.600");
  const lineColor = useColorModeValue("gray.300", "gray.500");
  const progressBg = useColorModeValue("gray.200", "gray.700");

  const renderPower = () => {
    const icon = isPositive ? TriangleUpIcon : isNegative ? TriangleDownIcon : null;
    const color = isPositive ? "green.500" : isNegative ? "red.500" : "gray.500";

    return (
      <HStack spacing={1}>
        {icon && <Icon as={icon} color={color} boxSize={3} />}
        <Text fontSize="sm" fontWeight="bold" color={color}>
          {power.replace("+", "").replace("-", "")}
        </Text>
        <Badge colorScheme="gray" fontSize="0.65rem" px={1.5}>
          POI
        </Badge>
      </HStack>
    );
  };

  return (
    <Box
      onClick={() => navigate(`/site/${location}`)}
      cursor="pointer"
      bg={bg}
      color={textColor}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="lg"
      p={3}
      boxShadow="sm"
      fontSize="sm"
      _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
      transition="all 0.2s"
    >
      <Flex justify="space-between" align="start" mb={1}>
        <Text fontWeight="bold">{location}</Text>
        {location === "Cedar Valley" && (
          <WarningIcon color="orange.400" boxSize={3} />
        )}
      </Flex>

      <Flex justify="space-between" align="center" mb={1}>
        {renderPower()}
      </Flex>

      <Flex align="center" gap={2} mb={2}>
        <Progress
          value={socValue}
          size="xs"
          flex="1"
          colorScheme="green"
          bg={progressBg}
          borderRadius="full"
        />
        <Text fontSize="sm" fontWeight="bold">
          SOC {soc}
        </Text>
      </Flex>

      <Box mt={2} borderBottom="1px solid" borderColor={borderColor} pb={2}>
        <Flex justify="space-between" align="center" fontSize="xs" mb={1}>
          <HStack spacing={1}>
            <Text color={mutedText}>D:</Text>
            <Text fontWeight="bold">20.92 MW</Text>
          </HStack>
          <Box h="100%" w="1px" bg={lineColor} mx={2} />
          <Text fontWeight="bold">4.39 MWh</Text>
        </Flex>

        <Flex justify="space-between" align="center" fontSize="xs">
          <HStack spacing={1}>
            <Text color={mutedText}>C:</Text>
            <Text fontWeight="bold">8.92 MW</Text>
          </HStack>
          <Box h="100%" w="1px" bg={lineColor} mx={2} />
          <Text fontWeight="bold">16.39 MWh</Text>
        </Flex>
      </Box>

      <Box mt={3} fontSize="xs" color={mutedText}>
        <Text mb={0.5}>Last 24 hours</Text>
        <Flex justify="space-between">
          <Text>Performance</Text>
          <Text>{performance}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text>Availability</Text>
          <Text>{availability}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text>Uptime</Text>
          <Text>95.2%</Text>
        </Flex>
      </Box>
    </Box>
  );
}
