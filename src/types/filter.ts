export interface UrlFilter {
  slug: string;
  values: string[];
}

export type IState = {
  filters: UrlFilter[] | null;
  keyword?: string | null;
  sortOrder?: string | null;
  imageId?: string | null;
  type?: string | null;
};

export type GetValueOptions<T> = {
  parse?: (value: string) => T;
  defaultValue?: T;
};

export type ForceOption = 'push' | 'stay';

export type FilterKey = keyof IState;
