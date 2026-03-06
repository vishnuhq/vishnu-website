'use client';

import { ContactHero } from '@/components/contact/ContactHero';
import { ContactLinks } from '@/components/contact/ContactLinks';
import ScrollButton from '@/components/ui/ScrollButton';

export default function ContactPage() {
  return (
    <div className="overflow-x-hidden">
      <ContactHero />
      <ScrollButton targetId="contact-links" />
      <div id="contact-links">
        <ContactLinks />
      </div>
    </div>
  );
}
