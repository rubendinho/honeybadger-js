export interface HbPluginOptions {
  apiKey: string;
  assetsUrl: string;
  endpoint?: string;
  retries?: number;
  revision?: string;
  silent?: boolean;
}

export interface SourcemapInfo {
  sourcemapFilename: string;
  sourcemapFilePath: string;
  jsFilename: string;
  jsFilePath: string;
}