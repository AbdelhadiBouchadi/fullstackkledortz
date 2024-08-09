'use server';

import {
  CreateProjectParams,
  DeleteProjectParams,
  UpdateProjectParams,
} from '@/types';
import { connectToDatabase } from '../database';
import Project, { IProject } from '../database/models/project.model';
import { revalidatePath } from 'next/cache';
import { handleError, parseStringify } from '../utils';

export const createProject = async (project: CreateProjectParams) => {
  try {
    await connectToDatabase();

    const newProject = await Project.create({
      ...project,
    });

    console.log(newProject._id);
    console.log(newProject.createdAt);

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

export async function getAllProjects(): Promise<IProject[]> {
  try {
    await connectToDatabase();

    // Fetch all projects as Project documents
    const projects = await Project.find().sort({ createdAt: 'desc' });

    return projects.map((project) => {
      return {
        ...project.toObject(), // Convert to plain object
        _id: project._id.toString(), // Convert _id to string
        createdAt: project.createdAt.toISOString(), // Convert createdAt to string
      } as IProject;
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
}

export const getProjectById = async (id: string) => {
  try {
    await connectToDatabase();

    const project = await Project.findById(id);
    if (!project) {
      throw new Error('Project not found');
    }

    return parseStringify(project);
  } catch (error) {
    throw new Error('Error fetching the specified project');
  }
};

// Helper function to fetch projects by category
const getProjectsByCategory = async (category: string) => {
  try {
    await connectToDatabase();

    const projects = await Project.find({ category }).exec();
    return parseStringify(projects);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch projects');
  }
};

// Get fashion projects
export const getFashionProjects = async () => {
  return getProjectsByCategory('fashion');
};

// Get beauty projects
export const getBeautyProjects = async () => {
  return getProjectsByCategory('beauty');
};

// Get luxury projects
export const getLuxuryProjects = async () => {
  return getProjectsByCategory('luxury');
};
