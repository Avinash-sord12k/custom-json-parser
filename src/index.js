import { tokenize } from './tokenizer.js';
import { parse } from './parser.js';
import { pathToFileURL } from 'url';
import * as fs from 'fs';
import path from 'path';

/**
 * Fully parses a JSON string into a JS value
 * using custom tokenizer and parser.
 * @param {string} jsonString
 * @returns {any}
 */
export function parseJSON(jsonString) {
  const tokens = tokenize(jsonString);
  return parse(tokens);
}


// --- CLI Support ---
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);

  let jsonInput = null;

  if (args[0] === '--file') {
    const filePath = args[1];
    if (!filePath) {
      console.error('❌ Missing file path after --file');
      process.exit(1);
    }
    try {
      jsonInput = fs.readFileSync(path.resolve(filePath), 'utf-8');
    } catch (err) {
      console.error(`❌ Failed to read file: ${filePath}`);
      console.error(err.message);
      process.exit(1);
    }
  } else {
    // Treat the first argument as raw JSON input
    jsonInput = args[0];
    if (!jsonInput) {
      console.error("❌ Provide JSON as a string or use --file <path>");
      process.exit(1);
    }
  }

  try {
    const result = parseJSON(jsonInput);
    console.log(JSON.stringify(result, null, 2)); // TODO: implement own strigifier
  } catch (err) {
    console.error("❌ Parse error:", err.message);
    process.exit(1);
  }
}