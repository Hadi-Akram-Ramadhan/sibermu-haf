'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/gsap';

interface NodePoint {
  x: number;
  y: number;
  radius: number;
  phase: number;
}

export default function InteractiveCyberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion()) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const pointer = { x: -1000, y: -1000 };
    let animationFrame = 0;
    let visible = true;
    let nodes: NodePoint[] = [];

    const resize = () => {
      const bounds = parent.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = bounds.width * ratio;
      canvas.height = bounds.height * ratio;
      canvas.style.width = `${bounds.width}px`;
      canvas.style.height = `${bounds.height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      nodes = Array.from({ length: Math.min(45, Math.floor(bounds.width / 22)) }, (_, index) => ({
        x: (index * 97 + 38) % bounds.width,
        y: (index * 61 + 80) % bounds.height,
        radius: index % 7 === 0 ? 2.2 : 1.1,
        phase: index * 0.7,
      }));
    };

    const draw = (time: number) => {
      if (!visible) {
        animationFrame = requestAnimationFrame(draw);
        return;
      }

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      nodes.forEach((node, index) => {
        const driftX = Math.sin(time * 0.00025 + node.phase) * 12;
        const driftY = Math.cos(time * 0.0002 + node.phase) * 8;
        const x = node.x + driftX;
        const y = node.y + driftY;
        const distance = Math.hypot(pointer.x - x, pointer.y - y);
        const active = distance < 150;

        nodes.slice(index + 1).forEach((other) => {
          const otherX = other.x + Math.sin(time * 0.00025 + other.phase) * 12;
          const otherY = other.y + Math.cos(time * 0.0002 + other.phase) * 8;
          const gap = Math.hypot(x - otherX, y - otherY);
          if (gap < 135) {
            context.strokeStyle = `rgba(250,250,247,${active ? 0.18 : 0.07})`;
            context.lineWidth = active ? 1 : 0.5;
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(otherX, otherY);
            context.stroke();
          }
        });

        context.fillStyle = active ? '#C9A24B' : 'rgba(250,250,247,0.65)';
        context.beginPath();
        context.arc(x, y, active ? node.radius + 1.4 : node.radius, 0, Math.PI * 2);
        context.fill();
      });

      animationFrame = requestAnimationFrame(draw);
    };

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      observer.observe(parent);
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', (event) => {
      const bounds = parent.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    }, { passive: true });
    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer?.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-80" />;
}
