import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const srcDir = path.join(process.cwd(), "src");

function findTestFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let testFiles = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      testFiles = testFiles.concat(findTestFiles(fullPath));
    } else if (entry.isFile() && fullPath.endsWith('.test.js')) {
      testFiles.push(fullPath);
    }
  }

  return testFiles;
}

const testFiles = findTestFiles(srcDir);

if (testFiles.length === 0) {
  console.log('No test files found.');
  process.exit(0);
}

for (const file of testFiles) {
  const fileUrl = pathToFileURL(file); // ✅ Convert to file:// URL
  console.log(`\n🧪 Running ${file}`);
  await import(fileUrl.href); // ✅ import with proper URL
}
