import ProjectForm from '@/components/ProjectForm';
import React from 'react';

const CreateProject = () => {
  return (
    <main className="admin-main">
      <section className="w-full space-y-4">
        <h1 className="header text-dark-700">Welcome Again Kevin 👋</h1>
        <p className="text-dark-700">Start creating your new project.</p>
      </section>

      <div className="wrapper my-8">
        <ProjectForm type="Create" />
      </div>
    </main>
  );
};

export default CreateProject;
