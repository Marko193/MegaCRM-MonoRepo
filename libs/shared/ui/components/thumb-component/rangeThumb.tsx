import { HTMLAttributes } from 'react';
import { SliderThumb } from '@mui/material';
import { ArrowRightIcon } from '@mega-dev-crm/shared';

type RangeThumbProps = HTMLAttributes<unknown>;

export const RangeThumb = (props: RangeThumbProps) => {
  const { ...other } = props;

  return (
    <SliderThumb {...other}>
      {/* TODO: need get color from palette (related #151) */}
      <ArrowRightIcon color="#FFA31A" />
    </SliderThumb>
  );
};
