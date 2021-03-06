
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


/* -----------------  
  INITIALISATION
  ----------------- */

// Get references to DOM elements
const dropdown = document.getElementById('dropdown');
const input = document.getElementById('textInput');
const submitBtn = document.getElementById('submitBtn');
const sortBtn = document.getElementById('sortBtn');
const resultsCount = document.getElementById('resultsTitle');
let ul;

// Initialise state
let filterCategory = 'name';
let sortType = 'ascending';
let results;


/*-----------------  
  DISPLAY DATA
  ----------------- */

const displayResults = (persons) => {
  
    resultsCount.innerHTML = 'Results found: '  + persons.length;
   
    let resultsSection = document.getElementById('resultsSection');

    // Remove <ul> if it already exists
    ul = document.getElementById('resultsList');
    if (ul !== null) resultsSection.removeChild(ul);

    // If we have results create a new <ul>
    // Append it to the 'resultsSection'
    ul = document.createElement('ul');
    ul.id = 'resultsList';
    ul.className = 'results-list';
    resultsSection.append(ul)

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
      li.onclick = function() {
          handleItemSelect(person);
      }
      li.appendChild(p);
      //li.appendChild(span);
      ul.appendChild(li);
    })
}


/*-----------------  
  SEARCH DATA
  ----------------- */
/*
- If category is gender, filter by male or female
- If category is name, look at first_name and last_name properties
- and see if val is contained within either
*/

const search = (catVal, targetVal) => {
    const target = targetVal.toLowerCase();
    const cat = catVal.toLowerCase();
   
   return entireData.filter((person)=>{
     if (cat === 'gender') {
        if (target === 'female' || target === 'male') {
          return  person[cat].toLowerCase() === target ? true : false;
        } else {
        return true;
        }
     } else if (cat === 'email') {
        return  person[cat].includes(target) ? true : false;
     } else if (cat === 'name'){
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
  SORT
  ----------------- */

const toggleSort = () =>{
  sortType = (sortType == 'ascending') ? 'descending' : 'ascending';
  sortBtn.innerHTML = 'Sort ' + sortType;
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



/* -----------------  
  HANDLERS
  ----------------- */

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

const handleSubmit = (e) => {
    results = search(filterCategory, input.value.toLowerCase());
    displayResults(results);
}

const handleSort = () => {
  let sortFunction = (sortType == 'ascending') ? sortAscending : sortDescending;
  results = results.sort(sortFunction);
  displayResults(results);
  toggleSort();
}


const handleItemSelect = (person) => {
  // Clear local storage
  localStorage.removeItem('selected');
  // Store the data
  localStorage.setItem('selected', JSON.stringify(person))
  let popup = window.open("detail.html");
}


// Set event handlers
dropdown.onchange = handleDropdownChange;
input.onkeyup = handleSubmit;
sortBtn.onclick = handleSort;

