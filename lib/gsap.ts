/**
 * lib/gsap.ts
 * Setup dan registrasi GSAP + ScrollTrigger.
 * Semua komponen yang butuh GSAP import dari sini, bukan langsung dari 'gsap'.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/**
 * Register GSAP plugins sekali saja (idempotent).
 * Panggil di dalam useEffect komponen client.
 */
export function registerGsap(): void {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/**
 * Cek apakah user mengaktifkan prefers-reduced-motion.
 * Jika true: jangan jalankan animasi berat.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export { gsap, ScrollTrigger };
