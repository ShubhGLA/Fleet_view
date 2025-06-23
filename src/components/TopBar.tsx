import {
  Box,
  Flex,
  Text,
  Spacer,
  IconButton,
  Avatar,
  VStack,
  useColorMode,
} from '@chakra-ui/react';
import { BellIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';

export default function TopBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg="#121C2D" px={4} py={2} borderBottom="2px solid #00E5FF">
      <Flex align="center">
        {/* Left-side logo block */}
        <VStack align="flex-start" spacing={0}>
          <Text fontSize="xs" color="white" letterSpacing="wide">
            HYBRIDOS
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="#00E5FF" lineHeight="1">
            ANALYZE
          </Text>
        </VStack>

        <Spacer />

        {/* Theme toggle icon */}
        <IconButton
          aria-label="Toggle theme"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          size="sm"
          variant="ghost"
          color="white"
          _hover={{ bg: 'gray.700' }}
          mr={2}
          onClick={toggleColorMode}
        />

        {/* Notifications */}
        <IconButton
          aria-label="Notifications"
          icon={<BellIcon />}
          size="sm"
          variant="ghost"
          color="white"
          _hover={{ bg: 'gray.700' }}
          mr={2}
        />

        {/* User avatar */}
        <Avatar size="sm" name="HZ" bg="gray.600" color="white" fontSize="xs" />
      </Flex>
    </Box>
  );
}
