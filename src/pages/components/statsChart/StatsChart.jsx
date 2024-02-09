import styles from "./index.module.scss";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";

const StatsChart = ({ pokemonStats }) => {
  const data = pokemonStats?.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));

  return (
    data && (
      <RadarChart height={200} width={300} outerRadius="60%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" stroke="black" />
        <Radar dataKey="value" stroke="red" fill="red" fillOpacity={0.5} />
      </RadarChart>
    )
  );
};

export default StatsChart;
