
"use client"

import * as React from "react"
import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { mockStagesByStatus } from "@/data/reports-data"

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
              data={mockStagesByStatus}
              dataKey="stages"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
                {mockStagesByStatus.map((entry) => (
                    <RechartsPrimitive.Cell key={entry.status} fill={chartConfig[entry.status as keyof typeof chartConfig]?.color} />
                ))}
            </Pie>
             <ChartLegend content={<ChartLegendContent nameKey="status" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

// This needs to be imported for the chart to work
import * as RechartsPrimitive from "recharts";
