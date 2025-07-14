"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PlusCircle, TrendingUp, TrendingDown, Clock, CheckCircle, Mail, Calendar, Package } from 'lucide-react';

const budgetData = [
  { name: 'Εντός', 'Προϋπολογισμός': 180000, fill: 'var(--color-on-time)' },
  { name: 'Καθυστέρηση', 'Προϋπολογισμός': 19791.58, fill: 'var(--color-delayed)' },
];

const deadlines = [
    { id: 1, user: 'Αγγέλου Κωνσταντίνος', project: 'ΕΚΟ23', task: 'Ενημέρωση για αυτοψία και αποστολή προσφοράς', time: 'σε περίπου 13 ώρες', date: '14/07/2025' },
    { id: 2, user: 'Αγγέλου Κωνσταντίνος', project: 'ΕΚΟ23', task: 'Ενημέρωση για αυτοψία και αποστολή προσφοράς', time: 'σε περίπου 13 ώρες', date: '14/07/2025' },
    { id: 3, user: 'Αχτσιόγλου Ευάγγελος', project: 'ΕΚΟ21', task: 'Ενημέρωση για αυτοψία και αποστολή προσφοράς', time: 'σε περίπου 13 ώρες', date: '14/07/2025' },
    { id: 4, user: 'Αχτσιόγλου Ευάγγελος', project: 'ΕΚΟ21', task: 'Ενημέρωση για αυτοψία και αποστολή προσφοράς', time: 'σε περίπου 13 ώρες', date: '14/07/2025' },
    { id: 5, user: 'Καραγιάννη Ανατολή (Εύα)', project: '', task: 'Ενημέρωση για αυτοψία και αποστολή προσφοράς', time: 'σε περίπου 13 ώρες', date: '14/07/2025' },
];


export default function DashboardPage() {
    return (
        <div className="flex-1 space-y-4">
            <style jsx global>{`
              :root {
                --color-on-time: #F28C7E;
                --color-delayed: #4DB6AC;
              }
            `}</style>
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Πίνακας Ελέγχou</h2>
                    <p className="text-muted-foreground">Μια γενική επισκόπηση της κατάστασης των έργων και των προσφορών σας.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Δημιουργία Έργου/Προσφοράς
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard 
                    title="Συνολικός Προϋπολογισμός (Ενεργά)"
                    value="€199.791,58"
                    description="σε 14 ενεργά έργα"
                    icon={<TrendingUp className="text-green-500" />}
                />
                <StatCard 
                    title="Έργα εντός Χρονοδιαγράμματος"
                    value="13"
                    description="από σύνολο 14 ενεργών"
                    icon={<CheckCircle className="text-green-500" />}
                />
                <StatCard 
                    title="Έργα σε Καθυστέρηση"
                    value="1"
                    description="Απαιτούν προσοχή"
                    icon={<TrendingDown className="text-red-500" />}
                />
                <StatCard 
                    title="Προσφορές σε εκκρεμότητα"
                    value="0"
                    description="Αναμένουν έγκριση"
                    icon={<Mail className="text-yellow-500" />}
                />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Επισκόπηση Προϋπολογισμού</CardTitle>
                        <CardDescription>Συνολικός προϋπολογισμός ανά κατάσταση έργου.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={budgetData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `€${value.toLocaleString('de-DE')}`} />
                                <Tooltip
                                    contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius)" }}
                                    formatter={(value: number) => [`€${value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, "Προϋπολογισμός"]}
                                />
                                <Bar dataKey="Προϋπολογισμός" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5"/> Προσεχείς Προθεσμίες</CardTitle>
                        <CardDescription>Τα επόμενα στάδια που πλησιάζουν στην ημερομηνία λήξης τους.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {deadlines.map(d => (
                           <div key={d.id} className="flex items-center gap-4">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback>{d.user.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 text-sm">
                                    <p className="font-medium">{d.task}</p>
                                    <p className="text-muted-foreground">{d.user} {d.project}</p>
                                </div>
                                <div className="text-right text-sm">
                                    <p className="font-semibold text-primary">{d.time}</p>
                                    <p className="text-muted-foreground">{d.date}</p>
                                </div>
                           </div>
                        ))}
                         <Button variant="outline" className="w-full">
                            Προβολή Ημερολογίου &rarr;
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


function StatCard({ title, value, description, icon }: { title: string, value: string, description: string, icon: React.ReactNode }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
}