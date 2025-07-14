
import { z } from 'zod';

const ChartDataItemSchema = z.object({
    name: z.string().describe('The name of the data point (e.g., project name, status, month).'),
    value: z.number().describe('The numerical value of the data point.'),
});

const ChartConfigItemSchema = z.object({
    label: z.string().describe('The display label for the chart item.'),
    color: z.string().describe('A tailwind CSS color class (e.g., "hsl(var(--chart-1))").'),
});

const ChartDataSchema = z.object({
    chartType: z.enum(['bar', 'pie']).describe('The type of chart to display.'),
    data: z.array(ChartDataItemSchema).describe('The data array for the chart.'),
    config: z.record(ChartConfigItemSchema).describe('The configuration object for the chart.'),
    title: z.string().describe('The title of the chart.'),
    description: z.string().describe('A brief description of what the chart shows.'),
});

export const ReportOutputSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('chart'),
    title: z.string().describe("The overall title for the report."),
    description: z.string().describe("A brief, one-sentence summary of the report's findings."),
    data: ChartDataSchema,
  }),
  z.object({
    type: z.literal('text'),
    title: z.string().describe("A title for the report, summarizing the answer."),
    data: z.string().describe("The detailed text-based answer to the user's query, formatted in Markdown."),
  }),
]);


export type ReportOutput = z.infer<typeof ReportOutputSchema>;
