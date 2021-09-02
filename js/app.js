const searchInput = document.getElementById('searchInput');
const erroTypeAName = document.getElementById('erroTypeAName');
const lodingData = document.getElementById('lodingData');
const totalBooksFound = document.getElementById('totalBooksFound')
const bookSearchArea = document.getElementById('bookSearchArea');
const erroNoResults = document.getElementById('erroNoResults');

//Button Click Function
document.getElementById('searchBtn').addEventListener('click', () => {
    if (searchInput.value !== '') {
        getData(searchInput.value);
        searchInput.value = '';

        //loading and Error function
        loadingAndError('show', 'hide', 'hide', 'hide');
    }
    else {
        //loading and Error function    
        loadingAndError('hide', 'show', 'hide', 'hide');
    }
})

//connect with API
const connectApi = async (query) => {
    const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    const data = await res.json();
    return data;
}

//get and show data from api
const getData = searchText => {
    connectApi(searchText).then(data => {
        if (data.numFound !== 0) {
            bookSearchArea.textContent = '';
            totalBooksFound.innerHTML = '';
            let showBooksCount = 0;
            data.docs.forEach(element => {
                const { cover_i, title, subtitle, author_name, publisher, first_publish_year } = element;
                showBooksCount++;
                const singleBook = document.createElement('div');
                singleBook.classList.add('col');
                singleBook.innerHTML = `
                    <div class="card">
                        <img src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" class="card-img-top" alt="..." >
                        <div class="card-body">
                            <h4 class="card-title">${title ? title : 'Unknown Book Name'}${subtitle ? `${': '.concat(subtitle)}` : ''}</h4>
                            <h6 class="text-muted">by ${author_name ? author_name.map(x => ` ` + x) : 'Unknow Author'}</h6>
                            <p class="card-text">
                                <strong>Publisher:</strong> ${publisher ? publisher[0] : 'Unknow Publisher'}  </br> <strong>First published in:</strong> ${first_publish_year ? first_publish_year : 'Not Found'}
                            </p>
                        </div>
                    </div>                        
                `;
                bookSearchArea.appendChild(singleBook);
            });
            totalBooksFound.innerHTML = `
                <div class="bg-success bg-opacity-75 text-white text-center p-3 fw-bold rounded">
                    <h4>Total Books Found: ${data.numFound} <span class="text-white">|</span> Books Showing: ${showBooksCount}</h4>
                </div>
            `;
            //loading and Error function
            loadingAndError('hide', 'hide', 'hide', 'show');
        }
        else {
            //loading and Error function     
            loadingAndError('hide', 'hide', 'show', 'hide');
        }
    })

}


const loadingAndError = (loading, typeAName, noResults, searchArea) => {
    /* spiner */
    if (loading === 'show') {
        lodingData.classList.remove('d-none');
    }
    else if (loading === 'hide') {
        lodingData.classList.add('d-none');
    }
    /* error typeing */
    if (typeAName === 'show') {
        erroTypeAName.classList.remove('d-none');
    }
    else if (typeAName === 'hide') {
        erroTypeAName.classList.add('d-none');
    }

    /* error no results */
    if (noResults === 'show') {
        erroNoResults.classList.remove('d-none');
    }
    else if (noResults === 'hide') {
        erroNoResults.classList.add('d-none');
    }

    /* results area*/
    if (searchArea === 'show') {
        bookSearchArea.classList.remove('d-none');
        totalBooksFound.classList.remove('d-none');
    }
    else if (searchArea === 'hide') {
        bookSearchArea.classList.add('d-none');
        totalBooksFound.classList.add('d-none');
    }
}