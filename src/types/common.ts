export type Callback<S = unknown, E = unknown> = {
  onSuccess?: (data?: S) => void;
  onError?: (data?: E) => void;
};

export type Option<T = string, V = string> = {
  value: V;
  label: T;
};

export type AdditionalOption<T = string, V = string, D = unknown> = Option<T, V> & {
  meta: D;
};

export type NavigationItem = {
  label: string;
  value: string;
  blank?: boolean;
  parentPath?: string;
  children?: NavigationItem[];
  exact?: boolean;
};

export type PaginationResponse<T> = {
  total: number;
  page: number;
  size: number;
  total_page: number;
  list: T[];
};
