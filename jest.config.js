module.exports = {
  verbose: true,
  roots: ["<rootDir>/src/", "<rootDir>/tests/"],
  moduleFileExtensions: ['js', 'vue'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  transform: {
    "^.+\\.js$": "babel-jest",
  },

  preset: '@vue/cli-plugin-unit-jest'
}
