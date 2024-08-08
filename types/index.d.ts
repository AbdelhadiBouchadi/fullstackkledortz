/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export interface CreateProjectParams {
  title: string;
  priority: boolean;
  position: 'start' | 'center' | 'end';
  videoSource: string;
  speed: number;
  aspectRatio: '16/9' | '9/16';
  imageUrl: string;
  category: 'fashion' | 'beauty' | 'luxury';
}

export interface UpdateProjectParams {
  _id: string;
  title?: string;
  priority?: boolean;
  position?: 'start' | 'center' | 'end';
  videoSource?: string;
  speed?: number;
  aspectRatio?: '16/9' | '9/16';
  imageUrl?: string;
  category?: 'fashion' | 'beauty' | 'luxury';
}

export interface DeleteProjectParams {
  projectId: string;
  path: string;
}

export interface GetAllProjectsParams {
  query?: string;
  limit?: number;
  page?: number;
  category?: 'fashion' | 'beauty' | 'luxury';
}
