
"use client";

import Image, { type ImageProps } from 'next/image';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { generateImageFromHint, type GenerateImageOutput } from '@/ai/flows/generate-image-from-hint-flow';

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
    let isMounted = true;
    if (hint) {
      setIsLoading(true);
      setError(null);
      setCurrentImageSrc(initialSrc); // Show placeholder while loading new image

      generateImageFromHint({ hint })
        .then((response: GenerateImageOutput) => {
          if (isMounted && response && response.imageDataUri) {
            setCurrentImageSrc(response.imageDataUri);
          } else if (isMounted) {
            const errorMessage = 'AIImage: Image generation returned empty or invalid data URI.';
            console.error(errorMessage, { hint, response, environment: typeof window !== 'undefined' ? window.location.host : 'server' });
            setError(errorMessage);
            setCurrentImageSrc(initialSrc); 
          }
        })
        .catch((err) => {
          if (isMounted) {
            const errorMessage = err.message || 'An unknown error occurred during image generation.';
            console.error("AI_IMAGE_EXCEPTION: Client-side catch for image generation failure.", {
              hint,
              error: errorMessage,
              errorObject: err,
              environment: typeof window !== 'undefined' ? window.location.host : 'server'
            });
            setError(errorMessage);
            setCurrentImageSrc(initialSrc); 
          }
        })
        .finally(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        });
    } else {
      setCurrentImageSrc(initialSrc);
      setIsLoading(false);
    }

    return () => {
      isMounted = false; 
    };
  }, [hint, initialSrc]); 

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
      onError={() => {
        console.error(`AIImage: Error loading image source (could be AI-generated or initialSrc): ${currentImageSrc}. Falling back to initialSrc if not already there.`);
        setError('Image source failed to load.');
        if (currentImageSrc !== initialSrc) { // Avoid infinite loop if initialSrc itself is bad
          setCurrentImageSrc(initialSrc);
        }
      }}
      {...props}
    />
  );
}
