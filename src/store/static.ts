interface CacheState {
  images: Record<string, { width: number; height: number }>;
}

export const cache: CacheState = {
  images: {},
};
