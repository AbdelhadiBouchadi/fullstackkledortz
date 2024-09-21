'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { projectDefaultValues } from '@/constants';
import { IProject } from '@/lib/database/models/project.model';
import { useUploadThing } from '@/lib/uploadthing';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { projectFormSchema } from '@/lib/validator';
import { z } from 'zod';
import { createProject, updateProject } from '@/lib/actions/project.actions';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import Dropdown from './Dropdown';
import { useRouter } from 'next/navigation';
import { FileUploader } from './FileUploader';
import SubmitButton from './SubmitButton';

type ProjectFormProps = {
  type: 'Create' | 'Update';
  project?: IProject;
  projectId?: string;
};

const ProjectForm = ({ type, project, projectId }: ProjectFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues =
    project && type === 'Update'
      ? {
          ...project,
          position: project.position as 'start' | 'center' | 'end',
          aspectRatio: project.aspectRatio as '16/9' | '9/16',
          category: project.category as 'fashion' | 'beauty' | 'luxury',
          imageSize: project.imageSize as 'petite' | 'moyenne' | 'grande',
        }
      : projectDefaultValues;

  const { startUpload } = useUploadThing('imageUploader');

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: initialValues as z.infer<typeof projectFormSchema>,
  });

  async function onSubmit(values: z.infer<typeof projectFormSchema>) {
    setIsLoading(true);

    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === 'Create') {
      try {
        const newProject = await createProject({
          ...values,
          imageUrl: uploadedImageUrl,
        });
        if (newProject) {
          form.reset();
          router.push('/admin');
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === 'Update' && projectId) {
      try {
        const updatedProject = await updateProject({
          ...values,
          imageUrl: uploadedImageUrl,
          _id: projectId,
        });
        if (updatedProject) {
          form.reset();
          router.push('/admin');
        }
      } catch (error) {
        console.log(error);
      }
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Project Title"
                    {...field}
                    className="shad-input border-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="videoSource"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Video Source"
                    {...field}
                    className="shad-input border-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    type="position"
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="speed"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    type="speed"
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="aspectRatio"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    type="aspect ratio"
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    type="category"
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="imageSize"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Dropdown
                  type="image size"
                  onChangeHandler={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="h-72">
                <FileUploader
                  onFieldChange={field.onChange}
                  imageUrl={field.value}
                  setFiles={setFiles}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton isLoading={isLoading}> {type} Project </SubmitButton>
      </form>
    </Form>
  );
};

export default ProjectForm;
