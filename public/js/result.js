class Result {

  constructor(containerElement){
    this.prevTable = document.querySelector("#result table tbody");
    this.message = document.querySelector('#result p');
    this.prevTableRows = this.prevTable.getElementsByTagName('tr');
    this.containerElement = containerElement;
  }

  show(){

    this.containerElement.classList.remove('inactive');
  }

  hide(){

    this.containerElement.classList.add('inactive');
    this.prevtable.innerHTML = "";
}


}
