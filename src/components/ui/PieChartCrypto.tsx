"use client"

import React from "react"
import { Pie, PieChart } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
} from "@/components/ui/chart"

interface PieChartData {
    coin: string
    invest: number
    fill: string
}

interface MyPieChartProps {
    data: PieChartData[]
}

export function MyPieChart({ data }: MyPieChartProps) {
    // Calculate total invest to compute percentages
    const totalInvest = data.reduce((sum, entry) => sum + entry.invest, 0)

    // Generate chartConfig dynamically based on data
    const chartConfig: ChartConfig = data.reduce((config, entry) => {
        config[entry.coin] = { label: entry.coin.toUpperCase(), color: entry.fill }
        return config
    }, {} as ChartConfig)

    // Custom tooltip content component to show percentage with label and color
    const CustomTooltipContent = ({ active, payload }: any) => {
        if (!active || !payload || !payload.length) return null

        const entry = payload[0]
        const value = entry.value
        const percent = totalInvest > 0 ? ((value / totalInvest) * 100).toFixed(2) : "0.00"
        const label = entry.name.toUpperCase()
        const color = entry.payload.fill || entry.color

        return (
            <div className="grid min-w-[8rem] items-center gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
                <div className="flex items-center gap-2">
                    <span
                        className="inline-block w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                    />
                    <span className="font-medium">{label}</span>
                    <div className="ml-5 font-mono font-medium tabular-nums text-foreground">
                        {percent}%
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center gap-6">
            {/* Chart Container */}
            <ChartContainer
                config={chartConfig}
                className="aspect-square w-[200px]" // Responsive & visible
            >
                <PieChart>
                    <ChartTooltip cursor={false} content={<CustomTooltipContent />} />
                    <Pie
                        data={data}
                        dataKey="invest"
                        nameKey="coin"
                        innerRadius={50}
                        outerRadius={100}
                    />
                </PieChart>
            </ChartContainer>

            {/* Legend */}
            <div className="flex flex-col gap-2 ml-7">
                {data.map((entry) => (
                    <div key={entry.coin} className="flex items-center gap-2">
                        <span
                            className="inline-block w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.fill }}
                        />
                        <span className="text-sm text-muted-foreground font-medium">{entry.coin.toUpperCase()}</span>
                        <span className="text-md font-bold ml-2">
                            {totalInvest > 0 ? ((entry.invest / totalInvest) * 100).toFixed(2) : "0.00"}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
