"use client"
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts"

const GAUGE_DATA = [
    { name: "<70", value: 20, color: "#19A1F0" },
    { name: "70-90", value: 20, color: "#5BA602" },
    { name: "100-125", value: 20, color: "#F8AD00" },
    { name: "126-199", value: 25, color: "#C70102" },
    { name: ">200", value: 40, color: "#C70102" },
]

const renderArcLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    name,
}) => {
    const RADIAN = Math.PI / 180
    const radius = outerRadius + 16
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text
            x={x}
            y={y}
            fill="#000"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={12}
            fontWeight={600}
        >
            {name}
        </text>
    )
}

export default function VitalInfoChart() {
    return (
        <div className="flex flex-col items-center">
            <h4 className="text-base font-bold text-black mb-2">
                Blood Glucose Range
            </h4>
            <div className="w-full h-40 relative [&_svg]:outline-none [&_svg]:focus:outline-none [&_svg]:focus-visible:outline-none">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={GAUGE_DATA}
                            dataKey="value"
                            startAngle={180}
                            endAngle={0}
                            cx="50%"
                            cy="80%"
                            innerRadius={80}
                            outerRadius={96}
                            paddingAngle={3}
                            cornerRadius={12}
                            label={renderArcLabel}
                            labelLine={false}
                        >
                            {GAUGE_DATA.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
