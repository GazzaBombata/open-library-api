
const main = document.querySelector('.root');

function createAndAppendElement(elementType, parentElement, classList) {
    if (elementType) {
        const element = document.createElement(elementType);
        if (parentElement) {
            parentElement.appendChild(element);
        }
        else {
            parentElement.appendChild(main);
        }
        if (classList) {
            classList.forEach(classItem => element.classList.add(classItem));
        }
        return element;
    }
    return null
}

const heroContainer = createAndAppendElement ('div', main, ["hero", "py-3", "mb-3"]);
const quoteContainer = createAndAppendElement ('div', heroContainer, ["container", "d-flex", "flex-column", "justify-content-center", "py-3"]);
const quoteHeading = createAndAppendElement ('h2', quoteContainer, ["quote"]);
quoteHeading.innerText = '“I declare after all there is no enjoyment like reading! How much sooner one tires of any thing than of a book! — When I have a house of my own, I shall be miserable if I have not an excellent library.”'
const quoteAuthor = createAndAppendElement ('br', quoteContainer);
quoteAuthor.innerText = '― Jane Austen'

const formContainer = createAndAppendElement ('div', main, ["container", "d-flex", "flex-column", "justify-content-center"]);
const mainHeading = createAndAppendElement ('h1', formContainer, ["mb-3"]);
mainHeading.innerText = 'What are you going to read today?'
const paragraph = createAndAppendElement ('p', formContainer);
paragraph.innerText = 'Input a reading category in the field below and we will suggest you all the best books for your chosen category!'
const form = createAndAppendElement ('form', formContainer, ["container", "d-flex", "justify-content-center"]);
const input = createAndAppendElement ('input', form, ["form-custom", "py-1", "px-3", "me-2", "text", "search-input"]);
input.name = 'search_input';
input.placeholder = 'Category Search';
input.required = true;
input.type = 'text';
const button = createAndAppendElement ('button', form, ["btn", "btn-primary", "visually-hidden"]);
button.type = 'submit';
button.innerText = 'Send';

const resultsContainer = createAndAppendElement ('div', main, ["container", "py-5"]);
resultsContainer.id = 'items-container'


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
    let searchCategory = document.querySelector('.search-input').value;
    searchCategory = searchCategory.toLowerCase()
    console.log(searchCategory)
    if (searchCategory === "") {
        const newDiv = document.createElement ('div')
        const newH = document.createElement('h3');
        newH.innerHTML = 'Please search a a category and press Enter';
        newDiv.classList.add('book-item')
        resultsContainer.appendChild(newDiv);
        newDiv.appendChild(newH)
        return
    }

    const loadingDiv = document.createElement('div');
    loadingDiv.innerHTML = 'Loading...';
    loadingDiv.classList.add('loading-message');
    resultsContainer.appendChild(loadingDiv);

    
    fetchURL = `https://openlibrary.org/subjects/${searchCategory}.json`
    console.log(fetchURL)

    fetch(fetchURL)
        .then(response => response.json())
        .then(data => {
            loadingDiv.remove();
            if (data.works[1] == undefined) {
                const newDiv = document.createElement ('div')
                const newH = document.createElement('h3');
                newH.innerHTML = 'No results for the inserted category!';
                newDiv.classList.add('book-item')
                resultsContainer.appendChild(newDiv);
                newDiv.appendChild(newH)
                return
            }
            data.works.forEach(book => {
                const newDiv = document.createElement ('div')
                const newH = document.createElement('h3');
                const newButton = document.createElement('button')
                newButton.innerHTML = 'Expand'
                newButton.classList.add('custom-button')
                newH.innerHTML = book.title;
                newDiv.classList.add('book-item');
                newDiv.id = book.key;
                newButton.addEventListener('click', () => {
                    appendBookDescription(book.key,newDiv)
                });
                resultsContainer.appendChild(newDiv);
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
        })
        .catch(error => {
            loadingDiv.remove();
            const newDiv = document.createElement('div');
            const newH = document.createElement('h3');
            newH.innerHTML = `Error: ${error.message}`;
            newDiv.classList.add('book-item');
            resultsContainer.appendChild(newDiv);
            newDiv.appendChild(newH);
        });
            console.log('search over');
        });

    
