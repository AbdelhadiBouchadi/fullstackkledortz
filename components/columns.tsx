'use client';

import { IProject } from '@/lib/database/models/project.model';
import { ColumnDef } from '@tanstack/react-table';
import { Button, buttonVariants } from './ui/button';
import Link from 'next/link';
import { DeleteConfirmation } from './DeleteConfirmation';
import { cn } from '@/lib/utils';

export const columns: ColumnDef<IProject>[] = [
  {
    header: '#',
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: 'title',
    header: 'Project Title',
    cell: ({ row }) => {
      return <p className="text-14-medium">{row.original.title}</p>;
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      return (
        <p className="text-14-medium capitalize">{row.original.category}</p>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      return (
        <p className="text-14-medium">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </p>
      );
    },
  },
  {
    accessorKey: '_id',
    header: 'Project ID',
    cell: ({ row }) => {
      return <p className="text-14-medium">{row.original._id}</p>;
    },
  },
  {
    id: '_id',
    header: 'Actions',
    cell: ({ row }) => {
      const projectId = row.original._id;

      return (
        <div className="flex gap-1">
          <Link
            href={`/admin/${projectId}/update`}
            className={cn(
              'capitalize text-green-500',
              buttonVariants({ variant: 'ghost' })
            )}
          >
            Edit
          </Link>

          <DeleteConfirmation projectId={projectId} />
        </div>
      );
    },
  },
];

export default columns;
