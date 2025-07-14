
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { mockStagesByContractor } from "@/data/reports-data"

const chartConfig = {
  stages: {
    label: "Στάδια",
  },
  'Γεώργιος Δολμές': {
    label: 'Γεώργιος Δολμές',
    color: 'hsl(var(--chart-1))',
  },
  'Ανδρέας Λαρίν': {
    label: 'Ανδρέας Λαρίν',
    color: 'hsl(var(--chart-2))',
  },
  'Αθανάσιος Γκαϊτατζής': {
    label: 'Αθανάσιος Γκαϊτατζής',
    color: 'hsl(var(--chart-3))',
  },
} satisfies import("@/components/ui/chart").ChartConfig;


export function StagesByContractorChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Αριθμός Σταδίων ανά Ανάδοχο</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={mockStagesByContractor}
            margin={{
              top: 5,
              right: 20,
              left: -10,
              bottom: 5,
            }}
            
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
              
            />
             <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="stages" name="stages" radius={4}>
                 {mockStagesByContractor.map((entry) => (
                    <RechartsPrimitive.Cell key={entry.name} fill={chartConfig[entry.name as keyof typeof chartConfig]?.color} />
                ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
// This needs to be imported for the chart to work
import * as RechartsPrimitive from "recharts";
