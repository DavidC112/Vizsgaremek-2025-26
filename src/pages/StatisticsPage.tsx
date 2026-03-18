import StatisticsCards from "../components/StatisticsPage/StatisticsCards";
import StatisticsCharts from "../components/StatisticsPage/StatisticsCharts";
import StatisticsTab from "../components/StatisticsPage/StatisticsTab";
import { StatisticsProvider } from "../context/StatisticsContext";
import { motion } from "framer-motion";

const StatisticsPage = () => {
  return (
    <StatisticsProvider>
      <main className="from-primary-green-50 min-h-screen min-w-full space-y-10 bg-linear-to-b via-white to-blue-50">
        <motion.div
          className="mx-auto mt-10 max-w-7xl space-y-10 p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <StatisticsCards />
          <StatisticsCharts />
          <StatisticsTab />
        </motion.div>
      </main>
    </StatisticsProvider>
  );
};

export default StatisticsPage;
