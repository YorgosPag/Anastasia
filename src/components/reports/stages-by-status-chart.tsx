
"use client"

import * as React from "react"
import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

const chartData = [
  { status: 'pending', stages: 17, fill: 'hsl(var(--chart-1))' },
  { status: 'in_progress', stages: 2, fill: 'hsl(var(--chart-2))' },
];


const chartConfig = {
  stages: {
    label: "Στάδια",
  },
  pending: {
    label: "Σε Εκκρεμότητα",
    color: "hsl(var(--chart-1))",
  },
  in_progress: {
    label: "Σε Εξέλιξη",
    color: "hsl(var(--chart-2))",
  },
} satisfies import("@/components/ui/chart").ChartConfig


export function StagesByStatusChart() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Κατανομή Σταδίων ανά Κατάσταση</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="stages"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
              fill="hsl(var(--chart-1))"
            />
             <ChartLegend content={<ChartLegendContent nameKey="status" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
