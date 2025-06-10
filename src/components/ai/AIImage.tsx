
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
            // If imageDataUri is empty/null or response itself is problematic, but no error thrown from flow
            console.error('AIImage: Image generation returned empty or invalid data URI for hint:', hint, 'Response:', response);
            setError('Failed to generate image: AI returned invalid data.');
            setCurrentImageSrc(initialSrc); // Fallback to initial source
          }
        })
        .catch((err) => {
          if (isMounted) {
            console.error(`AIImage: Failed to generate image for hint "${hint}":`, err);
            setError(err.message || 'An unknown error occurred during image generation.');
            setCurrentImageSrc(initialSrc); // Fallback to initial source on error
          }
        })
        .finally(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        });
    } else {
      // No hint provided, use initialSrc and stop loading
      setCurrentImageSrc(initialSrc);
      setIsLoading(false);
    }

    return () => {
      isMounted = false; // Cleanup to prevent state updates on unmounted component
    };
  }, [hint, initialSrc]); // Rerun if hint or initialSrc changes

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


  // If there was an error, and currentImageSrc is still the initial placeholder,
  // we can optionally display an error state or just show the placeholder.
  // For now, it just shows the placeholder (initialSrc).

  return (
    <Image
      src={currentImageSrc}
      alt={alt}
      width={layout === "fill" ? undefined : width}
      height={layout === "fill" ? undefined : height}
      className={className}
      priority={priority}
      unoptimized={isDataUri} // Important for data URIs
      data-ai-hint={hint}
      layout={layout}
      objectFit={objectFit}
      onError={() => {
        // Fallback if the currentImageSrc (even AI generated one) fails to load
        console.error(`AIImage: Error loading image source: ${currentImageSrc}. Falling back to initialSrc.`);
        setCurrentImageSrc(initialSrc);
        setError('Image source failed to load.');
      }}
      {...props}
    />
  );
}
