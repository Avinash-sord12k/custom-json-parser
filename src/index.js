import { tokenize } from './tokenizer.js';
import { parse } from './parser.js';
import { pathToFileURL } from 'url';

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
  const input = process.argv[2];

  if (!input) {
    console.error("❌ Please provide a JSON string as an argument.");
    console.error("Example:");
    console.error(`  node src/parseJSON.js '{"key":"value"}'`);
    process.exit(1);
  }

  try {
    const result = parseJSON(input);
    console.log("🚀 ~ result:", result)
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("❌ Parse error:", err.message);
    process.exit(1);
  }
}
