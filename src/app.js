
const button = document.querySelector('.btn-primary');

function deleteOldSearch() {
    const oldSearches = document.querySelectorAll('.book-item')
    oldSearches.forEach(searchResult => {
        searchResult.remove()
    })
}

function appendBookDescription(bookKey, newDiv) {
    console.log('fetching:' + 'https://openlibrary.org' + bookKey + '.json')
    fetch('https://openlibrary.org' + bookKey + '.json')
        .then(response => response.json())
        .then(data => { 
            const newP = document.createElement('p');
            newP.innerHTML = data.description;
            newDiv.appendChild(newP);
        });
}


button.addEventListener('click', (event) => {
    event.preventDefault();
    deleteOldSearch();
    console.log('search begun')
    const searchCategory = document.querySelector('.search-input').value;
    
    fetch('https://openlibrary.org/subjects/' + searchCategory + '.json')
        .then(response => response.json())
        .then(data => {
            data.works.forEach(book => {
                const newDiv = document.createElement ('div')
                const newH = document.createElement('h3');
                newH.innerHTML = book.title;
                newDiv.classList.add('book-item')
                newDiv.id = book.key
                newDiv.addEventListener('click', () => {
                    appendBookDescription(book.key,newDiv)
                });
                document.body.appendChild(newDiv);
                const newAuthorP = document.createElement('p');
                newDiv.appendChild(newH)
                if (book.authors) {
                    const authorNames = book.authors.map(author => author.name);
                    const newAuthorP = document.createElement('p');
                    newAuthorP.innerText = authorNames.join(', ');
                    newDiv.appendChild(newAuthorP);
                }
            });
            console.log('search over');
        });

    
});
