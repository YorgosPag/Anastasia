import type { Project } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, MoreVertical, Bell } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusMap = {
    'on-track': { text: 'Εντός Χρονοδιαγράμματος', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
    'delayed': { text: 'Σε Καθυστέρηση', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
    'completed': { text: 'Ολοκληρωμένο', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  };

  const { text, className } = statusMap[project.status];

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
            <div>
              <CardDescription>{project.clientName}</CardDescription>
              <CardDescription>Αρ. Αίτησης: {project.applicationId}</CardDescription>
              <CardDescription>{project.address}</CardDescription>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Επεξεργασία</DropdownMenuItem>
                    <DropdownMenuItem>Αρχειοθέτηση</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Διαγραφή</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <h3 className="text-lg font-bold">{project.projectName}</h3>
        <p className="text-sm font-semibold text-muted-foreground">{project.projectCode}</p>
        
        <div className="mt-4 space-y-2">
           <Badge variant="outline" className={cn("border", className)}>{text}</Badge>
           {project.notifications > 0 && 
                <Badge variant="destructive" className="ml-2">
                    <Bell className="mr-1 h-3 w-3" /> {project.notifications} Ειδοποιήσεις
                </Badge>
           }
        </div>

        <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
                <span>Πρόοδος</span>
                <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2"/>
        </div>

        <div className="mt-4 flex items-center text-sm text-muted-foreground">
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
