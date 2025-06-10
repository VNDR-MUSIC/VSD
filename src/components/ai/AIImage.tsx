
"use client";

import Image, { type ImageProps } from 'next/image';
import { useState, useEffect } from 'react';
// import { generateImageFromHint, type GenerateImageFromHintInput } from '@/ai/flows/generate-image-from-hint-flow'; // Actual call is disabled
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface AIImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  hint: string; // Hint remains for "mention" purposes
  alt: string;
  initialSrc: string; // The placeholder URL
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export function AIImage({ hint, alt, initialSrc, width, height, className, priority, ...props }: AIImageProps) {
  // imageSrc will always be initialSrc as AI generation is disabled
  const [imageSrc, setImageSrc] = useState<string>(initialSrc);
  // isLoading and error states are not actively used if AI generation is off.
  // Set isLoading to false to prevent Skeleton from showing indefinitely.
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ensure imageSrc is set to initialSrc, especially if initialSrc could change (though unlikely for placeholders)
    setImageSrc(initialSrc);
    setIsLoading(false); // AI generation is disabled, so not loading.
    setError(null); // No AI generation error.

    // AI image generation logic is disabled:
    // let isMounted = true;
    // const fetchAIGeneratedImage = async () => {
    //   try {
    //     const input: GenerateImageFromHintInput = { hint, width, height };
    //     const result = await generateImageFromHint(input);
    //     if (isMounted && result.imageDataUri) {
    //       setImageSrc(result.imageDataUri);
    //     } else if (isMounted) {
    //       setError('AI generation did not return an image URI.');
    //     }
    //   } catch (err) {
    //     console.error(`Failed to generate AI image for hint "${hint}":`, err);
    //     if (isMounted) {
    //       setError(err instanceof Error ? err.message : 'Unknown error generating image.');
    //     }
    //   } finally {
    //     if (isMounted) {
    //       setIsLoading(false);
    //     }
    //   }
    // };
    // if (hint && hint.trim() !== '') {
    //     // fetchAIGeneratedImage(); // Call is disabled
    // }
    // return () => {
    //   isMounted = false;
    // };
  }, [initialSrc, hint, width, height]); // hint, width, height are kept for completeness if AI is re-enabled

  // The Skeleton was intended for when the AI is actively generating an image.
  // Since AI generation is disabled, `isLoading` is false, so Skeleton won't be shown.
  // We simply render the Image component with initialSrc.
  // if (isLoading) { // This check is now effectively always false
  //   return <Skeleton className={cn("rounded-md", className)} style={{ width: `${width}px`, height: `${height}px` }} />;
  // }
  
  return (
    <Image
      src={imageSrc} // This will be the initialSrc (placeholder)
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      unoptimized={imageSrc.startsWith('data:')} // This might be true if initialSrc is a data URI
      data-ai-hint={hint} // Keep the hint attribute as a "mention"
      {...props}
    />
  );
}

    