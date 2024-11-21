import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);

// Mock native dependencies if necessary
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);
