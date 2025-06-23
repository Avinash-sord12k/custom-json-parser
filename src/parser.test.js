import { parse } from './parser.js';

function testParse(tokens, expected) {
  try {
    const result = parse(tokens);
    const passed = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`${passed ? "✅" : "❌"} ${JSON.stringify(tokens)} → ${JSON.stringify(result)}${passed ? "" : ` (expected: ${JSON.stringify(expected)})`}`);
  } catch (err) {
    console.log(`❌ ${JSON.stringify(tokens)} → Error: ${err.message}`);
  }
}

// ✅ Null, boolean, number
testParse(['null'], null);
testParse(['true'], true);
testParse(['false'], false);
testParse(['42'], 42);
testParse(['-3.14'], -3.14);

// ✅ Strings
testParse(['"hello"'], "hello");
testParse(['"line\\nline"'], "line\nline");

// ✅ Arrays
testParse(['[', ']'], []);
testParse(['[', '1', ',', '2', ',', '3', ']'], [1, 2, 3]);
testParse(['[', '"a"', ',', 'true', ',', 'null', ']'], ["a", true, null]);

// ✅ Objects
testParse(['{', '}'], {});
testParse(['{', '"a"', ':', '1', '}'], { a: 1 });
testParse(['{', '"x"', ':', 'true', ',', '"y"', ':', 'null', '}'], { x: true, y: null });
testParse(['{', '"nested"', ':', '{', '"a"', ':', '1', '}', '}'], { nested: { a: 1 } });

// ✅ Complex nested structure
testParse(
  ['{', '"a"', ':', '[', '1', ',', '{', '"b"', ':', '"c"', '}', ']', '}'],
  { a: [1, { b: "c" }] }
);

// ❌ Invalids
testParse(['[', '1', '2', ']'], null); // Missing comma
testParse(['{', '"a"', '1', '}'], null); // Missing :
testParse(['{', '"a"', ':', '1', ',', '}'], null); // Trailing comma
testParse(['{', '"a"', ':', '1'], null); // Unclosed object
testParse(['[', 'true', ',', 'false'], null); // Unclosed array
testParse(['bogus'], null); // Unknown token
testParse(['1', '2'], null); // Extra trailing tokens
