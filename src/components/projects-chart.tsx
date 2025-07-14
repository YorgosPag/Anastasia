"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { mockChartData } from "@/data/dashboard-data"


const chartConfig = {
  value: {
    label: "Προϋπολογισμός",
    color: "hsl(var(--chart-1))",
  },
} satisfies import("./ui/chart").ChartConfig;


export function ProjectsChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Προϋπολογισμός Έργων</CardTitle>
        <CardDescription>Σύγκριση προϋπολογισμού έργων εντός και εκτός χρονοδιαγράμματος</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart accessibilityLayer data={mockChartData} margin={{ left: 10, right: 10, top:10, bottom:10 }}>
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
              className="fill-muted-foreground"
            />
            <YAxis dataKey="value" type="number" hide />
            <Tooltip cursor={{ fill: "hsl(var(--muted))" }} content={<ChartTooltipContent />} />
             <Bar dataKey="value" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
