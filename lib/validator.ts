import * as z from 'zod';

export const projectFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  priority: z.boolean(),
  position: z.enum(['start', 'center', 'end'], { message: 'Invalid position' }),
  videoSource: z.string().url({ message: 'Invalid video URL' }),
  speed: z
    .number()
    .min(-4)
    .max(4, { message: 'Speed must be between -4 and 4' }),
  aspectRatio: z.enum(['16/9', '9/16'], { message: 'Invalid aspect ratio' }),
  imageSize: z.enum(['petite', 'moyenne', 'grande'], {
    message: 'Invalid image size',
  }),
  imageUrl: z.string().url('Image URL must be a valid URL'),
  category: z.enum(['fashion', 'beauty', 'luxury'], {
    message: 'Please choose a category',
  }),
});
