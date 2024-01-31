import { getURLSearchParams, quoteRegex } from '@/utils/string';

type Separator = '&' | '.';

export class URLUtils {
  baseUrl: string;
  separator: Separator;

  constructor(baseUrl: string, separator?: Separator) {
    this.baseUrl = baseUrl;
    this.separator = separator ?? '&';
  }

  static windowSearchParams() {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search);
    }
    return undefined;
  }

  windowQuerySearch(hasSeparator?: boolean) {
    if (typeof window !== 'undefined') {
      const search = window.location.search || '';
      return hasSeparator ? search.replace(/&/g, encodeURIComponent(this.separator)) : search;
    }
    return '';
  }

  serializeRedirectUrl(_?: Record<string, string>) {
    const querySearch = this.windowQuerySearch(true);
    const redirectUrl = encodeURIComponent(`${this.baseUrl}${querySearch}`);
    return redirectUrl;
  }

  deserializeRedirectUrl(redirectUrl: string) {
    return redirectUrl.replace(new RegExp(quoteRegex(this.separator), 'g'), '&');
  }
}

export class URL365Utils extends URLUtils {
  serializeRedirectUrl(queryAsObj: Record<string, string>) {
    const searchParams = getURLSearchParams(queryAsObj)?.replace(
      /&/g,
      encodeURIComponent(this.separator),
    );
    const querySearch = searchParams ? `?${searchParams}` : '';
    const redirectUrl = encodeURIComponent(`${this.baseUrl}${querySearch}`);
    return redirectUrl;
  }
}
