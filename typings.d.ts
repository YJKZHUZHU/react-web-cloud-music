declare module "*.scss"

declare module '*.png'

declare module '*.jpeg'

declare module '*.jpg'

// // 在 TypeScript 中声明一个模块，可以是任何名字
// declare global {
//   interface Window {
//     Ripple: any;
//   }
// }

// Partial<{
//   size: string | number,
//   radius: number,
//   randomInterval: number | number[]
// }>

type HTMLElementType = string | HTMLElement;

interface RhythmDiskParams {
  size?: string | number;
  radius?: number;
  randomInterval?: number | [number, number];
  minInterval?: number;
  centerColor?: string;
  borderWidth?: number;
  borderColor?: string;
  rippleWidth?: number;
  rippleColor?: string;
  pointRadius?: number;
  rotateAngle?: number;
}



interface RippleReturn {
  setCover: (src: string) => void
  cancelAnimate: () => void
  animate: () => void
  initCanvas: () => void
  [props: string]: any
}



declare interface Window {

  Ripple: {
    new(container: string | HTMLElement, params?: RhythmDiskParams): RippleReturn;
  }
}


