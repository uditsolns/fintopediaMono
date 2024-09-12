"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";

const tabComponents = {
  Overview: dynamic(() => import("./pages/Overview"), {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }),
  Notes: dynamic(() => import("./pages/Notes"), {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }),
  Reviews: dynamic(() => import("./pages/Reviews"), {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }),
  LearningMode: dynamic(() => import("./pages/LearningMode"), {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }),
  UploadProject: dynamic(() => import("./pages/UploadProject"), {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }),
  Resources: dynamic(() => import("./pages/Resources"), {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }),
};

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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const EnrollTabs: React.FC = () => {
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs = ["Overview", "Notes", "Reviews", "Learning Mode", "Upload Project", "Resources"];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{ style: { backgroundColor: "white" } }}
        >
          {tabs.map((label, index) => (
            <Tab
              key={index}
              label={label}
              {...a11yProps(index)}
              sx={{
                color: value === index ? "white" : "gray",
                "&.Mui-selected": { color: "white" },
              }}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map((label, index) => {
        const Component = tabComponents[label.replace(" ", "")]; 
        return (
          <TabPanel key={index} value={value} index={index}>
            <Component />
          </TabPanel>
        );
      })}
    </Box>
  );
};

export default EnrollTabs;