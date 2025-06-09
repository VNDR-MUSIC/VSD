import Image from 'next/image';
import type { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps extends Omit<ImageProps, 'src' | 'alt'> {
  size?: number;
}

export function Logo({ size = 30, className, ...props }: LogoProps) {
  return (
    <Image
      src="https://indiemedia.llc/vsdlogo.jpg"
      alt="VSD Network Logo"
      width={size}
      height={size}
      className={cn("rounded-full", className)}
      priority // Good for LCP elements like header logo
      {...props}
    />
  );
}
