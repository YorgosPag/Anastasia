"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { mockChartData } from "@/data/dashboard-data"


const chartConfig = {
  value: {
    label: "Προϋπολογισμός",
  },
  'Εντός': {
    label: "Εντός",
    color: "hsl(var(--chart-1))",
  },
  'Καθυστέρηση': {
    label: "Καθυστέρηση",
    color: "hsl(var(--chart-2))",
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
          <BarChart accessibilityLayer data={mockChartData} layout="vertical" margin={{ left: 10, right: 10, top:10, bottom:10 }}>
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
              className="fill-muted-foreground"
            />
            <XAxis dataKey="value" type="number" hide />
            <Tooltip cursor={{ fill: "hsl(var(--muted))" }} content={<ChartTooltipContent />} />
             <Bar dataKey="value" layout="vertical" radius={5}>
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
