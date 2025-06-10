
"use client";

import Image, { type ImageProps } from 'next/image';
import { useState, useEffect } from 'react';
import { generateImageFromHint, type GenerateImageFromHintInput } from '@/ai/flows/generate-image-from-hint-flow';
import { Skeleton } from '@/components/ui/skeleton';

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

    // Only generate if hint is provided, otherwise stick to placeholder.
    // This check is more for robustness, as typically this component would only be used if a hint exists.
    if (hint && hint.trim() !== '') {
        fetchAIGeneratedImage();
    } else {
        setIsLoading(false); // No hint, so not loading AI image
    }
    

    return () => {
      isMounted = false;
    };
  }, [hint, width, height, initialSrc]); // Rerun if hint or dimensions change. initialSrc included for completeness.

  if (isLoading && imageSrc === initialSrc) { // Show skeleton only when waiting for AI image and still on placeholder
    return <Skeleton className={cn("rounded-md", className)} style={{ width: `${width}px`, height: `${height}px` }} />;
  }
  
  // If there was an error, or if the imageSrc is still the placeholder (e.g. hint was empty), show initialSrc.
  // Or show the AI generated image.
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority} // Pass down priority
      unoptimized={imageSrc.startsWith('data:')} // Important for data URIs
      {...props} // Pass down any other ImageProps
    />
  );
}

// Helper function for cn if not globally available or for standalone component usage
// For this project, cn is in @/lib/utils so this is just for completeness if component was isolated
function cn(...inputs: Array<string | undefined | null | false | Record<string, boolean>>): string {
  return inputs
    .flat()
    .filter(x => x && typeof x !== 'boolean')
    .map(x => (typeof x === 'string' ? x : Object.keys(x).filter(k => x[k])))
    .join(' ');
}

