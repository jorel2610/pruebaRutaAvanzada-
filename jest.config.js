module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: [
        'src/middlewares/**/*.ts',
        'src/models/**/*.ts',
        '!src/index.ts',
        '!src/app.ts',
        '!src/routes/**/*.ts'
    ],
    coverageDirectory: 'coverage',
    testMatch: ['**/__tests__/**/*.test.ts']
};