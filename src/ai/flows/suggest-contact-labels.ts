'use server';

/**
 * @fileOverview An AI agent that suggests roles for a contact based on the provided information.
 *
 * - suggestContactRoles - A function that suggests roles for a contact.
 * - SuggestContactRolesInput - The input type for the suggestContactRoles function.
 * - SuggestContactRolesOutput - The return type for the suggestContactRoles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestContactRolesInputSchema = z.object({
  name: z.string().describe('The name of the contact.'),
  company: z.string().optional().describe('The company the contact is associated with.'),
  jobTitle: z.string().optional().describe('The job title of the contact.'),
  address: z.string().optional().describe('The address of the contact.'),
  notes: z.string().optional().describe('Any notes about the contact.'),
});
export type SuggestContactRolesInput = z.infer<typeof SuggestContactRolesInputSchema>;

const SuggestContactRolesOutputSchema = z.object({
  roles: z.array(z.string()).describe('Suggested roles for the contact.'),
});
export type SuggestContactRolesOutput = z.infer<typeof SuggestContactRolesOutputSchema>;

export async function suggestContactRoles(input: SuggestContactRolesInput): Promise<SuggestContactRolesOutput> {
  return suggestContactRolesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestContactRolesPrompt',
  input: {schema: SuggestContactRolesInputSchema},
  output: {schema: SuggestContactRolesOutputSchema},
  prompt: `Based on the following information about a contact, suggest appropriate roles from this list: client, vendor, employee, prospect, lead, partner, competitor, personal, family, friend, freelancer.

Contact Name: {{{name}}}
Company: {{{company}}}
Job Title: {{{jobTitle}}}
Address: {{{address}}}
Notes: {{{notes}}}

Suggest roles that best describe this contact.`,
});

const suggestContactRolesFlow = ai.defineFlow(
  {
    name: 'suggestContactRolesFlow',
    inputSchema: SuggestContactRolesInputSchema,
    outputSchema: SuggestContactRolesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
