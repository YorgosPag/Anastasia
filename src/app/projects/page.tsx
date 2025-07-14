
"use client";

import * as React from 'react';
import type { Project } from '@/lib/types';
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
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ProjectForm } from '@/components/project-form';
import { getAllProjects as getAllProjectsData, deleteProject as deleteProjectData } from '@/data/mock-data'; // Using mock data for now

export default function ProjectsPage() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  React.useEffect(() => {
    async function loadProjects() {
        const data = await getAllProjectsData();
        setProjects(data);
    }
    loadProjects();
  }, []);

  const tabs = [
    { value: 'all', label: 'Όλα', count: projects.length },
    { value: 'offer', label: 'Σε Προσφορά', count: projects.filter(p => p.status === 'quotation').length },
    { value: 'on-track', label: 'Εντός', count: projects.filter(p => p.status === 'on-track').length },
    { value: 'delayed', label: 'Καθυστέρηση', count: projects.filter(p => p.status === 'delayed').length },
    { value: 'completed', label: 'Ολοκληρωμένα', count: projects.filter(p => p.status === 'completed').length },
  ];

  const handleNewProject = () => {
    setSelectedProject(null);
    setIsFormOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsFormOpen(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    await deleteProjectData(projectId);
    const updatedProjects = await getAllProjectsData();
    setProjects(updatedProjects);
  };

  const onFormSubmitted = async () => {
    setIsFormOpen(false);
    const updatedProjects = await getAllProjectsData();
    setProjects(updatedProjects);
  }

  return (
    <div className="space-y-6">
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <div className="flex justify-between items-center">
          <div>
              <h1 className="text-3xl font-bold tracking-tight">Λίστα Έργων & Προσφορών</h1>
              <p className="text-muted-foreground">Δείτε και διαχειριστείτε όλες τις προσφορές, τα ενεργά και τα ολοκληρωμένα έργα.</p>
          </div>
          <Button onClick={handleNewProject}>
            <Plus className="mr-2 h-4 w-4" />
            Δημιουργία Έργου/Προσφοράς
          </Button>
        </div>

        <DialogContent className="sm:max-w-md">
           <ProjectForm 
              onFormSubmitted={onFormSubmitted}
              onCancel={() => setIsFormOpen(false)}
              project={selectedProject}
            />
        </DialogContent>
      </Dialog>


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

        {tabs.map(tab => (
           <TabsContent key={tab.value} value={tab.value} className="mt-6">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {(tab.value === 'all' ? projects : projects.filter(p => p.status === tab.value)).map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project}
                    onEdit={() => handleEditProject(project)}
                    onDelete={() => handleDeleteProject(project.id)}
                  />
              ))}
              </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
