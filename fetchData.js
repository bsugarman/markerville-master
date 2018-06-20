//make sure is called
async function onSearchData(event) {
 
  event.preventDefault();

  const input = document.querySelector('#word-input');
  const word = input.value.trim();
  const results = document.querySelector('#database');
  //const result = await fetch('/lookup/' + pageSize);
  const result = await fetch('/lookup/' + word);
  const json = await result.json();
  const resultWord = json.word;
  const associated = json.associated;
    console.log("here");

   console.log(associated);
     console.log("here");


  var count = 0;
  if(associated.length != 0 && word.length!=0){

  for (let obj in associated){
    count++;
    var rowToAdd = ["","","","",""];
 
    rowToAdd[0] = associated[obj].first;

    rowToAdd[1] = associated[obj].second;

    
    rowToAdd[2] = associated[obj].third;

    rowToAdd[3] = associated[obj].fourth;

    rowToAdd[4] = associated[obj].fifth;
   
    rowToAdd[5] = associated[obj].sixth;
   
    rowToAdd[6] = associated[obj].kind;



    table.row.add(rowToAdd).draw();
    }
    console.log(count);

}
} 
var table = $('#testid').DataTable();
const searchForm = document.querySelector('#searchForm');
searchForm.addEventListener('submit', onSearchData);