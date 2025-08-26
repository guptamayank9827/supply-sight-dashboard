import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PointType } from '../types/types';

type TrendChartProps = {
  points: PointType
}

export default function TrendChart({ points }: TrendChartProps) {
  
  return (
    <div className="w-full h-64">

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" stroke="#5683d2" dataKey="stock" />
          <Line type="monotone" stroke="#17263e" dataKey="demand" />
          <Legend align="right" />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}
