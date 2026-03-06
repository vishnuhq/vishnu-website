'use client';

import SlidingImages from '@/components/home/SlidingImages';
import { LetterCollision } from '@/components/animations/textAnimations/scrollText';
import Description from '@/components/home/Description/description';
import ScrollButton from '@/components/ui/ScrollButton';
import { getFeaturedWork } from '@/data/work';

export default function Home() {
  const featuredWork = getFeaturedWork().slice(0, 6);

  return (
    <div className="overflow-x-hidden">
      <LetterCollision />
      <ScrollButton targetId="description" />
      <div id="description">
        <Description />
      </div>
      <SlidingImages work={featuredWork} />
    </div>
  );
}
