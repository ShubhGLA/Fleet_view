// src/components/OverviewPanel.tsx

import {
  Box,
  Grid,
  HStack,
  Button,
  Text,
  Flex,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { FiFilter } from 'react-icons/fi';
import { HiSortAscending } from 'react-icons/hi';
import FleetCard from './FleetCard';
import RightPanel from './RightPanel';
import { useState, useEffect } from 'react';
import { useLatestPOIData } from '../hooks/useLatestPOIData';

export default function OverviewPanel() {
  const bg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  const { data: fleetData, status } = useLatestPOIData(
    ['power_kw', 'soc'],
    '_poi_meter_,_ess_ess_'
  );

  const [selectedSite, setSelectedSite] = useState<any | null>(null);

  // 🚩 Merge POI + ESS by index or custom logic
  const pois = fleetData.filter((d) => d.table_name.includes('poi_meter'));
  const ess = fleetData.filter((d) => d.table_name.includes('ess_ess_'));

  // Example: Simple merge → link first ESS to each POI
  const mergedFleet = pois.map((poi, i) => {
    const essMatch = ess[i % ess.length]; // simple round-robin
    return {
      ...poi,
      soc: essMatch?.soc,
      performance: essMatch?.performance,
      availability: essMatch?.availability,
    };
  });

  useEffect(() => {
    if (mergedFleet && mergedFleet.length > 0) {
      setSelectedSite(mergedFleet[0]);
    }
  }, [fleetData]);

  if (status === 'loading') {
    return (
      <Box p={6}>
        <Spinner />
        <Text ml={2}>Loading fleet data...</Text>
      </Box>
    );
  }

  if (!mergedFleet || mergedFleet.length === 0) {
    return (
      <Box p={6}>
        <Text>No fleet data available.</Text>
      </Box>
    );
  }

  return (
    <Box px={{ base: 2, md: 4 }} py={4} maxW="1500px" mx="auto" bg={bg}>
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

      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={3}
      >
        {mergedFleet.map((item: any, idx: number) => {
          const name = item.table_name?.split('_').slice(-1)[0] || `Site ${idx + 1}`;
          return (
            <FleetCard
              key={idx}
              location={name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, ' ')}
              status={parseFloat(item.power_kw) >= 0 ? 'positive' : 'negative'}
              power={`${parseFloat(item.power_kw) >= 0 ? '+' : ''}${item.power_kw} kW`}
              soc={item.soc ? `${item.soc}` : ''}
              performance={item.performance ? `${item.performance}` : ''}
              availability={item.availability ? `${item.availability}` : ''}
              onClick={() => setSelectedSite(item)}
            />
          );
        })}
      </Grid>

      {selectedSite && (
        <Box mt={6}>
          <RightPanel site={selectedSite} />
        </Box>
      )}
    </Box>
  );
}
