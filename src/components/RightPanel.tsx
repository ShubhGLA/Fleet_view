// src/components/RightPanel.tsx
import {
  Box,
  Text,
  VStack,
  HStack,
  GridItem,
  Badge,
  Divider,
  Select,
  Icon,
  Grid,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { HiOutlineHome } from 'react-icons/hi';
import { BsClock } from 'react-icons/bs';
import { FiFilter } from 'react-icons/fi';
import { HiDownload } from 'react-icons/hi';
import { FaSquare } from 'react-icons/fa';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const options: Highcharts.Options = {
  title: { text: '' },
  chart: { type: 'line', height: 200, backgroundColor: 'transparent' },
  accessibility: { enabled: false },
  xAxis: {
    categories: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    labels: { style: { fontSize: '10px' } },
  },
  yAxis: {
    title: { text: 'Power (kW)' },
    labels: { style: { fontSize: '10px' } },
  },
  tooltip: { shared: true, valueSuffix: ' kW' },
  legend: { enabled: false },
  series: [
    {
      name: 'Active Power',
      data: Array.from({ length: 24 }, () => +(Math.random() * 2).toFixed(2)),
      type: 'line',
      color: '#3182ce',
      marker: { enabled: false },
    },
    {
      name: 'Expected Power',
      data: Array.from({ length: 24 }, () => +(Math.random() * 2).toFixed(2)),
      type: 'line',
      color: '#ed8936',
      marker: { enabled: false },
    },
    {
      name: 'Bounds',
      data: Array.from({ length: 24 }, () => +(Math.random() * 2).toFixed(2)),
      type: 'line',
      color: '#4A5568',
      marker: { enabled: false },
    },
  ],
  credits: { enabled: false },
};

export default function RightPanel({ site }: { site: any }) {
  const panelBg = useColorModeValue('white', 'gray.800');
  const labelColor = useColorModeValue('gray.600', 'gray.300');
  const secondaryColor = useColorModeValue('gray.500', 'gray.400');
  const borderColor = useColorModeValue('#E2E8F0', 'gray.600');

  return (
    <Flex
      bg={panelBg}
      borderRadius="md"
      boxShadow="md"
      p={4}
      direction={{ base: 'column', md: 'row' }}
      gap={6}
      w="100%"
    >
      {/* Left Side: Site Info */}
      <Box w={{ base: '100%', md: '50%' }}>
        <VStack align="start" spacing={3} w="100%">
          <Icon as={HiOutlineHome} boxSize={4} color={labelColor} />

          <HStack justify="space-between" align="start" w="100%">
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold" fontSize="sm">{site.location}</Text>
              <Text fontSize="xs" color={secondaryColor}>10 MW / 4/4 ESS | CAISO</Text>
              <Text fontSize="xs" color="blue.400" fontWeight="medium">
                View System →
              </Text>
            </VStack>
            <VStack align="end" spacing={1}>
              <HStack spacing={1} fontSize="xs" color={secondaryColor}>
                <Icon as={BsClock} boxSize={3.5} />
                <Text>06/12/27 19:01:09 UTC</Text>
              </HStack>
              <Badge fontSize="0.65rem" colorScheme="gray" variant="subtle">
                RUNNING - GRID
              </Badge>
            </VStack>
          </HStack>

          <HStack align="start" spacing={6} mt={3} w="100%">
            <VStack align="start" spacing={1} minW="140px">
              <Badge colorScheme="green" fontSize="xs">{site.power} POI</Badge>
              <Text fontSize="xs" color={secondaryColor} mt={2}>Lifetime Throughput</Text>
              <Text fontWeight="bold" fontSize="sm">39.32 MWh</Text>
            </VStack>

            <Box flex="1" fontSize="xs" border={`1px solid ${borderColor}`} borderRadius="md">
              <Grid templateColumns="1fr 1fr 1fr" textAlign="center" fontWeight="bold" borderBottom={`1px solid ${borderColor}`} py={1}>
                <Box />
                <Text color="purple.400" fontSize="10px" pl={16}>BMS</Text>
                <Text color="purple.400" fontSize="10px" textAlign="right" pr="2">Adjusted</Text>
              </Grid>

              <Grid templateColumns="1fr 1fr 1fr" textAlign="center" borderBottom={`1px solid ${borderColor}`} py={1}>
                <Text color="blue.300" fontWeight="semibold" fontSize="10px">State of Charge</Text>
                <Text fontWeight="bold" color="blue.300" fontSize="10px" pl={16}>{site.soc}</Text>
                <Text fontWeight="bold" color="blue.300" fontSize="10px" textAlign="right" pr="2">81.90%</Text>
              </Grid>

              <Grid templateColumns="repeat(4, 1fr)" textAlign="center" borderBottom={`1px solid ${borderColor}`} py={1}>
                <GridItem colSpan={1}><Text color="blue.300" fontWeight="semibold" fontSize="10px">Dischargeable</Text></GridItem>
                <Text color="blue.300" fontSize="10px">2.92 MW</Text>
                <Text color="blue.300" fontSize="10px">4.39 kWh</Text>
                <Text color="blue.300" fontSize="10px" textAlign="right" pr="2">5.29 kWh</Text>
              </Grid>

              <Grid templateColumns="repeat(4, 1fr)" textAlign="center" py={1}>
                <GridItem colSpan={1}><Text color="blue.300" fontWeight="semibold" fontSize="10px">Chargeable</Text></GridItem>
                <Text color="blue.300" fontSize="10px">8.92 MW</Text>
                <Text color="blue.300" fontSize="10px">9.99 kWh</Text>
                <Text color="blue.300" fontSize="10px" textAlign="right" pr="2">15.65 kWh</Text>
              </Grid>
            </Box>
          </HStack>

          <Divider my={3} borderColor={borderColor} />

          <HStack spacing={6} fontSize="xs" w="100%" justify="space-between">
            {[['Performance', site.performance], ['Availability', site.availability], ['Uptime', '93.2%'], ['C-rate', '0.79'], ['Cycles', '0.46']].map(
              ([label, value], idx) => (
                <VStack key={idx} spacing={0} align="center">
                  <Text color={secondaryColor}>{label}</Text>
                  <Text fontWeight="bold">{value}</Text>
                </VStack>
              )
            )}
          </HStack>
        </VStack>
      </Box>

      {/* Right Side: Chart */}
      <Box w={{ base: '100%', md: '50%' }}>
        <HStack justify="space-between" align="center" mb={1}>
          <Box>
            <Text fontWeight="bold">Active Power</Text>
            <Text fontSize="xs" color={secondaryColor}>Last 24 Hours</Text>
          </Box>
          <HStack spacing={2}>
            <Select size="sm" w="auto">
              <option>24 hours</option>
              <option>12 hours</option>
              <option>6 hours</option>
            </Select>
            <Icon as={FiFilter} color={secondaryColor} boxSize={4} />
            <Icon as={HiDownload} color={secondaryColor} boxSize={4} />
          </HStack>
        </HStack>

        <HStack fontSize="xs" color={labelColor} mt={2} spacing={6}>
          <Text fontWeight="bold">Power in KW</Text>
          <HStack spacing={2}>
            <Box as={FaSquare} color="#3182ce" boxSize={2} />
            <Text>Active Power</Text>
          </HStack>
          <HStack spacing={2}>
            <Box as={FaSquare} color="#ed8936" boxSize={2} />
            <Text>Expected Power</Text>
          </HStack>
          <HStack spacing={2}>
            <Box as={FaSquare} color="#4A5568" boxSize={2} />
            <Text>Bounds</Text>
          </HStack>
        </HStack>

        <Box mt={2}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Box>

        <Box w="100%" textAlign="right" mt={3}>
          <Text
            fontSize="sm"
            color="blue.400"
            fontWeight="semibold"
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
          >
            View Battery Health →
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
