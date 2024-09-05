module.exports = {
  preset: "react-native",
  preset: "jest-expo",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react|@react-native|@react-native-community|react-native|js-polyfills|expo)/",
  ],
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@expo/vector-icons$": "<rootDir>/node_modules/@expo/vector-icons",
    "^expo-linear-gradient$": "<rootDir>/node_modules/expo-linear-gradient",
  },
};
