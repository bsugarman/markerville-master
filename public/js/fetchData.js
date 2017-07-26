
//make sure is called
async function onSearchData(event) {
  event.preventDefault();
  table.style = "display: block";
  const input = document.querySelector('#word-input');
  const word = input.value.trim();
  const results = document.querySelector('#database');
  const result = await fetch('/lookup/' + word);
  const json = await result.json();
  const resultWord = json.word;
  const associated = json.associated;

  if(associated.length != 0 && word.length!=0){

  for (let obj in associated){
    var newRow   = table.insertRow(0);
    
    var newCellOne  = newRow.insertCell(0);
    newCellOne.innerHTML = associated[obj].markerName;
    newRow.appendChild(newCellOne);

    var newCellTwo  = newRow.insertCell(1);
    newCellTwo.innerHTML = associated[obj].biomarkerType;
    newRow.appendChild(newCellTwo);


    var newCellThree  = newRow.insertCell(2);
    newCellThree.innerHTML = associated[obj].diseaseType;
    newRow.appendChild(newCellThree);

    
    var newCellFour  = newRow.insertCell(3);
    newCellFour.innerHTML = associated[obj].associatedDrug;
    newRow.appendChild(newCellFour);


    var newCellFive  = newRow.insertCell(4);
    newCellFive.innerHTML = associated[obj].medium;
    newRow.appendChild(newCellFive);


    table.insertRow(tableFull.rows.length);
   
    }

}
}
const tableFull = document.querySelector('#result table');
const table = tableFull.getElementsByTagName('tbody')[0];
const searchForm = document.querySelector('#searchForm');
searchForm.addEventListener('submit', onSearchData);
