import {
  Box,
  Grid,
  HStack,
  Button,
  Text,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { FiFilter } from 'react-icons/fi';
import { HiSortAscending } from 'react-icons/hi';
import FleetCard from './FleetCard';
import RightPanel from './RightPanel';
import { useState } from 'react';

export default function OverviewPanel() {
  const bg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  const fleetData = [
    { location: 'Ashland', status: 'positive', power: '+23.48 kW', soc: '80.5%', performance: '98.8%', availability: '98.5%' },
    { location: 'Brightside Health', status: 'positive', power: '+3.42 kW', soc: '70%', performance: '98.7%', availability: '98.8%' },
    { location: 'Cedar Valley', status: 'negative', power: '-3.48 kW', soc: '50%', performance: '98.1%', availability: '98.2%' },
    { location: 'Easton', status: 'positive', power: '+11.65 kW', soc: '90%', performance: '98.4%', availability: '99.1%' },
    { location: 'Fairview', status: 'negative', power: '-2.01 kW', soc: '82.1%', performance: '98.1%', availability: '98.3%' },
    { location: 'Gobias Industries', status: 'positive', power: '+3.422 kW', soc: '20%', performance: '98.9%', availability: '98.9%' },
    { location: 'Juniper City', status: 'positive', power: '+1.348 kW', soc: '40%', performance: '98.7%', availability: '99.3%' },
    { location: 'Kāneʻohe Bay', status: 'negative', power: '-2.502 kW', soc: '80.5%', performance: '98.3%', availability: '99.2%' },
    { location: 'Lima', status: 'positive', power: '+3.48 kW', soc: '92%', performance: '99.1%', availability: '99.8%' },
    { location: 'Maplewood', status: 'negative', power: '-2.234 kW', soc: '60%', performance: '97.9%', availability: '97.3%' },
    { location: 'Mountain Park', status: 'positive', power: '+4.32 kW', soc: '85%', performance: '98.7%', availability: '99.0%' },
    { location: 'North Oakdale', status: 'positive', power: '+5.44 kW', soc: '88%', performance: '99.2%', availability: '99.5%' },
  ];

  const [selectedSite, setSelectedSite] = useState(fleetData[0]);

  return (
    <Box px={{ base: 2, md: 4 }} py={4} maxW="1500px" mx="auto" bg={bg}>
      <Box maxW="1500px">
        {/* Header and Buttons */}
        <Flex justify="space-between" align="center" mb={4} flexWrap="wrap">
          <Text fontWeight="bold" fontSize="md" color={textColor}>
            Fleet Overview
          </Text>
          <HStack spacing={2} mt={{ base: 2, md: 0 }}>
            <Button leftIcon={<RepeatIcon />} size="sm" variant="ghost" color={textColor}>
              Refresh
            </Button>
            <Button leftIcon={<HiSortAscending />} size="sm" variant="ghost" color={textColor}>
              Sort
            </Button>
            <Button leftIcon={<FiFilter />} size="sm" variant="ghost" color={textColor}>
              Filter
            </Button>
          </HStack>
        </Flex>

        {/* Grid of Cards */}
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={3}
        >
          {fleetData.map((item, idx) => (
            <FleetCard key={idx} {...item} onClick={() => setSelectedSite(item)} />
          ))}
        </Grid>
      </Box>

      {/* Right Panel below the cards */}
      <Box mt={6}>
        <RightPanel site={selectedSite} />
      </Box>
    </Box>
  );
}
