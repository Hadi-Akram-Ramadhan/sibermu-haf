/**
 * TypeScript declaration for Google's <model-viewer> web component.
 * Prevents JSX.IntrinsicElements errors when using the custom element in TSX.
 */

import type { ReactNode } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        ar?: boolean;
        'ar-modes'?: string;
        'auto-rotate'?: boolean;
        'auto-rotate-delay'?: number;
        'camera-controls'?: boolean;
        'camera-orbit'?: string;
        'camera-target'?: string;
        'field-of-view'?: string;
        'min-camera-orbit'?: string;
        'max-camera-orbit'?: string;
        'min-field-of-view'?: string;
        'max-field-of-view'?: string;
        'interaction-prompt'?: string;
        'shadow-intensity'?: string;
        'shadow-softness'?: string;
        'exposure'?: string;
        'environment-image'?: string;
        'skybox-image'?: string;
        'poster'?: string;
        'loading'?: 'auto' | 'lazy' | 'eager';
        'reveal'?: 'auto' | 'interaction' | 'manual';
        'tone-mapping'?: string;
        'disable-zoom'?: boolean;
        'disable-pan'?: boolean;
        'disable-tap'?: boolean;
        'touch-action'?: string;
        ref?: React.Ref<HTMLElement>;
        children?: ReactNode;
      };
    }
  }
}

export {};
