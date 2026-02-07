"use client"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Cell,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"

export default function RangeComparisonChart(props) {

  const actualBarColor = props?.data?.map((item) => item.actual > item.normal ? "#FF64A6" : "#01B5EA")[0]

  return (
    <Card className="rounded-2xl border-0 shadow-[0px_0px_6.4px_0px_rgba(0,0,0,0.06)] py-0">
      <CardContent className="p-0 py-4 pr-4">
        <div className="w-full lg:h-55 md:h-50 h-40 [&_svg]:outline-none [&_svg]:focus:outline-none [&_svg]:focus-visible:outline-none">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={props?.data}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
              barGap={15}
              responsive
            >
              <CartesianGrid strokeDasharray="3 3" vertical stroke="#E5E7EB" />
              <XAxis
                type="number"
                // domain={[0, 60000]}
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fill: "#000",
                  fontWeight: 600,
                }}
              />
              <YAxis
                type="category"
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fill: "#000",
                  fontWeight: 600,
                }}
              />
              <Tooltip cursor={{ fill: "transparent" }} />
              <Legend
                verticalAlign="bottom"
                align="right"
                iconType="circle"
                wrapperStyle={{
                  fontSize: "14px",
                  color: "#000",
                  // paddingTop: "12px",
                  fontWeight: 600,
                }}
              />

              {/* Normal Range */}
              <Bar
                dataKey="normal"
                name="Normal Range"
                fill="#6FCF97"
                radius={[8, 8, 8, 8]}
                barSize={36}
              />

              {/* Actual Result */}
              <Bar
                dataKey="actual"
                name="Actual Result"
                radius={[8, 8, 8, 8]}
                barSize={36}
                fill={actualBarColor}
              >
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}