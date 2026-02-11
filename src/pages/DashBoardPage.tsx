// import { BarChart, PieChart } from "@mui/x-charts";
import Navbar from "../components/Navbar/Navbar";
// import Box from "@mui/material/Box";
import CalorieGoal from "../components/DashBoardPage/CalorieGoal";
import TodaysMeal from "../components/DashBoardPage/TodaysMeal";
import { NotebookTabs, Utensils } from "lucide-react";

export const DashBoardPage = () => {
  // //BarChart
  // const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  // const xLabels = [
  //   "Page A",
  //   "Page B",
  //   "Page C",
  //   "Page D",
  //   "Page E",
  //   "Page F",
  //   "Page G",
  // ];

  // //PieChart
  // const data = [
  //   { id: 0, value: 10, label: "series A" },
  //   { id: 1, value: 15, label: "series B" },
  //   { id: 2, value: 20, label: "series C" },
  // ];

  // const settings = {
  //   margin: { right: 5 },
  //   width: 200,
  //   height: 200,
  // };

  return (
    <>
      <Navbar />

      <div className="from-primary-green-50 min-h-screen min-w-full bg-linear-to-b via-white to-blue-50">
        <main className="l mx-auto max-w-7xl space-y-6 p-5">
          <CalorieGoal />

          {/* <section className="grid-col-1 grid gap-4 lg:grid-cols-3">
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
              <div>Weekly calorie intake</div>
              <Box sx={{ height: 250 }}>
                <BarChart
                  series={[
                    { data: uData, label: "asd", id: "uvId", stack: "total" },
                  ]}
                  xAxis={[{ data: xLabels, height: 28 }]}
                  yAxis={[{ width: 50 }]}
                  hideLegend={true}
                />
              </Box>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <div>
                <h1 className="">Valami</h1>
              </div>
              <PieChart
                series={[
                  {
                    paddingAngle: 5,
                    innerRadius: 50,
                    outerRadius: 100,
                    data,
                  },
                ]}
                {...settings}
              />
            </div>
          </section> */}

          <TodaysMeal />

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-5 rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                <NotebookTabs className="text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl">Add Exerecise</h2>
                <h1 className="font-extralight">Track your workout activity</h1>
              </div>
            </div>
            <div className="flex items-center space-x-5 rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Utensils className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl">Browse Recipes</h2>
                <h1 className="font-extralight">Discover healthy meal ideas</h1>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default DashBoardPage;
