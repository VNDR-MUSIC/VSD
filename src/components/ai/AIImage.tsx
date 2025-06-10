
"use client";

import Image, { type ImageProps } from 'next/image';
import { useState, useEffect } from 'react';
import { generateImageFromHint, type GenerateImageFromHintInput } from '@/ai/flows/generate-image-from-hint-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

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
  const [imageSrc, setImageSrc] = useState<string>(initialSrc);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start true if hint is present
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAIGeneratedImage = async () => {
      if (!hint || hint.trim() === '') {
        if (isMounted) {
          setImageSrc(initialSrc);
          setIsLoading(false);
        }
        return;
      }
      
      // Ensure isLoading is true at the start of a new fetch attempt with a valid hint
      if (isMounted) {
        setIsLoading(true);
        setError(null);
      }

      try {
        const input: GenerateImageFromHintInput = { hint, width, height };
        const result = await generateImageFromHint(input);
        if (isMounted && result.imageDataUri) {
          setImageSrc(result.imageDataUri);
        } else if (isMounted) {
          setError('AI generation did not return an image URI.');
          setImageSrc(initialSrc); // Fallback to initialSrc
        }
      } catch (err) {
        console.error(`Failed to generate AI image for hint "${hint}":`, err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error generating image.');
          setImageSrc(initialSrc); // Fallback to initialSrc
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchAIGeneratedImage();

    return () => {
      isMounted = false;
    };
  }, [initialSrc, hint, width, height]);

  if (isLoading) {
    return <Skeleton className={cn("rounded-md", className)} style={{ width: `${width}px`, height: `${height}px` }} />;
  }
  
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      unoptimized={imageSrc.startsWith('data:')}
      data-ai-hint={hint}
      onError={() => {
        if (imageSrc !== initialSrc) { // Avoid infinite loop if initialSrc itself fails
          console.warn(`AIImage: Error loading generated image for hint "${hint}", falling back to initialSrc.`);
          setImageSrc(initialSrc);
          setError('Generated image failed to load, showing placeholder.');
        }
      }}
      {...props}
    />
  );
}
