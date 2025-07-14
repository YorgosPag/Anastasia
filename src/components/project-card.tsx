"use client";

import type { Project } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, MoreVertical, Bell, Pencil, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Checkbox } from './ui/checkbox';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';


interface ProjectCardProps {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const getStatusInfo = (status: Project['status']) => {
    switch (status) {
      case 'on-track':
        return { text: 'Εντός Χρονοδιαγράμματος', className: 'border-blue-500 text-blue-500' };
      case 'delayed':
        return { text: 'Σε Καθυστέρηση', className: 'border-destructive text-destructive' };
      case 'completed':
        return { text: 'Ολοκληρωμένο', className: 'border-green-500 text-green-500' };
      default:
        return { text: 'Άγνωστο', className: 'border-gray-500 text-gray-500' };
    }
  };
  
  const statusInfo = getStatusInfo(project.status);


  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
            <div className="flex items-start gap-2">
              <Checkbox id={`project_${project.id}`} className="mt-1"/>
              <div>
                <CardDescription>{project.clientName}</CardDescription>
                <CardDescription>Αρ. Αίτησης: {project.applicationId}</CardDescription>
                <CardDescription>{project.address}</CardDescription>
              </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onEdit}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Επεξεργασία
                    </DropdownMenuItem>
                    <DropdownMenuItem>Αρχειοθέτηση</DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Διαγραφή
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Είστε σίγουροι;</AlertDialogTitle>
                          <AlertDialogDescription>
                            Αυτή η ενέργεια δεν μπορεί να αναιρεθεί. Αυτό θα διαγράψει οριστικά το έργο.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Άκυρο</AlertDialogCancel>
                          <AlertDialogAction onClick={onDelete} className="bg-destructive hover:bg-destructive/90">Διαγραφή</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <h3 className="text-lg font-bold">{project.projectName}</h3>
          <p className="text-sm font-semibold text-muted-foreground">{project.projectCode}</p>
        </div>
        
        <div className="space-y-2">
           <Badge variant="outline" className={cn(statusInfo.className)}>{statusInfo.text}</Badge>
           {project.notifications > 0 && 
                <Badge variant="destructive" className="ml-2">
                    <Bell className="mr-1 h-3 w-3" /> {project.notifications} Ειδοποιήσεις
                </Badge>
           }
        </div>

        <div>
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
                <span>Πρόοδος</span>
                <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2"/>
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Προθεσμία: {project.deadline}</span>
        </div>

      </CardContent>
      <CardFooter className="pt-4 mt-auto">
        <div className="flex justify-between items-center w-full">
            <span className="text-lg font-bold">€{project.budget.toLocaleString('el-GR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <Button variant="ghost" size="sm">
                Προβολή Έργου
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
