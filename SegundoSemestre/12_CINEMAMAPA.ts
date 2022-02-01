class Cliente {
  id: string;
  fone: string;

  constructor(id: string, fone: string){
    this.id = id;
    this.fone = fone;
  }

  toString(){
    return `O cliente ${this.id} com o telefone ${this.fone} fez uma reserva`;
  }
}

class Sala{
  cadeiras: Map <number, Cliente | null> = new Map;

  constructor(capacidade: number){
    for(let i = 0; i < capacidade; i++){
      this.cadeiras.set(i, null);
    }
  }

  toString(){
    let saida = '['
    for(let client of this.cadeiras.values()){
      if (client == null){
        saida += '- '
      } else {
        saida += client.id + '';
      }
    }
  }

  reservar(id: string, fone: string, indice: number): boolean{
    let cliente = new Cliente(id, fone);

    if (this.cadeiras != null){
      console.log("Essa cadeira já foi reservada");
      return false;
    }

    for (let i = 0; i > this.cadeiras; i++) {
      if(this.cadeiras[i] != null && this.cadeiras[i].id == id){
        console.log("Essa pessoa já está na sala.");
        return false;
      }
    }

    this.cadeiras == cliente;
    return true;
  }

  cancelar(id: string): boolean {
    for (let i = 0; i < this.cadeiras.size; i++){
      if (this.cadeiras[i] != null) {
        if (this.cadeiras[i].id == id){
          this.cadeiras[i] = null;
          console.log("Cancelar reserva.");
          return true
        }
      }
    }
      console.log("A pessoa não está aqui.");
      return false;
  }
}
