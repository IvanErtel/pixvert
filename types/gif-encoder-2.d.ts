declare module 'gif-encoder-2' {
  class GIFEncoder {
    constructor(width: number, height: number, algorithm?: string, useOptimizer?: boolean, maxColors?: number);
    start(): void;
    finish(): void;
    setRepeat(repeat: number): void;
    setDelay(delay: number): void;
    setQuality(quality: number): void;
    addFrame(ctx: CanvasRenderingContext2D | ImageData | Uint8ClampedArray): void;
    out: { getData(): number[] };
  }
  export = GIFEncoder;
}
