//----LISTA NO JS
//let l = [1, 2, 3];
//console.log (l);

//-----LISTA NO TS
//let nomedalista:tipo[] = [elementos]
let lista1:number[] = [2, 3, 5];
console.log(lista1);

let nomes:string[] = ['Nataly', 'João', 'Júnior']
console.log(nomes);

 let nomes1:string[] = ['eu, tu, nós']
 console.log(nomes1);

 //INTERAÇÃO NO JS
 console.log(lista1.length)
 for(let i=0; i<lista1.length; i++){
     console.log(i, lista1[i])
 }

 //variações do for
 // FOR..IN MOSTRA OS ÍNDICES DA LISTA
 for(let i in lista1){
     console.log(i)
 }

 //FOR..OF MOSTRA APENAS OS VALORES DA LISTA
 for(let e of lista1){
     console.log(e);
 }

//AGORA NO TS
//por enquanto, não é possivel tipar o for..in nem for..of
 console.log(lista1.length)
 for(let i:number = 0; i<lista1.length; i++){
     console.log(i, lista1[i])
 }


//OPERAÇÕES SOBRE LISTA
let L1:number[] = [24, 42, 26, 29];

//adicionar elemento --> .push(número que quer adicionar)
L1.push(62);
console.log(L1);

//retirar elemento --> .splice(apartir desse, total de número que vai ser deletado)
L1.splice(2, 1);
console.log(L1);
