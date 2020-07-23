// Paginação
// totalpages = 20
// selectedPage = 6
// [1, ..., 4, 5, 6, 7, 8, ...., 20]

function paginate(selectedPage, totalPages)
{
    let pages = [], 
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

        const firstAndLastPage = currentPage == 1 || currentPage == totalPages

        const pageAfterSelectedPage = currentPage <= selectedPage + 2
        const pageBeforeSelectedPage = currentPage >= selectedPage - 2

        if(firstAndLastPage || pageBeforeSelectedPage && pageAfterSelectedPage) {
            
            if (oldPage && currentPage - oldPage > 2 ) {
                pages.push("...")   
            }

            if (oldPage && currentPage - oldPage == 2 ) {
                pages.push(oldPage + 1)   
            }

            pages.push(currentPage)

            oldPage = currentPage
        }
    }

    //console.log(pages)
    return pages
}

const pagination = document.querySelector(".pagination")
// + na frente de pagination para transformar em numero
const page = +pagination.dataset.page
const total = +pagination.dataset.total

const filter = pagination.dataset.filter

const pages = paginate(page, total)

let elements = ""

console.log("Filtro:")
console.log(filter)

for (let page of pages) {

    if(String(page).includes("...")) {
        elements += `<span>${page}</span>`
    } 
    else {
        if ( filter ) {
            elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            console.log('if')
        } 
        else { 
            elements += `<a href="?page=${page}">${page}</a>`
            console.log('else')    
        }
    }
}

//console.log(elements)

pagination.innerHTML = elements

