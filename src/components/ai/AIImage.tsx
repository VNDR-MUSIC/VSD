
"use client";

import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { generateImageFromHint } from '@/ai/flows/generate-image-from-hint-flow';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface AIImageProps extends Omit<NextImageProps, 'src'> {
  initialSrc: string;
  hint?: string;
}

export function AIImage({ initialSrc, alt, hint, className, width, height, fill, style, ...props }: AIImageProps) {
  const [currentSrc, setCurrentSrc] = useState(initialSrc);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null); // Optional: for displaying error states
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;
    const generate = async () => {
      if (hint && initialSrc && initialSrc.startsWith('https://placehold.co')) {
        if (isMounted) setIsLoading(true);
        // if (isMounted) setError(null); // Optional
        try {
          const result = await generateImageFromHint({ hint });
          if (isMounted && result.imageDataUri && result.imageDataUri.startsWith('data:image')) {
            setCurrentSrc(result.imageDataUri);
          } else if (isMounted && result.imageDataUri === "") {
            // AI flow indicated a fallback, placeholder is already set
          } else if (isMounted) {
            console.warn('AI did not return a valid image data URI for hint:', hint);
            // Fallback to initialSrc is handled by default currentSrc
          }
        } catch (e) {
          if (isMounted) {
            // setError(e instanceof Error ? e.message : 'Failed to generate AI image.'); // Optional
            console.error('Failed to generate AI image for hint:', hint, e);
            // toast({ // Optional: too noisy if many images
            //   title: "AI Image Error",
            //   description: `Could not generate image for: ${hint}. Using placeholder.`,
            //   variant: "default",
            // });
          }
        } finally {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      } else {
        setCurrentSrc(initialSrc);
        if (isMounted) setIsLoading(false);
      }
    };

    generate();

    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hint, initialSrc]); // Removed toast from dependencies as it's stable

  const imageStyle = style || {};

  if (isLoading) {
    const skeletonClassName = cn('bg-muted/50', className);
    if (fill) {
      return <Skeleton className={skeletonClassName} style={{ ...imageStyle, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }} />;
    }
    return <Skeleton style={{ ...imageStyle, width: width, height: height }} className={skeletonClassName} />;
  }

  const finalSrc = currentSrc || initialSrc;

  return (
    <NextImage
      src={finalSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={className}
      style={imageStyle}
      {...props}
      key={finalSrc}
      onError={() => {
        if (currentSrc !== initialSrc) { 
          console.warn(`Error loading AI generated image for "${alt}", falling back to placeholder.`);
          setCurrentSrc(initialSrc);
        }
      }}
    />
  );
}
