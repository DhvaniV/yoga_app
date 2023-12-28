import {useCallback} from 'react';
import {useWindowDimensions} from 'react-native';

export const useScale = () => {
  const {height, width} = useWindowDimensions();

  const baseWidth = 360;
  const baseHeight = 700;

  const scaleWidth = width / baseWidth;
  const scaleHeight = height / baseHeight;
  const scale = Math.min(scaleWidth, scaleHeight);

  const Scale = useCallback(
    (size: any) => Math.ceil(size * scale),
    [scaleHeight, scaleWidth],
  );

  return {
    Scale,
    height,
    width,
  };
};
