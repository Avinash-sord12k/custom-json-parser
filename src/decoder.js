export function decodeJSONString(token) {
  if (token[0] !== '"' || token[token.length - 1] !== '"') {
    throw new SyntaxError("Invalid JSON string: " + token);
  }

  let result = '';
  let i = 1; // skip the initial quote

  while (i < token.length - 1) { // stop before the final quote
    let ch = token[i];

    if (ch === '\\') {
      i++;
      let next = token[i];

      switch (next) {
        case '"': result += '"'; break;
        case '\\': result += '\\'; break;
        case '/': result += '/'; break;
        case 'b': result += '\b'; break;
        case 'f': result += '\f'; break;
        case 'n': result += '\n'; break;
        case 'r': result += '\r'; break;
        case 't': result += '\t'; break;
        case 'u':
          const hex = token.slice(i + 1, i + 5);
          if (!/^[0-9a-fA-F]{4}$/.test(hex)) {
            throw new SyntaxError("Invalid Unicode escape: \\u" + hex);
          }
          result += String.fromCharCode(parseInt(hex, 16));
          i += 4; // skip the 4 hex digits
          break;
        default:
          throw new SyntaxError("Invalid escape: \\" + next);
      }
    } else {
      result += ch;
    }

    i++;
  }

  return result;
}
