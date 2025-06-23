export function parse(tokens) {
  let i = 0;

  const peek = () => tokens[i];
  const consume = () => tokens[i++];

  function error(msg) {
    throw new SyntaxError(`${msg} at token ${i}: ${tokens[i]}`);
  }

  function parseValue() {
    const token = peek();

    if (token === 'null') { consume(); return null; }
    if (token === 'true') { consume(); return true; }
    if (token === 'false') { consume(); return false; }

    if (token === '{') return parseObject();
    if (token === '[') return parseArray();

    if (token[0] === '"') return JSON.parse(consume()); // quoted string
    if (/^-?\d/.test(token)) return Number(consume());  // number

    error("Unexpected token");
  }

  function parseObject() {
    const obj = {};
    consume(); // '{'

    if (peek() === '}') {
      consume();
      return obj; // empty object
    }

    while (true) {
      const key = JSON.parse(consume()); // must be string
      if (peek() !== ':') error("Expected ':' after key");
      consume(); // skip ':'

      const value = parseValue();
      obj[key] = value;

      if (peek() === '}') {
        consume();
        return obj;
      }

      if (peek() !== ',') error("Expected ',' between object entries");
      consume(); // skip ','
    }
  }

  function parseArray() {
    const arr = [];
    consume(); // '['

    if (peek() === ']') {
      consume();
      return arr; // empty array
    }

    while (true) {
      arr.push(parseValue());

      if (peek() === ']') {
        consume();
        return arr;
      }

      if (peek() !== ',') error("Expected ',' between array elements");
      consume(); // skip ','
    }
  }

  const result = parseValue();

  if (i < tokens.length) {
    error("Unexpected trailing tokens");
  }

  return result;
}