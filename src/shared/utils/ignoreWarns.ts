import { LogBox } from 'react-native';

const ignoreWarns = [
  'Setting a timer for a long period of time',
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
  'ViewPropTypes will be removed',
  'AsyncStorage has been extracted from react-native',
  'EventEmitter.removeListener',
];
const { warn } = console;
console.warn = (...arg) => {
  for (let i = 0; i < ignoreWarns.length; i += i) {
    if (arg[0].startsWith(ignoreWarns[i])) return;
  }
  warn(...arg);
};

LogBox.ignoreLogs(ignoreWarns);
