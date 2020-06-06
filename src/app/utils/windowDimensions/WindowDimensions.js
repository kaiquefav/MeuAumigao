import { Dimensions, PixelRatio } from 'react-native';

export const winWidth = Dimensions.get('window').width;
export const winHeight = Dimensions.get('window').height;
export const winFont = Dimensions.get('window').fontScale;

export const pxRatio = PixelRatio.get();
