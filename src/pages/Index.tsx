import { Suspense, lazy } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import HeroSection from '@/components/sections/HeroSection';
import ManifestoSection from '@/components/sections/ManifestoSection';
import HorizontalScrollSection from '@/components/sections/HorizontalScrollSection';
import GrantSpecsSection from '@/components/sections/GrantSpecsSection';
import FeaturedBuildersSection from '@/components/sections/FeaturedBuildersSection';
import ApplicationSection from '@/components/sections/ApplicationSection';
import FooterSection from '@/components/sections/FooterSection';

const LiquidMetalScene = lazy(() => import('@/components/LiquidMetalScene'));

const Index = () => {
  return (
    <SmoothScroll>
      <main className="relative bg-background text-foreground">
        {/* Noise Overlay */}
        <div className="noise-overlay" />
        
        {/* 3D Background */}
        <Suspense fallback={null}>
          <LiquidMetalScene />
        </Suspense>

        {/* Content */}
        <div className="relative z-10">
          <HeroSection />
          <ManifestoSection />
          <HorizontalScrollSection />
          <GrantSpecsSection />
          <FeaturedBuildersSection />
          <ApplicationSection />
          <FooterSection />
        </div>
      </main>
    </SmoothScroll>
  );
};

export default Index;
