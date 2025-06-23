import { decodeJSONString } from "./decoder.js";

function testDecode(input, expected) {
  try {
    const result = decodeJSONString(input);
    const passed = result === expected;
    console.log(`${passed ? "✅" : "❌"} ${input} → ${JSON.stringify(result)} ${passed ? "" : `(expected: ${JSON.stringify(expected)})`}`);
  } catch (err) {
    console.log(`❌ ${input} → Error: ${err.message}`);
  }
}

testDecode('"hello"', "hello");
testDecode('"line\\nline"', "line\nline");
testDecode('"tab\\tindent"', "tab\tindent");
testDecode('"quote: \\""', 'quote: "');
testDecode('"backslash: \\\\"', 'backslash: \\');
testDecode('"unicode: \\u03A9"', "unicode: Ω"); // Greek capital omega
testDecode('"multiple\\nlines\\tand\\u2603"', "multiple\nlines\tand☃"); // ☃ snowman
testDecode('"slash: \\/"', "slash: /");
testDecode('"escape all: \\\\ \\n \\t \\u0041"', "escape all: \\ \n \t A");

// Not surrounded with quotes
testDecode('hello', null);                     // invalid string
testDecode('"unterminated', null);             // missing closing "
testDecode('"bad\\escape"', null);             // missing escape code
testDecode('"bad unicode \\uZZZZ"', null);     // invalid hex
testDecode('"short unicode \\u12"', null);     // not 4 digits
testDecode('"dangling backslash\\', null);     // ends in \

