const t1 = String.raw`\s*`                              // for leading whitespaces
const t2 = String.raw`(`                                // start of object
const t3 = String.raw`true`                             // true literal
const t4 = String.raw`|false`                           // false literal
const t5 = String.raw`|null`                            // null literal
const t6 = String.raw`|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?`// number (int, float, sci)
const t7 = String.raw`|"`                               // start of string
const t8 = String.raw`(?:`
const t9 = String.raw`\\["\\/bfnrt]`                    // escape characters
const t10 = String.raw`|\\u[0-9a-fA-F]{4}`               // unicode escape
const t11 = String.raw`|[^"\\]`                          // normal characters
const t12 = String.raw`)*"`                              // end of string
const t13 = String.raw`|[{}\[\]:,]`                      // punctuation: {}, [], :, ,
const t14 = String.raw`)`                                // end of object
const t15 = String.raw`\s*`                              // for trailing whitespaces

export function tokenize(json) {
  const jsonTokenRegexString = [
    t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15
  ].join("");

  const regex = new RegExp(jsonTokenRegexString, "gy");

  let result = [];
  let match;

  while ((match = regex.exec(json)) !== null) {
    result.push(match[1]);
  }
  return result;
}


// console.log(tokenize(`{"name":"avinash"}`))
