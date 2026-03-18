import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../../utils/MaterialUITheme";
import MealAccordionList from "./MealAccordionList";
import ActivityAccordionList from "./ActivityAccordionList";
import { useStatistics } from "../../context/StatisticsContext";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <AnimatePresence mode="wait">
        {value === index && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Box sx={{ p: 3 }}>{children}</Box>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const StatisticsTab = () => {
  const { dailyIntake, loading, userActivityData } = useStatistics();
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.5, ease: "easeOut" }}
    >
      <ThemeProvider theme={theme}>
        <Box sx={{ maxWidth: "80rem", mx: "auto", width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Meals" />
              <Tab label="Activity" />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <MealAccordionList dailyIntake={dailyIntake} loading={loading} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ActivityAccordionList userActivityData={userActivityData} />
          </CustomTabPanel>
        </Box>
      </ThemeProvider>
    </motion.div>
  );
};

export default StatisticsTab;
