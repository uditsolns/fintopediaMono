"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";

// Dynamically import components with loading fallback
const LatestNews = dynamic(() => import("./LatestNews"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
const Trade = dynamic(() => import("./Trade"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
const History = dynamic(() => import("./History"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
const Portfolio = dynamic(() => import("./Portfolio"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
const PreviousData = dynamic(() => import("./PreviousData"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

// Interface for TabPanelProps
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// TabPanel component
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// Accessibility props function for Tabs
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface BasicTabsProps {
  gameId: number;
  roundId: number;
}
const BasicTabs: React.FC<BasicTabsProps> = ({ gameId, roundId }) => {
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Latest News" {...a11yProps(0)} sx={{ color: "gray" }} />
          <Tab label="Trade" {...a11yProps(1)} sx={{ color: "gray" }} />
          <Tab label="Portfolio" {...a11yProps(2)} sx={{ color: "gray" }} />
          <Tab label="History" {...a11yProps(3)} sx={{ color: "gray" }} />
          <Tab
            label="Previous Round Price"
            {...a11yProps(4)}
            sx={{ color: "gray" }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <LatestNews />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Trade gameId={gameId} roundId={roundId} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Portfolio gameId={gameId} roundId={roundId}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <History />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <PreviousData />
      </TabPanel>
    </Box>
  );
};

export default BasicTabs;
