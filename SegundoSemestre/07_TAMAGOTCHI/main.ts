import {io} from "./io";

class Bicho {
  nome: string = "";
  idade: number;
  alive: boolean;
  diamantes: number;
  energia: number;
  cleanMax: number;
  energiaMax: number;
  fome: number;
  fomeMax: number;
  limpar: number;

  public constructor(nome: string, energia: number, fome: number, limpar: number){
    this.nome = nome;
    this.idade = 0;
    this.alive = true;
    this.diamantes = 0;
    this.energia = energia;
    this.cleanMax = limpar;
    this.energiaMax = energia;
    this.fome = fome;
    this.fomeMax = fome;
    this.limpar = limpar
  }

  public getLimpar(): number{
    return this.limpar
  }

  public getCleanMax(): number{
    return this.cleanMax;
  }

  public getEnergia(): number{
    return this.energia;
  }

  public getEnergiaMax(): number{
    return this.energiaMax;
  }

  public getFome(): number{
    return this.fome;
  }

  public getFomeMax(): number{
    return this.fomeMax
  }

  setEnergia(value: number){
    if(value <= 0){
      this.energia = 0;
      console.log("Lilo morreu de tão fraco.");
      this.alive = false;
    } else if (value > this.energiaMax){
      this.energia = this.energiaMax;
    } else {
      this.energia = value;
    }
  }

  setLimpar(value: number){
    if(value <= 0){
      this.energia = 0;
      console.log("Lilo morreu de tão sujo");
      this.alive = false;
    } else if (value > this.energiaMax){
      this.limpar = this.cleanMax;
    } else {
      this.limpar = value
    }
  }

  setFome(value: number){
    if(value <= 0){
      this.fome = 0;
      console.log("Lilo morreu tanta fome.");
      this.alive = false;
    } else if (value > this.fomeMax){
      this.fome = this.fomeMax;
    } else {
      this.fome = value;
    }
  }

  testeAlive(): boolean{
    if(this.alive == true){
      console.log ("Lilo tá vivoo!");
      return true;
    } else {
      console.log("Lilo faleceu");
      return false;
    }
  }

  comerComer(){
    if(this.testeAlive()){
      this.setEnergia(this.energia - 1);
      this.setFome(this.fome + 5);
      this.setLimpar(this.limpar - 2);
      this.idade++

      console.log("Lilo está comendo")
    }
  }

  jogar(){
    if(this.testeAlive()){
      this.setEnergia(this.energia - 2);
      this.setFome(this.fome - 3);
      this.setLimpar(this.limpar - 5);
      this.diamantes++
      this.idade++
      console.log("Lilo está brincando")
    }
  }

  banhar(){
    if(this.testeAlive()){
      this.setEnergia(this.energia - 1);
      this.setFome(this.fome - 1);
      this.setLimpar(this.limpar = this.cleanMax);
      this.idade += 3;
      console.log("Lilo está no banho.");
    }
  }

  dormir(){
    if(this.testeAlive()){
      if(this.energiaMax <= this.energiaMax - 7){
        console.log("Lilo está dormindo");
      } else {
        console.log("Ele não está com sono agora!");
      }
    }
  }

  toString(): string{
    return this.nome + ":" + this.energia + "/" + this.energiaMax;
  }
}

class IO{
  create_pet(): Bicho{
    io.print("Qual é o nome do seu pet? ");
    let nome = io.input;
    io.print("Digite o maxímo de energia do seu pet. ");
    let energiaMax = +io.input();

    let pet = new Bicho(nome, energiaMax, 10, 15)
    return pet;
  }

  shell(){
    let pet = create_pet();
  }
}