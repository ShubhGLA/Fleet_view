// src/Dashboard.tsx

import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import OverviewPanel from "../components/OverviewPanel";

export default function Dashboard() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Box px={4} py={4}>
        <OverviewPanel />
      </Box>
    </Box>
  );
}
