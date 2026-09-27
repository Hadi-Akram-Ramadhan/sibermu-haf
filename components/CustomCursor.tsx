'use client';

import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '@/lib/gsap';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState('');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Nonaktifkan di perangkat layar sentuh atau pengguna prefers-reduced-motion
    if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }
    setEnabled(true);

    const onPointerMove = (e: PointerEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Deteksi elemen interaktif di bawah kursor
      const target = (e.target as HTMLElement)?.closest?.('a, button, [data-cursor]');
      if (target) {
        setHovered(true);
        const customLabel = target.getAttribute('data-cursor') || '';
        setLabel(customLabel);
      } else {
        setHovered(false);
        setLabel('');
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
    >
      {/* Outer follow ring */}
      <div
        className={[
          'fixed -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 transition-all duration-150 ease-out',
          hovered
            ? 'h-14 w-14 border-accent-gold bg-primary/10 shadow-[0_0_0_1px_rgba(201,162,75,0.4)]'
            : 'h-8 w-8',
        ].join(' ')}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      >
        {label && (
          <span className="absolute inset-0 flex items-center justify-center font-body text-[9px] font-bold uppercase tracking-wider text-accent-gold">
            {label}
          </span>
        )}
      </div>

      {/* Center sharp dot */}
      <div
        className={[
          'fixed h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-transform duration-75',
          hovered ? 'scale-0' : 'scale-100',
        ].join(' ')}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </div>
  );
}
