class Result {

  constructor(containerElement){
    var table = $('#result table').DataTable();
    this.message = document.querySelector('#result p');
    this.containerElement = containerElement;
  }

  show(){

    this.containerElement.classList.remove('inactive');
  }

  hide(){

    this.containerElement.classList.add('inactive');
    table.clear().draw();
}


}
