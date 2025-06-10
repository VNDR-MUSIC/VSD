
"use client";

import Image, { type ImageProps } from 'next/image';
import { useState, useEffect } from 'react';
import { generateImageFromHint, type GenerateImageFromHintInput } from '@/ai/flows/generate-image-from-hint-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils'; // Added import for cn

interface AIImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  hint: string;
  alt: string;
  initialSrc: string; // The placeholder URL
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export function AIImage({ hint, alt, initialSrc, width, height, className, priority, ...props }: AIImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(initialSrc);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    const fetchAIGeneratedImage = async () => {
      try {
        const input: GenerateImageFromHintInput = { hint, width, height };
        const result = await generateImageFromHint(input);
        if (isMounted && result.imageDataUri) {
          setImageSrc(result.imageDataUri);
        } else if (isMounted) {
          setError('AI generation did not return an image URI.');
        }
      } catch (err) {
        console.error(`Failed to generate AI image for hint "${hint}":`, err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error generating image.');
          // Keep initialSrc if generation fails
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (hint && hint.trim() !== '') {
        fetchAIGeneratedImage();
    } else {
        setIsLoading(false); 
    }
    

    return () => {
      isMounted = false;
    };
  }, [hint, width, height, initialSrc]);

  if (isLoading && imageSrc === initialSrc) {
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
      {...props}
    />
  );
}

// Removed local cn function definition
