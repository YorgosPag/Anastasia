import { StatCard } from '@/components/stat-card';
import { ProjectCard } from '@/components/project-card';
import { RecentOffers } from '@/components/recent-offers';
import { ProjectsChart } from '@/components/projects-chart';
import { mockStats, mockProjects } from '@/data/dashboard-data';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <ProjectsChart />
        </div>
        <div className="lg:col-span-1">
            <RecentOffers />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Πρόσφατα Ενεργά Έργα</h2>
          <Button variant="ghost">
            Προβολή Όλων <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Πρόσφατες Προσφορές</h2>
           <Button variant="ghost">
            Προβολή Όλων <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 text-center text-muted-foreground">
          <p>Δεν υπάρχουν προσφορές σε εκκρεμότητα.</p>
        </div>
      </div>
    </div>
  );
}
