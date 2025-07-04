import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SiteDetails from './pages/SiteDetails';

function App() {
  return (
    <Box w="100vw" h="100vh" bg="gray.100">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/site/:site" element={<SiteDetails />} />
      </Routes>
    </Box>
  );
}

export default App;
