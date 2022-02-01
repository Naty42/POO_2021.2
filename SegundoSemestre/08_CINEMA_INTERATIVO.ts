import readline = require('readline-sync');

let input = () => readline.question()
let write = (x: any) => process.stdout.write("" + x)

class Cliente {
  telefone: string;
  nome: string;

  constructor(telefone: string, nome: string){
    this.telefone = telefone;
    this.nome = nome;
  }

  toString(){
    return `O cliente ${this.nome} com número de telefone: ${this.telefone} fez uma reserva`;
  }
}

class Sala{
  poltronas: Array<Cliente>;
  capacidade: number;

  constructor(capacidade: number){
    this.poltronas = [];
    this.capacidade = capacidade;
    for(let i = 0; i< this.capacidade; i++){
      this.poltronas.push(null);
    }
  }

  toString(){
    let saida = '['
    for(let i = 0; i < this.poltronas.length; i++){
      if(this.poltronas[i] == null){
        saida += "-"
      } else {
        saida += this.poltronas[i].nome + ''
      }
    }
    return saida += ']';
  }

  reservar(nome: string, telefone: string, indice: number){
   let cliente = new Cliente(telefone, nome);

   if(this.poltronas[indice] != null){
     write("Essa poltrona já estava ocupada.");
     return false;
   }
   
   for(let i = 0; i < this.poltronas.length; i++){
      if(this.poltronas[indice] != null && this.poltronas[indice].nome == nome){
        write("Essa mesma pessoa já está na sala");
        return false
      }
      this.poltronas[indice] = cliente;
      return true;
    }
  }

  cancelar(nome: string){
    for(let i = 0; i < this.poltronas.length; i++){
      if(this.poltronas[i] != null){
        if (this.poltronas[i].nome == nome)
          this.poltronas[i] == null;
          write("Cancelando reserva.")
          return true;
      }
    }
    write("Essa pessoa não está mais aqui.");
    return false
  }
}

class IO {
  create_sala(): Sala {
    write("Digite o total de poltronas da sua sala.");
    let capacity = +input();
    let sala: Sala = new Sala(capacity);
    return sala
  }

  mostrar_help() {
    write("Comandos: \n");
    write("Init <capacity>: inicialização de uma nova sala \n");
    write("Show: mostrar sala \n");
    write("reservar <nome> <telefone> <indice>: reservar um lugar \n");
    write("cancelar <nome>: cancelar uma reserva \n");
    write("end: sair \n");
  }

  shell(){
    let sala: Sala = this.create_sala()
    this.mostrar_help();

    while(true){
      let linha = input();
      let words = linha.split(" ");

      if(words[0] == "end"){
        break
      } else if (words [0] == "init"){
        let capacidade = +words[1];
        sala = new Sala(capacidade);
      } else if (words [0] == "show"){
        write("" + sala + "\n");
      } else if (words[0] == "reservar"){
        sala.reservar(words[1], words[2], +words[3]);
      } else if (words[0] == "cancelar"){
        sala.cancelar(words[1]);
      } else {
        write("Comando inválido. \n");
      }
    }
  }
}

let io = new IO();
io.shell();

