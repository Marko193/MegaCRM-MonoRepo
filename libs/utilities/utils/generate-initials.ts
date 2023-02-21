import {stringToColor} from './random-color';

export const stringAvatar = (
  name: string,
  size: number | string,
  fontSize: number | string = 25
) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: size,
      height: size,
      fontSize: `${fontSize}px`,
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
};
