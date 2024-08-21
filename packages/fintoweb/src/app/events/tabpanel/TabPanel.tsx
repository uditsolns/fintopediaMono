"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import dynamic from 'next/dynamic';

const Trade = dynamic(() => import('./Trade'), { ssr: false });
const History = dynamic(() => import('./History'), { ssr: false });
const SellTab = dynamic(() => import('./SellTab'), { ssr: false });
const PreviousData = dynamic(() => import('./PreviousData'), { ssr: false });

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BasicTabs: React.FC = () => {
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
          <Tab label="Trade" {...a11yProps(0)} sx={{ color: 'gray' }}  />
          <Tab label="Portfolio" {...a11yProps(1)} sx={{ color: 'gray' }}  />
          <Tab label="History" {...a11yProps(2)} sx={{ color: 'gray' }} />
          <Tab label="Previous Round Price" {...a11yProps(3)} sx={{ color: 'gray' }} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Trade />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SellTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <History />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <PreviousData />
      </TabPanel>
    </Box>
  );
};

export default BasicTabs;
