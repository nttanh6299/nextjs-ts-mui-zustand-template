import { PropsWithChildren } from 'react';

type ShowProps = PropsWithChildren<{
  when: boolean;
}>;

const Show = ({ when, children }: ShowProps): JSX.Element | null => {
  return when ? (children as JSX.Element) : null;
};

export default Show;
