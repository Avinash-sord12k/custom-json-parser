# 🧠 JSON Parser (Custom Implementation)

A minimal, educational JSON parser built from scratch using JavaScript — no dependencies, no `JSON.parse()`. This project demonstrates how tokenization, decoding, and parsing work under the hood of a typical JSON parser.

---

## 📌 Why This Exists

This project was created as a **learning exercise** to:
- Understand how `JSON.parse()` actually works.
- Practice writing a tokenizer, parser, and decoder manually.
- Explore recursive descent parsing and regular expressions.
- Build a working CLI tool without using any external packages.

---

## 🚀 Features

- ✅ Tokenizes raw JSON into meaningful chunks
- ✅ Handles strings, numbers, booleans, null, arrays, and objects
- ✅ Supports escape sequences and Unicode characters
- ✅ Throws syntax errors on invalid input
- ✅ Includes a CLI to parse JSON strings or files
- ✅ Fully tested with `.test.js` modules

---

## 🛠️ Installation & Usage

```bash
git clone https://github.com/your-username/json-parser.git
cd json-parser
npm install
```
---

## 🔬 Run All Tests

```bash
npm test
```

---

## 🧪 Try the CLI

### Parse from inline JSON string: 
```bash
npm run cli '{"name":"Avinash","skills":["JS","Three.js"]}'
```

### Parse from a file:
```bash
npm run cli --file examples/student.json
```

---

## 📂 Project Structure

```bash
  json-parser/
  ├── examples/               # Sample JSON input files
  ├── scripts/
  │   └── run-tests.js        # Custom test runner
  ├── src/
  │   ├── index.js            # Main entry (parseJSON + CLI)
  │   ├── tokenizer.js        # Tokenizes raw JSON into strings
  │   ├── parser.js           # Recursive-descent parser
  │   ├── decoder.js          # Handles string decoding (e.g. \u1234)
  │   ├── *.test.js           # Unit tests for each module
  ├── package.json
  └── readme.md               # You are here 📘
```

---

## 📚 Learning Concepts
This project touches on:

- Regular expressions for lexical analysis  
- Escape sequence decoding  
- Recursion for parsing arrays/objects  
- CLI scripting with Node.js  
- ES modules and `import.meta.url`  

---

## 📦 TODO (Nice to Have)
- --tokens flag to print token list

- --debug flag for step-by-step parsing logs

- Handle more graceful error traces

- Support streaming input from stdin

---

## 🧑‍💻 Author
Made with ❤️ by Avinash.
You can reach out for improvements, questions, or ideas.

