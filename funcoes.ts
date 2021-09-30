//-------FUNÇÕES EM JS
//function add(n, o){
//    return a+o
//}

//-------FUNÇÕES EM TS
// função nomedafunção (atributos:seustipos):tipodoquevairetornar
function add(n:number, o:number):number{
    return n+o
}
console.log(add(2,4));

//---------outro tipo de função
let add1 = function(n:number, o:number):number{
    return n+o;
}
console.log(add1(2,3));

//---------arrow function
let add2 = (n:number, o:number):number => {
    return (n+o);
}
console.log(add2(5,6));

//---------função para codigo pequeno
let add3 = (n:number, o:number):number => (n+o);
console.log(add3(2,8))