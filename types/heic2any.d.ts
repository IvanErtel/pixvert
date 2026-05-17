declare module 'heic2any' {
  interface Heic2AnyOptions {
    blob: Blob;
    toType?: string;
    quality?: number;
    multiple?: boolean;
  }
  function heic2any(options: Heic2AnyOptions & { multiple: true }): Promise<Blob[]>;
  function heic2any(options: Heic2AnyOptions & { multiple?: false }): Promise<Blob>;
  export = heic2any;
}
