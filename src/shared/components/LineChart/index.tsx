import {
  LineChart as LineChartRechart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts";

type LineChartProps = {
  data: unknown[];
};

const LineChart = ({ data }: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChartRechart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <RechartsTooltip />
        <Line type="monotone" dataKey="precisao" stroke="#82ca9d" />
      </LineChartRechart>
    </ResponsiveContainer>
  );
};

export default LineChart;
