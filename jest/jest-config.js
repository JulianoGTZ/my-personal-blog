module.exports = {
  rootDir: '../',
  moduleFileExtensions: ['js', 'jsx'],
  testEnvironment:'jest-environment-jsdom',
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)test.js',
    '**/__tests__/**/*.jsx',
    '**/?(*.)test.jsx',
  ],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/__mocks__/file-mock.js',
    'use-site-metadata': '<rootDir>/jest/__mocks__/hooks/use-site-metadata.js',
    'use-categories-list':
      '<rootDir>/jest/__mocks__/hooks/use-categories-list.js',
      'use-tags-list':'<rootDir>/jest/__mocks__/hooks/use-tags-list.js',
      '@reach/router':'<rootDir>/jest/__mocks__/reach-router.js',
  },
  moduleDirectories: ["node_modules", "src"],
  globals: {
    __PATH_PREFIX__: '',
  },
  setupFiles: ['<rootDir>/jest/loadershim.js'],
};
