
"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const NUM_LOGOS = 15; // Number of logos to animate

interface LogoInstance {
  id: number;
  style: React.CSSProperties;
  size: number;
}

export function AnimatedLogoBackground() {
  const [logos, setLogos] = useState<LogoInstance[]>([]);

  useEffect(() => {
    const generateLogo = (id: number): LogoInstance => {
      const size = Math.random() * (80 - 20) + 20; // Random size between 20px and 80px
      const duration = Math.random() * (30 - 15) + 15; // Random duration between 15s and 30s
      const delay = Math.random() * 10; // Random delay up to 10s
      const startX = Math.random() * 100; // vw
      const startY = Math.random() * 100; // vh
      const endX = Math.random() * 100; // vw
      const endY = Math.random() * 100; // vh

      return {
        id,
        size,
        style: {
          position: 'absolute',
          left: `${startX}vw`,
          top: `${startY}vh`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: Math.random() * (0.2 - 0.05) + 0.05, // Random opacity between 0.05 and 0.2
          animation: `float ${duration}s infinite alternate ease-in-out ${delay}s`,
          transform: `translate(-50%, -50%)`, // Center the image
          willChange: 'transform, opacity',
        } as React.CSSProperties,
      };
    };

    const initialLogos = Array.from({ length: NUM_LOGOS }, (_, i) => generateLogo(i));
    setLogos(initialLogos);

    // This CSS needs to be global or injected for the animation keyframes.
    // Using style tag here for simplicity as it's client-side.
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes float {
        0% {
          transform: translate(-50%, -50%) translateY(0px) translateX(0px) rotate(0deg);
          opacity: ${Math.random() * (0.2 - 0.05) + 0.05};
        }
        50% {
            opacity: ${Math.random() * (0.3 - 0.1) + 0.1};
        }
        100% {
          transform: translate(-50%, -50%) translateY(${Math.random() * 40 - 20}px) translateX(${Math.random() * 40 - 20}px) rotate(${Math.random() * 90 - 45}deg);
          opacity: ${Math.random() * (0.2 - 0.05) + 0.05};
        }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
        document.head.removeChild(styleSheet);
    }

  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none"
    >
      {logos.map((logo) => (
        <Image
          key={logo.id}
          src="https://indiemedia.llc/vsdlogo.jpg" 
          alt="" // Decorative
          width={logo.size}
          height={logo.size}
          style={logo.style}
          className="rounded-full"
          priority={false} // These are decorative, not LCP
          unoptimized // If src is external and not in next.config.js images domains (though this one is)
        />
      ))}
    </div>
  );
}
