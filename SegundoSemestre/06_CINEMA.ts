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
  poltronas: Array<Cliente | null>;
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
    for(let i = 0; i < this.poltronas.lenght; i++){
      if(this.poltronas[i] == null){
        saida += "-"
      } else {
        saida += this.poltronas[i].nome == ""
      }
    }
    return saida += ']';
  }

  reservar(nome: string, indice: number): boolean{
    for(let i = 0; i < this.poltronas.length; i++){
      if(this.poltronas[indice] != null){
        console.log("Essa poltrona não está disponível.");
        return false;
      }
      if(this.poltronas[indice] != null && this.poltronas[indice].nome == nome){
        console.log("Já tem essa pessoa existente nessa sala");
        return false
      }
      this.poltronas.push;
      return true;
    }
  }

  cancelar(nome: string){
    for(let i = 0; i < this.poltronas.length; i++){
      if(this.poltronas[i] != null){
        if (this.poltronas[i].nome == nome)
        this.poltronas[i] == null;
      }
    }
  }
}

let sala = new Sala(5);
console.log("sala " + sala);
