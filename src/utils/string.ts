export const getURLSearchParams = (params: any) => {
  const searchParams = Object.keys(params)
    .filter((key) => {
      const value = params[key];
      return value !== '' && value !== null && value !== undefined;
    })
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  return searchParams;
};

export const quoteRegex = (char: string) => {
  return char.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
};
