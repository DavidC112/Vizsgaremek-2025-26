import { useStatistics } from "../../context/StatisticsContext";
import { LineChart, PieChart } from "@mui/x-charts";
import { useRef, useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.18,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

const StatisticsCharts = () => {
  const { avgMacroNutrients, attributesData } = useStatistics();
  const lineChartContainerRef = useRef(null);
  const [lineChartWidth, setLineChartWidth] = useState(500);

  useEffect(() => {
    const el = lineChartContainerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setLineChartWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pieChartData = [
    { id: 0, value: avgMacroNutrients.carbohydrate, label: "Carbohydrate" },
    { id: 1, value: avgMacroNutrients.protein, label: "Protein" },
    { id: 2, value: avgMacroNutrients.fat, label: "Fat" },
  ];

  const chartAttributes = [...attributesData];
  if (attributesData.length === 1) {
    const today = new Date().toISOString();
    chartAttributes.push({ ...attributesData[0], measuredAt: today });
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <motion.section
        ref={lineChartContainerRef}
        custom={0}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="col-span-1 flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white p-4 md:col-span-2"
      >
        <LineChart
          xAxis={[
            { scaleType: "point", data: lineChartData.map((d) => d.date) },
          ]}
          yAxis={[
            {
              min: Math.max(
                0,
                Math.min(...lineChartData.map((d) => d.weight)) - 10,
              ),
              max: Math.max(...lineChartData.map((d) => d.weight)) + 10,
            },
          ]}
          series={[
            {
              data: lineChartData.map((d) => d.weight),
              label: "Weight (kg)",
            },
          ]}
          width={lineChartWidth}
          height={300}
        />
      </motion.section>

      <motion.section
        custom={1}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="col-span-1 flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white p-4"
      >
        <div className="w-full" style={{ height: 220 }}>
          <PieChart
            height={220}
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
                sx: { transform: "translateY(-50px)" },
              },
            }}
          />
        </div>
      </motion.section>
    </div>
  );
};

export default StatisticsCharts;
