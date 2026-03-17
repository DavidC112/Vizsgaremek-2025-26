import StatisticsCards from "../components/StatisticsPage/StatisticsCards";
import StatisticsCharts from "../components/StatisticsPage/StatisticsCharts";
import StatisticsTab from "../components/StatisticsPage/StatisticsTab";
import { StatisticsProvider } from "../context/StatisticsContext";

const StatisticsPage = () => {
  return (
    <StatisticsProvider>
      <main className="from-primary-green-50 min-h-screen min-w-full space-y-10 bg-linear-to-b via-white to-blue-50">
        <div className="mx-auto mt-10 max-w-7xl space-y-10">
          <StatisticsCards />
          <StatisticsCharts />
          <StatisticsTab />
        </div>
      </main>
    </StatisticsProvider>
  );
};
export default StatisticsPage;
