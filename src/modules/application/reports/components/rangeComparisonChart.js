"use client"
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  ReferenceArea,
  Cell,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { useDeviceType } from "@/hooks";
import { DEVICE_TYPE } from "@/constants/enums";

const CustomTooltip = ({ active, payload, label, min, max, unit }) => {
  if (!active || !payload || !payload.length) return null;

  const value = payload[0].value;
  const color = getStatusColor(value, min, max);
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #E5E7EB",
      borderRadius: 8,
      padding: "8px 12px",
      boxShadow: "0px 0px 4px rgba(0,0,0,0.1)",
    }}
    >
      <p className="text-sm font-medium text-black"> {label} </p>
      <p className="text-sm font-bold mt-1" style={{ color }}>
        Actual: {value} {unit}
      </p>
    </div>
  );
};

const getStatusColor = (value, minRange, maxRange) => {
  if (value < minRange) return "#EF4444";
  if (value > maxRange) return "#F59E0B";
  return "#6FCF97";
};

export default function RangeComparisonChart({ data }) {

  const deviceType = useDeviceType();
  const isMobile = deviceType === DEVICE_TYPE.MOBILE;
  if (!data || data.length === 0) return null;
  const { min, max, unit, name, range } = data[0];
  const chartData = data;

  return (
    <Card className="rounded-2xl border-0 shadow-[0px_0px_6.4px_0px_rgba(0,0,0,0.06)] py-0">
      <CardContent className="p-0 py-4 pr-4">
        {/* Status Badge */}
        <div className="flex items-center justify-between pl-4">
          <div>
            <h3 className="text-base font-bold text-black">{name}</h3>
            <p className="text-sm text-brand-light-black mt-1">
              {range === 0 ? 'No reference range available' : `Normal Range: ${min} - ${max} ${unit}`}
            </p>
          </div>
          {/* <div>
            <p className="text-base font-bold text-black">Result</p>
            <div className="flex items-center gap-3">
              <p className="text-xl font-bold" style={{ color: statusColor }}>
                {actual} <span className="text-sm font-semibold">{unit}</span>
              </p>
              <Badge className={`text-white rounded-sm text-sm font-medium px-2 py-1`} style={{ backgroundColor: statusColor }}>
                {actual < min ? 'Low' : actual > max ? 'High' : 'Normal'}
              </Badge>
            </div>
          </div> */}
        </div>
        {range !== 0 && (
          <>
            {/* Chart */}
            <div className="w-full mt-4 lg:h-55 md:h-50 h-40 [&_svg]:outline-none [&_svg]:focus:outline-none [&_svg]:focus-visible:outline-none">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  layout="vertical"
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                  responsive
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#87878733" />
                  <XAxis
                    type="number"
                    domain={[0, max * 1.3]}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: "#000",
                      fontWeight: 600,
                    }}
                    tickFormatter={(value) => Number(value).toFixed(2)}
                  />
                  <YAxis
                    type="category"
                    dataKey="label"
                    width={isMobile ? 70 : 140}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: "#000",
                      fontWeight: 600,
                    }}
                    tickFormatter={(value, index) => {
                      const item = chartData[index];
                      return `${value} (${item?.month})`;
                    }}
                  />
                  {/* <Tooltip
                    cursor={false}
                    formatter={(value) => `${value}${unit}`}
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.1)',
                    }}
                  /> */}

                  <Tooltip
                    cursor={false}
                    content={
                      <CustomTooltip
                        min={min}
                        max={max}
                        unit={unit}
                      />
                    }
                  />

                  {/* Normal Range Area (Background) */}
                  <ReferenceArea
                    x1={min}
                    x2={max}
                    fill="#6FCF97"
                    fillOpacity={0.3}
                    radius={[8, 8, 8, 8]}
                    label={{
                      value: `Normal Range (${min}-${max})`,
                      position: 'insideTop',
                      fontSize: 14,
                      fill: '#000',
                      fontWeight: 600,
                    }}
                  />

                  {/* Actual Value Bar */}
                  <Bar
                    dataKey="actual"
                    barSize={40}
                    radius={[8, 8, 8, 8]}
                    label={{
                      position: "right",
                      formatter: (v) => `${v} ${unit}`,
                      fontWeight: 600,
                      fill: "#000",
                      fontSize: 14
                    }}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={getStatusColor(entry.actual, min, max)}
                      />
                    ))}
                  </Bar>
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Additional Info */}
            <div className="mt-2 p-3 rounded-lg bg-gray-50 ml-4">
              <div className="flex items-center justify-end">
                {/* <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColor }}></div>
                  <span className="text-black font-medium text-sm">
                    {actual < min && `${(min - actual).toFixed(1)} ${unit} below normal range (Actual Result)`}
                    {actual > max && `${(actual - max).toFixed(1)} ${unit} above normal range (Actual Result)`}
                    {actual >= min && actual <= max && 'Within normal range (Actual Result)'}
                  </span>
                </div> */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#6FCF97] opacity-40"></div>
                  <span className="text-black font-medium text-sm">Normal Range</span>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}