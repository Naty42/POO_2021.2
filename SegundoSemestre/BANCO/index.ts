class Client{
  private accounts: Account[]
  private idClient: string

  contructor(idClient: string){
    this.accounts = []
    this.idClient = idClient
  }

  addAccount(account: Account){
    this.accounts.push(account)
  }

  getAccounts(): number[]{
    let idsAccount: number[] = []

    for(let idAccount of this.accounts){
      idsAccount.push(idAccount.getId())
    }

    return idsAccount;
  }

  getIdClient(){
    return this.idClient;
  }

  setAccounts(accounts: Account[]){
    this.accounts = accounts
  }

  setIdClient(idClient: string){
    this.idClient = idClient;
  }

 toString(){
   return `${this.idClient} [${this.getAccounts()}]`;
 }
}

abstract class Account{
  protected id: number
  protected balance: number = 0;
  protected clientID: string
  protected type: string

  contructor(id: number, clientID: string, type: string){
    this.id = id;
    this.clientID = clientID;
    this.type = type;
    this.balance;
  }

  deposit(value: number){
    this.balance += value
  }

  transfer(other: Account, value: number){
    this.balance -= value
    other.balance += value
  }

  withDraw(value: number){
    this.balance -= value
  }

  getId(){
    return this.id;
  }

  getBalance(){
    return this.balance
  }

  getClientID(){
    return this.clientID
  }

  getType(){
    return this.type
  }

  abstract monthlyUpdate(): any

  toString(){
    return `${this.id}: ${this.clientID}: ${this.balance}: ${this.type}`;
  }
}

class SavingAccount extends Account{
  constructor(id: number, clientID: string){
    super(id, clientID, "Conta Poupança");
  }

  monthlyUpdate(){
    this.balance += this.balance/100
  }
}

class CheckingAccount extends Account{
  constructor(id: number, clientID: string){
       super(id, clientID, "Conta Corrente");
  }

  monthlyUpdate(){
    this.balance -= 20
  }
}

class BankAgency{
  private accounts: Map<number, Account>
  private client: Map<string, Client>
  private nextIdAccount: number

  contructor(){
    this.accounts = new Map<number, Account>()
    this.client = new Map<string, Client>()
    this.nextIdAccount = 0
  }

  addClient(idClient: string){
    if(!this.client.has(idClient)){
      this.client.set(idClient, new Client(idClient));
    }

    let clients = this.client.get(idClient)

    if(client != undefined){
      let cc: Account = new CheckingAccount(this.nextIdAccount, idClient)
    this.nextIdAccount++
      let cp: Account = new SavingAccount(this.nextIdAccount, idClient)
    this.nextIdAccount++

      client.addAccount(cc)
      client.addAccount(cp)

      this.client.set(idClient, client)
      this.accounts.set(cc.getId(), cc)
      this.accounts.set(cp.getId(), cp)
    }
  }

  deposit(accountId: number, value: number){
    let account: Account = this.getAccount(accountId)!
    account.deposit(value)
  }

  monthlyUpdate(){
    for(let account of this.accounts.values()){
      account.monthlyUpdate()
    }
  }

  transfer(donor_account: number, receiver_account: number, value: number){
    let donor: Account = this.getAccount(donor_account)!
    let receiver: Account = this.getAccount(receiver_account)!

    if(this.hasMoney(donor, value))
      donor.transfer(receiver, value)
  }

  withDraw(accountId: number, value: number){
    let account: Account = this.getAccount(accountId)!

    if(this.hasMoney(account, value))
      account.withDraw(value)
  }

  private getAccount(accountId: number): Account{
   if(this.accounts.has(accountId))
      return this.accounts.get(accountId)!
    throw new Error("A Conta não foi encontrada.")
  }

  hasMoney(account: Account, value: number): boolean{
    if(account.getBalance() >= value)
      return true
    throw new Error("Você não possui saldo suficiente.")
  }

  toString(){
    return `Clientes: ${[...this.client.values()].join('\n  ')}\n\nContas:\n  ${[...this.accounts.values()].join('\n  ')} \n`
  }
}

let inter: BankAgency = new BankAgency()

inter.addClient("Victor");
inter.addClient("Maria");

console.log(inter.toString());

inter.deposit(0, 200)
inter.deposit(1, 400)
inter.deposit(2, 100)
inter.deposit(3, 300)

console.log(inter.toString())

inter.withDraw(3, 100)
inter.withDraw(1, 50)

console.log(inter.toString())

inter.transfer(1, 3, 100)
inter.transfer(0, 2, 50)

console.log(inter.toString())

inter.monthlyUpdate()

console.log(inter.toString()) 

