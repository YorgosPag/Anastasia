

"use client";

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart2 } from "lucide-react";
import { AIReportAssistant } from "@/components/reports/ai-report-assistant";
import { DataExport } from "@/components/reports/data-export";
import { DynamicReportBuilder } from '@/components/reports/dynamic-report-builder';

export default function ReportsPage() {
    const [selectedReport, setSelectedReport] = useState("report_builder");

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1 flex items-baseline gap-4">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <BarChart2 className="h-5 w-5" />
                        Αναφορές
                    </h1>
                     <p className="text-muted-foreground text-sm hidden md:block">Δυναμικές αναφορές για την επισκόπηση των δεδομένων σας.</p>
                </div>
                <div className="w-full sm:w-auto min-w-[250px]">
                     <Select value={selectedReport} onValueChange={setSelectedReport}>
                        <SelectTrigger>
                            <SelectValue placeholder="Επιλέξτε αναφορά..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="report_builder">Ευέλικτες Αναφορές</SelectItem>
                            <SelectItem value="ai_assistant">Βοηθός Αναφορών AI</SelectItem>
                            <SelectItem value="data_export">Εξαγωγή Δεδομένων</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div>
                {selectedReport === 'report_builder' && (
                    <DynamicReportBuilder />
                )}
                {selectedReport === 'ai_assistant' && (
                    <AIReportAssistant />
                )}
                {selectedReport === 'data_export' && (
                    <DataExport />
                )}
            </div>
        </div>
    );
}
