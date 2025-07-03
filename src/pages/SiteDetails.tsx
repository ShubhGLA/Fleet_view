// src/pages/SiteDetails.tsx

import { useParams } from 'react-router-dom';
import { Box, Spinner, Text } from '@chakra-ui/react';
import RightPanel from '../components/RightPanel';
import { useLatestPOIData } from '../hooks/useLatestPOIData';

export default function SiteDetails() {
  const { site } = useParams();
  const decoded = decodeURIComponent(site || '');
  const { data, status } = useLatestPOIData(
    ['power_kw', 'soc'],
    '_poi_meter_,_ess_ess_'
  );

  if (status === 'loading') {
    return (
      <Box p={6}>
        <Spinner />
        <Text>Loading site data...</Text>
      </Box>
    );
  }

  const siteData = data?.find((item) =>
    item.table_name.toLowerCase().includes(decoded.toLowerCase().replace(/ /g, '_'))
  );

  if (!siteData) {
    return (
      <Box p={6}>
        <Text>Site not found.</Text>
      </Box>
    );
  }

  const loc = siteData.table_name.split('_').slice(-1)[0];
  const location = loc.charAt(0).toUpperCase() + loc.slice(1).replace(/_/g, ' ');

  return (
    <Box p={6}>
      <RightPanel site={{ location, ...siteData }} />
    </Box>
  );
}
