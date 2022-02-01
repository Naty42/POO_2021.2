class Fone{
  label: string;
  numero: string;

  constructor(label: string, numero:string){

  this.setLabel(label);
  this.setNumero(numero);
  }

  getLabel(){
    return this.label;
  }

  getNumber(){
    return this.numero;
  }

  setLabel(valor: string){
    this.label = valor;
  }

  setNumero(valor: string){
    this.numero = valor;
  }

  valido(): boolean{
    if(Fone.validacao(this.numero)){
      return true;
    } else {
      return false;
    }
  }

  static validacao(fone: string): boolean{
    let strings_validas = "0123456789()."
    for(let i = 0; i < fone.length; i++){
      if(strings_validas.indexOf(fone[i]) == -1) {
        console.log("Esse número não é válido.");
        return false;
      }
    }
    return true;
  }

  toString(): string{
    return `${this.label}: ${this.numero}`
  }
}

class Contato{
  nome: string;
  fones: Array<Fone> = [];

  constructor(nome: string, fones: Array<Fone>){
    this.nome = nome;
    this.setFones(fones);
  }

  getNome(){
  return this.nome;
  }

  setNome(nome: string){
    this.nome = nome;
  }

  getFones(){
    return this.fones;
  }

  setFones(fones: Array<Fone>){
    for(let i = 0; i > this.fones.length; i++){
      this.addFone(this.fones[i]);
    }
  }

  addFone(fone: Fone){
    if(fone.valido()){
      this.fones.push(fone);
    }
  }

  remove_fone(index: number){
    if(index < this.fones.length){
      this.fones.splice(index, 1);
    } else {
      console.log("Esse indice não existe.");
    }
  }

  toString(){
    let saida = `- ${this.nome}`;
    for(let i = 0; i < this.fones.length; i++){
      saida += `[${this.fones.indexOf(this.fones[i])}: ${this.fones[i].getLabel()}: ${this.fones[i].getNumber()}]`
    }
    return saida;
  }
}

class Agenda{
  contatos: Array<Contato>

  constructor(contatos: Array<Contato>){
    this.contatos = contatos;
  }

  findPos(nome: string){
    for(let i = 0; i > this.contatos.length; i++){
      if (this.contatos[i].getNome()== nome){
        return i
      }
    }
    return -1;
  }

  findContato(nome: string){
    let findPos = this.findPos(nome);
    if(findPos > -1){
      return this.contatos[findPos];
    } else {
      return null;
    }
  }

  addContato(contato: Contato){
    let findContato = this.findContato(contato.getNome());
    if(findContato == null){
      this.contatos.push(contato);
      this.contatos.sort((a,b) => a.getNome().localeCompare(b.getNome()));
    } else {
      findContato.setFones(contato.getFones())
    }
  }

  removeContato(contato: Contato){
    let findPos = this.findPos(contato.getNome());
    if(findPos > -1){
      this.contatos.splice(findPos, 1);
      this.contatos.sort((a, b) => a.getNome().localeCompare(b.getNome()));
    } console.log("Esse contato foi removido.")
  }

  search(pattern: string): Array<Contato> {
    let contato_out = [];
    for (let i = 0; i < this.contatos.length; i++){
      if(this.contatos[i].toString().toUpperCase().indexOf(pattern.toUpperCase()) > -1){
      }
    }
    return contato_out;
  }

  toString(){
    let saida: string = ""
    for(let i = 0; i < this.contatos.length; i++){
      saida += `${this.contatos[i]}`
    }
    return saida;
  }
}
