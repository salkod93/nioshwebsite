import { useEffect, useRef, useState } from 'react';

interface InfiniteScrollProps {
  images: string[];
  altText: string;
  speed?: number; // pixels per second
  imageWidth?: string; // e.g., "w-48 h-96"
  gap?: number; // gap between images in pixels (default: 16)
  visibleCount?: number; // number of images to show at once (default: 3)
}

/**
 * Infinite scrolling carousel component
 * Shows N images at a time with continuous smooth scrolling
 * Works in both LTR (English) and RTL (Arabic) modes
 */
export function InfiniteScroll({
  images,
  altText,
  speed = 40,
  imageWidth = "w-48 h-96",
  gap = 16,
  visibleCount = 3,
}: InfiniteScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isRTL, setIsRTL] = useState(false);

  // Detect if the page is in RTL mode
  useEffect(() => {
    const htmlDir = document.documentElement.dir || document.documentElement.lang?.startsWith('ar');
    setIsRTL(htmlDir === 'rtl' || htmlDir === true);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const content = contentRef.current;

    if (!container || !content || !isAnimating) return;

    let animationId: number;
    let scrollPosition = 0;

    // Calculate the width of one complete set of images
    const imageWidthPx = 192; // w-48 = 192px
    const singleSetWidth = (imageWidthPx + gap) * images.length;

    const animate = () => {
      scrollPosition += speed / 60; // Divide by 60 for 60fps

      // Reset to beginning when we've scrolled past the first set
      if (scrollPosition >= singleSetWidth) {
        scrollPosition = 0;
      }

      // In RTL mode, scroll from right to left
      if (isRTL) {
        // For RTL, we need to scroll in the opposite direction
        // The maximum scroll value in RTL is negative
        const maxScroll = content.scrollWidth - container.clientWidth;
        container.scrollLeft = maxScroll - scrollPosition;
      } else {
        // In LTR mode, normal left-to-right scrolling
        container.scrollLeft = scrollPosition;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [speed, isAnimating, images.length, gap, isRTL]);

  // Calculate container width to show exactly N images
  const imageWidthPx = 192; // w-48 = 192px
  const containerWidth = (imageWidthPx * visibleCount) + (gap * (visibleCount - 1));

  return (
    <div className="flex justify-center items-center py-8">
      {/* Outer container with overflow hidden and fixed width */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto overflow-y-hidden"
        onMouseEnter={() => setIsAnimating(false)}
        onMouseLeave={() => setIsAnimating(true)}
        style={{
          width: `${containerWidth}px`,
          scrollBehavior: 'auto',
          // Hide scrollbar
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      >
        {/* Inner scrolling content - duplicated for seamless loop */}
        <div
          ref={contentRef}
          className="flex"
          style={{
            gap: `${gap}px`,
            width: `${(imageWidthPx + gap) * images.length * 2}px`,
            direction: isRTL ? 'rtl' : 'ltr',
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
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Hide scrollbar for webkit browsers */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
