const commonScrollStyle = {
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
    borderRadius: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '6px',
    background: 'gray', // REPLACE WITH THEME
  },
  '&::-webkit-scrollbar-track-piece:start': {
    backgroundColor: 'transparent',
    borderRadius: '6px',
  },
  '&::-webkit-scrollbar-track-piece:end': {
    backgroundColor: 'transparent',
    borderRadius: '6px',
  },
};

export const getWebkitScrollYCSS = (width?: string) => ({
  overflowY: 'auto',
  paddingRight: '6px',
  '&::-webkit-scrollbar': {
    width: width || '4px',
    background: 'transparent',
  },
  ...commonScrollStyle,
});

export const getWebkitScrollXCSS = (height?: string) => ({
  overflowX: 'auto',
  '&::-webkit-scrollbar': {
    height: height || '4px',
    background: 'transparent',
  },
  ...commonScrollStyle,
});

export const getWebkitScrollBothCSS = (size?: string) => ({
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    height: size || '4px',
    width: size || '4px',
  },
  ...commonScrollStyle,
});

export const ellipsisMultipleLine = (line = 2) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: line,
  WebkitBoxOrient: 'vertical',
});
