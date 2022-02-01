class Pessoa {
    nome: string;
    idade: number;

    constructor(nome: string, idade: number){
        this.nome = nome;
        this.idade = idade;
    }

     toString(): string{
            return `Pessoa ${this.nome}: ${this.idade}:`;
        }
}

class Motoca {
    potencia: number;
    pessoa: Pessoa | null;
    tempo: number;

    constructor(potencia: number){
        this.potencia = potencia;
        this.pessoa = null;
        this.tempo = 0; 
    }

    in (pessoa: Pessoa): boolean{
        if(this.pessoa != null){
        console.log("A motoca tá ocupada.");
        return false;
        }
        this.pessoa = pessoa;
        console.log(`O nome da crianca eh ${this.pessoa.nome} com a idade de ${this.pessoa.idade} anos`);
        return true;
    }

    out (): Pessoa | void{
      let pessoavaziaetriste: Pessoa = new Pessoa("", 0);
        if(this.pessoa != null){
            let sair = this.pessoa;
            this.pessoa = null;

            console.log("Quem estava ocupando já saiu.");
            return sair;
        } else {
            console.log("A moto tá vazia ein");
          return pessoavaziaetriste;
        }
    }

    comprar (tempo: number): void{
        this.tempo += tempo
    }

    dirigir(tempo: number): void{
        if(this.pessoa != null){
            if(this.pessoa.idade <= 10){
                if(this.tempo > 0){
                    if(tempo <= this.tempo){
                        this.tempo -= tempo
                    } else {
                        console.log (`A criança andou ${tempo - this.tempo} minutos e acabou o tempo.`)
                        this.tempo = 0
                    }
                } else {
                    console.log("Acabou o tempo.")
                }
            } else {
                console.log("Essa criança não tem idade pra brincar.")
            }
        } else {
            console.log ("Motoca tá vazia criançada.")
        }
    }

    buzinar(): void{
        if(this.pessoa != null){
            let pem = "P";
            for(let i = 0; i<this.potencia; i++){
                pem += "E"
            }
            console.log(pem + "M")
        } else {
            console.log("Não tem ninguem pra buzinar.")
        }
    }

    toString(): string {
        return `A criança que está na motoca se chama: ${this.pessoa}; A potência é: ${this.potencia}; E o tempo é: ${this.tempo}` 
    }
}


let moto = new Motoca(1);
console.log(moto);
    //Motoca: { "potencia": 1, "pessoa": null, "tempo": 0} 

moto.buzinar();
    // "Não tem ninguem pra buzinar." 

moto.in(new Pessoa ("Marcos", 4));
console.log(moto);
    //Motoca: {"potencia": 1, "pessoa": { "nome": "Marcos", "idade": 4},  "tempo": 0} 

moto.buzinar();
    //"PEM" 

moto.in(new Pessoa("Marisa", 2));
    //"A motoca tá ocupada." 

console.log(moto);
    //Motoca: {"potencia": 1, "pessoa": { "nome": "Marcos",  "idade": 4 }, "tempo": 0} 

    
console.log("-------");
moto = new Motoca(5);
console.log(moto);
    //Motoca: {"potencia": 5, "pessoa": null, "tempo": 0} 

moto.in(new Pessoa ("Marcos", 4));
console.log(moto);
    //Motoca: {"potencia": 5,"pessoa": {  "nome": "Marcos",  "idade": 4},"tempo": 0}

 moto.buzinar();
    //"PEEEEEM" 

console.log("-------");
moto = new Motoca(7);
moto.in(new Pessoa("Heitor", 6));
console.log(moto);
    //Motoca: { "potencia": 7,"pessoa": {  "nome": "Heitor",  "idade": 6}, "tempo": 0}

moto.out();
console.log() ;
    //Pessoa: { "nome": "Heitor", "idade": 6}

moto.out(); 
    //"A moto tá vazia ein" 

moto.in(new Pessoa("Suzana", 8));
console.log(moto)
    //Motoca: {"potencia": 7, "pessoa": { "nome": "Suzana", "idade": 8 },"tempo": 0}

console.log("-------"); 
moto = new Motoca(7);
moto.in(new Pessoa("Suzana", 8));
moto.dirigir(10);
    // "Essa criança não tem idade pra brincar." 

moto.comprar(40);
console.log(moto);
    //Motoca: { "potencia": 7, "pessoa": {   "nome": "Suzana", "idade": 8 }, "tempo": 40}
 
moto.dirigir(20);
console.log(moto);
    //Motoca: { "potencia": 7,"pessoa": {  "nome": "Suzana",   "idade": 8 }, "tempo": 20}

console.log("-------"); 
moto = new Motoca(7);
moto.comprar(20);
moto.in(new Pessoa("Andreia", 23));
moto.dirigir(15);
    // "O nome da crianca eh Andreia com a idade de 23 anos"
    //"Essa criança não tem idade pra brincar." 

console.log(moto);
    //Motoca: {"potencia": 7,  "pessoa": { "nome": "Andreia", "idade": 23 }, "tempo": 20}

console.log("-------"); 
moto = new Motoca(7);
moto.comprar(20);
moto.in(new Pessoa("Andreia", 6));
moto.dirigir(15);
console.log(moto);
    //Motoca: {"potencia": 7,"pessoa": {"nome": "Andreia", "idade": 6 }, "tempo": 5}

moto.dirigir(10);
    //"A criança andou 5 minutos e acabou o tempo." 




 
