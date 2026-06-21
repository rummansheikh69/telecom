import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";

// Dummy Data for Promotions
const DUMMY_PROMOTIONS = [
  {
    id: 1,
    bgImage:
      "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=600&q=80",
    link: "/promotions/cashback",
  },
  {
    id: 2,

    bgImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
    link: "/promotions/referral",
  },
  {
    id: 3,

    bgImage:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    link: null, // Test case: No button will show for this slide
  },
];

function CoreGrid() {
  // Initialize Embla with infinite looping enabled
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  // Setup dots navigation tracking
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // Handle Auto-slide interval (5 seconds) forward loop
  useEffect(() => {
    if (!emblaApi) return;

    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [emblaApi]);

  // Scroll function for clicking dots directly
  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  return (
    <div className="mt-5 grid grid-cols-3 gap-4">
      {/* Wallet */}
      <Link to={"/wallet"} className="w-full">
        <div className="bg-secondary rounded-2xl p-4 shadow-lg flex items-center justify-center flex-col gap-4 h-40">
          <div className="size-14">
            <img
              src="images/wallet.svg"
              alt="wallet"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-base text-white font-medium">Wallet</p>
        </div>
      </Link>

      {/* Promotions Section */}
      <div className="col-span-2 bg-subMain rounded-2xl shadow-md relative overflow-hidden h-40 ">
        {/* Embla Viewport Container */}
        <div className="overflow-hidden w-full h-full" ref={emblaRef}>
          <div className="flex h-full">
            {DUMMY_PROMOTIONS.map((promo) => (
              <div
                key={promo.id}
                className="flex-[0_0_100%] min-w-0 h-full relative p-6 flex flex-col justify-between select-none"
              >
                {/* Background Image Layer */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 pointer-events-none"
                  style={{ backgroundImage: `url(${promo.bgImage})` }}
                />
                {/* Dark overlay sheet to ensure text remains highly readable */}
                <div className="absolute inset-0 bg-black/50 pointer-events-none" />

                {/* Conditional View Button (Shows ONLY if link exists) */}
                {promo.link && (
                  <Link
                    to={promo.link}
                    target="_blank"
                    className="absolute bottom-4 right-4 z-20 bg-white text-textPrimary px-4 py-1.5 rounded-xl text-xs font-semibold shadow hover:bg-white/90 active:scale-95 transition-all"
                  >
                    View
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Pagination Dots centered at the bottom */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex ? "w-5 bg-white" : "w-2 bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoreGrid;
