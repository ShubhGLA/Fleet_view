// src/pages/SiteDetails.tsx
import { useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import RightPanel from "../components/RightPanel";

const fleetData = [
  { location: "Ashland", power: "+23.48 kW", soc: "80.5%", performance: "98.8%", availability: "98.5%" },
  { location: "Brightside Health", power: "+3.42 kW", soc: "70%", performance: "98.7%", availability: "98.8%" },
  { location: "Cedar Valley", power: "-3.48 kW", soc: "50%", performance: "98.1%", availability: "98.2%" },
  { location: "Easton", power: "+11.65 kW", soc: "90%", performance: "98.4%", availability: "99.1%" },
];

export default function SiteDetails() {
  const { site } = useParams();
  const decoded = decodeURIComponent(site || "");
  const siteData = fleetData.find((s) => s.location === decoded);

  if (!siteData) return <Box p={6}><Text>Site not found.</Text></Box>;

  return (
    <Box p={6}>
      <RightPanel site={siteData} />
    </Box>
  );
}
