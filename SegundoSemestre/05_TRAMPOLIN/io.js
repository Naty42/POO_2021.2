"use strict";
exports.__esModule = true;
exports.io = void 0;
/*
Para instalar um projeto novo, clique no shell e cole:
npm install readline-sync @types/readline-sync @types/node

para rodar, clique no shell e cole:
tsc index.ts && node index.js
*/
var io;
(function (io) {
    var readline = require('readline-sync');
    function input(text) {
        if (text === void 0) { text = ""; }
        return readline.question(text);
    }
    io.input = input;
    function print(x, line_break) {
        if (line_break === void 0) { line_break = "\n"; }
        process.stdout.write("" + x + line_break);
    }
    io.print = print;
})(io = exports.io || (exports.io = {}));
