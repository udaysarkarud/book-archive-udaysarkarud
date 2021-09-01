const searchInput = document.getElementById('searchInput');
const bookSearchArea = document.getElementById('bookSearchArea');
const totalBooksFound = document.getElementById('totalBooksFound')
const erroTypeAName = document.getElementById('erroTypeAName')
const erroNoResults = document.getElementById('erroNoResults')

document.getElementById('searchBtn').addEventListener('click', () => {
    if (searchInput.value !== '') {
        getData(searchInput.value);
        searchInput.value = '';

        //Error Handel Section
        errorHandel('hide', 'hide', 'hide', 'hide')
    }
    else {
        //Error Handel Section       
        errorHandel('show', 'hide', 'hide', 'hide')
    }
})

const connectApi = async (query) => {
    const res = await fetch(`http://openlibrary.org/search.json?q=${query}`)
    const data = await res.json();
    return data
}

const getData = searchText => {
    connectApi(searchText).then(data => {
        if (data.numFound !== 0) {
            bookSearchArea.textContent = ''
            totalBooksFound.innerHTML = ''
            data.docs.forEach(element => {
                const singleBook = document.createElement('div')
                singleBook.classList.add('col')
                singleBook.innerHTML = `
                    <div class="card">
                        <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                             <h5 class="card-title">${element.title}</h5>
                            <h6 class="text-muted">by ${element.author_name ? element.author_name : 'Unknow Author'}</h6>
                            <p class="card-text"><strong>Publisher:</strong> ${element.publisher ? element.publisher[0] : 'Unknow Publisher'}  | <strong>First published in:</strong> ${element.first_publish_year ? element.first_publish_year : 'Not Found'}
                            </p>
                        </div>
                    </div>                        
                `
                bookSearchArea.appendChild(singleBook)
                //Error Handel Section               
                errorHandel('hide', 'hide', 'show', 'show')
            });
            totalBooksFound.innerHTML = `
                <div class="bg-secondary text-center p-3 text-light fw-bold">
                    <h2>Total Books Found: ${data.numFound}</h2>
                </div>
            `
        }
        else {
            //Error Handel Section        
            errorHandel('hide', 'show', 'hide', 'hide')
        }
    })

}


const errorHandel = (typeAName, noResults, searchArea, totalCounter) => {
    /* error typeing */
    if (typeAName === 'show') {
        erroTypeAName.classList.remove('d-none')
    }
    else if (typeAName === 'hide') {
        erroTypeAName.classList.add('d-none')
    }
    /* error no results */
    if (noResults === 'show') {
        erroNoResults.classList.remove('d-none')
    }
    else if (noResults === 'hide') {
        erroNoResults.classList.add('d-none')
    }
    /* error no results */
    if (searchArea === 'show') {
        bookSearchArea.classList.remove('d-none')
    }
    else if (searchArea === 'hide') {
        bookSearchArea.classList.add('d-none')
    }
    /* error no results */
    if (totalCounter === 'show') {
        totalBooksFound.classList.remove('d-none')
    }
    else if (totalCounter === 'hide') {
        totalBooksFound.classList.add('d-none')
    }
}