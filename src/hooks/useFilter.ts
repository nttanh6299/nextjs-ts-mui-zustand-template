import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { IState, ForceOption, FilterKey, UrlFilter } from '@/types/filter';
import { Option } from '@/types/common';
import {
  getValue,
  parseQueryFilters,
  calculateAddFilter,
  calculateRemoveFilter,
  parseQueryString,
} from '@/utils/filter';

type IHookArgs = {
  defaultSortOrder?: string;
  defaultType?: string;
  defer?: boolean;
  ssr?: boolean;
  removeHash?: boolean;
};

export function getSort(sortOptions: Option[], sortOrder: string) {
  const supported = sortOptions.find((opt) => opt.value === sortOrder);
  if (supported) {
    const [sortBy, direction] = supported.value.split('-');
    return { sortBy, direction };
  }
  const [sortBy, direction] = sortOptions[0].value.split('-');
  return { sortBy, direction };
}

const useFilter = (props: IHookArgs) => {
  const { defaultSortOrder, defaultType, defer, removeHash, ssr } = props;
  const router = useRouter();

  const urlFilters = getValue('filters', { parse: parseQueryFilters, defaultValue: [] });

  const [state, setState] = useState<IState>({
    filters: urlFilters,
    type: getValue('type', { defaultValue: defaultType || '' }),
    sortOrder: getValue('sortOrder', { defaultValue: defaultSortOrder || '' }),
    keyword: getValue('keyword', { defaultValue: '' }),
  });

  const pushState = (newState: IState) => {
    const search = parseQueryString(newState);
    const {
      location: { hash },
    } = window;
    const url = {
      pathname: router.pathname,
      search,
      hash: removeHash ? '' : hash,
    };
    const as = {
      pathname: window.location.pathname,
      search,
      hash: removeHash ? '' : hash,
    };
    const options = { scroll: false, shallow: !ssr };
    router.push(url, as, options);
  };

  const setNewState = (newState: IState, force?: ForceOption) => {
    setState(newState);

    if (force === 'stay') {
      return;
    }

    if (!defer || force === 'push') {
      pushState(newState);
    }
  };

  const modify = <T>(key: FilterKey, value: T, force?: ForceOption) => {
    const newState: IState = {
      ...state,
      [key]: value,
    };
    setNewState(newState, force);
  };

  const customAddFilters = (filters: UrlFilter[], force?: ForceOption) => {
    const newState: IState = {
      ...state,
    };

    filters.forEach((option) => {
      const slugIndex = newState.filters?.findIndex((filter) => filter.slug === option.slug);
      if (Number(slugIndex) >= 0 && Array.isArray(newState.filters)) {
        newState.filters[Number(slugIndex)] = option;
      } else {
        newState.filters?.push(option);
      }
    });
    setNewState(newState, force);
  };

  const addFilters = (slug: string, newValues: string[], force?: ForceOption) =>
    modify('filters', calculateAddFilter(state.filters || [], slug, newValues), force);
  const addKeyword = (value: string) => modify('keyword', value, 'push');
  const addSortOrder = (value: string) => modify('sortOrder', value, 'push');
  const addType = (value: string) => modify('type', value, 'push');

  const removeFilter = (slug: string, removedValue: string) => {
    const newState: IState = { ...state };
    newState.filters = calculateRemoveFilter(state.filters || [], slug, removedValue);
    setNewState(newState, 'push');
  };

  const clearAllFilters = (includedKeyword?: boolean, force?: ForceOption) => {
    const newState: IState = {
      ...state,
      filters: null,
      sortOrder: null,
    };

    if (typeof includedKeyword === 'boolean' && includedKeyword) {
      newState.keyword = null;
    }

    setNewState(newState, force);
  };

  const submitFilter = () => {
    pushState(state);
  };

  const filters = useMemo(() => state.filters, [state.filters]);
  const keyword = useMemo(() => state.keyword, [state.keyword]);
  const sortOrder = useMemo(() => state.sortOrder, [state.sortOrder]);
  const type = useMemo(() => state.type, [state.type]);

  return {
    filters,
    keyword,
    sortOrder,
    type,
    urlFilters,
    addFilters,
    addKeyword,
    addSortOrder,
    addType,
    removeFilter,
    clearAllFilters,
    submitFilter,
    customAddFilters,
  };
};

export default useFilter;
