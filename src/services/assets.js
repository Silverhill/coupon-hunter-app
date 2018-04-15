import { Image } from 'react-native';
import { Asset, Font } from 'expo';

export function cacheImages(images){
  return images.map((image) => {
    if (typeof image === 'string') return Image.prefetch(image);
    return Asset.fromModule(image).downloadAsync();
  });
};

export function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default {
  cacheImages,
  cacheFonts,
}