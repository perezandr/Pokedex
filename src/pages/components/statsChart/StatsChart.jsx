import styles from "./index.module.scss";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const StatsChart = ({ pokemonStats }) => {
  const data = pokemonStats?.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));

  return (
    data && (
      <RadarChart height={200} width={400} outerRadius="60%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" stroke="black" />
        <PolarRadiusAxis angle={30} domain={[0, 250]} />
        <Radar dataKey="value" stroke="red" fill="red" fillOpacity={0.5} />
      </RadarChart>
    )
  );
};

export default StatsChart;
