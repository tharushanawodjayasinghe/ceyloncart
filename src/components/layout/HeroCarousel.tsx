'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShoppingBag, Sparkles, ShieldCheck } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  tag: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1600&q=80',
    tag: '🌿 Pure Ceylon Tea',
    title: 'Highland Pure Ceylon Teas',
    subtitle: 'Hand-picked from Nuwara Eliya’s misty mountain slopes above 6,000 feet.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=1600&q=80',
    tag: '🌶️ Authentic Spices',
    title: 'World Famous Ceylon Cinnamon & Spices',
    subtitle: 'True sweet cinnamon sticks and organic spices directly from Matale gardens.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1600&q=80',
    tag: '🏺 Master Crafts',
    title: 'Handcrafted Heritage Pottery & Wood Carvings',
    subtitle: 'Century-old artisanal traditions preserved by master Sri Lankan craftsmen.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=1600&q=80',
    tag: '🎨 Traditional Batik',
    title: 'Artisanal Batik & Pure Handloom Textiles',
    subtitle: 'Vibrant natural dyes and hand-woven pure cotton garments from Kandy.',
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <section
      className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-gray-950 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Carousel Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out',
            index === currentIndex ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
          )}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Multi-stage Dark Gradient Overlay for Maximum Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-black/40" />
        </div>
      ))}

      {/* Hero Content (Floating over background) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="max-w-2xl space-y-6">
          {/* Animated Category Tag */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full px-3.5 py-1 text-xs font-semibold backdrop-blur-md animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            {slides[currentIndex].tag}
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            {slides[currentIndex].title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-200 leading-relaxed font-normal max-w-xl">
            {slides[currentIndex].subtitle}
          </p>

          {/* CTA Buttons & Trust Points */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="#products"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-900/30 h-12 px-6 rounded-xl inline-flex items-center justify-center'
              )}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Explore Products
            </Link>
            <div className="flex items-center gap-2 text-xs text-gray-300 px-2 py-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Directly Sourced from Sri Lankan Artisans</span>
            </div>
          </div>

          {/* Quick Badges */}
          <div className="pt-4 flex flex-wrap gap-2 text-xs font-medium text-gray-300">
            {['🫖 Ceylon Teas', '🌶️ Organic Spices', '🎨 Handmade Batik', '🚚 Free Shipping $50+'].map((item) => (
              <span
                key={item}
                className="bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-3 py-1 text-gray-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel Navigation Controls (Arrows) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 z-30 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-110 focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 z-30 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-110 focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators / Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'h-2 rounded-full transition-all duration-300 focus:outline-none',
              index === currentIndex ? 'w-8 bg-emerald-400' : 'w-2 bg-white/40 hover:bg-white/70'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
