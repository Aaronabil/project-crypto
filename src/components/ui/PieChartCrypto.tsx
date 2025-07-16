    "use client"

    import { Pie, PieChart } from "recharts"
    import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    } from "@/components/ui/chart"

    const chartData = [
    { coin: "btc", invest: 100, fill: "#ff9900" }
    ]

    const chartConfig = {
    invest: { 
        label: "Invest" 
    },
    btc: { 
        label: "BTC", color: "#ff9900" 
    }
    } satisfies ChartConfig

    export function MyPieChart() {
    return (
        <div className="flex items-center justify-center gap-6">
        {/* Chart Container */}
        <ChartContainer
            config={chartConfig}
            className="aspect-square w-[200px]" // Responsive & visible
        >
            <PieChart>
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
            />
            <Pie
                data={chartData}
                dataKey="invest"
                nameKey="coin"
                innerRadius={50}
                outerRadius={100}
            />
            </PieChart>
        </ChartContainer>

        {/* Legend */}
        <div className="flex items-center gap-2">
            <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: "#ff9900" }}
            />
            <span className="text-sm text-muted-foreground font-medium">BTC</span>
            <span className="text-md font-bold ml-2">100.00%</span>
        </div>
        </div>
    )
    }
