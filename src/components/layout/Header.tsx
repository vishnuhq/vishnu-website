'use client';

import { usePathname } from 'next/navigation';
import Menu from './Menu';
import Logo from '@/components/ui/Logo';

/**
 * Header Component
 *
 * Fixed header containing navigation menu and conditional logo.
 * Logo appears on all pages except homepage (where it's part of the hero).
 *
 * @example
 * <Header />
 */
export default function Header() {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  return (
    <>
      {/* Logo - visible on all pages except homepage */}
      {!isHomepage && <Logo />}
      {/* Menu Component - Fixed positioned, always accessible */}
      <Menu />
    </>
  );
}
