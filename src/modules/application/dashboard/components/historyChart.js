"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';

export default function HistoryChart() {

    const data = [
        { name: 'Jan', random: 140, fasting: 95 },
        { name: 'Feb', random: 160, fasting: 110 },
        { name: 'Mar', random: 180, fasting: 130 },
        { name: 'Apr', random: 200, fasting: 145 },
        { name: 'May', random: 210, fasting: 150 },
        { name: 'Jun', random: 220, fasting: 155 },
        { name: 'Jul', random: 215, fasting: 148 },
        { name: 'Aug', random: 205, fasting: 142 },
        { name: 'Sep', random: 195, fasting: 138 },
        { name: 'Oct', random: 210, fasting: 150 },
        { name: 'Nov', random: 240, fasting: 175 },
        { name: 'Dec', random: 245, fasting: 200 },
    ];

    return (
        <div className="w-full bg-white rounded-xl p-4 shadow-[0px_0px_4px_0px_#0000000A]">
            <div className="w-full lg:h-70 h-45 [&_svg]:outline-none [&_svg]:focus:outline-none [&_svg]:focus-visible:outline-none">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="randomGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ED77FF" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#ED77FF" stopOpacity={0.05} />
                            </linearGradient>
                            <linearGradient id="fastingGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#978FED" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#978FED" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={true} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#464646' }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#464646' }}
                            domain={[0, 250]}
                            ticks={[0, 100, 150, 200, 250]}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                fontSize: '12px'
                            }}
                        />

                        {/* Area fills */}
                        <Area
                            type="monotone"
                            dataKey="random"
                            stroke="none"
                            fill="url(#randomGradient)"
                            tooltipType="none"
                        />
                        <Area
                            type="monotone"
                            dataKey="fasting"
                            stroke="none"
                            fill="url(#fastingGradient)"
                            tooltipType="none"
                        />

                        {/* Lines */}
                        <Line
                            type="monotone"
                            dataKey="random"
                            stroke="#ED77FF"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, fill: '#ED77FF' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="fasting"
                            stroke="#978FED"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, fill: '#978FED' }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-2">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#ED77FF] rounded-sm"></div>
                    <span className="text-xs text-black font-medium">Random Blood Sugar</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#978FED] rounded-sm"></div>
                    <span className="text-xs text-black font-medium">Fasting Blood Sugar</span>
                </div>
            </div>
        </div>
    );
}