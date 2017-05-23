/*
Tidy vanilla js code
Style details page
Pass data into details page
Convert to React?
*/


/* -----------------
  Read in data file
  ----------------- */
let entireData;

fetch('data.json')
  .then(data => data.json())
  .then(data => {
    entireData = data;
    displayResults(entireData);
  })
  .catch(err => console.log(err));

const categories = ['name', 'gender', 'email'];


/* -----------------
  Interface Elements
  ----------------- */
const input = document.getElementById('search-input');
const submitBtn = document.getElementById('submit-btn');
const dropdown = document.getElementById('dropdown');
const resultsCount = document.getElementById('results-count');
const sortBtn = document.getElementById('sort-btn')



/* -----------------
  - Display a list of people from the data file showing:
  ----------------- 
  - first name
  - last name
  - email
  - gender


  Create a table
  */
//const ul = document.getElementById('persons');

let ul;
const displayResults = (persons) => {
   
    // Remove <ul> if it already exists
    ul = document.getElementById('personsList');
    if (ul !== null){
      document.body.removeChild(ul);
    }

    resultsCount.innerHTML = 'Results found: '  + persons.length;

    // If we have results
    // Create a new <ul>
    ul = document.createElement('ul');
    ul.id = 'personsList';
    document.body.appendChild(ul);

    // Add relevant <li> tags to it
    return persons.map(function(person) { // Map through the results and for each run the code below
      let li = document.createElement('li'); //  Create the elements we need
      let p = document.createElement('p');
      p.innerHTML = `${person.first_name} ` +
                    `${person.last_name}` + ' | ' + 
                    `${person.email} ` + ' | ' + 
                    `${person.gender} `
      let span = document.createElement('span');
      //img.src = author.picture.medium;  // Add the source of the image to be the src of the img element
      span.innerHTML = `${person.first_name}  
                        ${person.last_name} 
                        ${person.email} 
                        ${person.gender}`; // Make the HTML of our span to be the first and last name of our author
     // append(li, img); // Append all our elements
      li.onclick = handleItemSelect;
      li.appendChild(p);
      //li.appendChild(span);
      ul.appendChild(li);
    })
}


const handleItemSelect = () => {
  console.log('item select')
  //"location.href='details.html';
 // window.open("detail.html");
}
/* -----------------
  Create a Details page, 
  accessed by clicking on a table link
  ----------------- */



/* -----------------  
  SEARCH
  ----------------- */
const search = (catVal, targetVal) => {
    const target = targetVal.toLowerCase();
    const cat = catVal.toLowerCase();
    // If category is gender filter by male or female
    // If category is name, look at first_name and last_name
    // and see if val is contained within either
   return entireData.filter((person)=>{
     if (cat === 'gender') {
      return  person[cat].toLowerCase() === target ? true : false;
     }
     if (cat === 'email') {
      return  person[cat].includes(target) ? true : false;
     }
     if (cat === 'name'){
        const isInName = (target) => {
          const cond1 = person['first_name'].toLowerCase().includes(target);
          const cond2 = person['last_name'].toLowerCase().includes(target);
          return (cond1 || cond2) ? true : false;
        }
        return isInName(target);
     }
  })
}


/* -----------------  
  HANDLE INPUT CHANGE
  ----------------- */
const handleInputChange = () => {
  let doSubmit = false;
  if (filterCategory === 'name' || filterCategory === 'email') {
    doSubmit = true;
  } else if (input.value === 'male' || input.value === 'female') {
    doSubmit = true;
  }
  if (doSubmit) handleSubmit();
}

/* -----------------  
  SORT
  ----------------- */
let sortType;


const initSort = ()=>{
   sortType = 'ascending';
   sortBtn.value = 'Sort: ' + sortType;
}

const toggleSort = ()=>{
  sortType = (sortType == 'ascending') ? 'descending' : 'ascending';
  sortBtn.value = 'Sort: ' + sortType;
}


const handleSort = () => {
  let sortFunction = (sortType == 'ascending') ? sortAscending : sortDescending;
  const results = entireData.sort(sortFunction);
  displayResults(results);
  toggleSort();
}


const sortAscending = (a, b) => {
  const compareKey = 'last_name';
  const valA = a[compareKey].toUpperCase();
  const valB = b[compareKey].toUpperCase();
  let comparison = 0;
  if (valA > valB) {
    comparison = 1;
  } else if (valA < valB) {
    comparison = -1;
  }
  return comparison;
}


const sortDescending = (a, b) => {
  const compareKey = 'last_name';
  const valA = a[compareKey].toUpperCase();
  const valB = b[compareKey].toUpperCase();
  let comparison = 0;
  if (valA < valB) {
    comparison = 1;
  } else if (valA > valB) {
    comparison = -1;
  }
  return comparison;
}

initSort();




const handleSubmit = () =>{
    const results = search(filterCategory, input.value.toLowerCase());
    displayResults(results);
}

const handleDropdownChange = (e) => {
  // Store the category that has been selected
  filterCategory =  e.target.value;
  // Change prompt text
  let promptStr = ''
  if (filterCategory === 'name')  promptStr = 'Enter a name';
  if (filterCategory === 'email') promptStr = 'Enter an email address';
  if (filterCategory === 'gender') promptStr = "Enter male' or 'female'";
  input.placeholder = promptStr;
  handleSubmit();
}

/* -----------------  
Select state from dropdown
  ----------------- */
let filterCategory = 'name';

input.onkeyup = handleInputChange;
dropdown.onchange = handleDropdownChange;
submitBtn.onclick = handleSubmit;
sortBtn.onclick = handleSort;
