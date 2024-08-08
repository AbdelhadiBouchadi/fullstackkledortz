import columns from '@/components/columns';
import { DataTable } from '@/components/DataTable';
import { StatCard } from '@/components/StatCard';
import { getAllProjects } from '@/lib/actions/project.actions';
import React from 'react';

const Admin = async () => {
  const projects = await getAllProjects();

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
          count={0}
          label="Fashion Projects"
          icon={'/assets/icons/appointments.svg'}
        />
        <StatCard
          type="beauty"
          count={5}
          label="Beauty Projects"
          icon={'/assets/icons/appointments.svg'}
        />
        <StatCard
          type="luxury"
          count={4}
          label="Luxury Projects"
          icon={'/assets/icons/appointments.svg'}
        />
      </section>

      <DataTable columns={columns} data={projects} />
    </main>
  );
};

export default Admin;
