class App {
  constructor() {
   

    const database = document.querySelector('#database');
    this.database = new Database(database);


    const result = document.querySelector('#result');
    this.result = new Result(result);





    this.showDatabase = this.showDatabase.bind(this);
    this.showResult = this.showResult.bind(this);

    this.databaseButton = document.querySelector('#databaseButton');
    this.submitButton = document.querySelector("#searchForm");

    this.databaseButton.addEventListener('click', this.showDatabase);
    this.submitButton.addEventListener('submit', this.showResult);



  }


  showDatabase(){
    this.database.show();
    this.result.hide();

  }


  showResult(){
    this.database.hide();
    this.result.show();

  }





}