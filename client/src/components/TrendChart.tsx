import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PointType } from '../types/types';

type TrendChartProps = {
  points: PointType
}

const today = new Date();
const emptyPoints:PointType[] = [];
for (let i = 6; i >= 0; i--) {
  const date = new Date(today);
  date.setDate(today.getDate() - i);

  emptyPoints.push({
      date: date.toISOString().slice(0, 10),
      stock: 0,
      demand: 0
  });
}


export default function TrendChart({ points }: TrendChartProps) {
  const chartPoints = points?.length > 0 ? points : emptyPoints;

  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <h2 className="text-brandBlue text-xl font-semibold mb-3">Stock vs Demand</h2>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartPoints}>
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
    </div>
  );
}
