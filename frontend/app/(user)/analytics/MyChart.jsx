"use client";

import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Button } from "@/components/ui/button";

const chartData = [
  { month: "January", downloads: 0 },
  { month: "February", downloads: 10 },
  { month: "March", downloads: 50 },
  { month: "April", downloads: 173 },
  { month: "May", downloads: 209 },
  { month: "June", downloads: 214 },
  { month: "July", downloads: 180 },
  { month: "August", downloads: 220 },
  { month: "September", downloads: 195 },
  { month: "October", downloads: 250 },
  { month: "November", downloads: 300 },
  { month: "December", downloads: 375 },
];

const chartConfig = {
  downloads: {
    label: "Downloads",
    color: "var(--chart-1)",
  },
};

export default function MyChart() {
  return (
    <section className="px-4 py-2 basis-[58%]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Analytics</h3>
        <Button variant="outline2">Yearly</Button>
      </div>

      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <AreaChart data={chartData}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickCount={4}
          />

          <ChartTooltip content={<ChartTooltipContent />} />

          <Area
            type="monotone"
            dataKey="downloads"
            stroke="var(--chart-1)"
            fill="var(--chart-1)"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ChartContainer>
    </section>
  );
}
