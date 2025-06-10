
"use client";

import Image, { type ImageProps } from 'next/image';
// import { Skeleton } from '@/components/ui/skeleton'; // No longer needed
// import { cn } from '@/lib/utils'; // No longer needed if Skeleton is not used

interface AIImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  hint: string;
  alt: string;
  initialSrc: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export function AIImage({ hint, alt, initialSrc, width, height, className, priority, ...props }: AIImageProps) {
  // AI generation logic has been removed.
  // The component will now always display the initialSrc.

  return (
    <Image
      src={initialSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      unoptimized={initialSrc.startsWith('data:')} // Check initialSrc for unoptimization
      data-ai-hint={hint} // Keep the hint for informational purposes or future re-enablement
      // onError handler removed for simplicity as it was tied to AI-generated images.
      // If initialSrc (placeholder) fails, it's a different type of issue.
      {...props}
    />
  );
}
