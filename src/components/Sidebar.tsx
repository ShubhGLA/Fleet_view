import { Box, VStack, IconButton } from '@chakra-ui/react';
import {
  FiHome, FiMonitor, FiBarChart2,
  FiDatabase, FiBell, FiUser
} from 'react-icons/fi';

const icons = [
  { icon: FiHome, label: 'Home' },
  { icon: FiMonitor, label: 'Monitor' },
  { icon: FiBarChart2, label: 'Reports' },
  { icon: FiDatabase, label: 'Data' },
  { icon: FiBell, label: 'Alerts' },
  { icon: FiUser, label: 'Accounts' }
];

export default function Sidebar() {
  return (
    <Box w="70px" bg="#121C2D" color="white" h="100vh" pt={4}>
      <VStack spacing={5} align="center">
        {icons.map(({ icon: Icon, label }, index) => (
          <Box
            key={index}
            p={2}
            borderRadius="md"
            _hover={{ bg: 'gray.700' }}
            transition="background 0.2s"
          >
            <IconButton
              aria-label={label}
              icon={<Icon />}
              variant="ghost"
              color="white"
              size="sm"
              isRound
            />
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
