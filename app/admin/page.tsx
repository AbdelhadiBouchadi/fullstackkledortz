import columns from '@/components/columns';
import { DataTable } from '@/components/DataTable';
import { StatCard } from '@/components/StatCard';
import { buttonVariants } from '@/components/ui/button';
import { getAllProjects } from '@/lib/actions/project.actions';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

const Admin = async () => {
  const projects = await getAllProjects();

  const projectCounts = projects.reduce(
    (counts, project) => {
      counts[project.category]++;
      return counts;
    },
    { fashion: 0, beauty: 0, luxury: 0 }
  );

  return (
    <main className="admin-main">
      <section className="w-full space-y-4">
        <h1 className="header text-dark-700">Welcome 👋</h1>
        <p className="text-dark-700">
          Start the day with managing new projects.
        </p>
      </section>

      <section className="admin-stat">
        <StatCard
          type="fashion"
          count={projectCounts.fashion}
          label="Fashion Projects"
          icon={'/assets/icons/appointments.svg'}
        />
        <StatCard
          type="beauty"
          count={projectCounts.beauty}
          label="Beauty Projects"
          icon={'/assets/icons/appointments.svg'}
        />
        <StatCard
          type="luxury"
          count={projectCounts.luxury}
          label="Luxury Projects"
          icon={'/assets/icons/appointments.svg'}
        />
      </section>

      <DataTable columns={columns} data={projects} />

      <Link
        href="/admin/create"
        className={cn(
          'capitalize bg-[#24ae7c] w-full',
          buttonVariants({ variant: 'secondary' })
        )}
      >
        Create a new project
      </Link>
    </main>
  );
};

export default Admin;
