"use client";

import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import AnalyticFilters from "./AnalyticFilters";
import type { ChartPoint } from "@/lib/analytics";

const chartConfig = {
  downloads: {
    label: "Downloads",
    color: "var(--chart-1)",
  },
};

export default function MyChart({
  data,
}: {
  data: ChartPoint[];
}) {
  return (
    <section className="md:px-4 py-2 md:py-4 bg-white rounded-[20px] lg:basis-[58%] w-[97%]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg hidden md:block font-semibold">Analytics</h3>
        <h3 className="text-[10px] md:hidden font-bold leading-[130%]">
          Overview
        </h3>
        <AnalyticFilters />
      </div>

      <ChartContainer config={chartConfig} className="min-h-50 h-[92%] w-full ">
        <AreaChart data={data}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />

          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
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
