class Fone {
  label: string
  number: string
  
  constructor(label: string, number: string){
    this.setLabel(label);
    this.setNumber(number);
  }

  getLabel(){
    return this.label;
  }

  getNumber(){
    return this.number;
  }

  setLabel(valor: string){
    this.label = valor;
  }

  setNumber(valor: string){
    this.number = valor;
  }

  valido(): boolean {
    if(Fone.validacao(this.number)){
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
    return `${this.label}: ${this.number}`
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
    for(let i = 0; i > fones.length; i++){
      this.addFone(fones[i]);
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
  contatos: Map<string,Contato>;

  constructor(){
    this.contatos = new Map<string,Contato>();
  }

  findContato(nome: string): Contato | null{
    if(this.contatos.has(nome)){
      return this.contatos.get(nome);
    } 
      return null;
  }

  addContato(contato: Contato){
    if(this.contatos.has(Contato.nome)){
      let existe = this.contatos.get(Contato.nome);
      for(let fone of Contato.fones){
        existe.addFone(fone);
      }
    } else {
      this.contatos.set(Contato.nome, contato)
    }
  }

  removeContato(contato: Contato){
   if(this.contatos.delete.nome){
     return true;
   return false;
   }
  }

  search(pattern: string): Array<Contato> {
    let resultado = new Array <Contato>();
    for(let contato of this.contatos.values()){
      if(Contato.nome.includes(pattern)){
        resultado.push(contato);
      }
    }
    return resultado;
  }

  toString(){
    let saida: string = ""
    for(let i = 0; i < this.contatos.size; i++){
      saida += `${this.contatos[i]}`
    }
    return saida;
  }
}