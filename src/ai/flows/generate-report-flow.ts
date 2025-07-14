
'use server';
/**
 * @fileOverview An AI-powered reporting flow that answers natural language questions
 * about project data using tools.
 * - generateReport - A function that handles the report generation process.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { ReportOutputSchema, type ReportOutput } from './schemas';
import { mockProjects } from '@/data/dashboard-data';
import { mockContacts } from '@/data/mock-data';

// #################################################################
//  TOOLS DEFINITION
// #################################################################

const getProjectsTool = ai.defineTool(
  {
    name: 'getProjects',
    description: 'Retrieves a list of all projects with their details, including interventions, stages, budget, and status. Use this tool to answer questions about multiple projects, or to find a specific project if its ID is unknown.',
    inputSchema: z.object({}),
    outputSchema: z.any(),
  },
  async () => {
    try {
        console.log(`[AI Tool] Getting all projects.`);
        // The data must be simplified to avoid overwhelming the context window and ensure serializability.
        const projects = mockProjects;
        return projects.map(p => ({
            id: p.id,
            title: p.projectName,
            owner: p.clientName,
            status: p.status,
            budget: p.budget,
            deadline: p.deadline,
        }));
    } catch(e: any) {
        console.error(`[AI Tool getProjects] DB Error: ${e.message}`);
        return { error: `Database error: ${e.message}` };
    }
  }
);


const getContactsTool = ai.defineTool(
    {
        name: 'getContacts',
        description: 'Retrieves a list of all contacts, including their roles, specialties, and contact information. Use this to find contact details or to cross-reference contact IDs found in project data.',
        inputSchema: z.object({}),
        outputSchema: z.any(),
    },
    async () => {
        try {
            console.log(`[AI Tool] Getting all contacts.`);
            const contacts = mockContacts;
             return contacts.map(c => ({
                id: c.id,
                name: `${c.name || ''} ${c.surname || ''}`.trim(),
                roles: c.roles,
                specialty: c.profession
            }));
        } catch(e: any) {
            console.error(`[AI Tool getContacts] DB Error: ${e.message}`);
            return { error: `Database error: ${e.message}` };
        }
    }
);


// #################################################################
//  AI FLOW DEFINITION
// #################################################################

const reportingPrompt = ai.definePrompt({
    name: "reportingPrompt",
    tools: [getProjectsTool, getContactsTool],
    output: { schema: ReportOutputSchema },
    system: `You are a helpful data analyst assistant for the "NESTOR eco" project management app.
Your task is to answer user questions about their projects.
You MUST respond in Greek.
Use the provided tools to fetch the necessary data (projects and contacts).
Analyze the data returned by the tools to formulate a clear, concise, and accurate answer to the user's query.
If the data is insufficient to answer the question, state that clearly.
When mentioning people, use their full name if you can find it using the getContacts tool.
If the user asks for a visual representation like a chart, graph, or pie, you MUST structure your response using the provided ChartData schema. For all other questions, provide a text-based (string) answer. Do not return raw JSON as a string.
Format your final text response for readability using Markdown.
`,
});


const generateReportFlow = ai.defineFlow(
  {
    name: 'generateReportFlow',
    inputSchema: z.string(),
    outputSchema: ReportOutputSchema,
  },
  async (query) => {
    
    const llmResponse = await reportingPrompt({prompt: `Here is the user's question:
    {{{query}}}`,
    context: { query }
    });
    
    return llmResponse.output!;
  }
);


export async function generateReport(query: string): Promise<ReportOutput> {
  return generateReportFlow(query);
}
