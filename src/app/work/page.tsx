'use client';

import { WorkHero } from '@/components/work/WorkHero';
import WorkGallery from '@/components/work/WorkGallery';
import ScrollButton from '@/components/ui/ScrollButton';

export default function WorkPage() {
  return (
    <div>
      <WorkHero />
      <ScrollButton targetId="work-gallery" />
      <div id="work-gallery">
        <WorkGallery />
      </div>
    </div>
  );
}
