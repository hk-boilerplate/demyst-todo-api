module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/app.ts",   
    "/src/index.ts",
    "/build"
  ],
};
