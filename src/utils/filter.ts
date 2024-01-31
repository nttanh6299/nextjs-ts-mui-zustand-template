import { UrlFilter, FilterKey, GetValueOptions, IState } from '@/types/filter';

// saleType.ON_AUCTION.ON_SALE;collection.0x00000.0x11111
// => [{ slug: 'saleType', values: ['ON_AUCTION', 'ON_SALE'] }, { slug: 'collection', values: ['0x00000', ''0x11111'] }]
export const parseQueryFilters = (query: string): UrlFilter[] => {
  const filters: UrlFilter[] = [];
  query.split(';').forEach((attributeWithValues) => {
    const splitted = attributeWithValues.split('.');
    const attributeFilter = { slug: splitted[0], values: splitted.slice(1) };
    if (attributeFilter.values?.length > 0) {
      filters.push(attributeFilter);
    }
  });
  return filters;
};

// { slug: 'saleType', values: ['ON_AUCTION', 'ON_SALE'] } => saleType.ON_AUCTION.ON_SALE
export const serializeQueryFilters = (attributes: UrlFilter[]): string =>
  attributes
    ?.filter((attribute) => attribute.values?.length > 0)
    .map((attribute) => [attribute.slug, ...attribute.values].join('.'))
    .join(';');

export const getValue = <T>(key: FilterKey, options?: GetValueOptions<T>) => {
  if (typeof window === 'undefined') {
    // Not available in an SSR context
    return null;
  }
  const query = new URLSearchParams(window.location.search);
  const value = query.get(key);

  if (value !== null) {
    return options?.parse ? options.parse(value) : (value as unknown as T);
  }
  return options?.defaultValue || null;
};

export const calculateAddFilter = (
  filtersState: UrlFilter[],
  slug: string,
  newValues: string[],
) => {
  let filters = filtersState || [];
  const existingFilter = filters.find((filter) => filter.slug === slug);
  if (!existingFilter) {
    const newFilter = { slug, values: [...newValues] };
    filters = [...filters, newFilter];
  } else {
    filters = [
      ...filters.filter((filter) => filter.slug !== existingFilter.slug),
      { ...existingFilter, values: [...newValues] },
    ];
  }
  return filters;
};

export const calculateRemoveFilter = (
  filtersState: UrlFilter[],
  slug: string,
  removedValue: string,
) => {
  const filters = filtersState || [];
  const newFilters = filters?.reduce((result: UrlFilter[], filter: UrlFilter) => {
    if (filter.slug !== slug) {
      return [...result, filter];
    }

    const newFilterValues = filter.values.filter((value) => value !== removedValue);
    if (newFilterValues?.length) {
      return [...result, { ...filter, values: newFilterValues }];
    }
    return result;
  }, []);

  return newFilters?.length ? newFilters : null;
};

export const parseQueryString = (newState: IState) => {
  const query = new URLSearchParams(window.location.search);
  const setQuery = <T>(
    key: string,
    serialize: (value: T) => string | null,
    value: T | null | undefined,
  ) => {
    if (value === null || value === undefined) {
      query.delete(key);
      return;
    }

    const queryString = serialize(value);
    if (!queryString) {
      query.delete(key);
    } else {
      query.set(key, queryString);
    }
  };

  Object.keys(newState).forEach((key) => {
    switch (key) {
      case 'keyword':
      case 'sortOrder':
        setQuery(key, (value) => value, newState[key]);
        break;
      default:
        setQuery(key, serializeQueryFilters, newState[key as FilterKey] as UrlFilter[]);
    }
  });

  return query.toString();
};
