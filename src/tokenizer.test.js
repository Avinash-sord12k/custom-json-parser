import { tokenize } from './tokenizer.js';

function testTokenize(input, expected) {
  try {
    const result = tokenize(input);
    const passed = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`${passed ? "✅" : "❌"} ${input} → ${JSON.stringify(result)}${passed ? "" : ` (expected: ${JSON.stringify(expected)})`}`);
  } catch (err) {
    console.log(`❌ ${input} → Error: ${err.message}`);
  }
}

// ✅ Primitives
testTokenize('true', ['true']);
testTokenize('false', ['false']);
testTokenize('null', ['null']);
testTokenize('  null  ', ['null']);

// ✅ Numbers
testTokenize('42', ['42']);
testTokenize('-3.14', ['-3.14']);
testTokenize('1e10', ['1e10']);
testTokenize('-2.5E-3', ['-2.5E-3']);

// ✅ Strings
testTokenize('"hello"', ['"hello"']);
testTokenize('"he\\nllo"', ['"he\\nllo"']);
testTokenize('"emoji \\u2764"', ['"emoji \\u2764"']); // ❤

// ✅ Punctuation
testTokenize('{', ['{']);
testTokenize('[', ['[']);
testTokenize('}', ['}']);
testTokenize(']', [']']);
testTokenize(':', [':']);
testTokenize(',', [',']);

// ✅ Complex structure
testTokenize(`{ "a": 1, "b": true, "c": null }`, [
  '{', '"a"', ':', '1', ',', '"b"', ':', 'true', ',', '"c"', ':', 'null', '}'
]);

testTokenize(`[1, 2, 3]`, ['[', '1', ',', '2', ',', '3', ']']);

testTokenize(`{"x": [10, false, null]}`, [
  '{', '"x"', ':', '[', '10', ',', 'false', ',', 'null', ']', '}'
]);

// ❌ Invalid / partial handling (optional)
testTokenize(`notjson`, []); // No match
testTokenize(`"unterminated`, []); // Unclosed string

