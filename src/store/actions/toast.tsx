import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';

export const WaitMessage = {
  SENDING_ORDER: 'sendingOrder',
};

export const SuccessMessage = {
  SENDING_ORDER: 'createOrder',
  CHANGE_USER_TYPE: 'changeUserType',
};

export const ErrorMessage = {
  SENDING_ORDER: 'createOrder',
  CHANGE_USER_TYPE: 'changeUserType',
};

//Put in order from shortest to longest!
export const DelayTime = {
  QUICK: 1000,
  BRIEF: 2000,
};

export const toastWaiting = (message: string, t) => {
  Toast.show({
    type: 'info',
    text1: `${t(`waiting.${message}`)}...`,
    text2: t('waiting.pleaseWait'),
    visibilityTime: 3000,
  });
};

export const toastSuccess = async (
  message: string,
  t,
  delayTime: number = 0,
) => {
  Toast.show({
    type: 'success',
    text1: `${t(`success.${message}`)}`,
    text2: t('success.success'),
    visibilityTime: 3000,
  });
  await delay(delayTime);
};

export const toastError = (message: string, t) => {
  Toast.show({
    type: 'error',
    text1: `${t(`errors.${message}`)}`,
    text2: `${t(`errors.${message}Message`)}`,
    visibilityTime: 3000,
  });
};

export const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));
