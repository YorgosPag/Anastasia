'use server';

/**
 * @fileOverview An AI agent that suggests labels for a contact based on the provided information.
 *
 * - suggestContactLabels - A function that suggests labels for a contact.
 * - SuggestContactLabelsInput - The input type for the suggestContactLabels function.
 * - SuggestContactLabelsOutput - The return type for the suggestContactLabels function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestContactLabelsInputSchema = z.object({
  name: z.string().describe('The name of the contact.'),
  company: z.string().optional().describe('The company the contact is associated with.'),
  jobTitle: z.string().optional().describe('The job title of the contact.'),
  address: z.string().optional().describe('The address of the contact.'),
  notes: z.string().optional().describe('Any notes about the contact.'),
});
export type SuggestContactLabelsInput = z.infer<typeof SuggestContactLabelsInputSchema>;

const SuggestContactLabelsOutputSchema = z.object({
  labels: z.array(z.string()).describe('Suggested labels for the contact.'),
});
export type SuggestContactLabelsOutput = z.infer<typeof SuggestContactLabelsOutputSchema>;

export async function suggestContactLabels(input: SuggestContactLabelsInput): Promise<SuggestContactLabelsOutput> {
  return suggestContactLabelsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestContactLabelsPrompt',
  input: {schema: SuggestContactLabelsInputSchema},
  output: {schema: SuggestContactLabelsOutputSchema},
  prompt: `Based on the following information about a contact, suggest appropriate labels from this list: client, vendor, employee, prospect, lead, partner, competitor, personal, family, friend.

Contact Name: {{{name}}}
Company: {{{company}}}
Job Title: {{{jobTitle}}}
Address: {{{address}}}
Notes: {{{notes}}}

Suggest labels that best describe this contact.`,
});

const suggestContactLabelsFlow = ai.defineFlow(
  {
    name: 'suggestContactLabelsFlow',
    inputSchema: SuggestContactLabelsInputSchema,
    outputSchema: SuggestContactLabelsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
