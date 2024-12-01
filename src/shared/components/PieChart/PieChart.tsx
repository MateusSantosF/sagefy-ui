import {
  PieChart as PieChartRecharts,
  Pie,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
  Cell,
} from "recharts";

type PieChartProps = {
  data: { name: string; value: number }[];
  colors: string[];
};
const PieChart = ({ data, colors }: PieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChartRecharts>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <RechartsTooltip />
        <Legend />
      </PieChartRecharts>
    </ResponsiveContainer>
  );
};

export default PieChart;
