declare module 'vanta/dist/vanta.halo.min' {
  import * as THREE from 'three';
  
  interface VantaHaloOptions {
    el: HTMLElement | string;
    THREE: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    baseColor?: number;
    backgroundColor?: number;
    amplitudeFactor?: number;
    size?: number;
  }

  interface VantaHaloEffect {
    destroy: () => void;
  }

  export default function VANTA_HALO(options: VantaHaloOptions): VantaHaloEffect;
}
