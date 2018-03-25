import { Image } from 'react-native';
import { Asset } from 'expo';

export const flattenMessages = (nestedMessages, prefix = '') => {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
}

export const cacheImages = (images) => {
  return images.map((image) => {
    if (typeof image === 'string') return Image.prefetch(image);
    return Asset.fromModule(image).downloadAsync();
  });
}
