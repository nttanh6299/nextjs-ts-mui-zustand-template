import useBoolean from '@/hooks/useBoolean';

interface UseCollapseTextProps {
  text: string;
  chars: number;
  defaultShow?: boolean;
}

const useCollapseText = ({ text, chars, defaultShow }: UseCollapseTextProps) => {
  const { value: isShowAll, toggle: toggleShow } = useBoolean(!!defaultShow);

  const canToggleShow = text.length > chars;
  const collapsedText = canToggleShow
    ? isShowAll
      ? text
      : `${text.substring(0, chars)}...`
    : text;

  return {
    collapsedText,
    canToggleShow,
    isShowAll,
    toggleShow,
  };
};

export default useCollapseText;
