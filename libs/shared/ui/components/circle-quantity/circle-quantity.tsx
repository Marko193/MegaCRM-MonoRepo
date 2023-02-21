import {FunctionComponent} from 'react';
import {alpha, Box} from '@mui/material';
import {useTheme} from '@mui/material/styles';

export interface CircleQuantityProps {
  quantity: number | string;
  circleSize: number | string;
  fontSize?: number | string;
}

export const CircleQuantity: FunctionComponent<CircleQuantityProps> = ({
  quantity,
  circleSize,
  fontSize,
}) => {
  const {
    palette: {mode, success},
  } = useTheme();

  return (
    <Box
      data-testid='circle-quantity'
      borderRadius='50%'
      bgcolor={mode === 'dark' ? success.light : alpha(success.light, 0.2)}
      width={`${circleSize}px`}
      height={`${circleSize}px`}
      p={0}
      textAlign='center'
      lineHeight={`${circleSize}px`}
      fontSize={fontSize}>
      {quantity}
    </Box>
  );
};
