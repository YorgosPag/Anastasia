
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis, YAxis } from 'recharts';
import type { ReportOutput } from '@/ai/flows/schemas';
import { generateReport } from '@/ai/flows/generate-report-flow';
import ReactMarkdown from 'react-markdown';
import { Label } from '../ui/label';

const examplePrompts = [
    "Ποια έργα έχουν καθυστερήσει;",
    "Δείξε μου τα στάδια για το έργο του Κωνσταντίνου Αγγέλου.",
    "Ποιος είναι υπεύθυνος για τα περισσότερα στάδια;",
    "Δημιούργησε ένα γράφημα πίτας με την κατάσταση των έργων.",
];

export function AIReportAssistant() {
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [reportOutput, setReportOutput] = useState<ReportOutput | null>(null);
    const { toast } = useToast();

    const handleGenerateReport = async (prompt?: string) => {
        const currentQuery = prompt || query;
        if (!currentQuery) {
            toast({ variant: 'destructive', title: 'Σφάλμα', description: 'Το ερώτημα δεν μπορεί να είναι κενό.' });
            return;
        }

        setIsLoading(true);
        setReportOutput(null);

        try {
            const result = await generateReport(currentQuery);
            setReportOutput(result);
            setQuery(''); // Clear input after successful generation
        } catch (error: any) {
            console.error('Error generating AI report:', error);
            toast({ variant: 'destructive', title: 'Σφάλμα Αναφοράς AI', description: error.message || 'Προέκυψε ένα μη αναμενόμενο σφάλμα.' });
        } finally {
            setIsLoading(false);
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="min-h-[20rem] flex flex-col items-center justify-center rounded-md border bg-muted p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="mt-4 text-muted-foreground">Η αναφορά δημιουργείται... Αυτό μπορεί να διαρκέσει λίγο.</p>
                </div>
            );
        }

        if (!reportOutput) {
            return (
                <div className="min-h-[20rem] flex flex-col items-center justify-center rounded-md border-2 border-dashed bg-muted/50 p-8 text-center">
                    <Wand2 className="h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">Βοηθός Αναφορών AI</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Κάντε μια ερώτηση στη γλώσσα σας για να δημιουργήσετε μια αναφορά. <br /> Δοκιμάστε ένα από τα παρακάτω παραδείγματα:
                    </p>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {examplePrompts.map(prompt => (
                            <Button key={prompt} variant="outline" size="sm" onClick={() => handleGenerateReport(prompt)}>
                                {prompt}
                            </Button>
                        ))}
                    </div>
                </div>
            )
        }
        
        if (reportOutput.type === 'chart') {
            const { chartType, data, config } = reportOutput.data;
            return (
                <Card>
                    <CardHeader>
                        <CardTitle>{reportOutput.title}</CardTitle>
                        <CardDescription>{reportOutput.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={config as any} className="h-[400px] w-full">
                            {chartType === 'bar' && (
                                <BarChart data={data}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <ChartTooltipContent />
                                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            )}
                            {chartType === 'pie' && (
                                <PieChart>
                                    <ChartTooltipContent />
                                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="hsl(var(--primary))" label />
                                </PieChart>
                            )}
                        </ChartContainer>
                    </CardContent>
                </Card>
            );
        }

        if (reportOutput.type === 'text') {
            return (
                <Card>
                    <CardHeader>
                        <CardTitle>{reportOutput.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                       <ReactMarkdown>{reportOutput.data}</ReactMarkdown>
                    </CardContent>
                </Card>
            );
        }
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                    Βοηθός Αναφορών AI
                </CardTitle>
                <CardDescription>
                    Κάντε μια ερώτηση στη γλώσσα σας. Η AI θα αναλύσει τα δεδομένα και θα σας δώσει μια απάντηση.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                     <Label htmlFor="ai-query">Το ερώτημά σας</Label>
                    <div className="relative mt-2">
                        <Textarea
                            id="ai-query"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="π.χ., Ποια είναι τα 5 κορυφαία έργα με βάση τον προϋπολογισμό;"
                            className="pr-24"
                            rows={3}
                        />
                        <Button 
                            onClick={() => handleGenerateReport()}
                            disabled={isLoading} 
                            className="absolute bottom-2.5 right-2.5"
                        >
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Δημιουργία'}
                        </Button>
                    </div>
                </div>
                 
                <div className="pt-4">
                    {renderContent()}
                </div>
            </CardContent>
        </Card>
    );
}
