class User{
  username: string
  inbox: Inbox
  followers: Map<string, User>
  following: Map<string, User>

  constructor(username: string){
    this.username = username;
    this.inbox = new Inbox;
    this.followers = new Map<string, User>();
    this.following = new Map<string, User>();
  }

  follow(other:User){
    if(other.username != this.username){
      if(!this.following.has(other.username)){
        this.following.set(other.username, other)
        other.followers.set(this.username, this)
      }
      throw new Error ("Você não pode se seguir")
    }
  }

  getInbox(): Inbox{
    return this.inbox
  }

  sendTweet(tweet: Tweet){
    this.inbox.storeInMyTweets(tweet)
    this.inbox.storeInTimeline(tweet)

    for(let follower of this.followers.values()){
      follower.inbox.storeInTimeline(tweet)
    }
  }

  like(tweet_id:number){
    let tweet: Tweet = this.inbox.getTweet(tweet_id)
    tweet.like(this.username)
  }

  unfol(other: string){
    if(this.following.has(other)){
      this.following.get(other)!.followers.delete(this.username)
      this.following.delete(other)

      this.getInbox().removeMsgFrom(other)
    } else {
      throw new Error ("Usuário não encontrado na lista de seguidores")
    }
  }

  unfollowAll(){
    for(let user of this.following.values()){
      user.followers.delete(this.username)
      this.following.delete(user.username)
    }
  }

  rejectAll(){
    for(let user of this.followers.values()){
      user.following.delete(this.username)
      this.followers.delete(user.username)
    }
  }

  toString(): string{
    return `Usuário: ${this.username} | Seguidores: [${[...this.followers.keys()].join(", ")}] | Seguindo: [${[...this.following.keys()].join(", ")}]`
  }
}

class Controller{
  users: Map<string, User>
  nextTweetId: number;
  tweets: Map<number, Tweet>

  constructor(){
    this.nextTweetId = 0;
    this.users = new Map<string, User>()
    this.tweets = new Map<number, Tweet>()
  }

  addUser(username: string){
    username = username.toLowerCase()

    if(!this.users.has(username.toLowerCase())){
      this.users.set(username, new User(username))
    } else {
      throw new Error ("Já existe um usuário com esse nome, experimente adicionar um número");
    }
  }

  getUser(username: string): User{
    if(this.users.has(username)){
      return this.users.get(username)!
    }else{
      throw new Error("Usuário não encontrado")
    }
  }

  createTweet(sender:string, mensage: string): Tweet{
    let tweet: Tweet = new Tweet(this.nextTweetId, sender, mensage)

    this.tweets.set(this.nextTweetId, tweet)
    this.nextTweetId++

    return tweet
  }

  sendTweet(sender: string, mensage: string){
    let user: User = this.getUser(sender)!
    let tweet: Tweet = this.createTweet(user.username, mensage)

    user.sendTweet(tweet)
  }

  sendRt(username: string, twId: number, rtMensage: string){
    let user: User = this.getUser(username)!
    let tweet: Tweet = user.getInbox().getTweet(twId)!
    let retweet: Tweet = this.createTweet(user.username, rtMensage)

    retweet.setRt(tweet)
    user.sendTweet(retweet)
  }

  removeUser(username: string){
    let user: User = this.getUser(username)!

    user.unfollowAll()
    user.rejectAll()

    for(let tweet of user.getInbox().getMyTweet()){
      tweet.setDeleted()
    }

    this.users.delete(username)
  }

  toString(): string{
    return `${[...this.users.values()].join('\n \n')}`
  }
}

class Inbox{
  timeline: Map<number, Tweet>
  mytweets: Map<number, Tweet>

  constructor(){
    this.timeline = new Map<number, Tweet>()
    this.mytweets = new Map<number, Tweet>()
  }

  storeInTimeline(tweet: Tweet){
    this.timeline.set(tweet.getId(), tweet)
  }

  getTimeline(): Tweet[]{
    let tweets: Tweet[] = [...this.timeline.values()]
    tweets = tweets.filter(a => !a.isDeleted())
    tweets = tweets.sort((a,b) => b.getId() - a.getId())
    return tweets
  }

  getTweet(id: number): Tweet{
    if(this.timeline.has(id)){
      return this.timeline.get(id)!
    } else {
      throw new Error("Tweet não encontrado")
      }  
  }

  removeMsgFrom(username: string){
    for(let tweet of this.timeline.values()){
      if(tweet.getUsername() == username){
        this.timeline.delete(tweet.getId())
      }
    }
  }

  getMyTweet(): Tweet[]{
    return [...this.mytweets.values()]
  }

  storeInMyTweets(tweet: Tweet){
    this.mytweets.set(tweet.getId(), tweet)
  }

  toString(): string{
    return `Timeline\n ${this.getTimeline().join('\n')}`
  }
}

class Tweet{
  id: number
  username: string
  mensage: string
  deleted: boolean
  likes: string[]
  rt: Tweet | null

  constructor(id: number, username: string, mensage: string){
    this.id = id
    this.username = username
    this.mensage = mensage
    this.likes = []
    this.rt = null
    this.deleted = false
  }

  getId(): number{
    return this.id
  }

  getUsername(){
    return this.username
  }

  getMensage(){
    return this.mensage
  }

  getLikes(): string[]{
    return this.likes
  }

  like(username: string){
    this.likes.push(username)
  }

  setRt(tweet: Tweet){
    this.rt = tweet
  }

  setDeleted(){
    this.deleted = true
    this.mensage = "Esse tweet foi deletado."
    this.username = ""
    this.likes = []
  }

  isDeleted(): boolean{
    if(this.deleted)
      return true
    return false
  }

  toString(): string{
    let tweet: string = `${this.id}:${this.username} -> (${this.mensage}) [${this.getLikes().join(", ")}]`

    if(this.rt != null){
      tweet += `\n  ${this.rt}`
    }
      return tweet
  }
}

let controller = new Controller();

controller.addUser("Rubens");
controller.addUser("Tania");
controller.addUser("Lara");

let userTania = controller.getUser("tania")!
let userRubens = controller.getUser("rubens")!
let userLara = controller.getUser("lara")!

userRubens.follow(userTania);
userRubens.follow(userLara);
userTania.follow(userLara);
userLara.follow(userTania);

controller.sendTweet("rubens", "Oi meninas");
controller.sendTweet("tania", "Oi Rubens, oi Lara");
controller.sendTweet("lara", "Oi gente, como vocês estão no fim de semestre?");
controller.sendTweet("tania", "Eu tô ótima, já acabei minhas matérias");
controller.sendTweet("rubens", "Eu ainda tô terminando mas tá quase");

userTania.like(2)
userLara.like(1)
userRubens.like(2)

userRubens.unfol("lara");

controller.sendRt("lara", 3, "Ah que coisa boa, também acabei");

controller.sendTweet("tania", "Gente minha conta se perdeu, vou ter que sair");

console.log(controller.toString());

controller.removeUser("tania");

console.log(controller.toString());
