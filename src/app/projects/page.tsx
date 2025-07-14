import { mockProjects } from '@/data/dashboard-data';
import { ProjectCard } from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, ListFilter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProjectsPage() {
  const tabs = [
    { value: 'all', label: 'Όλα', count: 14 },
    { value: 'offer', label: 'Σε Προσφορά', count: 0 },
    { value: 'on-track', label: 'Εντός', count: 14 },
    { value: 'delayed', label: 'Καθυστέρηση', count: 0 },
    { value: 'completed', label: 'Ολοκληρωμένα', count: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Λίστα Έργων & Προσφορών</h1>
            <p className="text-muted-foreground">Δείτε και διαχειριστείτε όλες τις προσφορές, τα ενεργά και τα ολοκληρωμένα έργα.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Δημιουργία Έργου/Προσφοράς
        </Button>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Αναζήτηση έργου, αίτησης, ή ιδιοκτήτη..."
            className="pl-9"
          />
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="shrink-0">
                    <ListFilter className="mr-2 h-4 w-4" />
                    Αναφορές Έργων (0)
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Αναφορές</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>Αναφορά 1</DropdownMenuItem>
                <DropdownMenuItem>Αναφορά 2</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          {tabs.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label} ({tab.count})
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all" className="mt-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
