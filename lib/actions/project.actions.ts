'use server';

import {
  CreateProjectParams,
  DeleteProjectParams,
  UpdateProjectParams,
} from '@/types';
import { connectToDatabase } from '../database';
import Project from '../database/models/project.model';
import { revalidatePath } from 'next/cache';
import { handleError, parseStringify } from '../utils';

export const createProject = async (project: CreateProjectParams) => {
  try {
    await connectToDatabase();

    const newProject = await Project.create({
      ...project,
    });

    revalidatePath('/admin');
    return parseStringify(newProject);
  } catch (error) {
    console.error('Error creating a new project', error);
    handleError(error);
  }
};

export const updateProject = async (project: UpdateProjectParams) => {
  try {
    await connectToDatabase();

    const projectToUpdate = await Project.findById(project._id);
    if (!projectToUpdate) {
      throw new Error('Project not found');
    }

    const updatedProject = await Project.findByIdAndUpdate(
      project._id,
      { ...project },
      { new: true }
    );

    revalidatePath('/admin');
    return parseStringify(updatedProject);
  } catch (error) {
    console.error('Error updating the project', error);
    handleError(error);
  }
};

export const deleteProject = async ({
  projectId,
  path,
}: DeleteProjectParams) => {
  try {
    await connectToDatabase();

    const deletedProject = await Project.findByIdAndDelete(projectId);
    if (deletedProject) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
};

export const getAllProjects = async () => {
  try {
    await connectToDatabase();
    const projects = await Project.find().sort({ createdAt: -1 }).exec();
    return projects;
  } catch (error) {
    console.error('Error fetching projects', error);
    throw new Error('Failed to fetch projects');
  }
};
