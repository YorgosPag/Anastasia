"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Copy, HardDriveDownload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '../ui/label';
import { exportContactsToMarkdownAction } from '@/app/actions/contacts';
import { exportProjectsToMarkdownAction } from '@/app/actions/projects';

type ExportType = 'contacts' | 'projects';

export function DataExport() {
    const [isLoading, setIsLoading] = useState<ExportType | null>(null);
    const [markdownData, setMarkdownData] = useState<string | null>(null);
    const { toast } = useToast();

    const handleExport = async (type: ExportType) => {
        setIsLoading(type);
        setMarkdownData(null);
        try {
            const action = type === 'contacts' ? exportContactsToMarkdownAction : exportProjectsToMarkdownAction;
            const result = await action();
            
            if (result.success && result.data) {
                setMarkdownData(result.data);
                toast({ title: 'Επιτυχία', description: `Τα δεδομένα (${type === 'contacts' ? 'επαφών' : 'έργων'}) εξήχθησαν με επιτυχία.` });
            } else {
                toast({ variant: 'destructive', title: 'Σφάλμα', description: result.error || 'Η εξαγωγή απέτυχε' });
            }
        } catch (error: any) {
             toast({ variant: 'destructive', title: 'Σφάλμα Συστήματος', description: error.message || 'Προέκυψε ένα μη αναμενόμενο σφάλμα κατά την εξαγωγή.' });
        } finally {
            setIsLoading(null);
        }
    };
    
    const handleCopy = () => {
        if (!markdownData) return;
        navigator.clipboard.writeText(markdownData).then(() => {
            toast({ title: 'Επιτυχία', description: 'Τα δεδομένα αντιγράφηκαν στο πρόχειρο.' });
        }).catch(() => {
            toast({ variant: 'destructive', title: 'Σφάλμα', description: 'Η αντιγραφή απέτυχε.' });
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <HardDriveDownload className="h-6 w-6" />
                    Εξαγωγή Δεδομένων
                </CardTitle>
                <CardDescription>
                    Εξάγετε τα δεδομένα σας από τη βάση δεδομένων σε μορφή Markdown για εύκολη αντιγραφή και χρήση.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Button onClick={() => handleExport('contacts')} disabled={!!isLoading}>
                        {isLoading === 'contacts' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Εξαγωγή Επαφών
                    </Button>
                     <Button onClick={() => handleExport('projects')} disabled={!!isLoading}>
                        {isLoading === 'projects' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Εξαγωγή Έργων
                    </Button>
                    {markdownData && (
                        <Button onClick={handleCopy} variant="outline">
                            <Copy className="mr-2 h-4 w-4" />
                            Αντιγραφή
                        </Button>
                    )}
                </div>

                {isLoading && (
                    <div className="min-h-[20rem] flex items-center justify-center rounded-md border bg-muted">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}
                
                {markdownData && !isLoading && (
                    <div>
                        <Label htmlFor="markdown-output">Αποτέλεσμα Εξαγωγής</Label>
                        <Textarea
                            id="markdown-output"
                            readOnly
                            value={markdownData}
                            className="mt-2 h-[400px] font-mono text-xs"
                            placeholder="Τα δεδομένα Markdown θα εμφανιστούν εδώ..."
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
