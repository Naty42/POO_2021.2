/*
Para instalar um projeto novo, clique no shell e cole:
npm install readline-sync @types/readline-sync @types/node

para rodar, clique no shell e cole:
tsc index.ts && node index.js
*/
export module io {
const readline = require('readline-sync');
  export function input(text: string = ""): string {     
    return readline.question(text);
  }

  export function print(x: any, line_break = "\n"): void {  
    process.stdout.write("" + x + line_break);
  }
}
