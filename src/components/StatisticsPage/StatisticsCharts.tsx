import { useStatistics } from "../../context/StatisticsContext";
import { LineChart, PieChart } from "@mui/x-charts";

const StatisticsCharts = () => {
  const { avgMacroNutrients, attributesData } = useStatistics();
  const pieChartData = [
    { id: 0, value: avgMacroNutrients.carbohydrate, label: "Carbohydrate" },
    { id: 1, value: avgMacroNutrients.protein, label: "Protein" },
    { id: 2, value: avgMacroNutrients.fat, label: "Fat" },
  ];
  const chartAttributes = [...attributesData];

  // If only one data point, duplicate it with today's date
  if (attributesData.length === 1) {
    const today = new Date().toISOString();
    chartAttributes.push({
      ...attributesData[0],
      measuredAt: today,
    });
  }

  const lineChartData = chartAttributes
    .sort(
      (a, b) =>
        new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime(),
    )
    .map((attr) => ({
      date: new Date(attr.measuredAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      weight: attr.weight,
    }));

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <section className="col-span-2 flex items-center justify-center rounded-xl border border-gray-200 bg-white p-4">
          <LineChart
            xAxis={[
              { scaleType: "point", data: lineChartData.map((d) => d.date) },
            ]}
            series={[
              {
                data: lineChartData.map((d) => d.weight),
                label: "Weight (kg)",
              },
            ]}
            width={500}
            height={300}
          />
        </section>
        <section className="flex items-center justify-center rounded-xl border border-gray-200 bg-white p-4">
          <div className="h-35 w-full">
            <PieChart
              height={200}
              colors={["#5C6BC0", "#FFA726", "#EF5350"]}
              series={[
                {
                  startAngle: -90,
                  endAngle: 90,
                  paddingAngle: 2,
                  innerRadius: "60%",
                  outerRadius: "90%",
                  data: pieChartData,
                },
              ]}
              slotProps={{
                legend: {
                  direction: "horizontal",
                  position: { vertical: "bottom", horizontal: "center" },
                  sx: { transform: "translateY(-80px)" },
                },
              }}
            />
          </div>
        </section>
      </div>
    </>
  );
};
export default StatisticsCharts;
