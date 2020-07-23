const formDelete = document.querySelector("#form-delete")

formDelete.addEventListener("submit", function (event) {
    const confimation = confirm('Deseja realmente excluir o cadastro?')

    if(!confimation) {
        event.preventDefault()
    } 
})