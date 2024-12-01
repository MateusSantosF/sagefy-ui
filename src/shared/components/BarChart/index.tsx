import {
  BarChart as BarChartRecharts,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts";

type BarChartProps = {
  data: unknown[];
};
const BarChart = ({ data }: BarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChartRecharts data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <RechartsTooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChartRecharts>
    </ResponsiveContainer>
  );
};

export default BarChart;
