import { useEffect, useRef } from 'react';

interface InfiniteScrollProps {
  images: string[];
  altText: string;
  speed?: number; // pixels per second
  containerClassName?: string;
  imageClassName?: string;
  imageWidth?: string; // e.g., "w-36 h-72"
  gap?: string; // gap between images, e.g., "gap-4"
}

/**
 * Infinite scrolling carousel component
 * Displays all images in a continuous horizontal scroll loop
 */
export function InfiniteScroll({
  images,
  altText,
  speed = 30,
  containerClassName = "flex justify-center items-center py-8",
  imageClassName = "w-full h-full object-cover",
  imageWidth = "w-36 h-72",
  gap = "gap-4",
}: InfiniteScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    let animationId: number;
    let scrollPosition = 0;

    const animate = () => {
      scrollPosition += speed / 60; // Divide by 60 for 60fps

      // Reset to beginning when we've scrolled past half (for seamless loop)
      if (scrollPosition >= content.scrollWidth / 2) {
        scrollPosition = 0;
      }

      container.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [speed]);

  return (
    <div className={containerClassName}>
      <div
        ref={scrollContainerRef}
        className="w-full overflow-hidden"
        style={{
          scrollBehavior: 'auto',
        }}
      >
        <div
          ref={contentRef}
          className={`flex ${gap} whitespace-nowrap`}
          style={{
            width: `${images.length * 2 * 200}px`, // Duplicate for seamless loop
          }}
        >
          {/* Render images twice for seamless infinite loop */}
          {[...images, ...images].map((src, i) => (
            <div
              key={i}
              className={`rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex-shrink-0 ${imageWidth}`}
            >
              <img
                src={src}
                alt={`${altText} ${(i % images.length) + 1}`}
                className={imageClassName}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
