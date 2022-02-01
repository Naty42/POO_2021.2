"use strict";
exports.__esModule = true;
var io_1 = require("./io");
function main() {
    var nome = io_1.io.input("seu nome: ");
    io_1.io.print("olá " + nome, '');
    io_1.io.print(", como você está hoje??");
}
main();
