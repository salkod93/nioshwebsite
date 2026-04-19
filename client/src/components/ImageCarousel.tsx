import { useState, useEffect } from 'react';

interface ImageCarouselProps {
  images: string[];
  altText: string;
  autoplayInterval?: number; // milliseconds
  containerClassName?: string;
  imageClassName?: string;
  showDots?: boolean;
  imageWidth?: string; // CSS width value, e.g., "w-36 h-72"
  aspectRatio?: string; // CSS aspect-ratio value, e.g., "346 / 641"
  fixedHeight?: string; // Fixed height to prevent size changes (e.g., "h-96")
}

/**
 * Rotating image carousel component
 * Automatically cycles through images with optional dot indicators
 */
export function ImageCarousel({
  images,
  altText,
  autoplayInterval = 4000,
  containerClassName = "flex justify-center items-center",
  imageClassName = "w-full h-full object-contain",
  showDots = true,
  imageWidth = "w-36 h-72",
  aspectRatio,
  fixedHeight,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [images.length, autoplayInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className={containerClassName}>
      <div className="relative w-full flex justify-center">
        {/* Main carousel container */}
        <div
          className={`rounded-3xl overflow-hidden shadow-2xl border border-white/20 ${imageWidth} ${fixedHeight || ''}`}
          style={aspectRatio && !fixedHeight ? { aspectRatio } : undefined}
        >
          {/* Image with fade transition */}
          <img
            src={images[currentIndex]}
            alt={`${altText} ${currentIndex + 1}`}
            className={`${imageClassName} transition-opacity duration-500`}
          />
        </div>

        {/* Previous button */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-16 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors z-10"
          aria-label="Previous image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next button */}
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-16 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors z-10"
          aria-label="Next image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>


      </div>
    </div>
  );
}
