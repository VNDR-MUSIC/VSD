
"use client";

import Image, { type ImageProps } from 'next/image';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface AIImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  hint: string;
  alt: string;
  initialSrc: string; // Placeholder or fallback image URL
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  layout?: "fill" | "fixed" | "intrinsic" | "responsive" | undefined;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down" | undefined;
}


export function AIImage({
  hint,
  alt,
  initialSrc,
  width,
  height,
  className,
  priority,
  layout,
  objectFit,
  ...props
}: AIImageProps) {
  const [currentImageSrc, setCurrentImageSrc] = useState<string>(initialSrc);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This component now just displays the initialSrc.
    // The image generation logic has been removed to prevent client-side errors.
    setCurrentImageSrc(initialSrc);
    setIsLoading(false);
  }, [initialSrc]); 

  const isDataUri = currentImageSrc.startsWith('data:');

  if (isLoading && layout !== "fill") {
    return <Skeleton className={cn("h-full w-full", className)} style={{width: `${width}px`, height: `${height}px`}} />;
  }
  
  if (isLoading && layout === "fill") {
     return (
      <div className={cn("relative h-full w-full", className)}>
        <Skeleton className="absolute inset-0 h-full w-full" />
      </div>
    );
  }

  return (
    <Image
      src={currentImageSrc}
      alt={alt}
      width={layout === "fill" ? undefined : width}
      height={layout === "fill" ? undefined : height}
      className={className}
      priority={priority}
      unoptimized={isDataUri} 
      data-ai-hint={hint}
      layout={layout}
      objectFit={objectFit}
      onLoad={() => setIsLoading(false)}
      onError={() => {
        console.error(`AIImage: Error loading image source: ${currentImageSrc}.`);
        setError('Image source failed to load.');
        // To prevent potential loops if the initialSrc is also bad, we just log the error.
      }}
      {...props}
    />
  );
}
