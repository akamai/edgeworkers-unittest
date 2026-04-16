const path = require('path');
const fs = require('fs');

const projectRoot = __dirname;
const roots = [
  path.join(projectRoot, '__mocks__'),
  path.join(projectRoot, 'src/edgecompute/examples'),
];

function fileExists(filePath) {
  return fs.existsSync(filePath) ||
    fs.existsSync(filePath + '.js') ||
    fs.existsSync(filePath + '.ts');
}

module.exports = {
  presets: [
    ["@babel/preset-env"],
    ["@babel/preset-typescript"]
  ],
  plugins: [
    ["@babel/plugin-transform-runtime"],
    [
      "module-resolver", {
        resolvePath(sourcePath, currentFile, opts) {
          // Skip relative and absolute paths — leave them as-is
          if (sourcePath.startsWith('.') || sourcePath.startsWith('/')) {
            return sourcePath;
          }

          // 1. Check sibling files in the same directory as the file being compiled
          const currentDir = path.dirname(currentFile);
          const sibling = path.join(currentDir, sourcePath);
          if (fileExists(sibling)) {
            return sibling;
          }

          // 2. Check each root (mocks first, then edgecompute/examples)
          for (const root of roots) {
            const candidate = path.join(root, sourcePath);
            if (fileExists(candidate)) {
              return candidate;
            }
          }

          // 3. Not found in our roots — return undefined to let Node handle it
          return undefined;
        }
      }
    ]
  ]
};
