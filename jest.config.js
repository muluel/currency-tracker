module.exports = {
  preset: 'ts-jest',
  _testEnvironment: 'node',
  get testEnvironment() {
    return this._testEnvironment;
  },
  set testEnvironment(value) {
    this._testEnvironment = value;
  },
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node']
};

