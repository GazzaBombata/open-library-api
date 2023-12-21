
const button = document.querySelector('.btn-primary');

function deleteOldSearch() {
    const oldSearches = document.querySelectorAll('.book-item')
    oldSearches.forEach(searchResult => {
        searchResult.remove()
    })
}

function appendBookDescription(bookKey, newDiv) {
    console.log('fetching:' + 'https://openlibrary.org' + bookKey + '.json')
    const divToBeChecked = document.getElementById(bookKey)
    if (newDiv.querySelector('.description') != undefined) {
        newDiv.querySelector('.custom-button').innerHTML= 'Expand'
        newDiv.querySelector('.description').remove();
        return
    }
    newDiv.querySelector('.custom-button').innerHTML= 'Loading'
    fetch('https://openlibrary.org' + bookKey + '.json')
        .then(response => response.json())
        .then(data => { 
            const newP = document.createElement('p');
            newP.classList.add('description')
            if (data.description) {
                
                newP.innerHTML = (typeof data.description === 'object') ? data.description.value : data.description;
            } else {
                
                newP.innerHTML = 'No description provided in OpenLibrary.';
            }
            newDiv.appendChild(newP);
            newDiv.querySelector('.custom-button').innerHTML= 'Reduce'
        });
}


button.addEventListener('click', (event) => {
    event.preventDefault();
    deleteOldSearch();
    console.log('search begun')
    const searchCategory = document.querySelector('.search-input').value;
    console.log('https://openlibrary.org/subjects/' + searchCategory + '.json')
    
    fetch('https://openlibrary.org/subjects/' + searchCategory + '.json')
        .then(response => response.json())
        .then(data => {
            data.works.forEach(book => {
                const newDiv = document.createElement ('div')
                const newH = document.createElement('h3');
                const newButton = document.createElement('button')
                newButton.innerHTML = 'Expand'
                newButton.classList.add('custom-button')
                newH.innerHTML = book.title;
                newDiv.classList.add('book-item')
                newDiv.id = book.key
                newButton.addEventListener('click', () => {
                    appendBookDescription(book.key,newDiv)
                });
                document.getElementById('items-container').appendChild(newDiv);
                const newAuthorP = document.createElement('p');
                newDiv.appendChild(newH)
                if (book.authors) {
                    const authorNames = book.authors.map(author => author.name);
                    const newAuthorP = document.createElement('p');
                    newAuthorP.innerText = authorNames.join(', ');
                    newDiv.appendChild(newAuthorP);
                }
                newDiv.appendChild(newButton)
            });
            console.log('search over');
        });

    
});
