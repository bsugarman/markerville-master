class Database {
  constructor(containerElement){
    this.containerElement = containerElement;
    this.prevTable = document.querySelector("#result table tbody");
    this.message = document.querySelector('#result p');
    this.prevTableRows = this.prevTable.getElementsByTagName('tr');
    this.clearDatabase = this.clearDatabase.bind(this);
  }

  show(){
    this.containerElement.classList.remove('inactive');
    this.clearDatabase();

  }

  hide(){
    this.containerElement.classList.add('inactive');
    this.clearDatabase();
  }

  clearDatabase(){
    this.prevTable.innerHTML = "";
  }

}
