// Display persons name as header
const person = JSON.parse(localStorage.selected);
const header = document.getElementById('headerTitle');
header.innerHTML = person.first_name  + ' ' + person.last_name + ', ' + person.gender + ', ' + person.email;


let ul;
const displayResults = (persons) => {

    //resultsCount.innerHTML = 'Results found: '  + persons.length;
   
    // Remove <ul> if it already exists
    ul = document.getElementById('resultsList');
    if (ul !== null) document.body.removeChild(ul);

    // If we have results create a new <ul>
    ul = document.createElement('ul');
    ul.id = 'resultsList';
    document.body.appendChild(ul);

    // Add relevant <li> tags to it
    return persons.map(function(person) { // Map through the results and for each run the code below
      let li = document.createElement('li'); //  Create the elements we need
      let p = document.createElement('p');
      let img = document.createElement('img');
      img.src = person.picture;
      p.innerHTML = `${person.first_name} ` +
                    `${person.last_name}` + ' | ' + 
                    `${person.email} ` 
      li.onclick = function() {
          handleItemSelect(person);
      }
      li.appendChild(p);
      li.appendChild(img)
      //li.appendChild(span);
      ul.appendChild(li);
    })
}

displayResults(person.friends)