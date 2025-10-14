
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { AIImage } from '@/components/ai/AIImage';
import { Subsidiary } from '@/app/ecosystem/page';
import Image from 'next/image';
import { Button } from '../ui/button';
import { ArrowUpRightSquare } from 'lucide-react';
import Link from 'next/link';

interface SubsidiarySliderProps {
  slides: Subsidiary[];
}

export function SubsidiarySlider({ slides }: SubsidiarySliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) {
      setActiveIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', onSelect);
      onSelect(); // Set initial active index
      return () => {
        emblaApi.off('select', onSelect);
      };
    }
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => {
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  return (
    <div className="relative w-full h-full">
      <div className="embla w-full h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {slides.map((slide, index) => (
            <div key={index} className="embla__slide relative h-full w-full">
              <AIImage
                initialSrc={`https://picsum.photos/seed/${index}/1920/1080`}
                alt={`Background for ${slide.name}`}
                hint={slide.hint}
                width={1920}
                height={1080}
                className="absolute inset-0 object-cover w-full h-full"
                layout="fill"
                objectFit="cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4">
                {slide.logoUrl && (
                  <div className="relative h-24 w-60 mb-6">
                    <Image
                      src={slide.logoUrl}
                      alt={`${slide.name} Logo`}
                      layout="fill"
                      objectFit="contain"
                      className="brightness-0 invert"
                    />
                  </div>
                )}
                <h2 className="font-headline text-4xl md:text-6xl font-bold text-white shadow-black/50 [text-shadow:0_4px_8px_var(--tw-shadow-color)]">
                  {slide.name}
                </h2>
                <p className="mt-4 max-w-xl text-lg text-white/80 shadow-black/50 [text-shadow:0_2px_4px_var(--tw-shadow-color)]">
                  {slide.description}
                </p>
                <Button asChild className="mt-8 btn-hover-effect" size="lg">
                  <Link href={slide.link} target="_blank" rel="noopener noreferrer">
                    Visit Site <ArrowUpRightSquare className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'w-6 bg-primary' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
