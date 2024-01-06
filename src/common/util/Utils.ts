import {
  Dimensions,
  Platform,
  PixelRatio,
  Linking,
} from 'react-native';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// based on iphone 5s's scale
const isPortrait = SCREEN_HEIGHT > SCREEN_WIDTH ? true : false;
const scale = (isPortrait ? SCREEN_WIDTH : SCREEN_HEIGHT) / 320;

export default class Utils {
  static getHeightInPortraitMode = isPortrait ? SCREEN_HEIGHT : SCREEN_WIDTH;

  static isPortrait = () => {
    const {width, height} = Dimensions.get('window');

    return height > width ? true : false;
  };

  static scaleSize(size: number) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  }

  static getDeviceDimentions = () => Dimensions.get('window');

  static verifyResponse = (response: any) =>
    new Promise((resolve, rejects) =>
      response && response.ok ? resolve(response) : rejects(response),
    );

  static handleError = (error: any) => {
    if (
      error &&
      (error.status === 422 ||
        error.status === 501 ||
        error.status === 401 ||
        error.status === 404 ||
        error.status === 409 ||
        error.status === 401 ||
        error.status === 400 ||
        error.status === 304 ||
        error.status === 409 ||
        error.status === 500)
    ) {
      return error.json();
    }
    return error;
  };

  static log = (prefix?: any, ...args: any[]) => {
    if (__DEV__) {
      console.log(prefix, args);
    }
  };

  static sendEmail = (url: string) =>
    Linking.canOpenURL(`mailto:${url}`)
      .then(supported => {
        if (supported) Linking.openURL(`mailto:${url}`);
      })
      .catch(err => {
        Utils.log('Linking error ===> send email ', err);
      });
}
