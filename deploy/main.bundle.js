/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ (() => {

eval("\nconst button = document.querySelector('.btn-primary');\n\nfunction deleteOldSearch() {\n    const oldSearches = document.querySelectorAll('.book-item')\n    oldSearches.forEach(searchResult => {\n        searchResult.remove()\n    })\n}\n\nfunction appendBookDescription(bookKey, newDiv) {\n    console.log('fetching:' + 'https://openlibrary.org' + bookKey + '.json')\n    fetch('https://openlibrary.org' + bookKey + '.json')\n        .then(response => response.json())\n        .then(data => { \n            const newP = document.createElement('p');\n            newP.innerHTML = data.description;\n            newDiv.appendChild(newP);\n        });\n}\n\n\nbutton.addEventListener('click', (event) => {\n    event.preventDefault();\n    deleteOldSearch();\n    console.log('search begun')\n    const searchCategory = document.querySelector('.search-input').value;\n    \n    fetch('https://openlibrary.org/subjects/' + searchCategory + '.json')\n        .then(response => response.json())\n        .then(data => {\n            data.works.forEach(book => {\n                const newDiv = document.createElement ('div')\n                const newH = document.createElement('h3');\n                newH.innerHTML = book.title;\n                newDiv.classList.add('book-item')\n                newDiv.id = book.key\n                newDiv.addEventListener('click', () => {\n                    appendBookDescription(book.key,newDiv)\n                });\n                document.body.appendChild(newDiv);\n                const newAuthorP = document.createElement('p');\n                newDiv.appendChild(newH)\n                if (book.authors) {\n                    const authorNames = book.authors.map(author => author.name);\n                    const newAuthorP = document.createElement('p');\n                    newAuthorP.innerText = authorNames.join(', ');\n                    newDiv.appendChild(newAuthorP);\n                }\n            });\n            console.log('search over');\n        });\n\n    \n});\n\n\n//# sourceURL=webpack://npm-package/./src/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/app.js"]();
/******/ 	
/******/ })()
;