import reactotron from '../../ReactotronConfig';

export const appLog = __DEV__ ? reactotron?.logImportant : console.log;
export const appLogSimple = __DEV__ ? reactotron?.logImportant : console.log;
export const appWarn = __DEV__ ? reactotron?.warn : console.warn;
