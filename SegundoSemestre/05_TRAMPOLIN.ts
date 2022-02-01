import readline = require('readline-sync');

let input = () => readline.question()
let write = (x: any) => process.stdout.write("" + x)

class Kid{
  idade: number;
  nome: string;

  constructor(idade: number, nome: string){
    this.idade = idade;
    this.nome = nome;
  }

  toString(){
    return `A criança ${this.nome} com ${this.idade} está no pula pula`
  }
}

class Trampoline{
  brincando: Array <Kid>;
  esperando: Array <Kid>;

  constructor(){
    this.brincando = []
    this.esperando = [];
  }


  arrive(kid: Kid){
    this.esperando.push(kid);
  }

  entrar(){
    let criancaa: Kid = this.esperando.shift();
    this.brincando.push(criancaa);
  }

  sair(){
    let crianca = this.brincando.shift();
    return crianca;
  }

  removerCrianca(nome: string){
    for(let i = 0; i < this.brincando.length; i++){
      if(this.brincando[i].nome == nome){
        this.brincando.splice(i, 1);
      }
    }
    for(let i = 0; i < this.esperando.length; i++){
      if(this.esperando[i].nome == nome){
        this.esperando.splice(i, 1);
      }
    }
  }

  toString(){
    return `Crianças que estão na fila: ${this.esperando} \n Crianças que estão brincando: ${this.brincando}`
  }
}

class IO{
  mostrar_help(){
    write("Comandos: \n");
    write("arrive <nome> <idade>: coloca uma criança no trampoline \n");
    write("entrar: coloca a primeira criança que estava na fila de espera do trampoline \n");
    write("sair: tira uma criança do trampoline \n");
    write("remover <nome>: remove uma criança \n");
   write("show: mostra o trampoline \n");
    write("end: sair \n");
  }

  shell(){
    let tramp = new Trampoline;

    this.mostrar_help();

    while(true){
      let linha = input();
      let words = linha.split(" ");

      if(words[0] == "end"){
        break
      } else if(words[0] == "arrive"){
        tramp.arrive(new Kid(+words[1], words[2]));
      } else if(words[0] == "show"){
        write(" " + tramp);
      } else if(words[0] == "entrar"){
        tramp.entrar();
      } else if(words[0] == "sair"){
        tramp.sair();
      } else if(words[0] == "remover"){
        tramp.removerCrianca(words[1]);
      } else {
        write("Comando Inválido. \n");
      }
    }
  }
}

let io = new IO();
io.shell();
