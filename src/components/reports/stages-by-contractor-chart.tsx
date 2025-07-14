
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { name: 'Γεώργιος Δολμές', stages: 24, fill: 'var(--color-dolmes)' },
  { name: 'Ανδρέας Λαρίν', stages: 2, fill: 'var(--color-larin)' },
  { name: 'Αθανάσιος Γκαϊτατζής', stages: 1, fill: 'var(--color-gkaitatzis)' },
];

const chartConfig = {
  stages: {
    label: "Στάδια",
  },
  dolmes: {
    label: 'Γεώργιος Δολμές',
    color: 'hsl(var(--chart-1))',
  },
  larin: {
    label: 'Ανδρέας Λαρίν',
    color: 'hsl(var(--chart-2))',
  },
  gkaitatzis: {
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
            data={chartData}
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
              tickFormatter={(value) => value.split(' ')[0]}
              
            />
             <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="stages" fill="hsl(var(--chart-1))" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
