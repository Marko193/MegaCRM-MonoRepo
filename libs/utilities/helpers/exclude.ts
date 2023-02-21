import type {PropsWithChildren} from 'react';

export interface ExcludeProps {
  key: string;
  source: Record<string, unknown>;
}

export const excludeClassName = (props: PropsWithChildren<object>): object => {
  return exclude({
    key: 'className',
    source: props,
  });
};

export const exclude = ({key, source}: ExcludeProps): object => {
  delete source[key];
  return source;
};
